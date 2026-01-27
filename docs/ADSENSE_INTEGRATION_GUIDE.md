# AdSense集成准备指南

## 概述

本文档说明如何为Google AdSense集成做准备，包括：
- 广告安全容器位置
- CLS安全布局
- AdSense政策合规
- 实施步骤

## 当前状态

✅ **已准备**：
- 广告容器位置已标识
- CLS安全布局已实现
- 组件结构已创建
- 配置系统已就绪

❌ **未实施**：
- AdSense脚本未注入
- 广告代码未添加
- 等待AdSense批准

## 广告位置

### 内容网站典型广告位置

#### 1. 顶部广告（Above Content）

**位置**: 标题和介绍之后，正文内容之前

**布局**:
```
[Header]
  H1标题
  介绍摘要
  元数据
[AD ZONE 1: Top Ad] ← 这里
[Main Content]
  正文内容
```

**要求**:
- ✅ 内容至少500字
- ✅ 不遮挡标题和介绍
- ✅ 清晰的广告标识
- ✅ 响应式设计

**CLS优化**:
- 固定最小高度：250px
- 预留空间，避免布局偏移
- 使用`min-height`而非动态高度

#### 2. 文章内广告（In-Article）

**位置**: 正文内容中间

**布局**:
```
[Main Content]
  前300+字内容
[AD ZONE 2: In-Article Ad] ← 这里
  后续内容
```

**要求**:
- ✅ 内容至少1000字（推荐）
- ✅ 前后各至少300字
- ✅ 位置自然，不打断阅读流
- ✅ 矩形广告格式（300x250）

**CLS优化**:
- 固定高度：250px
- 固定宽度：300px（桌面）
- 居中显示
- 预留空间

#### 3. 底部广告（Below Content）

**位置**: 正文内容之后，相关文章之前

**布局**:
```
[Main Content]
  正文内容结束
[AD ZONE 3: Bottom Ad] ← 这里
[Navigation]
  相关文章
```

**要求**:
- ✅ 内容完整
- ✅ 不遮挡内容
- ✅ 在主要内容之后
- ✅ 响应式设计

**CLS优化**:
- 固定最小高度：250px
- 响应式宽度
- 预留空间

## CLS安全布局

### 什么是CLS？

**Cumulative Layout Shift (CLS)** 衡量页面加载时元素的意外移动。

**问题**:
```
页面加载 → 广告加载 → 页面布局改变 → CLS分数下降
```

**影响**:
- ❌ 用户体验差
- ❌ Core Web Vitals分数低
- ❌ SEO排名受影响
- ❌ AdSense可能受影响

### CLS优化策略

#### 1. 固定容器高度

**实现**:
```typescript
// 使用固定最小高度
<div style={{ minHeight: '250px' }}>
  {/* 广告内容 */}
</div>
```

**效果**:
- ✅ 预留空间
- ✅ 避免布局偏移
- ✅ CLS分数保持低

#### 2. 使用aspect-ratio

**实现**:
```css
.ad-container {
  min-height: 250px;
  aspect-ratio: 300 / 250; /* 矩形广告 */
}
```

**效果**:
- ✅ 保持比例
- ✅ 响应式适配
- ✅ 避免尺寸变化

#### 3. 预留空间策略

**实现**:
```typescript
// 根据广告格式预留空间
const dimensions = {
  rectangle: { minHeight: 250, minWidth: 300 },
  horizontal: { minHeight: 90, minWidth: 728 },
  auto: { minHeight: 250 },
}
```

**效果**:
- ✅ 广告加载前就有空间
- ✅ 无布局偏移
- ✅ 平滑加载体验

### CLS优化检查清单

- [x] 所有广告容器有固定最小高度
- [x] 使用`min-height`而非动态高度
- [x] 预留足够的空间
- [x] 避免动态内容插入
- [x] 测试不同屏幕尺寸
- [x] 验证Core Web Vitals

## AdSense政策合规

### 会触发政策问题的行为

#### ❌ 1. 广告在禁止区域

**禁止区域**:
- ❌ 标题区域（`<header>`内）
- ❌ 导航区域（`<nav>`内）
- ❌ 页脚区域（`<footer>`内）
- ❌ 内容段落中间（嵌入段落）

