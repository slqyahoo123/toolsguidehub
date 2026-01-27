# Markdown渲染安全快速参考

## 安全措施

### ✅ 已实现

- [x] XSS防护（多层清理）
- [x] 内联样式移除
- [x] 嵌入脚本移除
- [x] 事件处理器移除
- [x] 危险协议过滤
- [x] HTML标签白名单
- [x] 属性验证

## 清理规则

### 移除的内容

```typescript
// 1. 脚本标签
<script>...</script> → 移除

// 2. 样式标签
<style>...</style> → 移除

// 3. 内联样式
style="..." → 移除

// 4. 事件处理器
onclick="..." → 移除
onerror="..." → 移除

// 5. 危险协议
javascript: → 移除
data: → 移除
```

### 允许的内容

```typescript
// HTML标签
p, h1-h6, ul, ol, li, a, img, code, pre, 
blockquote, table, tr, td, th, etc.

// 属性
a: href, title, rel
img: src, alt, title, width, height
code: class
pre: class
```

## 支持的Markdown

### 基本语法
- ✅ 标题 (# H1, ## H2, ### H3)
- ✅ 段落
- ✅ 强调 (**bold**, *italic*)
- ✅ 链接 [text](url)
- ✅ 图片 ![alt](src)
- ✅ 列表 (有序/无序)
- ✅ 代码 (`code`, ```code block```)
- ✅ 引用 (> blockquote)

### GitHub Flavored Markdown
- ✅ 表格
- ✅ 任务列表 (- [ ] task)
- ✅ 删除线 (~~text~~)
- ✅ 自动链接

## 为什么重要

### AdSense审核
- ✅ 内容安全 → 审核通过
- ✅ 无恶意代码 → 技术合规
- ✅ 干净HTML → 用户体验好

### 安全性
- ✅ XSS防护 → 用户安全
- ✅ 无脚本注入 → 网站安全
- ✅ 内容验证 → 数据安全

## 使用

```typescript
import { renderMarkdownToHTML } from '@/lib/content/markdown-renderer'

const html = await renderMarkdownToHTML(markdown, {
  allowHTML: false,        // 不允许原始HTML
  strictSanitization: true, // 严格清理
  supportGFM: true,        // 支持GFM
})
```

## 相关文档

- [MARKDOWN_RENDERING_STRATEGY.md](./MARKDOWN_RENDERING_STRATEGY.md) - 详细策略说明

