# Tools Guide Hub

SEO-optimized content website built with Next.js App Router, designed for scalability and AdSense monetization.

## Features

- ✅ **Next.js 14** with App Router
- ✅ **Static Site Generation** (SSG) for optimal performance
- ✅ **Markdown-based content** management
- ✅ **SEO optimized** with automatic sitemap and metadata
- ✅ **Scalable structure** supporting 500+ articles
- ✅ **Category-based organization** (no tags)
- ✅ **Clean URLs** (`/[category]/[slug]`)
- ✅ **TypeScript** for type safety
- ✅ **Tailwind CSS** for styling

## Project Structure

```
toolsguidehub/
├── app/                    # Next.js App Router
├── content/                # Markdown content files
├── components/             # React components
├── lib/                    # Utility functions
├── config/                 # Configuration files
└── public/                 # Static assets
```

See [docs/PROJECT_STRUCTURE.md](./docs/PROJECT_STRUCTURE.md) for detailed structure documentation.

📚 **All documentation is in the [docs/](./docs/) directory.**

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Creating Content

#### Quick Start (Using Script)

```bash
npm run create-article
```

The script will guide you through creating a new article.

#### Manual Method

1. Create a new Markdown file in `content/articles/[category]/[slug].md`
2. Add front matter with metadata
3. Write your content in Markdown
4. The page will be automatically generated

**Example**:

```markdown
---
title: My Article Title
description: Article description (150-160 characters for SEO)
category: ai-tools-platforms
slug: my-article
date: 2024-01-26
author: Your Name
featured: false
---

# Article Content

Your content here...
```

**📚 For detailed publishing guide, see [docs/HOW_TO_PUBLISH_ARTICLES.md](./docs/HOW_TO_PUBLISH_ARTICLES.md)**

## Configuration

### Site Configuration

Edit `config/site.ts` to customize:
- Site name and URL
- Description and author
- Social media links

### Categories

Edit `config/categories.ts` to add or modify categories.

## SEO Features

- Automatic sitemap generation (`/sitemap.xml`)
- Robots.txt generation
- Open Graph and Twitter Card metadata
- JSON-LD structured data
- Canonical URLs

## Performance

- Static site generation for fast page loads
- Image optimization with Next.js Image
- Automatic code splitting
- CSS optimization

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Deploy automatically

### Other Platforms

The site can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Cloudflare Pages
- Self-hosted

## Documentation

- [Project Structure](./PROJECT_STRUCTURE.md) - Detailed folder structure
- [Implementation Guide](./IMPLEMENTATION_GUIDE.md) - Code examples
- [Architecture](./ARCHITECTURE.md) - Design decisions

## License

Proprietary - All rights reserved
