import Link from 'next/link'
import { getCategoryBySlug } from '@/config/categories'

interface ArticleFooterProps {
  category: string
  slug: string
}

export default function ArticleFooter({ category, slug }: ArticleFooterProps) {
  const categoryInfo = getCategoryBySlug(category)

  return (
    <footer className="mt-12 pt-8 border-t border-gray-200">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        {categoryInfo && (
          <Link
            href={`/${category}`}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to {categoryInfo.name}
          </Link>
        )}
        
        <div className="text-sm text-gray-500">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
      
      {/* 相关文章组件将在这里添加 */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Related Articles</h3>
        <p className="text-gray-600">Related articles will be displayed here</p>
      </div>
    </footer>
  )
}

