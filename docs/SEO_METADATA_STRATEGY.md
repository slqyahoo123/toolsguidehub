# SEO元数据生成策略

## 概述

本文档详细说明网站的SEO元数据生成策略，确保：
- 确定性：所有元数据基于frontmatter，不运行时生成
- 完整性：包含所有重要的SEO元数据
- 准确性：元数据准确反映内容

## 元数据来源（确定性）

### 文章页面

所有元数据来自Markdown文件的frontmatter：

```markdown
---
title: Getting Started with React        # → <title>
description: A comprehensive guide...    # → <meta name="description">
category: web-development                # → Open Graph section
slug: getting-started-with-react         # → URL路径
date: 2024-01-15                        # → Open Graph publishedTime
updated: 2024-01-20                     # → Open Graph modifiedTime
author: John Doe                        # → Open Graph authors
image: /images/article.jpg              # → Open Graph image
ogImage: /images/og-article.jpg         # → Open Graph image (优先)
---
```

### 分类页面

所有元数据来自配置文件：

```typescript
// config/categories.ts
{
  slug: 'web-development',              # → URL路径
  name: 'Web Development',              # → <title>
  description: 'Guides and tutorials...' # → <meta name="description">
}
```

## 生成的元数据

### 1. Title标签

**格式**: `"Page Title | Site Name"`

**示例**:
- 文章: `"Getting Started with React | Tools Guide Hub"`
- 分类: `"Web Development | Tools Guide Hub"`
- 首页: `"Tools Guide Hub"`

**实现**:
```typescript
function generateTitle(pageTitle: string, isHomePage: boolean = false): string {
  if (isHomePage) {
    return siteConfig.name
  }
  return `${pageTitle} | ${siteConfig.name}`
}
```

**重要性**: ⭐⭐⭐⭐⭐
- 最重要的SEO元素
- 显示在搜索结果中
- 影响点击率（CTR）

### 2. Meta描述

**要求**:
- 长度: 150-160字符（SEO最佳实践）
- 来源: frontmatter.description
- 内容: 准确描述页面内容

**实现**:
```typescript
function sanitizeDescription(description: string): string {
  // 移除HTML标签
  const cleaned = description.replace(/<[^>]*>/g, '').trim()
  
  // 如果过长，截断到160字符
  if (cleaned.length > 160) {
    const truncated = cleaned.substring(0, 157)
    const lastSpace = truncated.lastIndexOf(' ')
    return lastSpace > 0 
      ? truncated.substring(0, lastSpace) + '...'
      : truncated + '...'
  }
  
  return cleaned
}
```

**重要性**: ⭐⭐⭐⭐⭐
- 显示在搜索结果中
- 影响点击率
- 帮助用户理解内容

### 3. Canonical URL

**格式**: `https://site.com/category/slug/`

**实现**:
```typescript
function generateFullURL(path: string): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${siteConfig.url}${normalizedPath}`
}
```

**重要性**: ⭐⭐⭐⭐
- 避免重复内容问题
- 告诉搜索引擎哪个是规范URL
- 集中页面权重

### 4. Open Graph标签

**基础标签**:
```html
<meta property="og:type" content="article">
<meta property="og:title" content="Article Title">
<meta property="og:description" content="Description">
<meta property="og:url" content="https://site.com/article/">
<meta property="og:image" content="https://site.com/image.jpg">
<meta property="og:site_name" content="Site Name">
<meta property="og:locale" content="en_US">
```

**文章特定标签**:
```html
<meta property="article:published_time" content="2024-01-15">
<meta property="article:modified_time" content="2024-01-20">
<meta property="article:author" content="John Doe">
<meta property="article:section" content="Web Development">
```

**重要性**: ⭐⭐⭐⭐
- 社交媒体分享（Facebook, LinkedIn等）
- 控制分享时的显示内容
- 提升分享点击率

### 5. Twitter Card标签

**标签**:
```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Article Title">
<meta name="twitter:description" content="Description">
<meta name="twitter:image" content="https://site.com/image.jpg">
<meta name="twitter:creator" content="@sitehandle">
```

**重要性**: ⭐⭐⭐
- Twitter分享优化
- 大图卡片格式
- 提升Twitter点击率

## 对信息网站最重要的元数据

### 1. Title标签 ⭐⭐⭐⭐⭐

**为什么重要**:
- 搜索引擎结果中最重要的元素
- 直接影响点击率
- 用户第一眼看到的内容

**最佳实践**:
- 50-60字符长度
- 包含主要关键词
- 每个页面唯一
- 准确描述内容

### 2. Meta描述 ⭐⭐⭐⭐⭐

**为什么重要**:
- 显示在搜索结果中（标题下方）
- 影响用户是否点击
- 帮助用户理解内容

**最佳实践**:
- 150-160字符长度
- 吸引人的摘要
- 包含关键词但自然
- 准确描述内容

### 3. Canonical URL ⭐⭐⭐⭐

**为什么重要**:
- 避免重复内容问题
- 集中页面SEO权重
- 告诉搜索引擎规范版本

**最佳实践**:
- 每个页面唯一
- 使用HTTPS
- 包含尾部斜杠（一致性）

### 4. Open Graph标签 ⭐⭐⭐⭐

**为什么重要**:
- 社交媒体分享优化
- 控制分享时的显示
- 提升分享点击率

**最佳实践**:
- 完整的OG标签
- 高质量图片（1200x630px）
- 准确的标题和描述

### 5. 结构化数据 ⭐⭐⭐

**为什么重要**:
- 帮助搜索引擎理解内容
- 支持富媒体搜索结果
- 提升搜索结果可见性

**实现**: JSON-LD格式（在`lib/seo/structured-data.ts`中）

## 不应该自动生成的内容

### ❌ 1. Title和Description

**不应该**:
```typescript
// ❌ 错误：自动生成title
const title = article.content.substring(0, 50) + '...'

