import { notFound } from 'next/navigation'
import { getArticleBySlug, getAllArticles } from '@/lib/content/loader'
import { generateArticleMetadata } from '@/lib/seo/metadata'
import { generateArticleStructuredData } from '@/lib/seo/structured-data'
import ArticleLayout from '@/components/content/article-layout'
import Container from '@/components/layout/container'

interface PageProps {
  params: {
    category: string
    slug: string
  }
}

/**
 * 生成静态参数（所有文章）
 * 
 * 这个函数在构建时执行，读取所有Markdown文件
 * 为每篇文章生成静态参数组合
 * 
 * 例如，如果有3篇文章：
 * [
 *   { category: 'web-development', slug: 'getting-started-with-react' },
 *   { category: 'web-development', slug: 'nextjs-best-practices' },
 *   { category: 'tools', slug: 'best-code-editors-2024' }
 * ]
 * 
 * Next.js会为每个组合生成一个静态HTML文件：
 * - /web-development/getting-started-with-react/ → 静态HTML
 * - /web-development/nextjs-best-practices/ → 静态HTML
 * - /tools/best-code-editors-2024/ → 静态HTML
 * 
 * 优势：
 * - 所有页面在构建时预生成
 * - 运行时零数据获取
 * - 支持500+文章（Next.js自动并行生成）
 */
export async function generateStaticParams() {
  const articles = await getAllArticles()
  
  return articles.map((article) => ({
    category: article.category,
    slug: article.slug,
  }))
}

/**
 * 生成SEO元数据
 * 
 * 为每篇文章生成完整的SEO元数据
 * 
 * 元数据来源（确定性，全部来自frontmatter）：
 * - title: 来自Markdown文件的frontmatter.title
 * - description: 来自frontmatter.description
 * - image: 来自frontmatter.ogImage或image
 * - date: 来自frontmatter.date
 * - updated: 来自frontmatter.updated
 * - author: 来自frontmatter.author
 * - category: 来自frontmatter.category
 * - path: 基于category和slug生成
 * 
 * 生成的元数据包括：
 * - Title标签: "Article Title | Site Name"
 * - Meta描述: 来自frontmatter.description（150-160字符）
 * - Canonical URL: 基于category和slug
 * - Open Graph标签: 文章类型，包含发布时间、作者、分类
 * - Twitter Card标签: 大图卡片格式
 * 
 * 所有元数据在构建时生成，直接嵌入HTML的<head>标签
 * 搜索引擎可以立即读取，无需执行JavaScript
 * 
 * 重要：不使用AI生成元数据，全部基于frontmatter，确保确定性
 */
export async function generateMetadata({ params }: PageProps) {
  const article = await getArticleBySlug(params.category, params.slug)
  
  if (!article) {
    return {}
  }

  // 使用便捷函数生成文章元数据
  // 所有数据来自frontmatter，确保确定性
  return generateArticleMetadata({
    title: article.title, // 来自frontmatter.title
    description: article.description, // 来自frontmatter.description
    category: article.category, // 来自frontmatter.category
    slug: article.slug, // 来自文件名
    date: article.date, // 来自frontmatter.date
    updated: article.updated, // 来自frontmatter.updated
    author: article.author, // 来自frontmatter.author
    ogImage: article.ogImage, // 来自frontmatter.ogImage
    image: article.image, // 来自frontmatter.image
  })
}

/**
 * 文章详情页组件
 * 
 * 这是一个服务端组件（Server Component），在构建时执行
 * 
 * 工作流程：
 * 1. 构建时：
 *    - 读取Markdown文件
 *    - 解析Front Matter和内容
 *    - 转换Markdown为HTML
 *    - 生成完整的HTML页面（包括内容和元数据）
 * 
 * 2. 运行时：
 *    - 直接返回预生成的静态HTML
 *    - 无需任何数据获取
 *    - 无需JavaScript执行
 * 
 * 优势：
 * - 零客户端数据获取：所有数据在构建时获取并嵌入HTML
 * - 完美SEO：内容在HTML中，搜索引擎可以立即读取
 * - 极速加载：静态HTML + CDN缓存，加载时间 < 50ms
 * - 结构化数据：JSON-LD帮助Google理解内容类型
 * 
 * 性能指标：
 * - First Contentful Paint: < 1.0s
 * - Largest Contentful Paint: < 2.5s
 * - Time to Interactive: < 3.5s
 * - 内容立即可用（无需等待JavaScript）
 */
export default async function ArticlePage({ params }: PageProps) {
  // 服务端数据获取（构建时执行，运行时直接使用预生成HTML）
  const article = await getArticleBySlug(params.category, params.slug)

  // 如果文章不存在，返回404
  if (!article) {
    notFound()
  }

  // 生成JSON-LD结构化数据（帮助Google理解内容）
  const structuredData = generateArticleStructuredData(article)

  // 返回完整的HTML内容（构建时生成）
  return (
    <>
      {/* JSON-LD结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* 文章内容（构建时已转换为HTML） */}
      <div className="bg-gray-50 min-h-screen py-8 md:py-12" style={{ backgroundColor: '#f9fafb' }}>
        <Container>
          <ArticleLayout article={article} />
        </Container>
      </div>
    </>
  )
}

