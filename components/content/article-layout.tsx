/**
 * 语义化文章布局组件
 * 
 * 优化：
 * - 可读性：清晰的视觉层次和间距
 * - SEO：使用HTML5语义元素和正确的标题层次
 * - AdSense兼容：预留广告位置，遵循Google政策
 */

import { Article } from '@/types/content'
import Image from 'next/image'
import Link from 'next/link'
import { getCategoryBySlug } from '@/config/categories'
import { getRelatedArticles } from '@/lib/content/loader'
import AdWrapper from '@/components/adsense/ad-wrapper'

interface ArticleLayoutProps {
  article: Article
}

export default async function ArticleLayout({ article }: ArticleLayoutProps) {
  const categoryInfo = getCategoryBySlug(article.category)
  const relatedArticles = await getRelatedArticles(
    article.category,
    article.slug,
    3
  )

  return (
    <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 
        ============================================
        ARTICLE HEADER - 文章头部
        ============================================
        SEO: 使用<header>语义元素
        AdSense: 此区域禁止广告（标题区域）
      */}
      <header className="mb-8 pb-6 border-b border-gray-200">
        {/* 分类标签 */}
        {article.category && categoryInfo && (
          <div className="mb-4">
            <Link
              href={`/${article.category}`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 text-primary-700 rounded-lg hover:bg-primary-100 transition-colors text-sm font-semibold"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              {categoryInfo.name}
            </Link>
          </div>
        )}
        
        {/* H1标题 - 页面主标题（稍微缩小，避免在常见屏宽下换行太早） */}
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-5 text-gray-800 leading-tight">
          {article.title}
        </h1>

        {/* 介绍摘要 - 帮助用户和搜索引擎理解文章内容 */}
        {article.description && (
          <p className="text-lg md:text-xl text-gray-600 mb-6 leading-relaxed">
            {article.description}
          </p>
        )}

        {/* 文章元数据 */}
        <div className="flex flex-wrap items-center gap-5 text-sm text-gray-600">
          {article.date && (
            <time dateTime={article.date} className="flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="sr-only">Published on</span>
              {new Date(article.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          )}
          {article.updated && article.updated !== article.date && (
            <time dateTime={article.updated} className="flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span className="sr-only">Updated on</span>
              Updated {new Date(article.updated).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          )}
          {article.author && (
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="sr-only">Author:</span>
              {article.author}
            </span>
          )}
        </div>

        {/* 特色图片 - LCP优化 */}
        {article.image && (
          <figure className="mb-8">
            {/* 
              CLS优化：固定容器尺寸，避免布局偏移
              LCP优化：priority加载，确保快速显示
            */}
            <div 
              className="relative w-full rounded-lg overflow-hidden bg-gray-100"
              style={{
                aspectRatio: '16 / 9', // 固定宽高比，避免CLS
                minHeight: '256px', // 移动端最小高度
              }}
            >
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
                priority // LCP优化：优先加载LCP元素
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                quality={85} // 平衡质量和文件大小（85是质量和性能的最佳平衡点）
              />
            </div>
            {article.image && (
              <figcaption className="mt-2 text-sm text-gray-500 text-center">
                {article.title}
              </figcaption>
            )}
          </figure>
        )}
      </header>

      {/* 
        ============================================
        AD ZONE 1: TOP AD (可选，获得批准后启用)
        ============================================
        AdSense位置: 内容上方
        要求: 
        - 内容必须足够（至少500字）
        - 广告不遮挡主要内容
        - 清晰的广告标识
        - CLS安全：固定高度，避免布局偏移
      */}
      <AdWrapper position="top" />

      {/* 
        ============================================
        MAIN CONTENT - 主要内容区域
        ============================================
        SEO: 使用<main>和<section>语义元素
        AdSense: 内容区域禁止广告（违反政策）
        标题层次: H1 (已用) → H2 → H3
      */}
      <main>
        {/* 文章正文内容 - 优化阅读体验，块与块之间更明显的间距 */}
        <section 
          className="reading-content prose prose-lg max-w-none 
                     prose-headings:font-semibold prose-headings:text-gray-800
                     prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-8 prose-h2:font-extrabold prose-h2:text-gray-800 prose-h2:pb-3 prose-h2:border-b prose-h2:border-gray-200
                     prose-h3:text-xl md:prose-h3:text-2xl prose-h3:mt-12 prose-h3:mb-5 prose-h3:font-bold prose-h3:text-gray-800
                     prose-p:text-gray-700 prose-p:leading-[1.8] prose-p:mb-7 prose-p:text-[18px]
                     prose-a:text-primary-600 prose-a:no-underline prose-a:font-medium
                     hover:prose-a:text-primary-700 hover:prose-a:underline
                     prose-strong:text-gray-700 prose-strong:font-semibold
                     prose-code:bg-gray-100 prose-code:text-gray-700 
                     prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:font-mono
                     prose-pre:bg-gray-900 prose-pre:text-gray-100
                     prose-pre:rounded-lg prose-pre:p-5 prose-pre:shadow-md
                     prose-ul:list-disc prose-ol:list-decimal
                     prose-li:text-gray-600 prose-li:my-3.5 prose-li:leading-[1.8] prose-li:pl-2
                     prose-blockquote:border-l-4 prose-blockquote:border-primary-300 
                     prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:bg-gray-50 prose-blockquote:text-gray-600 prose-blockquote:py-4 prose-blockquote:rounded-r prose-blockquote:my-6
                     prose-img:rounded-lg prose-img:shadow-md prose-img:my-8
                     prose-table:border-collapse prose-table:border prose-table:border-gray-200 prose-table:my-6
                     prose-th:bg-gray-50 prose-th:font-semibold prose-th:text-gray-700 prose-th:p-3
                     prose-td:border prose-td:border-gray-200 prose-td:text-gray-600 prose-td:p-3
                     mb-12
                     rounded-2xl"
          style={{
            backgroundColor: '#fafafa',
            border: '1px solid #f0f0f0',
          }}
          dangerouslySetInnerHTML={{ __html: article.contentHtml }}
        />

        {/* 
          ============================================
          AD ZONE 2: IN-ARTICLE AD (可选，获得批准后启用)
          ============================================
          AdSense位置: 内容中间（至少300字后）
          要求:
          - 内容必须足够长（建议至少1000字）
          - 广告位置自然，不打断阅读流
          - 前后都有足够的内容
          - CLS安全：固定高度，避免布局偏移
        */}
        <AdWrapper 
          position="inArticle" 
          contentLength={article.content.length}
        />
      </main>

      {/* 
        ============================================
        INTERNAL LINKS SECTION - 内部链接区域
        ============================================
        SEO: 帮助建立内部链接结构
        AdSense: 此区域禁止广告（导航区域）
      */}
      <nav 
        className="mt-16 pt-10 border-t-2 border-gray-200"
        aria-label="Related articles"
      >
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 px-4">
            Related Articles
          </h2>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
        </div>
        {relatedArticles.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedArticles.map((related) => (
              <Link
                key={related.slug}
                href={`/${related.category}/${related.slug}`}
                className="group block p-6 bg-white border-2 border-gray-200 rounded-xl hover:border-primary-400 hover:shadow-lg transition-all duration-300 relative overflow-hidden"
              >
                {/* 顶部装饰条 */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-accent-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary-600 mb-3 transition-colors leading-tight line-clamp-2">
                  {related.title}
                </h3>
                {related.description && (
                  <p className="text-sm text-gray-700 line-clamp-2 leading-relaxed mb-4">
                    {related.description}
                  </p>
                )}
                <div className="flex items-center text-primary-600 font-semibold text-sm group-hover:translate-x-2 transition-transform duration-300">
                  <span>Read article</span>
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-200">
            <svg className="w-12 h-12 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-gray-600 font-medium">
              More related articles coming soon.
            </p>
          </div>
        )}
      </nav>

      {/* 
        ============================================
        AD ZONE 3: BOTTOM AD (可选，获得批准后启用)
        ============================================
        AdSense位置: 内容下方
        要求:
        - 内容必须完整
        - 广告在主要内容之后
        - 不遮挡内容
        - CLS安全：固定高度，避免布局偏移
      */}
      <AdWrapper position="bottom" />

      {/* 
        ============================================
        ARTICLE FOOTER - 文章底部
        ============================================
        SEO: 使用<footer>语义元素
        AdSense: 此区域禁止广告（导航区域）
      */}
      <footer className="mt-8 pt-6 border-t border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
          {categoryInfo && (
            <Link
              href={`/${article.category}`}
              className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center gap-1.5 transition-colors"
              aria-label={`Back to ${categoryInfo.name} category`}
            >
              <span aria-hidden="true">←</span>
              Back to {categoryInfo.name}
            </Link>
          )}

          <div className="text-xs text-gray-500">
            <p>
              <span className="sr-only">Last updated:</span>
              Updated {new Date(article.updated || article.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
        </div>
      </footer>
    </article>
  )
}