**我们的实现**:
```typescript
// ✅ 正确：广告在允许的位置
<header>...</header>
<AdWrapper position="top" />  // ✅ 允许
<main>...</main>
<AdWrapper position="inArticle" />  // ✅ 允许（在main内但用aside标识）
<nav>...</nav>
<AdWrapper position="bottom" />  // ✅ 允许
<footer>...</footer>
```

#### ❌ 2. 广告遮挡内容

**问题**:
- 固定定位的广告遮挡内容
- 弹出式广告
- 全屏广告

**我们的实现**:
```typescript
// ✅ 正确：广告不遮挡内容
<AdContainer
  style={{
    position: 'static', // 不固定定位
    zIndex: 'auto',     // 不覆盖内容
  }}
/>
```

#### ❌ 3. 内容不足

**要求**:
- 每页至少500字原创内容
- 内容有价值，非垃圾内容

**我们的实现**:
```typescript
// ✅ 检查内容长度
{contentLength >= 1000 && (
  <AdWrapper position="inArticle" contentLength={contentLength} />
)}
```

#### ❌ 4. 点击诱导

**问题**:
- "点击这里"等诱导性文字
- 误导性广告标识
- 伪装成内容的广告

**我们的实现**:
```typescript
// ✅ 正确：清晰的广告标识
<aside aria-label="Advertisement" role="complementary">
  {/* 广告内容 */}
</aside>
```

#### ❌ 5. 布局偏移

**问题**:
- 广告加载导致页面跳动
- 动态插入内容
- 未预留空间

**我们的实现**:
```typescript
// ✅ CLS安全：固定高度
<div style={{ minHeight: '250px' }}>
  {/* 预留空间 */}
</div>
```

### 政策合规检查清单

- [x] 广告不在禁止区域
- [x] 广告不遮挡内容
- [x] 内容充足（≥500字）
- [x] 清晰的广告标识
- [x] 无点击诱导
- [x] CLS优化（无布局偏移）
- [x] 移动端友好
- [x] 响应式设计

## 实施步骤

### 阶段1：准备（当前阶段）

**已完成**:
- ✅ 广告容器位置标识
- ✅ CLS安全布局
- ✅ 组件结构创建
- ✅ 配置系统就绪

**操作**:
- 无需操作，等待AdSense批准

### 阶段2：获得AdSense批准后

**步骤1**: 更新配置

```typescript
// lib/adsense/config.ts
export const adSenseConfig: AdSenseConfig = {
  publisherId: 'ca-pub-XXXXXXXXXX', // 填写你的发布商ID
  enabled: true, // 启用广告
  
  positions: {
    top: {
      enabled: true,
      adSlot: '1234567890', // 从AdSense获取
      adFormat: 'auto',
    },
    inArticle: {
      enabled: true,
      adSlot: '0987654321',
      adFormat: 'auto',
    },
    bottom: {
      enabled: true,
      adSlot: '1122334455',
      adFormat: 'auto',
    },
  },
}
```

**步骤2**: 取消注释广告组件

```typescript
// components/adsense/ad-container.tsx
// 移除showPlaceholder逻辑
// 启用实际AdSense代码
```

**步骤3**: 添加AdSense脚本

```typescript
// app/layout.tsx
{isAdSenseConfigured() && (
  <script
    async
    src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adSenseConfig.publisherId}`}
    crossOrigin="anonymous"
  />
)}
```

**步骤4**: 测试

- 测试所有广告位置
- 验证CLS分数
- 检查移动端显示
- 验证政策合规

## 广告位置详细说明

### AD ZONE 1: Top Ad

**位置**: 标题后，正文前

**代码位置**: `components/content/article-layout.tsx`

```typescript
<AdWrapper position="top" />
```

**要求**:
- 内容 ≥ 500字
- 不遮挡标题
- 响应式设计

**CLS优化**:
- minHeight: 250px
- maxWidth: 728px（桌面）
- 居中显示

### AD ZONE 2: In-Article Ad

**位置**: 正文中间

**代码位置**: `components/content/article-layout.tsx`

```typescript
<AdWrapper 
  position="inArticle" 
  contentLength={article.content.length}
