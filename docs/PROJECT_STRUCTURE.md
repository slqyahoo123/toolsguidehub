# Next.js 内容型SEO网站 - 项目结构

## 完整文件夹树

```
toolsguidehub/
├── app/                              # Next.js App Router
│   ├── (marketing)/                  # 营销页面路由组
│   │   ├── about/
│   │   │   └── page.tsx
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── [category]/                   # 动态分类路由
│   │   ├── page.tsx                  # 分类列表页
│   │   └── [slug]/
│   │       └── page.tsx              # 文章详情页
│   ├── layout.tsx                    # 根布局
│   ├── page.tsx                      # 首页
│   ├── sitemap.ts                    # 动态sitemap生成
│   └── robots.ts                     # robots.txt生成
│
├── content/                          # Markdown内容源文件
│   ├── articles/                     # 文章内容（按分类组织）
│   │   ├── web-development/
│   │   │   ├── getting-started-with-react.md
│   │   │   ├── nextjs-best-practices.md
│   │   │   └── ...
│   │   ├── tools/
│   │   │   ├── best-code-editors-2024.md
│   │   │   └── ...
│   │   └── guides/
│   │       └── ...
│   └── pages/                        # 静态页面内容
│       ├── about.md
│       ├── privacy.md
│       └── terms.md
│
├── lib/                              # 核心工具库
│   ├── content/                      # 内容处理模块
│   │   ├── loader.ts                 # 内容加载器
│   │   ├── parser.ts                 # Markdown解析
│   │   ├── metadata.ts               # 元数据提取
│   │   └── index.ts
│   ├── utils/                        # 通用工具
│   │   ├── slug.ts                   # URL slug生成
│   │   ├── date.ts                   # 日期格式化
│   │   └── links.ts                  # 内部链接处理
│   ├── seo/                          # SEO工具
│   │   ├── metadata.ts               # 元数据生成
│   │   ├── sitemap.ts                # Sitemap生成
│   │   └── structured-data.ts        # 结构化数据
│   └── adsense/                      # AdSense工具（未来）
│       └── config.ts
│
├── components/                       # React组件
│   ├── ui/                           # 基础UI组件
│   │   ├── button.tsx
│   │   ├── link.tsx
│   │   └── ...
│   ├── layout/                       # 布局组件
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   ├── navigation.tsx
│   │   └── container.tsx
│   ├── content/                      # 内容相关组件
│   │   ├── article-header.tsx
│   │   ├── article-content.tsx
│   │   ├── article-footer.tsx
│   │   ├── category-list.tsx
│   │   ├── related-articles.tsx
│   │   └── table-of-contents.tsx
│   └── adsense/                      # AdSense组件（未来）
│       ├── ad-unit.tsx
│       └── ad-container.tsx
│
├── config/                          # 配置文件
│   ├── site.ts                       # 网站基础配置
│   ├── categories.ts                 # 分类配置
│   └── navigation.ts                 # 导航配置
│
├── public/                           # 静态资源
│   ├── images/                       # 图片资源
│   │   ├── articles/                 # 文章图片
│   │   │   ├── web-development/
│   │   │   └── tools/
│   │   └── og/                        # Open Graph图片
│   ├── icons/                        # 图标
│   └── assets/                       # 其他资源
│
├── styles/                           # 全局样式
│   ├── globals.css
│   └── markdown.css                  # Markdown内容样式
│
├── types/                            # TypeScript类型定义
│   ├── content.ts                    # 内容类型
│   ├── category.ts                   # 分类类型
│   └── metadata.ts                   # 元数据类型
│
├── scripts/                          # 构建/维护脚本
│   ├── validate-content.ts           # 内容验证
│   └── generate-sitemap.ts           # Sitemap生成（备用）
│
├── next.config.js                    # Next.js配置
├── tsconfig.json                     # TypeScript配置
├── package.json
└── README.md
```

## 文件夹详细说明

### `/app` - Next.js App Router

**目的**：定义所有路由和页面

**关键文件**：
- `layout.tsx` - 根布局（Header, Footer, AdSense脚本）
- `page.tsx` - 首页
- `[category]/page.tsx` - 分类列表页（SSG）
- `[category]/[slug]/page.tsx` - 文章详情页（SSG）
- `sitemap.ts` - 动态sitemap（基于内容自动生成）
- `robots.ts` - robots.txt生成

**路由结构**：
```
/                           → 首页
/web-development            → 分类列表
/web-development/nextjs-guide → 文章详情
/about                      → 关于页
```

