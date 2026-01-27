# 如何发布文章 - 完整指南

## 📝 快速开始

### 1. 选择分类

首先，确定你的文章属于哪个分类：

- `ai-tools-platforms` - AI工具和平台
- `software-saas-issues` - 软件和SaaS问题
- `accounts-subscriptions` - 账户和订阅
- `how-things-work` - 工作原理
- `troubleshooting-guides` - 故障排除指南

### 2. 创建Markdown文件

在对应的分类文件夹中创建新的Markdown文件：

**文件路径格式**：
```
content/articles/[category]/[slug].md
```

**示例**：
```
content/articles/ai-tools-platforms/my-new-article.md
```

### 3. 编写文章

使用以下模板：

```markdown
---
title: Your Article Title
description: A clear and concise description of your article (150-160 characters for SEO)
category: ai-tools-platforms
slug: your-article-slug
date: 2024-01-26
author: Your Name
featured: false
image: /images/articles/ai-tools-platforms/your-image.jpg
ogImage: /images/og/your-og-image.jpg
updated: 2024-01-27
---

# Your Article Title

Your article content here in Markdown format...

## Section 1

Content for section 1...

### Subsection 1.1

More detailed content...

## Section 2

Content for section 2...

## Conclusion

Summary and conclusion...
```

## 📋 Front Matter 字段说明

### 必需字段

| 字段 | 说明 | 示例 |
|------|------|------|
| `title` | 文章标题 | `Getting Started with ChatGPT` |
| `description` | 文章描述（150-160字符，用于SEO） | `Learn how to use ChatGPT effectively for content creation and problem solving.` |
| `category` | 分类slug（必须匹配config/categories.ts） | `ai-tools-platforms` |
| `slug` | URL友好的slug（小写，连字符分隔） | `getting-started-with-chatgpt` |
| `date` | 发布日期（ISO格式） | `2024-01-26` |

### 可选字段

| 字段 | 说明 | 示例 |
|------|------|------|
| `author` | 作者名称 | `John Doe` |
| `featured` | 是否特色文章 | `true` 或 `false` |
| `image` | 文章特色图片路径 | `/images/articles/ai-tools-platforms/image.jpg` |
| `ogImage` | Open Graph图片路径 | `/images/og/article-og.jpg` |
| `updated` | 最后更新日期 | `2024-01-27` |
| `related` | 相关文章slug数组 | `['article-1', 'article-2']` |

## 🎯 完整示例

### 示例1：基础文章

```markdown
---
title: How to Fix ChatGPT Login Issues
description: Step-by-step guide to troubleshoot and fix common ChatGPT login problems and authentication errors.
category: troubleshooting-guides
slug: fix-chatgpt-login-issues
date: 2024-01-26
author: Tools Guide Hub Team
featured: true
---

# How to Fix ChatGPT Login Issues

ChatGPT login issues can be frustrating. This guide will help you troubleshoot and resolve common authentication problems.

## Common Login Problems

### Problem 1: "Invalid Credentials"

If you see this error, try the following:

1. **Check Your Email**: Make sure you're using the correct email address
2. **Reset Password**: Use the "Forgot Password" link
3. **Clear Browser Cache**: Clear cookies and cache for chat.openai.com

### Problem 2: "Account Locked"

Your account may be temporarily locked due to:

- Too many failed login attempts
- Suspicious activity
- Policy violations

**Solution**: Wait 24 hours or contact OpenAI support.

## Step-by-Step Troubleshooting

1. **Clear Browser Data**
   - Open browser settings
   - Clear cookies and cache
   - Restart browser

2. **Try Incognito Mode**
   - Open ChatGPT in incognito/private window
   - This helps identify browser extension issues

3. **Check Internet Connection**
   - Ensure stable internet connection
   - Try different network if possible

## Prevention Tips

- Use strong, unique passwords
- Enable two-factor authentication
- Keep your browser updated
- Avoid using VPN if not necessary

## Conclusion

Most ChatGPT login issues can be resolved by clearing browser data and resetting your password. If problems persist, contact OpenAI support.
```

### 示例2：带图片的文章