/>
```

**要求**:
- 内容 ≥ 1000字（推荐）
- 前后各 ≥ 300字
- 矩形格式（300x250）

**CLS优化**:
- minHeight: 250px
- minWidth: 300px
- 固定尺寸，避免偏移

### AD ZONE 3: Bottom Ad

**位置**: 正文后，相关文章前

**代码位置**: `components/content/article-layout.tsx`

```typescript
<AdWrapper position="bottom" />
```

**要求**:
- 内容完整
- 不遮挡内容
- 响应式设计

**CLS优化**:
- minHeight: 250px
- maxWidth: 728px（桌面）
- 居中显示

## 如何避免布局偏移

### 1. 固定容器尺寸

```typescript
// ✅ 正确：固定高度
<div style={{ minHeight: '250px' }}>
  {/* 广告 */}
</div>

// ❌ 错误：动态高度
<div>
  {/* 广告加载后高度才确定 */}
</div>
```

### 2. 预留空间

```typescript
// ✅ 正确：预留空间
<AdContainer minHeight={250} />

// ❌ 错误：不预留空间
<AdContainer /> // 广告加载后才显示
```

### 3. 使用CSS Grid/Flexbox

```css
/* ✅ 正确：使用Grid布局 */
.ad-container {
  display: grid;
  min-height: 250px;
  place-items: center;
}
```

### 4. 避免动态插入

```typescript
// ❌ 错误：动态插入内容
useEffect(() => {
  document.getElementById('ad-container').innerHTML = adCode
}, [])

// ✅ 正确：静态预留空间
<AdContainer id="ad-container" />
```

## 会触发AdSense政策问题的行为

### ❌ 1. 广告位置违规

**禁止**:
- 标题区域内的广告
- 导航区域内的广告
- 页脚区域内的广告
- 内容段落中间的广告（未正确标识）

**后果**:
- 账户警告
- 广告被暂停
- 严重时账户被封

### ❌ 2. 内容不足

**要求**:
- 每页至少500字
- 原创、有价值的内容

**后果**:
- 审核不通过
- 广告被拒绝
- 收入受影响

### ❌ 3. 点击诱导

**禁止**:
- "点击这里"等诱导性文字
- 误导性广告标识
- 伪装成内容的广告

**后果**:
- 违反政策
- 账户被暂停
- 收入被扣留

### ❌ 4. 布局偏移严重

**问题**:
- CLS分数 > 0.25
- 频繁的布局跳动
- 用户体验差

**后果**:
- Core Web Vitals分数低
- SEO排名受影响
- 可能影响AdSense审核

### ❌ 5. 移动端不友好

**要求**:
- 响应式设计
- 不遮挡移动端内容
- 触摸友好

**后果**:
- 审核不通过
- 移动端广告被拒绝
- 用户体验差

## 实施检查清单

### 准备阶段（当前）
- [x] 广告容器位置标识
- [x] CLS安全布局实现
- [x] 组件结构创建
- [x] 配置系统就绪
- [x] 文档完善

### 获得批准后
- [ ] 更新`lib/adsense/config.ts`
- [ ] 填写publisherId
- [ ] 设置enabled = true
- [ ] 配置各位置的adSlot
- [ ] 取消注释广告代码
- [ ] 添加AdSense脚本
- [ ] 测试所有位置
- [ ] 验证CLS分数
- [ ] 检查政策合规

## 总结

### 当前状态

✅ **已准备**：
- 广告位置已标识（3个位置）
- CLS安全布局已实现
- 组件结构已创建
- 配置系统已就绪

❌ **未实施**：
- AdSense脚本未注入
- 广告代码未添加
- 等待AdSense批准

### 关键要点

1. **广告位置**
   - 顶部、文章内、底部
   - 符合AdSense政策
   - 不遮挡内容

2. **CLS优化**
   - 固定容器高度
   - 预留空间
   - 避免布局偏移

3. **政策合规**
   - 不在禁止区域
   - 内容充足
   - 无点击诱导
   - 清晰的广告标识

所有准备工作已完成，获得AdSense批准后即可快速集成！

