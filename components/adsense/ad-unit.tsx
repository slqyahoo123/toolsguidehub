/**
 * AdSense广告单元组件
 * 
 * 这是实际的AdSense广告单元，在获得批准后使用
 * 
 * 使用前确保：
 * 1. 已获得AdSense批准
 * 2. 已在lib/adsense/config.ts中配置publisherId
 * 3. 已设置enabled = true
 */

'use client' // AdSense需要客户端组件

import { useEffect } from 'react'
import { isAdSenseConfigured, adSenseConfig } from '@/lib/adsense/config'

interface AdUnitProps {
  /**
   * 广告位置ID
   */
  adSlot: string

  /**
   * 广告格式
   */
  format?: 'auto' | 'rectangle' | 'horizontal'

  /**
   * 广告样式
   */
  style?: React.CSSProperties

  /**
   * 是否全宽响应式
   */
  fullWidthResponsive?: boolean
}

/**
 * AdSense广告单元
 * 
 * 注意：此组件只在AdSense已配置时渲染
 */
export default function AdUnit({
  adSlot,
  format = 'auto',
  style,
  fullWidthResponsive = true,
}: AdUnitProps) {
  useEffect(() => {
    // 只在AdSense已配置时加载脚本
    if (!isAdSenseConfigured()) {
      return
    }

    // 加载AdSense脚本（如果尚未加载）
    if (typeof window !== 'undefined' && !window.adsbygoogle) {
      const script = document.createElement('script')
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adSenseConfig.publisherId}`
      script.async = true
      script.crossOrigin = 'anonymous'
      document.head.appendChild(script)
    }

    // 初始化广告
    try {
      if (window.adsbygoogle) {
        window.adsbygoogle.push({})
      }
    } catch (error) {
      console.error('AdSense initialization error:', error)
    }
  }, [])

  // 如果AdSense未配置，不渲染
  if (!isAdSenseConfigured()) {
    return null
  }

  return (
    <ins
      className="adsbygoogle"
      style={{
        display: 'block',
        minHeight: format === 'rectangle' ? '250px' : format === 'horizontal' ? '90px' : '250px',
        ...style,
      }}
      data-ad-client={`ca-pub-${adSenseConfig.publisherId}`}
      data-ad-slot={adSlot}
      data-ad-format={format}
      data-full-width-responsive={fullWidthResponsive ? 'true' : 'false'}
    />
  )
}

// 扩展Window接口以支持adsbygoogle
declare global {
  interface Window {
    adsbygoogle: any[]
  }
}

