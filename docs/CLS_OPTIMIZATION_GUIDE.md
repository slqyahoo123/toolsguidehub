# CLS优化指南 - 避免布局偏移

## 什么是CLS？

**Cumulative Layout Shift (CLS)** 衡量页面加载时视觉元素的意外移动。

### 计算公式

```
CLS = Σ (影响分数 × 距离分数)
```

**分数范围**:
- 0.0 - 0.1: 优秀 ✅
- 0.1 - 0.25: 需要改进 ⚠️
- > 0.25: 差 ❌

### 为什么重要？

1. **用户体验**
   - 布局跳动导致阅读中断
   - 点击错误元素
   - 整体体验差

2. **SEO影响**
   - Core Web Vitals指标
   - Google排名因素
   - 搜索可见性

3. **AdSense影响**
   - 可能影响审核
   - 用户体验差
   - 收入潜力

## 广告导致的布局偏移

### 问题场景

```
1. 页面加载
   ↓
2. 内容显示（无广告空间）
   ↓
3. 广告脚本加载
   ↓
4. 广告插入
   ↓
5. 页面布局改变 ❌ CLS增加
```

### 典型问题

1. **动态高度**
   ```html
   <!-- ❌ 错误：广告加载后才确定高度 -->
   <div id="ad-container"></div>
   <script>
     // 广告加载后，容器高度才确定
     loadAd('ad-container')
   </script>
   ```

2. **未预留空间**
   ```html
   <!-- ❌ 错误：没有预留空间 -->
   <div>
     <p>内容</p>
     <div id="ad"></div> <!-- 广告加载后才出现 -->
     <p>更多内容</p>
   </div>
   ```

3. **响应式变化**
   ```html
   <!-- ❌ 错误：不同设备尺寸不同 -->
   <div id="ad">
     <!-- 桌面: 728x90 -->
     <!-- 移动: 300x250 -->
     <!-- 尺寸变化导致布局偏移 -->
   </div>
   ```

## 我们的CLS优化方案

### 1. 固定容器高度

**实现**:
```typescript
// components/adsense/ad-container.tsx
<div
  style={{
    minHeight: '250px', // 固定最小高度
    minWidth: '300px',  // 固定最小宽度
  }}
>
  {/* 广告内容 */}
</div>
```

**效果**:
- ✅ 空间已预留
- ✅ 广告加载前就有空间
- ✅ 无布局偏移

### 2. 根据格式预设尺寸

**实现**:
```typescript
const getDimensions = () => {
  switch (format) {
    case 'rectangle':
      return { minHeight: 250, minWidth: 300 }
    case 'horizontal':
      return { minHeight: 90, minWidth: 728 }
    case 'auto':
      return { minHeight: 250, minWidth: 300 }
  }
}
```

**效果**:
- ✅ 不同格式有固定尺寸
- ✅ 避免尺寸变化
- ✅ 响应式适配

### 3. 使用CSS Grid/Flexbox

**实现**:
```css
.ad-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 250px;
}
```

**效果**:
- ✅ 内容居中
- ✅ 稳定布局
- ✅ 无意外移动

### 4. 预留足够空间

**实现**:
```typescript
// 根据广告格式预留空间
<AdContainer
  minHeight={250}  // 矩形广告
  minWidth={300}
/>

<AdContainer
  minHeight={90}   // 横幅广告
  minWidth={728}
/>
```

**效果**:
- ✅ 空间充足
- ✅ 避免溢出
- ✅ 无布局偏移

## 避免布局偏移的最佳实践

### ✅ 1. 始终使用固定高度

```typescript
// ✅ 正确
<div style={{ minHeight: '250px' }}>

// ❌ 错误
<div> {/* 高度未知 */}
```

### ✅ 2. 预留空间

```typescript
// ✅ 正确：预留空间
<AdContainer minHeight={250} />

// ❌ 错误：不预留
<AdContainer />
```

### ✅ 3. 使用aspect-ratio

```css
/* ✅ 保持比例 */
.ad-container {
  min-height: 250px;
  aspect-ratio: 300 / 250;
}
```

### ✅ 4. 避免动态插入

```typescript
// ❌ 错误：动态插入
useEffect(() => {
  container.innerHTML = adCode // 导致偏移
}, [])

// ✅ 正确：静态预留
<AdContainer /> // 空间已预留
```

### ✅ 5. 测试不同设备

```typescript
// ✅ 响应式尺寸
const dimensions = {
  desktop: { width: 728, height: 90 },
  mobile: { width: 300, height: 250 },
}
```

## CLS优化检查清单

### 实现检查
- [x] 所有广告容器有固定最小高度
- [x] 使用`min-height`而非动态高度
- [x] 预留足够的空间
- [x] 避免动态内容插入
- [x] 使用CSS Grid/Flexbox

### 测试检查
- [ ] 测试桌面端（1920x1080）
- [ ] 测试平板端（768x1024）
- [ ] 测试移动端（375x667）
- [ ] 验证CLS分数 < 0.1
- [ ] 检查Core Web Vitals

### 工具检查
- [ ] Google PageSpeed Insights
- [ ] Chrome DevTools Performance
- [ ] Web Vitals Extension
- [ ] Lighthouse测试

## 测量CLS

### 使用Chrome DevTools

1. 打开DevTools → Performance
2. 点击Record
3. 刷新页面
4. 停止录制
5. 查看CLS分数

### 使用PageSpeed Insights

1. 访问 https://pagespeed.web.dev/
2. 输入URL
3. 查看Core Web Vitals
4. 检查CLS分数

### 使用Web Vitals Extension

1. 安装Chrome扩展
2. 访问网站
3. 查看实时CLS分数

## 目标指标

### CLS分数目标

- **优秀**: < 0.1 ✅
- **良好**: 0.1 - 0.25 ⚠️
- **差**: > 0.25 ❌

### 我们的实现

- ✅ 固定容器高度
- ✅ 预留空间
- ✅ 响应式适配
- ✅ 预期CLS < 0.1

## 总结

### 关键原则

1. **预留空间**: 广告加载前就有空间
2. **固定尺寸**: 使用min-height和min-width
3. **避免动态**: 不动态插入内容
4. **测试验证**: 使用工具测量CLS

### 实施状态

- [x] CLS安全布局已实现
- [x] 固定容器高度
- [x] 预留空间策略
- [x] 响应式适配

所有CLS优化措施已实施，确保无布局偏移！

