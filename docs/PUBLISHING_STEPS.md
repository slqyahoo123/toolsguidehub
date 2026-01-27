# 📝 文章发布步骤 - 超简单版

## 🚀 3步发布文章

### 第1步：创建文件

在对应的分类文件夹中创建 `.md` 文件：

**文件路径**：
```
content/articles/[分类文件夹]/[文章slug].md
```

**示例**：
```
content/articles/ai-tools-platforms/how-to-fix-chatgpt-login.md
```

### 第2步：复制模板

复制以下模板到你的文件：

```markdown
---
title: 你的文章标题
description: 文章描述（150-160字符，用于SEO）
category: ai-tools-platforms
slug: your-article-slug
date: 2024-01-26
author: 你的名字
featured: false
---

# 你的文章标题

文章内容从这里开始...

## 第一部分

内容...

## 第二部分

更多内容...

## 总结

总结内容...
```

### 第3步：填写信息

修改以下字段：

| 字段 | 说明 | 示例 |
|------|------|------|
| `title` | 文章标题 | `How to Fix ChatGPT Login Issues` |
| `description` | 文章描述（150-160字符） | `Step-by-step guide to troubleshoot ChatGPT login problems` |
| `category` | 分类slug（见下方） | `ai-tools-platforms` |
| `slug` | URL友好的slug（小写，连字符） | `how-to-fix-chatgpt-login` |
| `date` | 发布日期 | `2024-01-26` |
| `author` | 作者（可选） | `Your Name` |
| `featured` | 是否特色 | `true` 或 `false` |

## 📂 可用分类

| 分类名称 | category值 |
|---------|-----------|
| AI Tools & Platforms | `ai-tools-platforms` |
| Software & SaaS Issues | `software-saas-issues` |
| Accounts & Subscriptions | `accounts-subscriptions` |
| How Things Work | `how-things-work` |
| Troubleshooting Guides | `troubleshooting-guides` |

## ✅ 完整示例

**文件位置**：`content/articles/troubleshooting-guides/fix-chatgpt-login.md`

**文件内容**：

```markdown
---
title: How to Fix ChatGPT Login Issues
description: Step-by-step guide to troubleshoot and fix common ChatGPT login problems and authentication errors.
category: troubleshooting-guides
slug: fix-chatgpt-login
date: 2024-01-26
author: Tools Guide Hub Team
featured: true
---

# How to Fix ChatGPT Login Issues

ChatGPT login issues can be frustrating. This guide will help you troubleshoot and resolve common authentication problems.

## Common Login Problems

### Problem 1: Invalid Credentials

If you see this error, try the following:

1. Check your email address
2. Reset your password
3. Clear browser cache

### Problem 2: Account Locked

Your account may be temporarily locked. Wait 24 hours or contact support.

## Step-by-Step Troubleshooting

1. **Clear Browser Data**
   - Open browser settings
   - Clear cookies and cache
   - Restart browser

2. **Try Incognito Mode**
   - Open ChatGPT in private window
   - This helps identify extension issues

## Conclusion

Most login issues can be resolved by clearing browser data and resetting your password.
```

## 🧪 测试文章

### 1. 启动开发服务器

```bash
npm run dev
```

### 2. 访问文章

打开浏览器访问：
```
http://localhost:3000/[category]/[slug]/
```

**示例**：
```
http://localhost:3000/troubleshooting-guides/fix-chatgpt-login/
```

### 3. 检查

- ✅ 页面正常加载
- ✅ 标题和描述正确显示
- ✅ 内容格式正确
- ✅ URL正确

## 📋 检查清单

发布前确认：

- [ ] 文件保存在正确的分类文件夹
- [ ] 文件名使用小写和连字符（如：`my-article.md`）
- [ ] Front Matter格式正确（前后都有 `---`）
- [ ] `category` 值匹配现有分类
- [ ] `slug` 使用小写和连字符
- [ ] `description` 长度在150-160字符
- [ ] `date` 使用 `YYYY-MM-DD` 格式
- [ ] 文章内容使用Markdown格式

## 🎯 重要提示

1. **无需配置路由**：创建文件后，页面会自动生成
2. **URL自动生成**：格式为 `/[category]/[slug]/`
3. **SEO自动优化**：元数据会自动生成
4. **立即生效**：保存文件后，开发服务器会自动更新

## 📚 更多帮助

- 详细指南：[HOW_TO_PUBLISH_ARTICLES.md](./HOW_TO_PUBLISH_ARTICLES.md)
- 模板文件：[ARTICLE_TEMPLATE.md](./ARTICLE_TEMPLATE.md)
- 快速参考：[ARTICLE_PUBLISHING_QUICK_START.md](./ARTICLE_PUBLISHING_QUICK_START.md)

