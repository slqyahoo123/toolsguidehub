/**
 * Sitemap生成工具
 */

import type { SitemapEntry } from '@/types/metadata'
import type { Article } from '@/types/content'
import { siteConfig } from '@/config/site'

/**
 * 从文章生成sitemap条目
 */
export function generateSitemapEntries(articles: Article[]): SitemapEntry[] {
  return articles.map((article) => ({
    url: `${siteConfig.url}/${article.category}/${article.slug}`,
    lastModified: new Date(article.updated || article.date),
    changeFrequency: 'weekly' as const,
    priority: article.featured ? 0.9 : 0.7,
  }))
}

