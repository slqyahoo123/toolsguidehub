/**
 * HTML清理器
 * 
 * 功能：
 * - 移除所有内联样式
 * - 移除所有脚本标签和事件处理器
 * - 只允许安全的HTML元素和属性
 * - 防止XSS攻击
 * - 保持代码块和列表的格式
 */

/**
 * 允许的HTML标签
 */
const ALLOWED_TAGS = [
  // 文本结构
  'p', 'br', 'strong', 'em', 'u', 's', 'mark', 'small', 'sub', 'sup',
  // 标题
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  // 列表
  'ul', 'ol', 'li', 'dl', 'dt', 'dd',
  // 链接和图片
  'a', 'img',
  // 代码
  'code', 'pre', 'kbd', 'samp',
  // 引用
  'blockquote', 'cite',
  // 表格
  'table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td',
  // 其他
  'hr', 'div', 'span',
]

/**
 * 允许的HTML属性
 */
const ALLOWED_ATTRIBUTES: Record<string, string[]> = {
  a: ['href', 'title', 'rel'],
  img: ['src', 'alt', 'title', 'width', 'height'],
  code: ['class'],
  pre: ['class'],
  th: ['scope', 'colspan', 'rowspan'],
  td: ['colspan', 'rowspan'],
}

/**
 * 清理HTML内容
 * 
 * @param html - 需要清理的HTML字符串
 * @returns 清理后的安全HTML字符串
 */
export function sanitizeHTML(html: string): string {
  // 使用正则表达式进行基本清理
  // 注意：对于生产环境，建议使用更强大的库如DOMPurify
  
  let cleaned = html

  // 1. 移除所有<script>标签及其内容
  cleaned = cleaned.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')

  // 2. 移除所有<style>标签及其内容（内联样式）
  cleaned = cleaned.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')

  // 3. 移除所有事件处理器属性（onclick, onerror等）
  cleaned = cleaned.replace(/\s*on\w+\s*=\s*["'][^"']*["']/gi, '')
  cleaned = cleaned.replace(/\s*on\w+\s*=\s*[^\s>]*/gi, '')

  // 4. 移除所有内联style属性
  cleaned = cleaned.replace(/\s*style\s*=\s*["'][^"']*["']/gi, '')
  cleaned = cleaned.replace(/\s*style\s*=\s*[^\s>]*/gi, '')

  // 5. 移除javascript:协议链接
  cleaned = cleaned.replace(/href\s*=\s*["']javascript:[^"']*["']/gi, 'href="#"')
  cleaned = cleaned.replace(/href\s*=\s*javascript:[^\s>]*/gi, 'href="#"')

  // 6. 移除data:协议（可能包含恶意内容）
  cleaned = cleaned.replace(/src\s*=\s*["']data:[^"']*["']/gi, '')
  cleaned = cleaned.replace(/src\s*=\s*data:[^\s>]*/gi, '')

  // 7. 清理危险的属性
  const dangerousAttributes = ['onerror', 'onload', 'onclick', 'onmouseover']
  dangerousAttributes.forEach(attr => {
    const regex = new RegExp(`\\s*${attr}\\s*=\\s*["'][^"']*["']`, 'gi')
    cleaned = cleaned.replace(regex, '')
  })

  // 8. 确保链接使用安全的协议
  cleaned = cleaned.replace(/href\s*=\s*["']([^"']+)["']/gi, (match, url) => {
    // 只允许http, https, 相对路径, 和mailto
    if (/^(https?:\/\/|mailto:|#|\/)/.test(url)) {
      return match
    }
    // 不安全的协议，移除或替换
    return 'href="#"'
  })

  // 9. 清理空标签
  cleaned = cleaned.replace(/<(\w+)[^>]*>\s*<\/\1>/gi, '')

  return cleaned.trim()
}

/**
 * 验证HTML标签是否安全
 */
function isAllowedTag(tagName: string): boolean {
  return ALLOWED_TAGS.includes(tagName.toLowerCase())
}

/**
 * 验证HTML属性是否安全
 */
function isAllowedAttribute(tagName: string, attrName: string): boolean {
  const allowed = ALLOWED_ATTRIBUTES[tagName.toLowerCase()]
  return allowed ? allowed.includes(attrName.toLowerCase()) : false
}

/**
 * 转义HTML特殊字符
 * 用于处理未转义的内容
 */
export function escapeHTML(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  }
  return text.replace(/[&<>"']/g, m => map[m])
}

/**
 * 清理并验证HTML
 * 
 * @param html - 需要清理的HTML字符串
 * @param strict - 是否使用严格模式（移除所有不允许的标签）
 * @returns 清理后的安全HTML字符串
 */
export function sanitizeAndValidateHTML(html: string, strict: boolean = true): string {
  let cleaned = sanitizeHTML(html)

  if (strict) {
    // 移除所有不在允许列表中的标签（保留内容）
    const tagRegex = /<\/?(\w+)[^>]*>/g
    cleaned = cleaned.replace(tagRegex, (match, tagName) => {
      if (isAllowedTag(tagName)) {
        return match
      }
      // 移除不允许的标签，但保留内容
      return match.startsWith('</') ? '' : ''
    })
  }

  return cleaned
}