// ❌ 错误：AI生成description
const description = await generateDescription(article.content)
```

**应该**:
```typescript
// ✅ 正确：使用frontmatter
const title = article.title // 来自frontmatter
const description = article.description // 来自frontmatter
```

**原因**:
- 需要人工优化
- 确保准确性和相关性
- 控制关键词使用
- 避免AI生成的不准确内容

### ❌ 2. 关键词（Keywords）

**不应该**:
```typescript
// ❌ 错误：自动提取关键词
const keywords = extractKeywords(article.content)
```

**原因**:
- Google不再使用keywords meta标签
- 可能被滥用
- 浪费资源

### ❌ 3. 自动生成图片

**不应该**:
```typescript
// ❌ 错误：自动生成OG图片
const ogImage = await generateImage(article.title)
```

**应该**:
```typescript
// ✅ 正确：使用frontmatter指定
const ogImage = article.ogImage || article.image // 来自frontmatter
```

**原因**:
- 需要精心设计
- 确保质量和相关性
- 符合品牌风格

### ❌ 4. 自动生成摘要

**不应该**:
```typescript
// ❌ 错误：从内容自动提取摘要
const description = article.content.substring(0, 160)
```

**应该**:
```typescript
// ✅ 正确：使用frontmatter中的描述
const description = article.description // 来自frontmatter
```

**原因**:
- 需要人工优化
- 确保吸引人和准确
- 控制长度和内容

### ❌ 5. 动态生成URL

**不应该**:
```typescript
// ❌ 错误：基于内容动态生成URL
const slug = generateSlugFromContent(article.content)
```

**应该**:
```typescript
// ✅ 正确：使用frontmatter中的slug
const slug = article.slug // 来自frontmatter
```

**原因**:
- URL应该稳定
- 需要人工优化
- 避免URL变化导致404

## 确定性原则

### 什么是确定性？

**确定性** = 相同输入 → 相同输出

```typescript
// ✅ 确定性：相同frontmatter → 相同元数据
const metadata = generateMetadata({
  title: "Article Title",
  description: "Description",
  // ...
})
// 每次调用都返回相同结果
```

### 为什么重要？

1. **可预测性**
   - 知道输入就知道输出
   - 便于测试和调试
   - 减少意外错误

2. **可维护性**
   - 元数据来源明确
   - 易于修改和更新
   - 不依赖外部服务

3. **性能**
   - 构建时生成
   - 无需运行时计算
   - 快速加载

4. **SEO**
   - 搜索引擎可以信任
   - 元数据稳定
   - 避免重复内容

### 实现确定性

**所有元数据来自**:
1. **Frontmatter**（文章）
   ```markdown
   ---
   title: "Article Title"
   description: "Description"
   ---
   ```

2. **配置文件**（分类）
   ```typescript
   {
     name: "Category Name",
     description: "Description"
   }
   ```

3. **固定规则**（URL、格式等）
   ```typescript
   const url = `${siteConfig.url}/${category}/${slug}`
   const title = `${pageTitle} | ${siteConfig.name}`
   ```

**不使用**:
- ❌ AI生成
- ❌ 运行时计算
- ❌ 外部API
- ❌ 随机内容

## 实施检查清单

### 元数据完整性
- [x] Title标签（包含site name）
- [x] Meta描述（150-160字符）
- [x] Canonical URL
- [x] Open Graph基础标签
- [x] Open Graph文章标签（如适用）
- [x] Twitter Card标签
- [x] Robots标签

### 确定性
- [x] 所有元数据来自frontmatter
- [x] 不使用AI生成
- [x] 不使用运行时计算
- [x] 固定规则生成URL和格式

### 质量
- [x] Title长度合适（50-60字符）
- [x] Description长度合适（150-160字符）
- [x] 每个页面唯一
- [x] 准确描述内容

## 使用示例

### 文章页面

```typescript
// app/[category]/[slug]/page.tsx
export async function generateMetadata({ params }: PageProps) {
  const article = await getArticleBySlug(params.category, params.slug)
  
  // 所有元数据来自frontmatter
  return generateArticleMetadata({
    title: article.title,        // frontmatter.title
    description: article.description, // frontmatter.description
    category: article.category,  // frontmatter.category
    slug: article.slug,          // 文件名
    date: article.date,          // frontmatter.date
    // ...
  })
}
```

### 分类页面

```typescript
// app/[category]/page.tsx
export async function generateMetadata({ params }: PageProps) {
  const category = getCategoryBySlug(params.category)
  
  // 所有元数据来自配置文件
  return generateCategoryMetadata({
    name: category.name,         // config/categories.ts
    description: category.description, // config/categories.ts
    slug: category.slug,         // config/categories.ts
  })
}
```

## 总结

### 核心原则

1. **确定性**
   - 所有元数据基于frontmatter
   - 不使用AI或运行时生成
   - 可预测和可维护

2. **完整性**
   - 包含所有重要的SEO元数据
   - Title, Description, Canonical, OG, Twitter

3. **准确性**
   - 元数据准确反映内容
   - 人工优化，不自动生成

### 最重要的元数据

1. **Title标签** - 搜索结果中的标题
2. **Meta描述** - 搜索结果中的描述
3. **Canonical URL** - 避免重复内容
4. **Open Graph** - 社交媒体分享

### 不应该自动生成

- ❌ Title和Description（需要人工优化）
- ❌ Keywords（已废弃）
- ❌ OG图片（需要精心设计）
- ❌ 摘要（需要人工优化）
- ❌ URL（应该稳定）

这个策略确保了SEO元数据的确定性、完整性和准确性，为信息网站提供最佳的SEO表现。

