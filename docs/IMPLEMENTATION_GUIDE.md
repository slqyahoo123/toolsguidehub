# 实施指南 - Next.js内容网站

## 快速开始

### 1. 初始化Next.js项目

```bash
npx create-next-app@latest toolsguidehub --typescript --tailwind --app
cd toolsguidehub
```

### 2. 安装必要依赖

```bash
npm install remark remark-html gray-matter
npm install -D @types/gray-matter
```

### 3. 创建文件夹结构

```bash
mkdir -p content/articles/{web-development,tools,guides}
mkdir -p content/pages
mkdir -p lib/{content,utils,seo,adsense}
mkdir -p components/{ui,layout,content,adsense}
mkdir -p config
mkdir -p types
mkdir -p public/images/{articles,og}
```

## 核心实现

### 1. 内容加载器 (`lib/content/loader.ts`)

```typescript
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const contentDirectory = path.join(process.cwd(), 'content/articles')

export interface Article {
  slug: string
  category: string
  title: string
  description: string
  date: string
  updated?: string
  content: string
  contentHtml: string
  image?: string
  ogImage?: string
  featured?: boolean
  related?: string[]
}

export function getAllCategories(): string[] {
  const categories = fs.readdirSync(contentDirectory, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
  
  return categories
}

export async function getAllArticles(): Promise<Article[]> {
  const categories = getAllCategories()
  const allArticles: Article[] = []

  for (const category of categories) {
    const categoryPath = path.join(contentDirectory, category)
    const files = fs.readdirSync(categoryPath)
      .filter(file => file.endsWith('.md'))

    for (const file of files) {
      const slug = file.replace('.md', '')
      const article = await getArticleBySlug(category, slug)
      if (article) {
        allArticles.push(article)
      }
    }
  }

  return allArticles.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

export async function getArticleBySlug(
  category: string,
  slug: string
): Promise<Article | null> {
  const fullPath = path.join(contentDirectory, category, `${slug}.md`)
  
  if (!fs.existsSync(fullPath)) {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const processedContent = await remark()
    .use(html)
    .process(content)
  const contentHtml = processedContent.toString()

  return {
    slug,
    category,
    title: data.title,
    description: data.description,
    date: data.date,
    updated: data.updated,
    content,
    contentHtml,
    image: data.image,
    ogImage: data.ogImage,
    featured: data.featured || false,
    related: data.related || [],
  }
}

export async function getArticlesByCategory(
  category: string
): Promise<Article[]> {
  const allArticles = await getAllArticles()
  return allArticles.filter(article => article.category === category)
}

export async function getRelatedArticles(
  category: string,
  slug: string,
  limit: number = 3
): Promise<Article[]> {
  const article = await getArticleBySlug(category, slug)
  if (!article || !article.related) {
    return []
  }

  const related: Article[] = []
  for (const relatedSlug of article.related.slice(0, limit)) {
    const relatedArticle = await getArticleBySlug(category, relatedSlug)
    if (relatedArticle) {
      related.push(relatedArticle)
    }
  }

  return related
}
```

### 2. 文章详情页 (`app/[category]/[slug]/page.tsx`)

```typescript
import { notFound } from 'next/navigation'
import { getArticleBySlug, getAllArticles } from '@/lib/content/loader'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo/metadata'
import ArticleHeader from '@/components/content/article-header'
import ArticleContent from '@/components/content/article-content'
import ArticleFooter from '@/components/content/article-footer'

interface PageProps {
  params: {
    category: string
    slug: string
  }
}

export async function generateStaticParams() {
  const articles = await getAllArticles()
  
  return articles.map((article) => ({
    category: article.category,
    slug: article.slug,
  }))
}

export async function generateMetadata({ params }: PageProps) {
  const article = await getArticleBySlug(params.category, params.slug)
  
  if (!article) {
    return {}
  }

  return generateSEOMetadata({
    title: article.title,
    description: article.description,
    path: `/${params.category}/${params.slug}`,
    image: article.ogImage,
  })
}

export default async function ArticlePage({ params }: PageProps) {
  const article = await getArticleBySlug(params.category, params.slug)

  if (!article) {
    notFound()
  }

  return (
    <article>
      <ArticleHeader article={article} />
      <ArticleContent content={article.contentHtml} />
      <ArticleFooter 
        category={article.category}
        slug={article.slug}
      />
    </article>
  )
}
```