**设计原则**：
- ✅ 使用路由组 `(marketing)` 组织非内容页面
- ✅ 动态路由 `[category]` 和 `[slug]` 支持无限扩展
- ✅ 所有页面使用 `generateStaticParams` 进行SSG

---

### `/content` - Markdown内容

**目的**：存储所有Markdown源文件

**结构**：
```
content/
├── articles/              # 文章（按分类组织）
│   └── [category]/
│       └── [slug].md
└── pages/                # 静态页面
    └── [page].md
```

**文件命名规则**：
- 文章：`kebab-case.md`（如：`getting-started-with-react.md`）
- 分类：文件夹名即分类slug
- 支持子分类：`articles/category/subcategory/article.md`

**Front Matter示例**：
```markdown
---
title: Getting Started with React
description: A comprehensive guide to React for beginners
category: web-development
slug: getting-started-with-react
date: 2024-01-15
updated: 2024-01-20
author: John Doe
image: /images/articles/web-development/react-intro.jpg
ogImage: /images/og/react-intro.jpg
featured: true
related:
  - nextjs-best-practices
  - react-hooks-guide
---
```

**设计原则**：
- ✅ 扁平化结构，易于查找
- ✅ 按分类组织，支持快速定位
- ✅ 文件名即slug，保持一致性
- ❌ 不要嵌套超过2层（category/subcategory）

---

### `/lib` - 核心工具库

**目的**：可复用的业务逻辑

#### `/lib/content` - 内容处理

**文件**：
- `loader.ts` - 读取和加载Markdown文件
- `parser.ts` - 解析Front Matter和Markdown
- `metadata.ts` - 提取和处理元数据
- `index.ts` - 统一导出

**功能**：
```typescript
// loader.ts
export function getAllArticles()
export function getArticleBySlug(category, slug)
export function getArticlesByCategory(category)
export function getRelatedArticles(slug, limit)

// parser.ts
export function parseMarkdown(content)
export function extractFrontMatter(content)
```

#### `/lib/utils` - 通用工具

**文件**：
- `slug.ts` - URL slug生成和验证
- `date.ts` - 日期格式化
- `links.ts` - 内部链接提取和处理

#### `/lib/seo` - SEO工具

**文件**：
- `metadata.ts` - 生成页面元数据
- `sitemap.ts` - 生成sitemap数据
- `structured-data.ts` - 生成JSON-LD结构化数据

**设计原则**：
- ✅ 单一职责，每个文件专注一个功能
- ✅ 纯函数，易于测试
- ✅ 类型安全，完整的TypeScript类型
- ❌ 不要过度抽象，保持简单

---

### `/components` - React组件

**目的**：可复用的UI组件

#### `/components/ui` - 基础UI组件

**示例**：Button, Link, Card, Badge等

**原则**：保持最小化，只添加真正需要的组件

#### `/components/layout` - 布局组件

**文件**：
- `header.tsx` - 网站头部（导航、Logo）
- `footer.tsx` - 网站底部
- `navigation.tsx` - 导航菜单
- `container.tsx` - 内容容器

#### `/components/content` - 内容组件

**文件**：
- `article-header.tsx` - 文章头部（标题、元数据）
- `article-content.tsx` - 文章内容渲染
- `article-footer.tsx` - 文章底部（相关文章、分享）
- `category-list.tsx` - 分类列表
- `related-articles.tsx` - 相关文章推荐
- `table-of-contents.tsx` - 目录（可选）

**设计原则**：
- ✅ 组件化，易于维护
- ✅ 服务端组件优先（App Router）
- ❌ 不要过早优化，按需添加组件

---

### `/config` - 配置文件

**目的**：集中管理配置

#### `config/site.ts`
```typescript
export const siteConfig = {
  name: 'Tools Guide Hub',
  url: 'https://toolsguidehub.com',
  description: '...',
  author: '...',
  // ...
}
```

#### `config/categories.ts`
```typescript
export const categories = [
  {
    slug: 'web-development',
    name: 'Web Development',
    description: '...',
    order: 1,
  },
  // ...
] as const
```

**设计原则**：
- ✅ 类型安全配置
- ✅ 单一数据源
- ❌ 不要硬编码配置值

---

### `/public` - 静态资源

**目的**：存储静态文件

**结构**：
```
public/
├── images/
│   ├── articles/        # 文章图片（按分类组织）
│   └── og/              # Open Graph图片
├── icons/               # 网站图标
└── assets/             # 其他资源
```

