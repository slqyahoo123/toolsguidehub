import Link from 'next/link'
import { getAllCategories } from '@/config/categories'
import { siteConfig } from '@/config/site'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo/metadata'
import type { Metadata } from 'next'

/**
 * 生成首页SEO元数据
 * 
 * 元数据来源（确定性）：
 * - title: 来自config/site.ts中的siteConfig.name
 * - description: 来自config/site.ts中的siteConfig.description
 * - path: "/"（首页固定路径）
 */
export const metadata: Metadata = generateSEOMetadata({
  title: siteConfig.name, // 来自配置文件
  description: siteConfig.description, // 来自配置文件
  path: '/', // 首页固定路径
}, true) // isHomePage = true

export default function HomePage() {
  const categories = getAllCategories()

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - 专业简洁的设计 */}
      <section className="relative bg-gradient-to-b from-gray-50 to-white py-20 md:py-28 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            {/* 品牌标识 */}
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-600 mb-6 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-gray-900">
              {siteConfig.name}
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-10 leading-relaxed max-w-3xl mx-auto">
              {siteConfig.description}
            </p>
            
            {/* CTA按钮组 */}
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/ai-tools-platforms"
                className="px-8 py-4 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                Browse Guides
              </Link>
              <Link
                href="/about"
                className="px-8 py-4 bg-white text-gray-700 border-2 border-gray-300 rounded-lg font-semibold hover:border-primary-300 hover:text-primary-600 transition-all"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section - 现代化卡片设计 */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Browse by Category
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Discover comprehensive guides and tutorials organized by topic
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {categories.map((category, index) => (
              <Link
                key={category.slug}
                href={`/${category.slug}`}
                className="group relative block p-8 bg-white border-2 border-gray-200 rounded-2xl hover:border-primary-400 hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* 顶部装饰条 */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary-500 to-accent-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                {/* 图标区域 */}
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {category.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors mb-1 leading-tight">
                      {category.name}
                    </h3>
                    {category.featured && (
                      <span className="inline-flex items-center px-2 py-0.5 bg-amber-100 text-amber-800 rounded-md text-xs font-semibold">
                        ⭐ Featured
                      </span>
                    )}
                  </div>
                </div>
                
                {/* 描述 */}
                <p className="text-gray-700 leading-relaxed mb-6 line-clamp-2">
                  {category.description}
                </p>
                
                {/* 底部操作 */}
                <div className="flex items-center text-primary-600 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                  <span>Explore guides</span>
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section - 专业特性展示 */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Why Choose Our Guides?
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive, up-to-date, and easy-to-follow tutorials
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-8 bg-white rounded-2xl border border-gray-200 hover:border-primary-300 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Comprehensive</h3>
              <p className="text-gray-700 leading-relaxed">Detailed guides covering all aspects of modern tools and technologies</p>
            </div>

            <div className="text-center p-8 bg-white rounded-2xl border border-gray-200 hover:border-accent-300 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-accent-500 to-accent-600 flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Up-to-Date</h3>
              <p className="text-gray-700 leading-relaxed">Latest information and best practices from the tech industry</p>
            </div>

            <div className="text-center p-8 bg-white rounded-2xl border border-gray-200 hover:border-primary-300 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Easy to Follow</h3>
              <p className="text-gray-700 leading-relaxed">Step-by-step instructions designed for users of all skill levels</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

