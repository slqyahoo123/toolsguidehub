# Markdown到HTML渲染策略

## 概述

本文档详细说明网站的安全Markdown渲染策略，确保：
- 无内联样式
- 无嵌入脚本
- 严格的内容清理
- 支持代码块和列表
- XSS攻击防护
- AdSense审核兼容

## 渲染流程

```
Markdown文件
    ↓
1. 解析Front Matter
    ↓
2. 清理Markdown内容（移除危险内容）
    ↓
3. Markdown → HTML转换（remark）
    ↓
4. HTML清理和验证（sanitizer）
    ↓
5. 安全的HTML输出
```

## 安全措施

### 1. XSS防护

#### 问题：跨站脚本攻击（XSS）

XSS攻击通过在内容中注入恶意脚本，当浏览器执行这些脚本时，可能：
- 窃取用户cookie和session
- 重定向到恶意网站
- 修改页面内容
- 执行未授权操作

#### 防护措施

**a) Markdown清理**

```typescript
// lib/content/markdown-renderer.ts
export function sanitizeMarkdown(markdown: string): string {
  // 移除脚本标签
  cleaned = cleaned.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
  
  // 移除事件处理器
  cleaned = cleaned.replace(/\s*on\w+\s*=\s*["'][^"']*["']/gi, '')
  
  // 移除javascript:协议
  cleaned = cleaned.replace(/javascript:/gi, '')
  
  return cleaned
}
```

**b) HTML清理**

```typescript
// lib/content/sanitizer.ts
export function sanitizeHTML(html: string): string {
  // 移除所有<script>标签
  cleaned = cleaned.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
  
  // 移除所有事件处理器
  cleaned = cleaned.replace(/\s*on\w+\s*=\s*["'][^"']*["']/gi, '')
  
  // 移除javascript:协议链接
  cleaned = cleaned.replace(/href\s*=\s*["']javascript:[^"']*["']/gi, 'href="#"')
  
  return cleaned
}
```

**c) 只允许安全的HTML元素**

```typescript
const ALLOWED_TAGS = [
  'p', 'br', 'strong', 'em', 'h1', 'h2', 'h3',
  'ul', 'ol', 'li', 'a', 'img', 'code', 'pre',
  'blockquote', 'table', 'tr', 'td', 'th',
  // ... 只允许安全的标签
]
```

#### 示例：XSS攻击尝试

**恶意Markdown**:
```markdown
<script>alert('XSS')</script>
<img src="x" onerror="alert('XSS')">
<a href="javascript:alert('XSS')">Click</a>
```

**清理后**:
```html
<!-- 所有危险内容被移除 -->
```

### 2. 移除内联样式

#### 问题：内联样式

内联样式可能导致：
- 样式不一致
- 难以维护
- 可能包含恶意CSS
- 违反AdSense政策

#### 解决方案

```typescript
// 移除所有style属性
cleaned = cleaned.replace(/\s*style\s*=\s*["'][^"']*["']/gi, '')
cleaned = cleaned.replace(/\s*style\s*=\s*[^\s>]*/gi, '')

// 移除<style>标签
cleaned = cleaned.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
```

**示例**:
```markdown
<!-- 输入 -->
<p style="color: red;">Text</p>

<!-- 输出 -->
<p>Text</p>
```

样式通过CSS类控制，而不是内联样式。

### 3. 移除嵌入脚本

#### 问题：嵌入脚本

脚本标签可能导致：
- XSS攻击
- 恶意代码执行
- 违反AdSense政策
- 安全漏洞

#### 解决方案

```typescript
// 移除所有<script>标签及其内容
cleaned = cleaned.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
```

**示例**:
```markdown
<!-- 输入 -->
<script>console.log('dangerous')</script>
<p>Content</p>

<!-- 输出 -->
<p>Content</p>
```

### 4. 严格的内容清理

#### 清理规则

1. **移除危险标签**
   - `<script>`, `<style>`, `<iframe>`, `<object>`, `<embed>`

2. **移除危险属性**
   - 所有事件处理器（`onclick`, `onerror`, `onload`等）
   - `style`属性（内联样式）
   - `javascript:`协议

3. **验证链接协议**
   - 只允许：`http://`, `https://`, `mailto:`, 相对路径
   - 禁止：`javascript:`, `data:`, 其他协议

4. **清理空标签**
   - 移除空的HTML标签

## 支持的Markdown特性

### 基本语法

- ✅ **标题**: `# H1`, `## H2`, `### H3`
- ✅ **段落**: 普通文本
- ✅ **强调**: `**bold**`, `*italic*`
- ✅ **链接**: `[text](url)`
- ✅ **图片**: `![alt](src)`
- ✅ **列表**: 有序和无序列表
- ✅ **代码**: 行内代码和代码块
- ✅ **引用**: `> blockquote`
- ✅ **水平线**: `---`

### GitHub Flavored Markdown (GFM)

- ✅ **表格**: Markdown表格语法
- ✅ **任务列表**: `- [ ]` 和 `- [x]`
- ✅ **删除线**: `~~text~~`
- ✅ **自动链接**: URL自动转换为链接

### 代码块支持

