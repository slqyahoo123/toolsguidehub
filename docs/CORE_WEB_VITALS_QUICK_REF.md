# Core Web Vitals快速参考

## 目标指标

- **LCP**: < 2.5秒 ✅
- **CLS**: < 0.1 ✅
- **INP**: < 200毫秒 ✅

## 优化措施

### LCP优化
- [x] 图片使用Next.js Image
- [x] LCP图片设置priority
- [x] 现代格式（AVIF, WebP）
- [x] 响应式尺寸
- [x] 系统字体栈

### CLS优化
- [x] 固定广告容器高度
- [x] 图片固定宽高比
- [x] 系统字体栈
- [x] 避免动态插入

### INP优化
- [x] 服务端组件优先
- [x] 最小化客户端JS
- [x] 静态渲染
- [x] 异步加载资源

## SEO影响最大的选择

1. **静态生成** ⭐⭐⭐⭐⭐
2. **图片优化** ⭐⭐⭐⭐⭐
3. **CLS优化** ⭐⭐⭐⭐
4. **最小化JS** ⭐⭐⭐⭐

## AdSense RPM最重要的指标

1. **LCP** ⭐⭐⭐⭐⭐
2. **CLS** ⭐⭐⭐⭐
3. **页面速度** ⭐⭐⭐⭐
4. **INP** ⭐⭐⭐

## 相关文档

- [CORE_WEB_VITALS_OPTIMIZATION.md](./CORE_WEB_VITALS_OPTIMIZATION.md) - 详细优化指南
- [PERFORMANCE_IMPACT_ANALYSIS.md](./PERFORMANCE_IMPACT_ANALYSIS.md) - 影响分析

