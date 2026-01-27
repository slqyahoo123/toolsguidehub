/**
 * SEO元数据生成工具
 * 
 * 原则：
 * - 确定性：所有元数据基于frontmatter，不运行时生成
 * - 完整性：包含所有重要的SEO元数据
 * - 准确性：确保元数据准确反映内容
 */

import type { Metadata } from 'next'
import { siteConfig } from '@/config/site'
import type { PageMetadata } from '@/types/metadata'

/**
 * 生成页面标题
 * 格式: "Page Title | Site Name"
 */
function generateTitle(pageTitle: string, isHomePage: boolean = false): string {
  if (isHomePage) {
    return siteConfig.name
  }
  return `${pageTitle} | ${siteConfig.name}`
}

/**
 * 验证和清理描述
 * 确保描述长度在150-160字符之间（SEO最佳实践）
 */
function sanitizeDescription(description: string): string {
  // 移除HTML标签（如果有）
  const cleaned = description.replace(/<[^>]*>/g, '').trim()
  
  // 如果描述过长，截断到160字符，在单词边界截断
  if (cleaned.length > 160) {
    const truncated = cleaned.substring(0, 157)
    const lastSpace = truncated.lastIndexOf(' ')
    return lastSpace > 0 
      ? truncated.substring(0, lastSpace) + '...'
      : truncated + '...'
  }
  
  // 如果描述过短，至少确保有内容
  if (cleaned.length < 50) {
    return cleaned || siteConfig.description
  }
  
  return cleaned
}

/**
 * 生成完整的URL（包含协议和域名）
 */
function generateFullURL(path: string): string {
  // 确保路径以/开头
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${siteConfig.url}${normalizedPath}`
}

/**
 * 生成Open Graph图片URL
 */
function generateOGImage(image?: string): string {
  if (image) {
    // 如果已经是完整URL，直接返回
    if (image.startsWith('http://') || image.startsWith('https://')) {
      return image
    }
    // 如果是相对路径，添加域名
    const normalizedPath = image.startsWith('/') ? image : `/${image}`
    return `${siteConfig.url}${normalizedPath}`
  }
  // 使用默认图片
  return `${siteConfig.url}${siteConfig.defaultImage}`
}

/**
 * 生成页面元数据
 * 
 * 所有元数据基于frontmatter，确保确定性：
 * - title: 来自frontmatter.title
 * - description: 来自frontmatter.description
 * - image: 来自frontmatter.ogImage或image
 * - 其他字段: 来自frontmatter对应字段
 * 
 * @param metadata - 页面元数据（来自frontmatter）
 * @param isHomePage - 是否为首页
 * @returns Next.js Metadata对象
 */
export function generateMetadata(
  metadata: PageMetadata,
  isHomePage: boolean = false
): Metadata {
  // 基于frontmatter生成标题（确定性）
  const pageTitle = metadata.title || siteConfig.name
  const fullTitle = generateTitle(pageTitle, isHomePage)
  
  // 基于frontmatter生成描述（确定性）
  const description = sanitizeDescription(
    metadata.description || siteConfig.description
  )
  
  // 生成完整URL（确定性）
  const url = generateFullURL(metadata.path)
  
  // 生成Open Graph图片（基于frontmatter）
  const ogImage = generateOGImage(metadata.image)
  
  // 构建基础元数据
  const baseMetadata: Metadata = {
    title: {
      default: fullTitle,
      template: `%s | ${siteConfig.name}`, // Next.js模板
    },
    description,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: url, // 避免重复内容
    },
    openGraph: {
      type: metadata.type || 'website',
      locale: siteConfig.locale,
      url,
      siteName: siteConfig.name,
      title: pageTitle, // OG标题不包含site name
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description,
      images: [ogImage],
      creator: siteConfig.twitterHandle,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
  
  // 如果是文章类型，添加文章特定元数据
  if (metadata.type === 'article') {
    baseMetadata.openGraph = {
      ...baseMetadata.openGraph,
      type: 'article',
      publishedTime: metadata.publishedTime,
      modifiedTime: metadata.modifiedTime || metadata.publishedTime,
      authors: metadata.author ? [metadata.author] : [siteConfig.author],
      section: metadata.category,
      tags: metadata.category ? [metadata.category] : undefined,
    }
  }
  
  return baseMetadata
}

/**
 * 生成文章元数据（便捷函数）
 */
export function generateArticleMetadata(article: {
  title: string
  description: string
  category: string
  slug: string
  date: string
  updated?: string
  author?: string
  ogImage?: string
  image?: string
}): Metadata {
  return generateMetadata({
    title: article.title,
    description: article.description,
    path: `/${article.category}/${article.slug}`,
    image: article.ogImage || article.image,
    type: 'article',
    publishedTime: article.date,
    modifiedTime: article.updated,
    author: article.author,
    category: article.category,
  })
}

/**
 * 生成分类页面元数据（便捷函数）
 */
export function generateCategoryMetadata(category: {
  name: string
  description: string
  slug: string
}): Metadata {
  return generateMetadata({
    title: category.name,
    description: category.description,
    path: `/${category.slug}`,
    type: 'website',
  })
}

