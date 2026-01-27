/** @type {import('next').NextConfig} */
const nextConfig = {
  // 启用静态导出（可选，根据需要）
  // output: 'export',
  
  // 图片优化配置（LCP优化）
  images: {
    formats: ['image/avif', 'image/webp'], // 现代格式优先
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60, // 缓存60秒
    dangerouslyAllowSVG: false, // 安全：不允许SVG
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  // 压缩配置
  compress: true,
  
  // 生产环境优化
  swcMinify: true, // 使用SWC压缩（比Terser快）
  
  // 性能优化
  poweredByHeader: false, // 移除X-Powered-By头
  reactStrictMode: true, // React严格模式
  
  // 编译器优化
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'], // 保留错误和警告
    } : false,
  },
  
  // 实验性功能（性能优化）
  experimental: {
    optimizePackageImports: ['next/image', 'next/link'], // 优化包导入
  },
  
  // URL重定向（确保URL一致性）
  async redirects() {
    return []
  },
}

module.exports = nextConfig

