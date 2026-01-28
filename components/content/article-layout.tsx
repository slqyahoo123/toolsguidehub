/**
 * 模块化文章布局组件
 * - 移除了原有的 Hero Header（移至 ArticleHero 组件）
 * - 增加了 Sticky Sidebar 布局支持
 */

import { Article } from '@/types/content'
import Image from 'next/image'
import Link from 'next/link'
import { getCategoryBySlug } from '@/config/categories'
import { getRelatedArticles } from '@/lib/content/loader'
import AdWrapper from '@/components/adsense/ad-wrapper'
import { ArticleSidebar } from './article-sidebar'

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="lg:flex lg:gap-12">
        {/* Main Content Column */}
        <main className="flex-1 min-w-0">
          {/* Featured Image */}
          {article.image && (
            <figure className="mb-10 rounded-2xl overflow-hidden shadow-lg border border-gray-100">
              <div
                className="relative w-full bg-gray-100"
                style={{ aspectRatio: '16 / 9' }}
              >
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 800px"
                  quality={90}
                />
              </div>
            </figure>
          )}

          {/* Top Ad */}
          <AdWrapper position="top" />

          {/* Article Content */}
          <article className="prose prose-lg md:prose-xl max-w-none reading-content
            prose-headings:font-bold prose-headings:text-gray-900 prose-headings:tracking-tight
            prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-l-4 prose-h2:border-primary-500 prose-h2:pl-4 
            prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-4
            prose-p:text-gray-700 prose-p:leading-8 prose-p:mb-6
            prose-a:text-primary-600 prose-a:no-underline prose-a:border-b-2 prose-a:border-primary-200 hover:prose-a:border-primary-600 hover:prose-a:text-primary-800 transition-colors
            prose-strong:text-gray-900 prose-strong:font-bold
            prose-blockquote:border-l-4 prose-blockquote:border-accent-500 prose-blockquote:bg-gradient-to-r prose-blockquote:from-accent-50 prose-blockquote:to-white prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-xl prose-blockquote:not-italic prose-blockquote:font-medium prose-blockquote:text-gray-800
            prose-code:text-primary-700 prose-code:bg-primary-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:font-semibold
            prose-pre:bg-gray-900 prose-pre:shadow-xl prose-pre:rounded-xl prose-pre:border prose-pre:border-gray-800
            prose-img:rounded-xl prose-img:shadow-lg
            prose-li:marker:text-primary-500
          "
            dangerouslySetInnerHTML={{ __html: article.contentHtml }}
          />

          {/* In-Article Ad */}
          <AdWrapper position="inArticle" contentLength={article.content.length} />

          {/* Article Footer / Tags / Update Info */}
          <div className="mt-12 pt-8 border-t border-gray-100 text-sm text-gray-500 flex justify-between items-center">
            <span>
              Last updated: {new Date(article.updated || article.date).toLocaleDateString()}
            </span>
            {categoryInfo && (
              <Link href={`/${categoryInfo.slug}`} className="text-primary-600 font-medium hover:underline">
                More in {categoryInfo.name} →
              </Link>
            )}
          </div>

          {/* Related Articles Section */}
          <section className="mt-16 pt-10 border-t border-gray-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Articles</h2>

            <div className="grid md:grid-cols-2 gap-8">
              {relatedArticles.map((related) => (
                <Link
                  key={related.slug}
                  href={`/${related.category}/${related.slug}`}
                  className="group flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-primary-200 transition-all duration-300 overflow-hidden"
                >
                  <div className="p-6 flex-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-primary-600 mb-2 block">
                      Read Next
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 mb-3 transition-colors line-clamp-2">
                      {related.title}
                    </h3>
                    {related.description && (
                      <p className="text-gray-600 line-clamp-2 text-sm leading-relaxed">
                        {related.description}
                      </p>
                    )}
                  </div>
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between group-hover:bg-primary-50 transition-colors">
                    <span className="text-sm font-medium text-gray-600 group-hover:text-primary-700">Read Article</span>
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-primary-600 transform group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Bottom Ad */}
          <AdWrapper position="bottom" />
        </main>

        {/* Sidebar Column */}
        <ArticleSidebar />
      </div>
    </div>
  )
}
