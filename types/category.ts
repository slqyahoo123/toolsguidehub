/**
 * 分类相关类型定义
 */

export interface Category {
  slug: string
  name: string
  description: string
  order: number
  featured?: boolean
}

export interface CategoryWithCount extends Category {
  articleCount: number
}

