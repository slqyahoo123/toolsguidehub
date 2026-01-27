# 动态路由快速参考

## 路由结构

```
/                              → 首页
/[category]/                   → 分类列表页
/[category]/[slug]/            → 文章详情页
```

## 关键函数

### generateStaticParams()

**作用**: 告诉Next.js需要生成哪些页面

**分类页面**:
```typescript
export async function generateStaticParams() {
  return [
    { category: 'web-development' },
    { category: 'tools' }
  ]
}
```

**文章页面**:
```typescript
export async function generateStaticParams() {
  const articles = await getAllArticles()
  return articles.map(article => ({
    category: article.category,
    slug: article.slug,
  }))
}
```

### generateMetadata()

**作用**: 为每个页面生成SEO元数据

```typescript
export async function generateMetadata({ params }) {
  const article = await getArticleBySlug(params.category, params.slug)
  return {
    title: article.title,
    description: article.description,
    // ... 更多元数据
  }
}
```

## 内容加载

### 文件系统读取

```typescript
// lib/content/loader.ts
const contentDirectory = path.join(process.cwd(), 'content/articles')

// 读取所有文章
export async function getAllArticles() {
  // 1. 读取文件系统
  // 2. 解析Markdown
  // 3. 返回Article[]
}
```

### Markdown处理

```typescript
// 1. 读取文件
const fileContents = fs.readFileSync(filePath, 'utf8')

// 2. 解析Front Matter
const { data, content } = matter(fileContents)

// 3. 转换Markdown为HTML
const html = await remark().use(html).process(content)
```

## 构建流程

```
npm run build
    ↓
1. 读取所有Markdown文件
    ↓
2. 执行 generateStaticParams()
    ↓
3. 为每个参数生成页面
   - generateMetadata() → <head>
   - Page Component → <body>
    ↓
4. 输出静态HTML
    ↓
5. 优化和压缩
```

## 性能特点

- ✅ **静态HTML**: 所有页面预生成
- ✅ **零客户端获取**: 数据在构建时获取
- ✅ **CDN缓存**: 全球快速访问
- ✅ **代码分割**: 每个路由独立bundle

## SEO特点

- ✅ **完整HTML**: 内容在HTML中
- ✅ **丰富元数据**: title, description, OG, Twitter
- ✅ **结构化数据**: JSON-LD
- ✅ **自动Sitemap**: 所有URL自动包含

## 添加新内容

### 新文章

1. 创建文件: `content/articles/category/slug.md`
2. 添加Front Matter
3. 运行: `npm run build`
4. 自动生成页面

### 新分类

1. 更新: `config/categories.ts`
2. 创建文件夹: `content/articles/new-category/`
3. 运行: `npm run build`
4. 自动生成分类页面

## 常见问题

**Q: 如何修改URL结构？**
A: 修改路由文件路径和`generateStaticParams()`返回值

**Q: 支持多少文章？**
A: 理论上无限制，Next.js自动并行生成

**Q: 内容更新后需要重新构建吗？**
A: 是的，运行`npm run build`重新生成所有页面

**Q: 可以添加动态内容吗？**
A: 可以，但建议使用ISR（增量静态生成）

## 相关文档

- [DYNAMIC_ROUTING.md](./DYNAMIC_ROUTING.md) - 详细实现说明
- [ROUTING_IMPLEMENTATION.md](./ROUTING_IMPLEMENTATION.md) - 实施总结
- [SEO_URL_STRATEGY.md](./SEO_URL_STRATEGY.md) - URL策略