```markdown
---
title: Complete Guide to Midjourney AI Image Generation
description: Learn how to create stunning AI-generated images using Midjourney, including prompt engineering and advanced techniques.
category: ai-tools-platforms
slug: midjourney-ai-image-generation-guide
date: 2024-01-26
author: Tools Guide Hub Team
featured: true
image: /images/articles/ai-tools-platforms/midjourney-guide.jpg
ogImage: /images/og/midjourney-og.jpg
---

# Complete Guide to Midjourney AI Image Generation

Midjourney is one of the most powerful AI image generation tools available. This comprehensive guide will teach you everything you need to know.

## Getting Started

### Creating Your First Image

1. Join the Midjourney Discord server
2. Navigate to a newbie channel
3. Type `/imagine` followed by your prompt
4. Wait for the AI to generate your image

### Basic Prompt Structure

```
/imagine prompt: a beautiful sunset over mountains, cinematic lighting, 4k
```

## Advanced Techniques

### Prompt Engineering

**Good prompts include**:
- Subject description
- Style keywords
- Technical parameters
- Quality modifiers

**Example**:
```
/imagine prompt: cyberpunk cityscape at night, neon lights, 
rain-soaked streets, cinematic, 8k, highly detailed
```

## Best Practices

- Be specific in your descriptions
- Use style keywords (cinematic, photorealistic, etc.)
- Experiment with different aspect ratios
- Save your favorite prompts for reuse

## Conclusion

With practice, you can create stunning AI-generated images using Midjourney. Start with simple prompts and gradually experiment with more complex descriptions.
```

## ✅ 文章发布检查清单

发布前，请确认：

- [ ] Front Matter格式正确
- [ ] `category` 匹配现有分类
- [ ] `slug` 使用小写和连字符（无空格、特殊字符）
- [ ] `description` 长度在150-160字符之间
- [ ] `date` 使用ISO格式（YYYY-MM-DD）
- [ ] 文章内容使用Markdown格式
- [ ] 标题层次正确（H1 → H2 → H3）
- [ ] 图片路径正确（如果使用）
- [ ] 无拼写和语法错误

## 🚀 发布步骤

### 方法1：手动创建文件

1. **打开分类文件夹**：
   ```
   content/articles/[category]/
   ```

2. **创建新文件**：
   - 文件名：`your-article-slug.md`
   - 使用小写字母和连字符

3. **编写内容**：
   - 复制上面的模板
   - 填写Front Matter
   - 编写文章内容

4. **保存文件**

5. **测试**：
   ```bash
   npm run dev
   ```
   访问：`http://localhost:3000/[category]/[slug]`

### 方法2：使用脚本（可选）

可以创建一个脚本来自动生成文章模板：

```bash
# 未来可以添加文章生成脚本
npm run create-article
```

## 📝 Markdown语法支持

### 支持的语法

