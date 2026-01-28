/**
 * 分类配置
 * 添加新分类时，需要：
 * 1. 在此添加配置
 * 2. 在 content/articles/ 下创建对应文件夹
 * 3. 路由会自动支持
 */
export interface Category {
  slug: string
  name: string
  description: string
  order: number
  featured?: boolean
}

export const categories: Category[] = [
  {
    slug: 'tools',
    name: 'Interactive Tools',
    description: 'Free online tools and calculators for AI, SaaS, and productivity - no signup required',
    order: 0,
    featured: true,
  },
  {
    slug: 'ai-tools-platforms',
    name: 'AI Tools & Platforms',
    description: 'Comprehensive guides, reviews, and tutorials for AI tools, platforms, and artificial intelligence solutions',
    order: 1,
    featured: true,
  },
  {
    slug: 'software-saas-issues',
    name: 'Software & SaaS Issues',
    description: 'Solutions and guides for common software and SaaS platform issues, errors, and troubleshooting',
    order: 2,
    featured: true,
  },
  {
    slug: 'accounts-subscriptions',
    name: 'Accounts & Subscriptions',
    description: 'Helpful guides for managing accounts, subscriptions, billing, and account-related issues',
    order: 3,
    featured: true,
  },
  {
    slug: 'how-things-work',
    name: 'How Things Work',
    description: 'Explanatory guides and tutorials explaining how various technologies, tools, and systems work',
    order: 4,
    featured: true,
  },
  {
    slug: 'troubleshooting-guides',
    name: 'Troubleshooting Guides',
    description: 'Step-by-step troubleshooting guides for resolving common problems and technical issues',
    order: 5,
    featured: true,
  },
] as const

/**
 * 根据slug获取分类
 */
export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find(cat => cat.slug === slug)
}

/**
 * 获取所有分类（按order排序）
 */
export function getAllCategories(): Category[] {
  return [...categories].sort((a, b) => a.order - b.order)
}

/**
 * 获取特色分类
 */
export function getFeaturedCategories(): Category[] {
  return categories.filter(cat => cat.featured)
}

