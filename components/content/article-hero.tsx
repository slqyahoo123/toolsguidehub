import Link from 'next/link'
import Image from 'next/image'
import { Article } from '@/types/content'
import { Category } from '@/config/categories'

interface ArticleHeroProps {
    article: Article
    category: Category
}

export function ArticleHero({ article, category }: ArticleHeroProps) {
    // Get category gradient based on slug
    const getCategoryGradient = (slug: string) => {
        const gradients: Record<string, string> = {
            'tools': 'from-emerald-600 via-teal-600 to-teal-800',
            'ai-tools-platforms': 'from-blue-600 via-indigo-600 to-indigo-800',
            'software-saas-issues': 'from-purple-600 via-pink-600 to-pink-800',
            'accounts-subscriptions': 'from-amber-600 via-orange-600 to-orange-800',
            'how-things-work': 'from-cyan-600 via-blue-600 to-blue-800',
            'troubleshooting-guides': 'from-red-600 via-rose-600 to-rose-800',
            'web-development': 'from-green-600 via-emerald-600 to-emerald-800',
            'guides': 'from-indigo-600 via-purple-600 to-purple-800'
        }
        return gradients[slug] || 'from-primary-600 via-accent-600 to-primary-800'
    }

    const gradient = getCategoryGradient(category.slug)

    // Calculate estimated read time (rough approximation: 200 words per minute)
    const wordCount = article.content.split(/\s+/).length
    const readTime = Math.ceil(wordCount / 200)

    return (
        <div className={`relative bg-gradient-to-br ${gradient} text-white overflow-hidden`}>
            {/* Abstract Background Shapes */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-overlay blur-3xl transform translate-x-1/3 -translate-y-1/3 animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full mix-blend-overlay blur-3xl transform -translate-x-1/3 translate-y-1/3" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="relative container mx-auto px-4 py-16 md:py-24">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Category Badge */}
                    <Link
                        href={`/${category.slug}`}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-sm font-semibold mb-8 hover:bg-white/30 transition-all hover:scale-105"
                    >
                        <span>{category.name}</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>

                    {/* Title */}
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight tracking-tight text-white drop-shadow-sm">
                        {article.title}
                    </h1>

                    {/* Description */}
                    {article.description && (
                        <p className="text-xl text-blue-50/90 mb-10 max-w-3xl mx-auto leading-relaxed font-light">
                            {article.description}
                        </p>
                    )}

                    {/* Meta Info Bar */}
                    <div className="flex flex-wrap items-center justify-center gap-6 text-sm md:text-base font-medium text-white/90">
                        {/* Author */}
                        {article.author && (
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm border border-white/30">
                                    <span className="text-xs">👤</span>
                                </div>
                                <span>{article.author}</span>
                            </div>
                        )}

                        {/* Date */}
                        {article.date && (
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <time dateTime={article.date}>
                                    {new Date(article.date).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </time>
                            </div>
                        )}

                        {/* Read Time */}
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{readTime} min read</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Decorative Wave at bottom */}
            <div className="absolute bottom-0 left-0 right-0 leading-none">
                <svg className="w-full h-12 md:h-24 fill-white" viewBox="0 0 1440 120" preserveAspectRatio="none">
                    <path d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,85.3C672,75,768,85,864,96C960,107,1056,117,1152,112C1248,107,1344,85,1392,74.7L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </svg>
            </div>
        </div>
    )
}
