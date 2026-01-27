# 语义化HTML文章布局指南

## HTML5语义元素使用

### 文章结构

```html
<article>
  <!-- 文章容器，表示独立的内容单元 -->
  
  <header>
    <!-- 文章头部：标题、元数据、图片 -->
  </header>
  
  <main>
    <!-- 主要内容区域 -->
    <section>
      <!-- 文章正文内容 -->
    </section>
  </main>
  
  <nav>
    <!-- 导航区域：相关文章链接 -->
  </nav>
  
  <footer>
    <!-- 文章底部：元信息、返回链接 -->
  </footer>
</article>
```

### 语义元素说明

#### `<article>`
- **用途**: 包裹完整的文章内容
- **SEO价值**: 告诉搜索引擎这是独立的内容单元
- **可访问性**: 屏幕阅读器可以识别文章边界

#### `<header>`
- **用途**: 文章头部信息
- **包含**: H1标题、介绍摘要、元数据、特色图片
- **SEO价值**: 明确标识文章开始

#### `<main>`
- **用途**: 主要内容区域
- **包含**: 文章正文
- **SEO价值**: 标识主要内容，搜索引擎优先索引

#### `<section>`
- **用途**: 内容章节
- **包含**: 文章正文段落
- **SEO价值**: 帮助理解内容结构

#### `<nav>`
- **用途**: 导航链接
- **包含**: 相关文章链接
- **SEO价值**: 帮助建立内部链接结构

#### `<footer>`
- **用途**: 文章底部信息
- **包含**: 返回链接、更新时间
- **SEO价值**: 提供额外的上下文信息

#### `<aside>`
- **用途**: 广告区域（补充内容）
- **包含**: AdSense广告
- **可访问性**: 使用`aria-label="Advertisement"`标识

#### `<figure>` 和 `<figcaption>`
- **用途**: 图片及其说明
- **SEO价值**: 帮助搜索引擎理解图片内容

## 标题层次（H1-H3）

### 层次结构

```
H1 (唯一) - 文章标题
  └─ H2 - 主要章节
      └─ H3 - 子章节
```

### 使用规则

#### H1 - 文章标题
```html
<h1>Getting Started with React</h1>
```

**规则**:
- ✅ 每页唯一
- ✅ 最重要的SEO元素
- ✅ 包含主要关键词
- ✅ 50-60字符长度

#### H2 - 主要章节
```html
<h2>What is React?</h2>
<h2>Setting Up Your Environment</h2>
<h2>Understanding Components</h2>
```

**规则**:
- ✅ 文章的主要部分
- ✅ 逻辑分段
- ✅ 包含相关关键词
- ✅ 不超过6-8个H2

#### H3 - 子章节
```html
<h2>Understanding Components</h2>
  <h3>Functional Components</h3>
  <h3>Class Components</h3>
```

**规则**:
- ✅ H2下的细分
- ✅ 支持更详细的内容组织
- ✅ 不超过3-4个H3 per H2

### 标题层次示例

```html
<article>
  <header>
    <h1>Complete Guide to React</h1>
  </header>
  
  <main>
    <section>
      <h2>Introduction</h2>
      <p>...</p>
      
      <h2>Getting Started</h2>
      <h3>Installation</h3>
      <p>...</p>
      
      <h3>First Component</h3>
      <p>...</p>
      
      <h2>Advanced Topics</h2>
      <h3>State Management</h3>
      <p>...</p>
      
      <h3>Performance Optimization</h3>
      <p>...</p>
    </section>
  </main>
</article>
```

## 可访问性优化

### ARIA标签

```html
<!-- 广告区域 -->
<aside aria-label="Advertisement" role="complementary">
  <!-- 广告内容 -->
</aside>

<!-- 导航区域 -->
<nav aria-label="Related articles">
  <!-- 相关文章链接 -->
</nav>

<!-- 时间信息 -->
<time dateTime="2024-01-15">
  <span class="sr-only">Published on</span>
  January 15, 2024
</time>
```

### 屏幕阅读器支持

```html
<!-- 隐藏但可访问的文本 -->
<span class="sr-only">Author:</span>
By John Doe

<!-- 链接描述 -->
<Link aria-label="Back to Web Development category">
  ← Back to Web Development
</Link>
```

## 无布局偏移（CLS优化）

### 实现方法

#### 1. 固定广告容器高度

```css
.ad-container {
  min-height: 250px; /* 预留空间 */
  width: 100%;
}
```

#### 2. 图片尺寸预设

```html
<Image
  src="/image.jpg"
  width={1200}
  height={630}
  alt="Description"
/>
```

#### 3. 避免动态内容插入

```html
<!-- ❌ 错误：会导致布局偏移 -->
<div id="dynamic-content"></div>

<!-- ✅ 正确：预留空间 -->
<div id="dynamic-content" style="min-height: 200px;"></div>
```

## 内容优先设计

### 视觉层次

```
┌─────────────────────────────────┐
│  HEADER (标题、介绍)              │
│  ─────────────────────────────  │
│  AD ZONE 1 (可选)                │
│  ─────────────────────────────  │
│  MAIN CONTENT (主要内容)          │
│  ─────────────────────────────  │
│  AD ZONE 2 (可选，长文章)        │
│  ─────────────────────────────  │
│  MAIN CONTENT (继续)              │
│  ─────────────────────────────  │
│  NAV (相关文章)                  │
│  ─────────────────────────────  │
│  AD ZONE 3 (可选)                │
│  ─────────────────────────────  │
│  FOOTER (底部信息)               │
└─────────────────────────────────┘
```

### 内容与广告比例

- **内容**: 80%+
- **广告**: <20%
- **间距**: 充足的留白

## SEO优化要点

### 1. 语义结构

- ✅ 使用正确的HTML5元素
- ✅ 清晰的标题层次
- ✅ 逻辑的内容组织

### 2. 内部链接

- ✅ 相关文章链接
- ✅ 分类链接
- ✅ 描述性锚文本

### 3. 结构化数据

- ✅ JSON-LD标记
- ✅ Article schema
- ✅ BreadcrumbList schema

### 4. 元数据

- ✅ 完整的meta标签
- ✅ Open Graph标签
- ✅ Twitter Card标签

## 总结

### 布局特点

1. **语义化**: 使用正确的HTML5元素
2. **可访问**: ARIA标签和屏幕阅读器支持
3. **SEO友好**: 清晰的标题层次和结构
4. **AdSense兼容**: 符合Google政策
5. **性能优化**: 无布局偏移，快速加载

### 关键原则

- ✅ 内容为主，广告为辅
- ✅ 语义HTML5结构
- ✅ 清晰的标题层次（H1-H3）
- ✅ 无布局偏移
- ✅ 可访问性优先

这个布局设计确保了最佳的可读性、SEO表现和AdSense兼容性。

