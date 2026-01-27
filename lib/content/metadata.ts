/**
 * 内容元数据处理
 */

import type { Article } from '@/types/content'

/**
 * 提取文章元数据用于SEO
 */
export function extractArticleMetadata(article: Article) {
  return {
    title: article.title,
    description: article.description,
    date: article.date,
    updated: article.updated,
    author: article.author,
    category: article.category,
    image: article.ogImage || article.image,
  }
}

