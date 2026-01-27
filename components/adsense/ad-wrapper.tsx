/**
 * AdSense广告包装组件
 *
 * 提供CLS安全的广告容器，确保无布局偏移
 * 
 * 注意：是否实际渲染广告由全局配置 `siteConfig.enableAds` 控制，
 * 当前默认为 false，用于内容建设和审核阶段。
 */

import AdContainer from './ad-container'
import { siteConfig } from '@/config/site'

interface AdWrapperProps {
  /**
   * 广告位置类型
   */
  position: 'top' | 'inArticle' | 'bottom'

  /**
   * 内容长度（用于判断是否显示文章内广告）
   */
  contentLength?: number
}

/**
 * 广告包装组件
 * 
 * 根据位置和配置决定是否显示广告
 */
export default function AdWrapper({ position, contentLength = 0 }: AdWrapperProps) {
  // 如果全局关闭广告，直接不渲染任何内容
  if (!siteConfig.enableAds) {
    return null
  }

  // 根据位置获取配置
  const getConfig = () => {
    switch (position) {
      case 'top':
        return {
          id: 'ad-top',
          label: 'Top Advertisement',
          format: 'auto' as const,
          minHeight: 250,
          maxWidth: 728,
        }
      case 'inArticle':
        // 文章内广告需要足够的内容长度
        if (contentLength < 1000) {
          return null // 内容不够长，不显示
        }
        return {
          id: 'ad-in-article',
          label: 'In-Article Advertisement',
          format: 'rectangle' as const,
          minHeight: 250,
          maxWidth: 300,
        }
      case 'bottom':
        return {
          id: 'ad-bottom',
          label: 'Bottom Advertisement',
          format: 'auto' as const,
          minHeight: 250,
          maxWidth: 728,
        }
      default:
        return null
    }
  }

  const config = getConfig()

  if (!config) {
    return null
  }

  return (
    <AdContainer
      id={config.id}
      label={config.label}
      format={config.format}
      minHeight={config.minHeight}
      maxWidth={config.maxWidth}
    />
  )
}

