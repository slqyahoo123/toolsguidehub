import { notFound } from 'next/navigation'
import { getArticlesByCategory, getAllArticles } from '@/lib/content/loader'
import { getCategoryBySlug, getAllCategories } from '@/config/categories'
import { generateCategoryMetadata } from '@/lib/seo/metadata'
import CategoryList from '@/components/content/category-list'
import Container from '@/components/layout/container'

interface PageProps {
  params: {
    category: string
  }
}

/**
 * 生成静态参数（所有分类）
 * 
 * 这个函数在构建时执行，为每个分类生成静态页面
 * Next.js会为每个返回的参数组合生成一个静态HTML文件
 * 
 * 例如：
 * - /web-development/ → 静态HTML
 * - /tools/ → 静态HTML
 * - /guides/ → 静态HTML
 */
export async function generateStaticParams() {
  const categories = getAllCategories()
  return categories.map((cat) => ({
    category: cat.slug,
  }))
}

/**
 * 生成SEO元数据
 * 
 * 这个函数在构建时为每个分类页面生成唯一的元数据
 * 
 * 元数据来源（确定性）：
 * - title: 来自config/categories.ts中的category.name
 * - description: 来自config/categories.ts中的category.description
 * - path: 基于category.slug生成
 * 
 * 生成的元数据包括：
 * - Title标签: "Category Name | Site Name"
 * - Meta描述: 来自category.description（150-160字符）
 * - Canonical URL: 基于category.slug
 * - Open Graph标签: 用于社交媒体分享
 * - Twitter Card标签: 用于Twitter分享
 * 
 * 所有元数据在构建时生成，直接嵌入HTML，无需客户端JavaScript
 */
export async function generateMetadata({ params }: PageProps) {
  const category = getCategoryBySlug(params.category)
  
  if (!category) {
    return {}
  }

  // 使用便捷函数生成分类页面元数据
  // 所有数据来自配置文件，确保确定性
  return generateCategoryMetadata({
    name: category.name, // 来自config/categories.ts
    description: category.description, // 来自config/categories.ts
    slug: category.slug, // 来自config/categories.ts
  })
}

/**
 * 分类列表页组件
 * 
 * 这是一个服务端组件（Server Component），在构建时执行
 * 
 * 工作流程：
 * 1. 构建时：读取所有文章，生成静态HTML
 * 2. 运行时：直接返回预生成的HTML，无需数据获取
 * 
 * 优势：
 * - 零客户端数据获取
 * - 内容直接嵌入HTML，SEO完美
 * - 极速加载（静态HTML + CDN缓存）
 */
export default async function CategoryPage({ params }: PageProps) {
  // 服务端数据获取（构建时执行）
  const category = getCategoryBySlug(params.category)
  const articles = await getArticlesByCategory(params.category)

  // 如果分类不存在，返回404
  if (!category) {
    notFound()
  }

  // 返回完整的HTML内容（构建时生成）
  return (
    <div className="bg-white min-h-screen">
      <Container className="py-12">
        {/* Hero Section */}
        <div className="mb-12 text-center pb-8 border-b-2 border-gray-200">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 mb-6 shadow-lg">
            <span className="text-2xl font-bold text-white">{category.name.charAt(0)}</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 text-gray-900 leading-tight">
            {category.name}
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            {category.description}
          </p>
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-full">
            <span className="text-sm font-semibold text-primary-700">
              {articles.length} {articles.length !== 1 ? 'articles' : 'article'} available
            </span>
          </div>
        </div>

        <CategoryList articles={articles} />
      </Container>
    </div>
  )
}

