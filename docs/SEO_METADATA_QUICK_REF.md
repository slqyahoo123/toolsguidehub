# SEO元数据快速参考

## 元数据来源（确定性）

### 文章页面
- ✅ title: `frontmatter.title`
- ✅ description: `frontmatter.description`
- ✅ image: `frontmatter.ogImage` 或 `frontmatter.image`
- ✅ date: `frontmatter.date`
- ✅ updated: `frontmatter.updated`
- ✅ author: `frontmatter.author`
- ✅ category: `frontmatter.category`

### 分类页面
- ✅ title: `config/categories.ts` → `category.name`
- ✅ description: `config/categories.ts` → `category.description`
- ✅ path: 基于 `category.slug`

### 首页
- ✅ title: `config/site.ts` → `siteConfig.name`
- ✅ description: `config/site.ts` → `siteConfig.description`
- ✅ path: `"/"`

## 生成的元数据

### 必需标签
- [x] `<title>` - "Page Title | Site Name"
- [x] `<meta name="description">` - 150-160字符
- [x] `<link rel="canonical">` - 完整URL
- [x] Open Graph基础标签
- [x] Twitter Card标签

### 文章特定标签
- [x] `article:published_time`
- [x] `article:modified_time`
- [x] `article:author`
- [x] `article:section`

## 最重要的元数据（信息网站）

1. **Title标签** ⭐⭐⭐⭐⭐
   - 搜索结果中的标题
   - 50-60字符
   - 包含site name

2. **Meta描述** ⭐⭐⭐⭐⭐
   - 搜索结果中的描述
   - 150-160字符
   - 影响点击率

3. **Canonical URL** ⭐⭐⭐⭐
   - 避免重复内容
   - 集中SEO权重

4. **Open Graph** ⭐⭐⭐⭐
   - 社交媒体分享
   - 控制分享显示

## 不应该自动生成

- ❌ Title（需要人工优化）
- ❌ Description（需要人工优化）
- ❌ Keywords（已废弃）
- ❌ OG图片（需要精心设计）
- ❌ 摘要（需要人工优化）

## 使用示例

### 文章页面
```typescript
return generateArticleMetadata({
  title: article.title,        // frontmatter
  description: article.description, // frontmatter
  // ...
})
```

### 分类页面
```typescript
return generateCategoryMetadata({
  name: category.name,         // config
  description: category.description, // config
  slug: category.slug,         // config
})
```

## 相关文档

- [SEO_METADATA_STRATEGY.md](./SEO_METADATA_STRATEGY.md) - 详细策略说明