### 3. 分类列表页 (`app/[category]/page.tsx`)

```typescript
import { notFound } from 'next/navigation'
import { getArticlesByCategory, getAllCategories } from '@/lib/content/loader'
import CategoryList from '@/components/content/category-list'
import { categories } from '@/config/categories'

interface PageProps {
  params: {
    category: string
  }
}

export async function generateStaticParams() {
  return categories.map((cat) => ({
    category: cat.slug,
  }))
}

export default async function CategoryPage({ params }: PageProps) {
  const articles = await getArticlesByCategory(params.category)
  const category = categories.find(cat => cat.slug === params.category)

  if (!category) {
    notFound()
  }

  return (
    <div>
      <h1>{category.name}</h1>
      <p>{category.description}</p>
      <CategoryList articles={articles} />
    </div>
  )
}
```

### 4. 动态Sitemap (`app/sitemap.ts`)

```typescript
import { MetadataRoute } from 'next'
import { getAllArticles } from '@/lib/content/loader'
import { siteConfig } from '@/config/site'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getAllArticles()
  const baseUrl = siteConfig.url

  const articleUrls = articles.map((article) => ({
    url: `${baseUrl}/${article.category}/${article.slug}`,
    lastModified: new Date(article.updated || article.date),
    changeFrequency: 'weekly' as const,
    priority: article.featured ? 0.9 : 0.7,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...articleUrls,
  ]
}
```

### 5. 分类配置 (`config/categories.ts`)

```typescript
export interface Category {
  slug: string
  name: string
  description: string
  order: number
}

export const categories: Category[] = [
  {
    slug: 'web-development',
    name: 'Web Development',
    description: 'Guides and tutorials for web development',
    order: 1,
  },
  {
    slug: 'tools',
    name: 'Tools',
    description: 'Reviews and comparisons of development tools',
    order: 2,
  },
  {
    slug: 'guides',
    name: 'Guides',
    description: 'Comprehensive guides and best practices',
    order: 3,
  },
] as const
```

## 内容创建流程

### 1. 创建新文章

```bash
# 在对应分类文件夹创建Markdown文件
content/articles/web-development/my-new-article.md
```

### 2. 编写Front Matter

```markdown
---
title: My New Article
description: A comprehensive guide about something
category: web-development
slug: my-new-article
date: 2024-01-15
updated: 2024-01-20
image: /images/articles/web-development/article.jpg
ogImage: /images/og/article.jpg
featured: true
related:
  - another-article-slug
  - yet-another-article
---

# Article Title

Content here...
```

### 3. 构建和预览

```bash
npm run build
npm run start
```

## 性能优化

### 1. 图片优化

使用Next.js Image组件：

```typescript
import Image from 'next/image'

<Image
  src={article.image}
  alt={article.title}
  width={1200}
  height={630}
  priority={article.featured}
/>
```

### 2. 静态生成优化

```typescript
// 分批生成，避免构建时间过长
export async function generateStaticParams() {
  // 可以添加分页逻辑
  const articles = await getAllArticles()
  return articles.slice(0, 100).map(...) // 首次构建100篇
}
```

### 3. 内容缓存

```typescript
// next.config.js
module.exports = {
  // 启用静态导出（可选）
  output: 'standalone',
}
```

## 下一步

1. 实现UI组件
2. 添加AdSense组件（获得批准后）
3. 实现内部链接系统
4. 优化SEO元数据
5. 添加分析工具

