/**
 * AdSense广告容器组件
 * 
 * 特性：
 * - CLS安全：固定高度，避免布局偏移
 * - 响应式：自适应不同屏幕尺寸
 * - 可访问性：清晰的广告标识
 * - 政策合规：符合AdSense布局要求
 * 
 * 注意：在获得AdSense批准之前，此组件只显示占位符
 */

import { isAdSenseConfigured } from '@/lib/adsense/config'

interface AdContainerProps {
  /**
   * 广告位置ID（用于AdSense代码）
   */
  id: string

  /**
   * 广告位置名称（用于可访问性）
   */
  label: string

  /**
   * 广告格式
   */
  format?: 'auto' | 'rectangle' | 'horizontal'

  /**
   * 最小高度（像素）
   * 用于CLS优化，预留空间避免布局偏移
   */
  minHeight?: number

  /**
   * 最大宽度（像素）
   * 用于响应式设计
   */
  maxWidth?: number

  /**
   * 是否显示占位符（开发/测试用）
   */
  showPlaceholder?: boolean
}

/**
 * AdSense广告容器
 * 
 * CLS优化策略：
 * 1. 固定最小高度，预留广告空间
 * 2. 使用aspect-ratio保持比例
 * 3. 避免动态内容导致布局偏移
 */
export default function AdContainer({
  id,
  label,
  format = 'auto',
  minHeight = 250,
  maxWidth,
  showPlaceholder = !isAdSenseConfigured(),
}: AdContainerProps) {
  // 根据格式确定尺寸
  const getDimensions = () => {
    switch (format) {
      case 'rectangle':
        return {
          minHeight: 250,
          minWidth: 300,
          aspectRatio: '300 / 250',
        }
      case 'horizontal':
        return {
          minHeight: 90,
          minWidth: 728,
          aspectRatio: '728 / 90',
        }
      case 'auto':
      default:
        return {
          minHeight,
          minWidth: 300,
          aspectRatio: 'auto',
        }
    }
  }

  const dimensions = getDimensions()

  // 如果AdSense未配置，显示占位符
  if (showPlaceholder || !isAdSenseConfigured()) {
    return (
      <aside
        id={id}
        className="my-8 text-center"
        aria-label={label}
        role="complementary"
      >
        <div
          className="flex items-center justify-center bg-gray-50 border border-gray-200 rounded-lg text-gray-400 text-sm"
          style={{
            minHeight: `${dimensions.minHeight}px`,
            minWidth: dimensions.minWidth ? `${dimensions.minWidth}px` : '100%',
            maxWidth: maxWidth ? `${maxWidth}px` : '100%',
            margin: '0 auto',
          }}
        >
          <div>
            <p className="mb-2">Advertisement</p>
            <p className="text-xs">
              {label} ({format})
            </p>
            <p className="text-xs mt-1">
              AdSense code will be inserted here after approval
            </p>
          </div>
        </div>
      </aside>
    )
  }

  // AdSense已配置，渲染实际广告容器
  return (
    <aside
      id={id}
      className="my-8 text-center"
      aria-label={label}
      role="complementary"
    >
      <div
        className="ad-container"
        style={{
          minHeight: `${dimensions.minHeight}px`,
          minWidth: dimensions.minWidth ? `${dimensions.minWidth}px` : '100%',
          maxWidth: maxWidth ? `${maxWidth}px` : '100%',
          margin: '0 auto',
          // CLS优化：预留空间，避免布局偏移
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* AdSense广告代码将在这里插入 */}
        {/* 
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client={`ca-pub-${adSenseConfig.publisherId}`}
          data-ad-slot={adSlot}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
        <script>
          (adsbygoogle = window.adsbygoogle || []).push({});
        </script>
        */}
      </div>
    </aside>
  )
}

