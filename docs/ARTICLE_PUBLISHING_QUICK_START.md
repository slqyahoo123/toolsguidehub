# 文章发布快速指南

## 🚀 3步发布文章

### 方法1：使用脚本（推荐）

```bash
npm run create-article
```

脚本会引导你：
1. 选择分类
2. 输入标题、描述等信息
3. 自动创建Markdown文件

### 方法2：手动创建

#### 步骤1：创建文件

在分类文件夹中创建新文件：
```
content/articles/[category]/your-article-slug.md
```

#### 步骤2：复制模板

```markdown
---
title: Your Article Title
description: Article description (150-160 characters)
category: ai-tools-platforms
slug: your-article-slug
date: 2024-01-26
author: Your Name
featured: false
---

# Your Article Title

Your content here...
```

#### 步骤3：填写信息

- `title`: 文章标题
- `description`: 文章描述（150-160字符）
- `category`: 分类slug（见下方）
- `slug`: URL友好的slug（小写，连字符）
- `date`: 发布日期（YYYY-MM-DD）
- `author`: 作者（可选）
- `featured`: 是否特色（true/false）

## 📂 可用分类

| 分类 | Slug |
|------|------|
| AI Tools & Platforms | `ai-tools-platforms` |
| Software & SaaS Issues | `software-saas-issues` |
| Accounts & Subscriptions | `accounts-subscriptions` |
| How Things Work | `how-things-work` |
| Troubleshooting Guides | `troubleshooting-guides` |

## ✅ 检查清单

发布前确认：
- [ ] Front Matter格式正确
- [ ] category匹配现有分类
- [ ] slug使用小写和连字符
- [ ] description长度150-160字符
- [ ] 文件保存在正确的分类文件夹

## 🧪 测试

```bash
npm run dev
```

访问：`http://localhost:3000/[category]/[slug]`

## 📚 详细指南

查看 [HOW_TO_PUBLISH_ARTICLES.md](./HOW_TO_PUBLISH_ARTICLES.md) 获取完整指南。

