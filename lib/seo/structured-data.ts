/**
 * 结构化数据生成（JSON-LD）
 */

import type { Article } from '@/types/content'
import { siteConfig } from '@/config/site'

/**
 * 生成文章的结构化数据
 */
export function generateArticleStructuredData(article: Article) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: article.ogImage || article.image,
    datePublished: article.date,
    dateModified: article.updated || article.date,
    author: {
      '@type': 'Person',
      name: article.author || siteConfig.author,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/images/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteConfig.url}/${article.category}/${article.slug}`,
    },
  }
}

/**
 * 生成网站的结构化数据
 */
export function generateWebsiteStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
    },
  }
}

