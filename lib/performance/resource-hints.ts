/**
 * 资源提示工具
 * 
 * 用于优化资源加载优先级
 * 提升LCP和整体性能
 */

import { siteConfig } from '@/config/site'

/**
 * 生成资源提示（Resource Hints）
 * 
 * 用于preconnect、dns-prefetch等
 */
export function generateResourceHints() {
  const hints: Array<{ rel: string; href: string; crossOrigin?: string }> = []

  // AdSense域名（获得批准后启用）
  // hints.push({
  //   rel: 'preconnect',
  //   href: 'https://pagead2.googlesyndication.com',
  //   crossOrigin: 'anonymous',
  // })

  // Google Fonts（如果使用）
  // hints.push({
  //   rel: 'preconnect',
  //   href: 'https://fonts.googleapis.com',
  // })
  // hints.push({
  //   rel: 'preconnect',
  //   href: 'https://fonts.gstatic.com',
  //   crossOrigin: 'anonymous',
  // })

  return hints
}

/**
 * 生成关键资源预加载
 */
export function generatePreloadLinks() {
  const preloads: Array<{ href: string; as: string; type?: string }> = []

  // 如果有关键资源，在这里添加
  // 例如：关键CSS、关键字体、关键图片

  return preloads
}

