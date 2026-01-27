import Link from 'next/link'
import Container from '@/components/layout/container'

/**
 * 分类不存在时的404页面
 */
export default function CategoryNotFound() {
  return (
    <Container className="py-12">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Category Not Found</h1>
        <p className="text-xl text-gray-600 mb-8">
          The category you're looking for doesn't exist.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Go to Homepage
        </Link>
      </div>
    </Container>
  )
}

