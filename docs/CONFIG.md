# 配置指南

## 网站配置

编辑 `build.js` 中的 `config` 对象来配置你的网站：

```javascript
const config = {
  siteName: 'Tools Guide Hub',           // 网站名称
  siteUrl: 'https://toolsguidehub.com',  // 网站URL（用于SEO）
  description: '...',                    // 默认描述
  author: 'Tools Guide Hub',            // 作者
  lang: 'en',                            // 语言代码
};
```

## AdSense 配置

### 1. 获取发布商ID

1. 注册 Google AdSense 账户
2. 等待审核通过
3. 获取你的发布商ID（格式：`ca-pub-XXXXXXXXXX`）

### 2. 更新模板

编辑 `src/templates/page.html`，找到以下行：

```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX" crossorigin="anonymous"></script>
```

将 `ca-pub-XXXXXXXXXX` 替换为你的发布商ID。

### 3. 添加广告单元

在获得 AdSense 批准后，在模板中添加广告单元代码。广告容器已预置在以下位置：

- **顶部广告** (`#ad-top`): 页面顶部，内容上方
- **文章内广告** (`#ad-in-article`): 内容中间
- **底部广告** (`#ad-bottom`): 内容下方

### 4. AdSense 合规检查清单

- ✅ 原创内容（无版权问题）
- ✅ 足够的页面内容（建议每页至少500字）
- ✅ 清晰的导航结构
- ✅ 移动端友好
- ✅ 隐私政策页面
- ✅ 服务条款页面
- ✅ 无恶意软件或误导性内容
- ✅ 符合 AdSense 内容政策

## SEO 配置

### 每页必填元数据

在内容文件的 front matter 中：

```markdown
---
title: 页面标题（50-60字符）
description: 页面描述（150-160字符）
path: /页面URL路径
image: /assets/og-image.jpg  # Open Graph图片
---
```

### 最佳实践

1. **标题优化**
   - 包含主要关键词
   - 50-60字符长度
   - 每个页面唯一

2. **描述优化**
   - 吸引人的摘要
   - 150-160字符
   - 包含关键词但自然

3. **URL结构**
   - 简短、描述性
   - 使用连字符分隔
   - 反映内容层次

4. **内容质量**
   - 每页至少500字
   - 清晰的标题层次（H1 → H2 → H3）
   - 内部链接
   - 外部权威链接

## 性能优化

### 图片优化

1. 使用现代格式（WebP）
2. 压缩图片（使用工具如 TinyPNG）
3. 适当尺寸（不要过大）
4. 添加 alt 属性

### 资源位置

- 图片：`src/assets/images/`
- 字体：`src/assets/fonts/`
- 其他：`src/assets/`

构建后，所有资源会复制到 `dist/assets/`

## 内容创建流程

### 1. 创建新页面

```bash
# 在 src/content/ 下创建 .md 文件
src/content/your-page.md
```

### 2. 编写内容

```markdown
---
title: Your Page Title
description: Page description for SEO
path: /your-page
image: /assets/og-image.jpg
meta:
  date: 2024-01-15
  author: Author Name
---

# 标题

你的内容...
```

### 3. 构建

```bash
npm run build
```

### 4. 预览

```bash
npm run serve
```

访问 `http://localhost:3000`

## 部署前检查

- [ ] 所有页面都有唯一的 title 和 description
- [ ] 所有图片都已优化
- [ ] 测试所有链接
- [ ] 验证 HTML（使用 W3C Validator）
- [ ] 检查移动端显示
- [ ] 测试页面加载速度（PageSpeed Insights）
- [ ] 确认 AdSense 代码已正确配置
- [ ] 检查 sitemap.xml
- [ ] 检查 robots.txt

## 长期SEO策略

1. **内容更新**
   - 定期更新现有内容
   - 添加新内容（建议每周至少1篇）

2. **内部链接**
   - 在内容中自然添加内部链接
   - 使用描述性锚文本

3. **外部链接**
   - 链接到权威资源
   - 避免垃圾链接

4. **用户体验**
   - 快速加载
   - 移动端友好
   - 清晰导航

5. **技术SEO**
   - 定期检查 sitemap
   - 监控 Google Search Console
   - 修复404错误
   - 优化Core Web Vitals

