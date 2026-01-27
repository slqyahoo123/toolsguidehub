# 快速开始指南

## 5分钟快速搭建

### 1. 安装依赖

```bash
npm install
```

### 2. 配置网站信息

编辑 `build.js`，更新配置：

```javascript
const config = {
  siteName: 'Your Site Name',
  siteUrl: 'https://yoursite.com',
  // ...
};
```

### 3. 创建你的第一页

编辑 `src/content/index.md` 或创建新文件：

```markdown
---
title: Welcome to My Site
description: This is my awesome website
path: /
---

# Welcome

Your content here...
```

### 4. 构建网站

```bash
npm run build
```

### 5. 预览

```bash
npm run serve
```

打开浏览器访问显示的地址（通常是 `http://localhost:3000`）

## 项目结构说明

```
toolsguidehub/
├── src/
│   ├── content/          # 你的内容文件（.md格式）
│   │   ├── index.md      # 首页
│   │   └── guides/        # 指南目录
│   ├── templates/         # HTML模板
│   │   └── page.html     # 页面模板
│   └── assets/           # 静态资源
│       ├── images/       # 图片
│       └── favicon.ico   # 网站图标
├── dist/                 # 构建输出（自动生成）
├── build.js              # 构建工具
└── package.json          # 项目配置
```

## 常用命令

```bash
# 构建一次
npm run build

# 监听模式（自动重建）
npm run dev

# 本地预览
npm run serve
```

## 下一步

1. 阅读 [README.md](README.md) 了解完整功能
2. 查看 [CONFIG.md](CONFIG.md) 进行详细配置
3. 创建更多内容页面
4. 配置 AdSense（获得批准后）
5. 部署到静态托管服务

## 部署

### Netlify

1. 连接 GitHub 仓库
2. 构建命令：`npm run build`
3. 发布目录：`dist`
4. 自动部署完成

### Vercel

1. 导入项目
2. 构建命令：`npm run build`
3. 输出目录：`dist`
4. 部署

### GitHub Pages

1. 在仓库设置中启用 Pages
2. 选择 `dist` 目录作为源
3. 或使用 GitHub Actions 自动构建

## 需要帮助？

- 查看示例内容：`src/content/` 目录
- 查看模板：`src/templates/page.html`
- 阅读配置指南：`CONFIG.md`

