/**
 * 内容相关类型定义
 */

/**
 * 文章Front Matter元数据
 */
export interface ArticleFrontMatter {
  title: string
  description: string
  category: string
  slug: string
  date: string
  updated?: string
  author?: string
  image?: string
  ogImage?: string
  featured?: boolean
  related?: string[]
}

/**
 * 完整文章数据（包含解析后的内容）
 */
export interface Article extends ArticleFrontMatter {
  content: string
  contentHtml: string
}

/**
 * 页面Front Matter
 */
export interface PageFrontMatter {
  title: string
  description: string
  slug: string
}

/**
 * 完整页面数据
 */
export interface Page extends PageFrontMatter {
  content: string
  contentHtml: string
}

