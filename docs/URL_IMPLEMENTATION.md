# URL策略实施指南

## 当前实现状态

✅ **已实现**：项目已完全按照SEO安全的URL策略实施

### URL格式

```
domain.com/category/post-slug/
```

### 实现位置

1. **路由结构** (`app/[category]/[slug]/page.tsx`)
   - 动态路由自动生成 `/category/slug/` 格式
   - 使用 `generateStaticParams` 进行SSG

2. **URL工具函数** (`lib/utils/slug.ts`, `lib/utils/url.ts`)
   - `slugify()` - 生成SEO友好的slug
   - `normalizeURLPath()` - 规范化URL路径
   - `validateSEOURL()` - 验证URL符合策略

3. **Next.js配置** (`next.config.js`)
   - 自动处理尾部斜杠
   - 支持URL重定向（如需要）

## 使用指南

### 创建新文章时的URL

在Markdown文件的front matter中：

```markdown
---
title: Getting Started with React
category: web-development
slug: getting-started-with-react
---
```

**自动生成的URL**：
```
/web-development/getting-started-with-react/
```

### 在代码中生成URL

```typescript
import { generateArticleURL } from '@/lib/utils/url'

const url = generateArticleURL('web-development', 'getting-started-with-react')
// 结果: https://toolsguidehub.com/web-development/getting-started-with-react/
```

### 验证URL

```typescript
import { validateSEOURL } from '@/lib/utils/url'

const result = validateSEOURL('/web-development/getting-started-with-react/')
if (!result.valid) {
  console.error(result.errors)
}
```

## URL验证脚本

运行验证脚本检查所有文章的URL：

```bash
npm run validate-urls
```

这将检查：
- ✅ slug格式是否正确
- ✅ 是否包含查询参数
- ✅ 是否包含日期
- ✅ 是否全部小写
- ✅ 是否符合SEO最佳实践

## 常见问题

### Q: 如何更改现有文章的URL？

A: 修改Markdown文件中的`slug`字段，Next.js会在构建时生成新URL。建议：
1. 保留旧URL的重定向（如需要）
2. 更新所有内部链接
3. 在Google Search Console中提交新URL

### Q: 分类名称可以包含多个单词吗？

A: 可以，但建议使用连字符：
```
✅ web-development
✅ best-practices
❌ web_development
❌ webDevelopment
```

### Q: slug可以多长？

A: 建议控制在50字符以内，但可以更长。URL总长度建议不超过100字符。

### Q: 可以修改URL结构吗？

A: 可以，但需要：
1. 更新路由结构 (`app/[category]/[slug]/page.tsx`)
2. 更新所有内部链接
3. 设置301重定向（如需要）
4. 更新sitemap生成逻辑

## 最佳实践检查清单

创建新文章时：

- [ ] category使用小写和连字符
- [ ] slug使用小写和连字符
- [ ] slug不超过50字符
- [ ] 无特殊字符
- [ ] 无日期格式
- [ ] 人类可读
- [ ] 运行 `npm run validate-urls` 验证

## 示例

### ✅ 好的URL示例

```
/web-development/getting-started-with-react/
/tools/best-code-editors-2024/
/guides/complete-seo-guide/
```

### ❌ 避免的URL示例

```
❌ /web-development/getting-started-with-react?id=123
❌ /2024/01/15/getting-started-with-react/
❌ /Web-Development/Getting-Started-With-React/
❌ /web_development/getting_started_with_react/
❌ /wd/gs-react/
```

## 总结

项目已完全实现SEO安全的URL策略：

1. ✅ 格式：`/category/slug/`
2. ✅ 无查询参数
3. ✅ 无日期
4. ✅ 分类可见
5. ✅ 人类可读
6. ✅ 全部小写
7. ✅ 使用连字符

所有工具和验证都已就绪，可以直接使用！

