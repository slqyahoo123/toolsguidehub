import Link from 'next/link'
import Container from '@/components/layout/container'

/**
 * 文章不存在时的404页面
 */
export default function ArticleNotFound() {
  return (
    <Container className="py-12">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
        <p className="text-xl text-gray-600 mb-8">
          The article you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Homepage
          </Link>
          <Link
            href="/web-development"
            className="inline-block px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Browse Articles
          </Link>
        </div>
      </div>
    </Container>
  )
}