**设计原则**：
- ✅ 按分类组织图片，易于管理
- ✅ 使用WebP格式
- ✅ 优化图片大小
- ❌ 不要存储过大的文件

---

### `/types` - TypeScript类型

**目的**：定义类型系统

**文件**：
- `content.ts` - 内容相关类型
- `category.ts` - 分类类型
- `metadata.ts` - 元数据类型

**示例**：
```typescript
// types/content.ts
export interface Article {
  title: string
  description: string
  category: string
  slug: string
  date: string
  content: string
  // ...
}
```

---

## 关键设计决策

### 1. 内容组织方式

**选择**：按分类文件夹组织，而非扁平化

**理由**：
- ✅ 500+文章时易于管理
- ✅ 清晰的分类归属
- ✅ 支持分类级别的配置

**替代方案（不采用）**：
- ❌ 所有文章在一个文件夹（难以管理）
- ❌ 数据库存储（过度工程）

### 2. URL结构

**选择**：`/[category]/[slug]`

**理由**：
- ✅ SEO友好（分类在URL中）
- ✅ 用户友好（清晰的结构）
- ✅ 易于扩展

**示例**：
```
/web-development/nextjs-guide
/tools/best-editors-2024
```

### 3. 静态生成策略

**选择**：全站SSG + ISR（按需）

**实现**：
```typescript
// app/[category]/[slug]/page.tsx
export async function generateStaticParams() {
  // 生成所有文章路径
}

export async function generateMetadata() {
  // 生成元数据
}
```

**理由**：
- ✅ 极速加载
- ✅ SEO友好
- ✅ 可扩展到500+文章

### 4. 内部链接策略

**实现位置**：`/lib/utils/links.ts`

**功能**：
- 自动提取Markdown中的内部链接
- 验证链接有效性
- 生成相关文章推荐

**设计**：
- ✅ 基于front matter的`related`字段
- ✅ 基于分类的自动推荐
- ❌ 不要过度复杂的推荐算法

---

## 不要过度工程化

### ❌ 避免这些

1. **复杂的CMS集成**
   - 不需要：Strapi, Contentful等
   - 原因：Markdown文件已足够，500篇文章可管理

2. **数据库**
   - 不需要：PostgreSQL, MongoDB等
   - 原因：静态内容，文件系统足够

3. **复杂的搜索系统**
   - 不需要：Elasticsearch, Algolia（初期）
   - 原因：500篇文章，客户端搜索足够

4. **标签系统**
   - 不需要：多标签、标签云
   - 原因：要求中明确"no tags"，分类已足够

5. **用户系统**
   - 不需要：认证、评论系统（初期）
   - 原因：内容型网站，可后续添加

6. **复杂的构建工具**
   - 不需要：自定义Webpack配置
   - 原因：Next.js已足够

7. **微服务架构**
   - 不需要：API服务、独立服务
   - 原因：静态网站，单应用足够

### ✅ 保持简单

1. **文件系统作为数据源**
   - Markdown文件 = 数据库
   - 简单、可版本控制

2. **Next.js内置功能**
   - 使用App Router的SSG
   - 使用内置的Image优化
   - 使用内置的Metadata API

3. **最小化依赖**
   - 只添加必要的库
   - 优先使用Next.js内置功能

4. **渐进式增强**
   - 先实现核心功能
   - 按需添加高级功能

---

## 扩展性考虑

### 支持500+文章

**策略**：
1. **按需生成**：使用`generateStaticParams`分批生成
2. **增量构建**：Next.js支持增量静态生成
3. **内容分页**：分类列表页使用分页
4. **缓存策略**：利用CDN缓存

### 未来AdSense集成

**预留位置**：
- `/components/adsense/` - AdSense组件
- `/lib/adsense/` - AdSense配置
- 在layout中预留脚本位置

**设计**：
- 组件化广告单元
- 配置驱动的广告位置
- 不影响内容结构

### 内部链接优化

**实现**：
- Front matter中的`related`字段
- 自动生成相关文章
- 分类级别的文章推荐

---

## 总结

这个结构设计：

✅ **可扩展**：支持500+文章，易于添加新分类
✅ **清晰**：职责分离，易于理解
✅ **简单**：避免过度工程，保持可维护
✅ **SEO友好**：URL结构、元数据、sitemap
✅ **性能优先**：SSG、优化加载

**核心原则**：简单、清晰、可扩展，避免过早优化。