```markdown
行内代码: `code`

代码块:
```javascript
function hello() {
  console.log('Hello');
}
```
```

**输出**:
```html
行内代码: <code>code</code>

<pre><code class="language-javascript">
function hello() {
  console.log('Hello');
}
</code></pre>
```

### 列表支持

```markdown
无序列表:
- Item 1
- Item 2
  - Sub-item

有序列表:
1. First
2. Second
3. Third
```

**输出**:
```html
<ul>
  <li>Item 1</li>
  <li>Item 2
    <ul>
      <li>Sub-item</li>
    </ul>
  </li>
</ul>

<ol>
  <li>First</li>
  <li>Second</li>
  <li>Third</li>
</ol>
```

## 保持HTML干净

### 1. 无内联样式

**策略**: 所有样式通过CSS类控制

```html
<!-- ❌ 不允许 -->
<p style="color: red;">Text</p>

<!-- ✅ 正确 -->
<p class="text-red-500">Text</p>
```

**实现**:
- 清理器自动移除所有`style`属性
- 样式通过Tailwind CSS类或全局CSS定义

### 2. 无嵌入脚本

**策略**: 所有脚本在构建时处理，不在内容中

```html
<!-- ❌ 不允许 -->
<script>alert('test')</script>

<!-- ✅ 正确 -->
<!-- 脚本在layout.tsx中统一管理 -->
```

**实现**:
- 清理器自动移除所有`<script>`标签
- 脚本只在组件层面添加（如AdSense脚本）

### 3. 语义化HTML

**策略**: 使用正确的HTML5语义元素

```html
<!-- ✅ 正确 -->
<article>
  <header>
    <h1>Title</h1>
  </header>
  <main>
    <section>
      <h2>Section</h2>
      <p>Content</p>
    </section>
  </main>
</article>
```

### 4. 属性验证

**策略**: 只允许安全的属性

```typescript
const ALLOWED_ATTRIBUTES = {
  a: ['href', 'title', 'rel'],
  img: ['src', 'alt', 'title', 'width', 'height'],
  code: ['class'],
  pre: ['class'],
}
```

## 为什么这对AdSense审核重要

### 1. 内容安全

**AdSense要求**:
- ✅ 网站必须安全，无恶意代码
- ✅ 内容必须干净，无隐藏脚本
- ✅ 用户体验良好

**我们的实现**:
- ✅ 严格的内容清理
- ✅ XSS防护
- ✅ 无恶意脚本

### 2. 内容质量

**AdSense要求**:
- ✅ 高质量、原创内容
- ✅ 清晰的页面结构
- ✅ 良好的用户体验

**我们的实现**:
- ✅ 语义化HTML结构
- ✅ 清晰的标题层次
- ✅ 无内联样式干扰

### 3. 技术合规

**AdSense要求**:
- ✅ 网站技术规范
- ✅ 无隐藏内容
- ✅ 无恶意重定向

**我们的实现**:
- ✅ 干净的HTML输出
- ✅ 无隐藏脚本
- ✅ 安全的链接处理

### 4. 审核通过率

**优势**:
- ✅ 内容安全 → 审核通过率高
- ✅ 技术规范 → 减少审核问题
- ✅ 用户体验好 → 长期合作

## 实施检查清单

### 内容安全
- [x] XSS防护实现
- [x] 脚本标签移除
- [x] 事件处理器移除
- [x] 危险协议过滤

### HTML清理
- [x] 内联样式移除
- [x] 只允许安全标签
- [x] 属性验证
- [x] 链接协议验证

### Markdown支持
- [x] 基本Markdown语法
- [x] GitHub Flavored Markdown
- [x] 代码块支持
- [x] 列表支持

### AdSense兼容
- [x] 无内联样式
- [x] 无嵌入脚本
- [x] 干净的HTML
- [x] 语义化结构

## 使用示例

### 基本使用

```typescript
import { renderMarkdownToHTML } from '@/lib/content/markdown-renderer'

const markdown = `
# Title

This is **bold** text.

- Item 1
- Item 2
`

const html = await renderMarkdownToHTML(markdown)
// 输出: 安全的HTML，已清理
```

### 在内容加载器中使用

```typescript
// lib/content/loader.ts
const contentHtml = await renderMarkdownToHTML(sanitizedContent, {
  allowHTML: false,        // 不允许原始HTML
  strictSanitization: true, // 严格清理
  supportGFM: true,        // 支持GFM
})
```

## 总结

### 安全特性

1. **XSS防护**
   - 多层清理（Markdown + HTML）
   - 脚本标签移除
   - 事件处理器移除
   - 协议验证

2. **内容清理**
   - 内联样式移除
   - 只允许安全标签
   - 属性验证
   - 空标签清理

3. **Markdown支持**
   - 基本语法
   - GitHub Flavored Markdown
   - 代码块和列表
   - 表格和任务列表

### AdSense优势

- ✅ **内容安全**: 无恶意代码，审核通过率高
- ✅ **技术规范**: 符合Google技术标准
- ✅ **用户体验**: 干净的内容，良好的阅读体验
- ✅ **长期合作**: 减少审核问题，稳定收益

这个渲染策略确保了内容安全、HTML干净，并完全符合AdSense审核要求。

