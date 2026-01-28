import { notFound } from 'next/navigation'
import { getArticleBySlug } from '@/lib/content/loader'
import { getCategoryBySlug } from '@/config/categories'
import { generateArticleStructuredData } from '@/lib/seo/structured-data'
import ArticleLayout from '@/components/content/article-layout'
import { ArticleHero } from '@/components/content/article-hero'

interface PageProps {
  params: {
    category: string
    slug: string
  }
}

import { getAllArticles } from '@/lib/content/loader'
import { generateArticleMetadata } from '@/lib/seo/metadata'

export async function generateStaticParams() {
  const articles = await getAllArticles()

  return articles.map((article) => ({
    category: article.category,
    slug: article.slug,
  }))
}

export async function generateMetadata({ params }: PageProps) {
  const article = await getArticleBySlug(params.category, params.slug)

  if (!article) {
    return {}
  }

  return generateArticleMetadata({
    title: article.title,
    description: article.description,
    category: article.category,
    slug: article.slug,
    date: article.date,
    updated: article.updated,
    author: article.author,
    ogImage: article.ogImage,
    image: article.image,
  })
}


export default async function ArticlePage({ params }: PageProps) {
  const article = await getArticleBySlug(params.category, params.slug)

  if (!article) {
    notFound()
  }

  const category = getCategoryBySlug(article.category)
  if (!category) {
    notFound()
  }

  const structuredData = generateArticleStructuredData(article)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="bg-white min-h-screen">
        {/* Full Width Hero Header */}
        <ArticleHero article={article} category={category} />

        {/* Main Layout containing Content and Sidebar */}
        <ArticleLayout article={article} />
      </div>
    </>
  )
}