- ✅ **标题**：`# H1`, `## H2`, `### H3`
- ✅ **粗体**：`**bold text**`
- ✅ **斜体**：`*italic text*`
- ✅ **列表**：有序和无序列表
- ✅ **链接**：`[text](url)`
- ✅ **图片**：`![alt](url)`（但建议在Front Matter中使用image字段）
- ✅ **代码块**：\`\`\`language
- ✅ **引用**：`> quote`
- ✅ **表格**：GitHub Flavored Markdown表格
- ✅ **任务列表**：`- [ ] task`

### 不支持的语法

- ❌ 内联HTML（会被清理）
- ❌ 内联样式（会被移除）
- ❌ JavaScript代码（会被移除）
- ❌ 脚本标签（会被移除）

## 🖼️ 图片处理

### 1. 准备图片

将图片放在对应的分类文件夹：
```
public/images/articles/[category]/your-image.jpg
```

### 2. 在Front Matter中引用

```markdown
---
image: /images/articles/ai-tools-platforms/your-image.jpg
ogImage: /images/og/your-og-image.jpg
---
```

### 3. 图片要求

- **格式**：JPG, PNG, WebP
- **大小**：建议 < 500KB
- **尺寸**：建议 1200x630 (OG图片) 或 1200x675 (文章图片)
- **优化**：使用工具压缩图片

## 🔗 内部链接

### 链接到其他文章

```markdown
[链接文本](/category/article-slug/)
```

**示例**：
```markdown
See our [ChatGPT guide](/ai-tools-platforms/getting-started-with-chatgpt/) for more information.
```

### 链接到分类页面

```markdown
[分类名称](/category-slug/)
```

**示例**：
```markdown
Browse all [AI Tools articles](/ai-tools-platforms/).
```

## 📊 SEO最佳实践

### 1. 标题优化

- ✅ 使用描述性标题
- ✅ 包含关键词
- ✅ 长度：50-60字符
- ❌ 避免关键词堆砌

### 2. 描述优化

- ✅ 150-160字符
- ✅ 包含主要关键词
- ✅ 吸引点击
- ✅ 准确描述内容

### 3. 内容结构

- ✅ 使用清晰的标题层次
- ✅ 每个H2下至少2-3段内容
- ✅ 使用列表提高可读性
- ✅ 包含相关关键词（自然使用）

### 4. URL优化

- ✅ 使用描述性slug
- ✅ 小写字母和连字符
- ✅ 包含关键词
- ❌ 避免日期和特殊字符

## 🎨 内容格式建议

### 文章长度

- **最短**：500字
- **推荐**：1,000-2,000字
- **深度文章**：2,000-5,000字

### 结构建议

1. **引言**（1-2段）
   - 介绍问题和主题
   - 说明文章价值

2. **主体内容**（多个H2部分）
   - 每个部分聚焦一个主题
   - 使用H3细分内容

3. **总结**（1段）
   - 总结要点
   - 提供下一步行动

### 可读性

- ✅ 使用短段落（3-5句）
- ✅ 使用列表和要点
- ✅ 使用粗体强调重点
- ✅ 添加代码示例（如适用）
- ✅ 使用图片说明复杂概念

## 🔄 更新现有文章

### 更新Front Matter

```markdown
---
title: Original Title
description: Original description
category: category-name
slug: article-slug
date: 2024-01-15
updated: 2024-01-26  # 添加更新日期
author: Author Name
---
```

### 更新内容

1. 编辑Markdown文件
2. 更新`updated`字段
3. 保存文件
4. 重新构建（或等待自动更新）

## 🧪 测试文章

### 本地测试

1. **启动开发服务器**：
   ```bash
   npm run dev
   ```

2. **访问文章**：
   ```
   http://localhost:3000/[category]/[slug]/
   ```

3. **检查**：
   - [ ] 页面正常加载
   - [ ] 标题和描述正确
   - [ ] 内容格式正确
   - [ ] 图片显示正常
   - [ ] 链接工作正常
   - [ ] SEO元数据正确

### 验证URL

```bash
npm run validate-urls
```

这将检查：
- URL格式是否正确
- Slug是否有效
- 分类是否匹配

## 📦 批量发布

### 准备多篇文章

1. 创建所有Markdown文件
2. 确保Front Matter正确
3. 运行验证：
   ```bash
   npm run validate-urls
   ```
4. 构建项目：
   ```bash
   npm run build
   ```

## 🚨 常见错误

### 错误1：分类不匹配

**错误**：
```markdown
category: wrong-category
```

**解决**：检查 `config/categories.ts` 中的正确分类slug

### 错误2：Slug格式错误

**错误**：
```markdown
slug: My Article Title  # 包含空格和大写
```

**正确**：
```markdown
slug: my-article-title  # 小写，连字符分隔
```

### 错误3：描述过长

**错误**：
```markdown
description: This is a very long description that exceeds the recommended 160 characters and may be truncated in search results...
```

**正确**：
```markdown
description: Clear, concise description under 160 characters for optimal SEO display.
```

### 错误4：图片路径错误

**错误**：
```markdown
image: images/article.jpg  # 缺少前导斜杠
```

**正确**：
```markdown
image: /images/articles/category/article.jpg
```

## 📚 更多资源

- **项目结构**：查看 [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)
- **Markdown渲染**：查看 [MARKDOWN_RENDERING_STRATEGY.md](./MARKDOWN_RENDERING_STRATEGY.md)
- **SEO优化**：查看 [SEO_METADATA_STRATEGY.md](./SEO_METADATA_STRATEGY.md)
- **URL策略**：查看 [SEO_URL_STRATEGY.md](./SEO_URL_STRATEGY.md)

## ✅ 总结

发布文章的步骤：

1. ✅ 选择分类
2. ✅ 创建Markdown文件
3. ✅ 填写Front Matter
4. ✅ 编写内容
5. ✅ 添加图片（可选）
6. ✅ 测试文章
7. ✅ 构建和部署

**记住**：文章会自动生成页面，无需手动配置路由！

