import { MetadataRoute } from 'next'
import { getAllArticles } from '@/lib/content/loader'
import { getAllCategories } from '@/config/categories'
import { siteConfig } from '@/config/site'
import { generateSitemapEntries } from '@/lib/seo/sitemap'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getAllArticles()
  const categories = getAllCategories()
  const baseUrl = siteConfig.url

  // 首页
  const homePage = {
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 1.0,
  }

  // 分类页面
  const categoryPages = categories.map((category) => ({
    url: `${baseUrl}/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Static marketing and legal pages
  const staticPages = [
    { path: '/about', priority: 0.7 },
    { path: '/contact', priority: 0.6 },
    { path: '/privacy', priority: 0.3 },
    { path: '/terms', priority: 0.3 },
    { path: '/cookie-policy', priority: 0.3 },
  ].map((page) => ({
    url: `${baseUrl}${page.path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: page.priority,
  }))

  // Tools pages
  const toolPages = [
    '/tools',
    '/tools/ai-token-cost-calculator',
    '/tools/ai-text-humanizer',
    '/tools/prompt-generator',
    '/tools/youtube-script-generator',
    '/tools/meta-tag-generator',
    '/tools/saas-roi-calculator',
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  // Article pages
  const articlePages = generateSitemapEntries(articles)

  return [homePage, ...staticPages, ...toolPages, ...categoryPages, ...articlePages]
}

