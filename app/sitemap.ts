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

  // 文章页面
  const articlePages = generateSitemapEntries(articles)

  return [homePage, ...categoryPages, ...articlePages]
}

