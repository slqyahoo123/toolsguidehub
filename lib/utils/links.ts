/**
 * 内部链接处理工具
 */

/**
 * 从Markdown内容中提取内部链接
 */
export function extractInternalLinks(content: string): string[] {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
  const links: string[] = []
  let match

  while ((match = linkRegex.exec(content)) !== null) {
    const href = match[2]
    // 检查是否是内部链接（不以http://或https://开头）
    if (!href.startsWith('http://') && !href.startsWith('https://')) {
      links.push(href)
    }
  }

  return links
}

/**
 * 验证内部链接是否有效
 */
export function isValidInternalLink(link: string): boolean {
  // 简单的验证：检查是否是相对路径
  return link.startsWith('/') || !link.includes('://')
}

