/**
 * Markdown解析器
 * 处理Markdown到HTML的转换
 * 
 * 安全特性：
 * - 自动清理HTML输出
 * - 移除内联样式和脚本
 * - 防止XSS攻击
 * - 支持代码块和列表
 */

import matter from 'gray-matter'
import { renderMarkdownToHTML, sanitizeMarkdown } from './markdown-renderer'
import type { ArticleFrontMatter } from '@/types/content'

/**
 * 解析Markdown文件内容
 * 
 * @param fileContent - Markdown文件内容（包含Front Matter）
 * @returns 解析后的Front Matter和安全的HTML内容
 */
export async function parseMarkdown(
  fileContent: string
): Promise<{ frontMatter: ArticleFrontMatter; contentHtml: string }> {
  // 解析Front Matter
  const { data, content } = matter(fileContent)

  // 清理Markdown内容（移除危险内容）
  const sanitizedContent = sanitizeMarkdown(content)

  // 将Markdown转换为HTML并清理
  const contentHtml = await renderMarkdownToHTML(sanitizedContent, {
    allowHTML: false, // 不允许原始HTML标签
    strictSanitization: true, // 严格清理模式
    supportGFM: true, // 支持GitHub Flavored Markdown
  })

  return {
    frontMatter: data as ArticleFrontMatter,
    contentHtml,
  }
}

/**
 * 提取Front Matter
 */
export function extractFrontMatter(fileContent: string): ArticleFrontMatter {
  const { data } = matter(fileContent)
  return data as ArticleFrontMatter
}

