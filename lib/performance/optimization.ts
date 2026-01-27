/**
 * 性能优化工具
 * 
 * 提供各种性能优化函数和配置
 */

/**
 * 生成性能优化的meta标签
 */
export function generatePerformanceMeta() {
  return {
    // 禁用自动播放媒体（提升性能）
    'format-detection': 'telephone=no',
    // 优化移动端渲染
    'viewport': 'width=device-width, initial-scale=1.0, maximum-scale=5.0',
  }
}

/**
 * 检查是否应该延迟加载资源
 */
export function shouldLazyLoad(element: string): boolean {
  // 非关键资源延迟加载
  const lazyLoadElements = [
    'advertisement',
    'related-articles',
    'footer',
  ]
  
  return lazyLoadElements.includes(element)
}

/**
 * 生成关键资源列表
 */
export function getCriticalResources(): string[] {
  return [
    // 关键CSS（已内联）
    // 关键图片（LCP元素）
    // 关键字体（系统字体栈，无需加载）
  ]
}

