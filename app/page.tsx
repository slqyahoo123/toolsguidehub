import Link from 'next/link'
import { getAllCategories } from '@/config/categories'
import { siteConfig } from '@/config/site'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo/metadata'
import type { Metadata } from 'next'

export const metadata: Metadata = generateSEOMetadata({
  title: siteConfig.name,
  description: siteConfig.description,
  path: '/',
}, true)

export default function HomePage() {
  const categories = getAllCategories()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-accent-600 to-primary-700 text-white py-24 md:py-32 overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full mix-blend-overlay blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full mix-blend-overlay blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-5xl mx-auto">
            {/* Logo/Icon */}
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-white/10 backdrop-blur-sm mb-8 shadow-2xl border border-white/20 hover:scale-110 transition-transform duration-300">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/90">
              {siteConfig.name}
            </h1>

            <p className="text-xl md:text-3xl text-primary-50 mb-10 leading-relaxed max-w-4xl mx-auto font-light">
              {siteConfig.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Link
                href="/tools"
                className="group px-8 py-4 bg-white text-primary-600 rounded-xl font-bold hover:shadow-2xl transition-all shadow-lg hover:-translate-y-1 flex items-center gap-2"
              >
                <span>Try Free Tools</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="/ai-tools-platforms"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-xl font-bold hover:bg-white/20 transition-all"
              >
                Browse Guides
              </Link>
            </div>

            {/* Feature Pills */}
            <div className="flex flex-wrap justify-center gap-3">
              <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 text-sm font-semibold flex items-center gap-2">
                <span className="text-lg">✨</span>
                500+ Free Guides
              </div>
              <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 text-sm font-semibold flex items-center gap-2">
                <span className="text-lg">🛠️</span>
                Interactive Tools
              </div>
              <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 text-sm font-semibold flex items-center gap-2">
                <span className="text-lg">🚀</span>
                Always Free
              </div>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-12 md:h-24" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="white" fillOpacity="0.1" />
            <path d="M0 40L60 43.3C120 47 240 53 360 60C480 67 600 73 720 71.7C840 70 960 60 1080 56.7C1200 53 1320 57 1380 58.3L1440 60V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V40Z" fill="white" fillOpacity="0.05" />
            <path d="M0 80L60 76.7C120 73 240 67 360 65C480 63 600 65 720 71.7C840 78 960 88 1080 88.3C1200 88 1320 78 1380 73.3L1440 68V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V80Z" fill="#fafafa" />
          </svg>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-extrabold mb-6 text-gray-900">
              Explore by Category
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover comprehensive guides and tutorials organized by topic
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 max-w-7xl mx-auto">
            {categories.map((category) => {
              // Dynamic icons and gradients for each category
              const categoryStyles: Record<string, { icon: string; gradient: string; badge?: string }> = {
                'tools': { icon: '🛠️', gradient: 'from-emerald-500 to-teal-600', badge: 'New' },
                'ai-tools-platforms': { icon: '🤖', gradient: 'from-blue-500 to-indigo-600', badge: 'Popular' },
                'software-saas-issues': { icon: '🔧', gradient: 'from-purple-500 to-pink-600' },
                'accounts-subscriptions': { icon: '👤', gradient: 'from-amber-500 to-orange-600' },
                'how-things-work': { icon: '💡', gradient: 'from-cyan-500 to-blue-600' },
                'troubleshooting-guides': { icon: '🔍', gradient: 'from-red-500 to-rose-600' },
                'web-development': { icon: '💻', gradient: 'from-green-500 to-emerald-600' },
                'guides': { icon: '📚', gradient: 'from-indigo-500 to-purple-600' }
              }

              const style = categoryStyles[category.slug] || { icon: '📖', gradient: 'from-primary-500 to-accent-600' }

              return (
                <Link
                  key={category.slug}
                  href={`/${category.slug}`}
                  className="group relative block bg-white rounded-3xl border-2 border-gray-200 hover:border-transparent hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
                >
                  {/* Gradient Header */}
                  <div className={`bg-gradient-to-r ${style.gradient} p-8 relative overflow-hidden`}>
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -mr-16 -mt-16"></div>
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full -ml-12 -mb-12"></div>
                    </div>

                    <div className="relative z-10">
                      <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                        {style.icon}
                      </div>
                      {style.badge && (
                        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold border border-white/30 text-white">
                          {style.badge}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors leading-tight">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3">
                      {category.description}
                    </p>

                    <div className="flex items-center text-primary-600 font-bold group-hover:translate-x-2 transition-transform duration-300">
                      <span>Explore Guides</span>
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  </div>

                  {/* Hover Effect Border */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${style.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10`}></div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-extrabold mb-6 text-gray-900">
              Why Choose Us?
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive, up-to-date, and easy-to-follow resources
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {/* Feature 1 */}
            <div className="group bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-primary-200">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 text-center">Comprehensive</h3>
              <p className="text-gray-600 leading-relaxed text-center">
                Detailed guides covering all aspects of modern tools and technologies
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-accent-200">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-accent-500 to-accent-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 text-center">Up-to-Date</h3>
              <p className="text-gray-600 leading-relaxed text-center">
                Latest information and best practices from the tech industry
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-primary-200">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 text-center">Easy to Follow</h3>
              <p className="text-gray-600 leading-relaxed text-center">
                Step-by-step instructions designed for users of all skill levels
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-gradient-to-r from-primary-600 via-accent-600 to-primary-700 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-white rounded-full mix-blend-overlay blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-white rounded-full mix-blend-overlay blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-extrabold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl md:text-2xl text-primary-50 mb-10 leading-relaxed">
              Explore our free tools and comprehensive guides today
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/tools"
                className="px-10 py-5 bg-white text-primary-600 rounded-xl font-bold hover:shadow-2xl transition-all shadow-lg hover:-translate-y-1 text-lg"
              >
                Try Our Free Tools
              </Link>
              <Link
                href="/contact"
                className="px-10 py-5 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-xl font-bold hover:bg-white/20 transition-all text-lg"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
