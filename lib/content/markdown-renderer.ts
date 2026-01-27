/**
 * 安全的Markdown到HTML渲染器
 * 
 * 功能：
 * - 将Markdown转换为HTML
 * - 清理和验证HTML输出
 * - 防止XSS攻击
 * - 移除内联样式和脚本
 * - 支持代码块、列表等Markdown特性
 */

import { remark } from 'remark'
import remarkHtml from 'remark-html'
import remarkGfm from 'remark-gfm' // GitHub Flavored Markdown支持
import { sanitizeAndValidateHTML } from './sanitizer'

/**
 * Markdown渲染选项
 */
interface RenderOptions {
  /**
   * 是否允许HTML标签（默认：false，只允许Markdown语法）
   */
  allowHTML?: boolean
  
  /**
   * 是否使用严格清理模式（默认：true）
   */
  strictSanitization?: boolean
  
  /**
   * 是否支持GitHub Flavored Markdown（默认：true）
   */
  supportGFM?: boolean
}

/**
 * 将Markdown转换为安全的HTML
 * 
 * @param markdown - Markdown源文本
 * @param options - 渲染选项
 * @returns 清理后的安全HTML字符串
 */
export async function renderMarkdownToHTML(
  markdown: string,
  options: RenderOptions = {}
): Promise<string> {
  const {
    allowHTML = false,
    strictSanitization = true,
    supportGFM = true,
  } = options

  // 创建remark处理器
  let processor: any = remark()

  // 添加GitHub Flavored Markdown支持（表格、任务列表等）
  if (supportGFM) {
    processor = processor.use(remarkGfm)
  }

  // 转换为HTML
  // 注意：remark-html默认会转义HTML，这是安全的
  processor = processor.use(remarkHtml, {
    sanitize: !allowHTML, // 如果不允许HTML，则转义所有HTML标签
  })

  // 处理Markdown
  const result = await processor.process(markdown)
  let html = result.toString()

  // 清理HTML（移除内联样式、脚本等）
  html = sanitizeAndValidateHTML(html, strictSanitization)

  return html
}

/**
 * 验证Markdown内容是否安全
 */
export function validateMarkdownContent(markdown: string): {
  safe: boolean
  warnings: string[]
} {
  const warnings: string[] = []

  // 检查是否包含脚本标签
  if (/<script/i.test(markdown)) {
    warnings.push('Markdown contains script tags')
  }

  // 检查是否包含内联样式
  if (/style\s*=/i.test(markdown)) {
    warnings.push('Markdown contains inline styles')
  }

  // 检查是否包含javascript:协议
  if (/javascript:/i.test(markdown)) {
    warnings.push('Markdown contains javascript: protocol')
  }

  // 检查是否包含事件处理器
  if (/on\w+\s*=/i.test(markdown)) {
    warnings.push('Markdown contains event handlers')
  }

  return {
    safe: warnings.length === 0,
    warnings,
  }
}

/**
 * 清理Markdown内容（移除危险内容）
 */
export function sanitizeMarkdown(markdown: string): string {
  let cleaned = markdown

  // 移除脚本标签
  cleaned = cleaned.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')

  // 移除样式标签
  cleaned = cleaned.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')

  // 移除内联样式
  cleaned = cleaned.replace(/\s*style\s*=\s*["'][^"']*["']/gi, '')
  cleaned = cleaned.replace(/\s*style\s*=\s*[^\s>]*/gi, '')

  // 移除事件处理器
  cleaned = cleaned.replace(/\s*on\w+\s*=\s*["'][^"']*["']/gi, '')
  cleaned = cleaned.replace(/\s*on\w+\s*=\s*[^\s>]*/gi, '')

  // 移除javascript:协议
  cleaned = cleaned.replace(/javascript:/gi, '')

  return cleaned
}

