import { Article } from '@/types/content'
import Image from 'next/image'

interface ArticleHeaderProps {
  article: Article
}

export default function ArticleHeader({ article }: ArticleHeaderProps) {
  return (
    <header className="mb-8">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">{article.title}</h1>
      
      {article.description && (
        <p className="text-xl text-gray-600 mb-6">{article.description}</p>
      )}
      
      <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
        {article.date && (
          <time dateTime={article.date}>
            {new Date(article.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        )}
        {article.author && <span>By {article.author}</span>}
        {article.category && (
          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">
            {article.category}
          </span>
        )}
      </div>
      
      {article.image && (
        <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}
    </header>
  )
}

