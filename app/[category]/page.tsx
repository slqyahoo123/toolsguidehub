import { notFound } from 'next/navigation'
import { getArticlesByCategory } from '@/lib/content/loader'
import { getCategoryBySlug, getAllCategories } from '@/config/categories'
import { generateCategoryMetadata } from '@/lib/seo/metadata'
import CategoryList from '@/components/content/category-list'
import Container from '@/components/layout/container'
import Link from 'next/link'

interface PageProps {
  params: {
    category: string
  }
}

export async function generateStaticParams() {
  const categories = getAllCategories()
  return categories.map((cat) => ({
    category: cat.slug,
  }))
}

export async function generateMetadata({ params }: PageProps) {
  const category = getCategoryBySlug(params.category)

  if (!category) {
    return {}
  }

  return generateCategoryMetadata({
    name: category.name,
    description: category.description,
    slug: category.slug,
  })
}

export default async function CategoryPage({ params }: PageProps) {
  const category = getCategoryBySlug(params.category)
  const articles = await getArticlesByCategory(params.category)

  if (!category) {
    notFound()
  }

  // Get category icon based on slug
  const getCategoryIcon = (slug: string) => {
    const icons: Record<string, string> = {
      'tools': '🛠️',
      'ai-tools-platforms': '🤖',
      'software-saas-issues': '🔧',
      'accounts-subscriptions': '👤',
      'how-things-work': '💡',
      'troubleshooting-guides': '🔍',
      'web-development': '💻',
      'guides': '📚'
    }
    return icons[slug] || '📖'
  }

  // Get category gradient based on slug
  const getCategoryGradient = (slug: string) => {
    const gradients: Record<string, string> = {
      'tools': 'from-emerald-600 to-teal-700',
      'ai-tools-platforms': 'from-blue-600 to-indigo-700',
      'software-saas-issues': 'from-purple-600 to-pink-700',
      'accounts-subscriptions': 'from-amber-600 to-orange-700',
      'how-things-work': 'from-cyan-600 to-blue-700',
      'troubleshooting-guides': 'from-red-600 to-rose-700',
      'web-development': 'from-green-600 to-emerald-700',
      'guides': 'from-indigo-600 to-purple-700'
    }
    return gradients[slug] || 'from-primary-600 to-accent-600'
  }

  const categoryIcon = getCategoryIcon(params.category)
  const categoryGradient = getCategoryGradient(params.category)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Hero Section */}
      <div className={`bg-gradient-to-r ${categoryGradient} text-white py-16 md:py-24 border-b-4 border-opacity-40 border-white`}>
        <Container>
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm mb-8 text-white/80">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-white font-medium">{category.name}</span>
            </nav>

            {/* Main Content */}
            <div className="text-center">
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-white/10 backdrop-blur-sm mb-6 shadow-2xl border border-white/20">
                <span className="text-4xl md:text-5xl">{categoryIcon}</span>
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                {category.name}
              </h1>

              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
                {category.description}
              </p>

              {/* Stats */}
              <div className="inline-flex items-center gap-6 bg-white/10 backdrop-blur-sm rounded-2xl px-8 py-4 border border-white/20">
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-lg font-semibold">
                    {articles.length} {articles.length !== 1 ? 'Guides' : 'Guide'}
                  </span>
                </div>
                {category.featured && (
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full">
                    <span className="text-lg">⭐</span>
                    <span className="text-sm font-semibold">Featured</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Articles Section */}
      <Container className="py-16">
        <div className="max-w-6xl mx-auto">
          {articles.length > 0 ? (
            <>
              <div className="mb-8 flex items-center justify-between">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  All Guides in This Category
                </h2>
                <div className="text-sm text-gray-500">
                  Showing {articles.length} {articles.length !== 1 ? 'results' : 'result'}
                </div>
              </div>
              <CategoryList articles={articles} />
            </>
          ) : (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gray-100 mb-6">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                No Guides Yet
              </h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                We're working on creating helpful guides for this category. Check back soon!
              </p>
              <Link
                href="/"
                className="inline-block px-8 py-4 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-all shadow-md hover:shadow-lg"
              >
                Browse Other Categories
              </Link>
            </div>
          )}
        </div>
      </Container>

      {/* CTA Section */}
      {articles.length > 0 && (
        <div className="bg-gray-100 border-t border-gray-200 py-16">
          <Container>
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Need More Help?
              </h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Try our free interactive tools or explore other guide categories
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/tools"
                  className="px-8 py-4 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all hover:-translate-y-1"
                >
                  Try Our Tools
                </Link>
                <Link
                  href="/"
                  className="px-8 py-4 bg-white text-primary-600 border-2 border-primary-600 rounded-xl font-semibold hover:bg-primary-50 transition-all"
                >
                  All Categories
                </Link>
              </div>
            </div>
          </Container>
        </div>
      )}
    </div>
  )
}
