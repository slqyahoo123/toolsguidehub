# 分类更新说明

## ✅ 已添加的5个主分类

### 1. AI Tools & Platforms
- **Slug**: `ai-tools-platforms`
- **URL**: `/ai-tools-platforms`
- **描述**: Comprehensive guides, reviews, and tutorials for AI tools, platforms, and artificial intelligence solutions
- **文件夹**: `content/articles/ai-tools-platforms/`
- **示例文章**: `getting-started-with-ai-tools.md`

### 2. Software & SaaS Issues
- **Slug**: `software-saas-issues`
- **URL**: `/software-saas-issues`
- **描述**: Solutions and guides for common software and SaaS platform issues, errors, and troubleshooting
- **文件夹**: `content/articles/software-saas-issues/`
- **示例文章**: `common-saas-errors.md`

### 3. Accounts & Subscriptions
- **Slug**: `accounts-subscriptions`
- **URL**: `/accounts-subscriptions`
- **描述**: Helpful guides for managing accounts, subscriptions, billing, and account-related issues
- **文件夹**: `content/articles/accounts-subscriptions/`

### 4. How Things Work
- **Slug**: `how-things-work`
- **URL**: `/how-things-work`
- **描述**: Explanatory guides and tutorials explaining how various technologies, tools, and systems work
- **文件夹**: `content/articles/how-things-work/`

### 5. Troubleshooting Guides
- **Slug**: `troubleshooting-guides`
- **URL**: `/troubleshooting-guides`
- **描述**: Step-by-step troubleshooting guides for resolving common problems and technical issues
- **文件夹**: `content/articles/troubleshooting-guides/`

## 📁 文件夹结构

```
content/articles/
├── ai-tools-platforms/
│   ├── .gitkeep
│   └── getting-started-with-ai-tools.md
├── software-saas-issues/
│   ├── .gitkeep
│   └── common-saas-errors.md
├── accounts-subscriptions/
│   └── .gitkeep
├── how-things-work/
│   └── .gitkeep
└── troubleshooting-guides/
    └── .gitkeep
```

## 🔄 自动更新

以下内容会自动更新（基于 `config/categories.ts`）：

- ✅ 主导航菜单（`components/layout/header.tsx`）
- ✅ 页脚导航（`components/layout/footer.tsx`）
- ✅ 分类页面路由（`app/[category]/page.tsx`）
- ✅ 文章路由（`app/[category]/[slug]/page.tsx`）
- ✅ 站点地图（`app/sitemap.ts`）

## 📝 添加新文章

在每个分类文件夹中创建Markdown文件，格式如下：

```markdown
---
title: Your Article Title
description: Article description for SEO
category: ai-tools-platforms  # 使用对应的分类slug
slug: your-article-slug
date: 2024-01-15
author: Author Name
featured: true  # 可选
---

# Your Article Title

Article content here...
```

## 🎯 SEO友好的URL结构

所有分类文章将自动生成SEO友好的URL：

- `domain.com/ai-tools-platforms/article-slug/`
- `domain.com/software-saas-issues/article-slug/`
- `domain.com/accounts-subscriptions/article-slug/`
- `domain.com/how-things-work/article-slug/`
- `domain.com/troubleshooting-guides/article-slug/`

## ✅ 验证

运行以下命令验证配置：

```bash
npm run build
```

这将：
1. 验证所有分类配置
2. 生成所有分类页面
3. 生成所有文章页面
4. 生成站点地图

## 📌 注意事项

1. **分类slug必须唯一**: 每个分类的slug必须不同
2. **文件夹名称匹配**: 文件夹名称必须与分类slug匹配
3. **URL友好**: slug使用小写字母和连字符
4. **描述清晰**: 分类描述用于SEO和导航

