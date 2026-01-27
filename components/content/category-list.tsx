import Link from 'next/link'
import { Article } from '@/types/content'

interface CategoryListProps {
  articles: Article[]
}

export default function CategoryList({ articles }: CategoryListProps) {
  if (articles.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
          <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <p className="text-gray-600 text-lg">No articles found in this category.</p>
        <p className="text-gray-500 text-sm mt-2">Check back soon for new content!</p>
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article, index) => (
        <Link
          key={article.slug}
          href={`/${article.category}/${article.slug}`}
          className="group block bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:border-primary-400 hover:shadow-xl transition-all duration-300 relative"
        >
          {/* 顶部装饰条 */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-accent-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          
          <div className="p-6">
            {/* 标题和描述 */}
            <div className="mb-4">
              <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2 leading-tight">
                {article.title}
              </h2>
              <p className="text-sm text-gray-700 line-clamp-3 leading-relaxed">
                {article.description}
              </p>
            </div>
            
            {/* 底部信息 */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <time dateTime={article.date}>
                  {new Date(article.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </time>
              </div>
              
              {article.featured && (
                <span className="px-2.5 py-1 bg-gradient-to-r from-amber-100 to-amber-50 text-amber-800 rounded-md text-xs font-semibold border border-amber-200">
                  ⭐ Featured
                </span>
              )}
            </div>
            
            {/* 阅读链接 */}
            <div className="mt-4 flex items-center text-primary-600 font-semibold text-sm group-hover:translate-x-2 transition-transform duration-300">
              <span>Read article</span>
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

