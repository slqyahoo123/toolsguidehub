'use client'

import { useState, useEffect } from 'react'

export function ArticleSidebar() {
    const [activeId, setActiveId] = useState<string>('')
    const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([])

    // Extract headings from the content
    useEffect(() => {
        const elements = Array.from(document.querySelectorAll('.reading-content h2, .reading-content h3'))
        const items = elements.map((element) => ({
            id: element.id,
            text: element.textContent || '',
            level: Number(element.tagName.charAt(1)),
        }))
        setHeadings(items)

        // Setup intersection observer to track active section
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id)
                    }
                })
            },
            { rootMargin: '-100px 0px -66%' }
        )

        elements.forEach((elem) => observer.observe(elem))
        return () => observer.disconnect()
    }, [])

    // Smooth scroll to section
    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault()
        const element = document.getElementById(id)
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 100,
                behavior: 'smooth'
            })
            setActiveId(id)
        }
    }

    // Copy link share
    const copyToClipboard = () => {
        navigator.clipboard.writeText(window.location.href)
        alert('Link copied to clipboard!')
    }

    if (headings.length === 0) return null

    return (
        <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-24 space-y-8">
                {/* Table of Contents */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4 flex items-center gap-2">
                        <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                        </svg>
                        On this page
                    </h3>
                    <nav className="space-y-1">
                        {headings.map((heading) => (
                            <a
                                key={heading.id}
                                href={`#${heading.id}`}
                                onClick={(e) => scrollToSection(e, heading.id)}
                                className={`block text-sm py-1.5 transition-all duration-200 border-l-2 pl-4 ${activeId === heading.id
                                        ? 'border-primary-600 text-primary-700 font-medium'
                                        : 'border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300'
                                    } ${heading.level === 3 ? 'ml-3' : ''}`}
                            >
                                {heading.text}
                            </a>
                        ))}
                    </nav>
                </div>

                {/* Share Tools */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">
                        Share this guide
                    </h3>
                    <div className="flex flex-col gap-3">
                        <button
                            onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(document.title)}&url=${encodeURIComponent(window.location.href)}`, '_blank')}
                            className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-gray-100 hover:bg-black hover:text-white text-gray-700 rounded-lg transition-all font-medium text-sm"
                        >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                            Share on X
                        </button>
                        <button
                            onClick={copyToClipboard}
                            className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-gray-100 hover:bg-primary-600 hover:text-white text-gray-700 rounded-lg transition-all font-medium text-sm"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                            </svg>
                            Copy Link
                        </button>
                    </div>
                </div>

                {/* Ad Placeholder (Sticky Bottom) */}
                <div className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 p-4 text-center">
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-2">Advertisement</p>
                    <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center text-gray-300">
                        Ad Space
                    </div>
                </div>
            </div>
        </aside>
    )
}
