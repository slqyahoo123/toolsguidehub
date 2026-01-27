/**
 * URL工具函数
 * 用于生成和验证SEO友好的URL
 */

import { slugify } from './slug'
import { siteConfig } from '@/config/site'

/**
 * 规范化URL路径
 */
function normalizeURLPath(category: string, slug: string): string {
  const normalizedCategory = slugify(category)
  const normalizedSlug = slugify(slug)
  return `/${normalizedCategory}/${normalizedSlug}/`
}

/**
 * 生成完整的文章URL
 */
export function generateArticleURL(category: string, slug: string): string {
  const normalized = normalizeURLPath(category, slug)
  return `${siteConfig.url}${normalized}`
}

/**
 * 导出normalizeURLPath供其他模块使用
 */
export { normalizeURLPath }

/**
 * 生成分类URL
 */
export function generateCategoryURL(category: string): string {
  const normalizedCategory = slugify(category)
  return `${siteConfig.url}/${normalizedCategory}/`
}

/**
 * 验证URL是否符合SEO策略
 */
export function validateSEOURL(url: string): {
  valid: boolean
  errors: string[]
} {
  const errors: string[] = []
  
  // 检查是否包含查询参数
  if (url.includes('?')) {
    errors.push('URL不应包含查询参数')
  }
  
  // 检查是否包含日期格式（YYYY/MM/DD）
  const datePattern = /\/(\d{4})\/(\d{2})\/(\d{2})\//
  if (datePattern.test(url)) {
    errors.push('URL不应包含日期')
  }
  
  // 检查是否包含特殊字符
  if (/[^a-z0-9\/-]/.test(url.toLowerCase())) {
    errors.push('URL包含不允许的特殊字符')
  }
  
  // 检查是否全部小写
  if (url !== url.toLowerCase()) {
    errors.push('URL应全部小写')
  }
  
  // 检查是否有尾部斜杠
  if (!url.endsWith('/') && !url.endsWith('.html')) {
    errors.push('URL应以斜杠结尾')
  }
  
  return {
    valid: errors.length === 0,
    errors,
  }
}

/**
 * 从文章标题生成建议的slug
 */
export function generateSlugFromTitle(title: string): string {
  // 移除常见的停用词（可选，根据需求）
  const stopWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by']
  
  const words = title
    .toLowerCase()
    .split(/\s+/)
    .filter(word => word.length > 0)
    // 可选：过滤停用词（如果标题很长）
    // .filter(word => !stopWords.includes(word))
  
  return words.join('-')
}

/**
 * 清理和规范化URL
 */
export function cleanURL(url: string): string {
  return url
    .toLowerCase()
    .trim()
    .replace(/\/+/g, '/') // 多个斜杠合并为一个
    .replace(/\/$/, '/') // 确保尾部有斜杠
}

