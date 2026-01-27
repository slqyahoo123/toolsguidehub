/**
 * URL slug工具函数
 * 遵循SEO最佳实践：
 * - 全部小写
 * - 使用连字符分隔
 * - 无特殊字符
 * - 人类可读
 */

/**
 * 将字符串转换为URL友好的slug
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()           // 转小写
    .trim()                  // 去除首尾空格
    .replace(/[^\w\s-]/g, '') // 移除特殊字符（保留字母、数字、空格、连字符）
    .replace(/[\s_-]+/g, '-') // 空格、下划线、多个连字符替换为单个连字符
    .replace(/^-+|-+$/g, '') // 移除开头和结尾的连字符
}

/**
 * 创建带长度限制的slug
 * 用于文章标题转slug时控制长度
 */
export function createSlug(title: string, maxLength: number = 50): string {
  const slug = slugify(title)
  if (slug.length <= maxLength) {
    return slug
  }
  
  // 截断到最大长度，但确保不在单词中间截断
  const truncated = slug.substring(0, maxLength)
  const lastHyphen = truncated.lastIndexOf('-')
  
  // 如果最后有连字符，在连字符处截断
  return lastHyphen > maxLength * 0.7 
    ? truncated.substring(0, lastHyphen)
    : truncated.replace(/-$/, '') // 移除末尾连字符
}

/**
 * 验证slug格式是否符合SEO最佳实践
 */
export function isValidSlug(slug: string): boolean {
  // 格式：小写字母、数字、连字符，不能以连字符开头或结尾
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)
}

/**
 * 验证完整URL路径格式
 * 格式：/category/slug/
 */
export function isValidURLPath(path: string): boolean {
  // 必须以/开头和结尾
  if (!path.startsWith('/') || !path.endsWith('/')) {
    return false
  }
  
  // 移除首尾斜杠，按/分割
  const parts = path.slice(1, -1).split('/')
  
  // 应该是2部分：category和slug
  if (parts.length !== 2) {
    return false
  }
  
  // 每部分都应该是有效的slug
  return parts.every(part => isValidSlug(part))
}

/**
 * 规范化URL路径
 * 确保格式一致：/category/slug/
 */
export function normalizeURLPath(category: string, slug: string): string {
  const normalizedCategory = slugify(category)
  const normalizedSlug = slugify(slug)
  
  return `/${normalizedCategory}/${normalizedSlug}/`
}

/**
 * 从URL路径提取分类和slug
 */
export function parseURLPath(path: string): { category: string; slug: string } | null {
  if (!isValidURLPath(path)) {
    return null
  }
  
  const parts = path.slice(1, -1).split('/')
  return {
    category: parts[0],
    slug: parts[1],
  }
}

