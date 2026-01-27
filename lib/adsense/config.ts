/**
 * AdSense配置
 * 
 * 注意：在获得AdSense批准之前，不要启用广告
 * 获得批准后，更新此配置文件
 */

export interface AdSenseConfig {
  /**
   * AdSense发布商ID
   * 格式: ca-pub-XXXXXXXXXX
   * 获得批准后填写
   */
  publisherId: string | null

  /**
   * 是否启用广告
   * 获得批准后设置为true
   */
  enabled: boolean

  /**
   * 广告位置配置
   */
  positions: {
    /**
     * 顶部广告（标题后，正文前）
     */
    top: {
      enabled: boolean
      adSlot?: string
      adFormat: 'auto' | 'rectangle' | 'horizontal'
    }

    /**
     * 文章内广告（正文中间）
     */
    inArticle: {
      enabled: boolean
      adSlot?: string
      adFormat: 'auto' | 'rectangle'
      minContentLength: number // 最小内容长度（字符数）
    }

    /**
     * 底部广告（正文后，相关文章前）
     */
    bottom: {
      enabled: boolean
      adSlot?: string
      adFormat: 'auto' | 'horizontal'
    }
  }
}

/**
 * 默认AdSense配置
 * 
 * 获得批准后：
 * 1. 设置 publisherId
 * 2. 设置 enabled = true
 * 3. 为每个位置设置 adSlot
 */
export const adSenseConfig: AdSenseConfig = {
  publisherId: null, // 获得批准后填写: 'ca-pub-XXXXXXXXXX'
  enabled: false, // 获得批准后设置为 true

  positions: {
    top: {
      enabled: false,
      adFormat: 'auto',
    },
    inArticle: {
      enabled: false,
      adFormat: 'auto',
      minContentLength: 1000, // 至少1000字才显示文章内广告
    },
    bottom: {
      enabled: false,
      adFormat: 'auto',
    },
  },
}

/**
 * 检查AdSense是否已配置
 */
export function isAdSenseConfigured(): boolean {
  return adSenseConfig.enabled && adSenseConfig.publisherId !== null
}

/**
 * 检查特定广告位置是否可用
 */
export function isAdPositionEnabled(position: keyof AdSenseConfig['positions']): boolean {
  if (!isAdSenseConfigured()) {
    return false
  }
  return adSenseConfig.positions[position].enabled
}

