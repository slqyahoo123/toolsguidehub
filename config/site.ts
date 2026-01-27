/**
 * 网站基础配置
 */
export const siteConfig = {
  name: 'Tools Guide Hub',
  url: 'https://toolsguidehub.com',
  description: 'Comprehensive guides and tools for developers and professionals',
  author: 'Tools Guide Hub',
  language: 'en',
  locale: 'en-US',

  /**
   * 是否启用站内广告渲染
   *
   * - false：完全不渲染任何广告组件（推荐当前阶段）
   * - true：在预留位置渲染 AdSense 组件（需要你后续配置好 AdSense）
   */
  enableAds: false,
  
  // SEO配置
  defaultImage: '/images/og/default.jpg',
  twitterHandle: '@toolsguidehub',
  
  // 联系信息
  email: 'sulingqi@hotmail.com',
  
  // 社交媒体
  social: {
    twitter: 'https://twitter.com/toolsguidehub',
    github: 'https://github.com/toolsguidehub',
  },
} as const

export type SiteConfig = typeof siteConfig

