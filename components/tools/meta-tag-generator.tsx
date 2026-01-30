'use client'

import { useState } from 'react'

interface MetaTags {
    basic: string
    openGraph: string
    twitter: string
}

export function MetaTagGenerator() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [keywords, setKeywords] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const [image, setImage] = useState('')
    const [siteName, setSiteName] = useState('')
    const [twitterHandle, setTwitterHandle] = useState('')

    const [generatedTags, setGeneratedTags] = useState<MetaTags | null>(null)

    const generateTags = () => {
        if (!title || !description) return

        const basic = `<!-- Basic Meta Tags -->
<title>${title}</title>
<meta name="description" content="${description}" />
${keywords ? `<meta name="keywords" content="${keywords}" />` : ''}
${author ? `<meta name="author" content="${author}" />` : ''}
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta charset="UTF-8" />
${url ? `<link rel="canonical" href="${url}" />` : ''}`

        const openGraph = `<!-- Open Graph / Facebook -->
<meta property="og:type" content="website" />
${url ? `<meta property="og:url" content="${url}" />` : ''}
<meta property="og:title" content="${title}" />
<meta property="og:description" content="${description}" />
${image ? `<meta property="og:image" content="${image}" />` : ''}
${siteName ? `<meta property="og:site_name" content="${siteName}" />` : ''}`

        const twitter = `<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
${url ? `<meta name="twitter:url" content="${url}" />` : ''}
<meta name="twitter:title" content="${title}" />
<meta name="twitter:description" content="${description}" />
${image ? `<meta name="twitter:image" content="${image}" />` : ''}
${twitterHandle ? `<meta name="twitter:creator" content="${twitterHandle}" />` : ''}`

        setGeneratedTags({ basic, openGraph, twitter })
    }

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
        alert('Tags copied to clipboard!')
    }

    const copyAll = () => {
        if (!generatedTags) return
        const allTags = `${generatedTags.basic}\n\n${generatedTags.openGraph}\n\n${generatedTags.twitter}`
        navigator.clipboard.writeText(allTags)
        alert('All tags copied to clipboard!')
    }

    return (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div className="p-8 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
                <h2 className="text-3xl font-bold mb-2">SEO Meta Tag Generator</h2>
                <p className="text-emerald-100">Generate complete, SEO-optimized meta tags for your website</p>
            </div>

            <div className="p-8">
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    {/* Required Fields */}
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                            Page Title <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="title"
                            type="text"
                            placeholder="e.g., Best AI Tools for Developers in 2026"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            maxLength={60}
                        />
                        <p className="text-xs text-gray-500 mt-1">{title.length}/60 characters (optimal: 50-60)</p>
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                            Meta Description <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            id="description"
                            rows={3}
                            placeholder="e.g., Discover the top AI developer tools that boost productivity..."
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            maxLength={160}
                        ></textarea>
                        <p className="text-xs text-gray-500 mt-1">{description.length}/160 characters (optimal: 150-160)</p>
                    </div>

                    {/* Optional Fields */}
                    <div>
                        <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
                            Canonical URL
                        </label>
                        <input
                            id="url"
                            type="url"
                            placeholder="https://yoursite.com/page"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                            OG Image URL
                        </label>
                        <input
                            id="image"
                            type="url"
                            placeholder="https://yoursite.com/og-image.jpg"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="keywords" className="block text-sm font-medium text-gray-700 mb-2">
                            Keywords (comma-separated)
                        </label>
                        <input
                            id="keywords"
                            type="text"
                            placeholder="ai tools, developer tools, productivity"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            value={keywords}
                            onChange={(e) => setKeywords(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
                            Author Name
                        </label>
                        <input
                            id="author"
                            type="text"
                            placeholder="John Doe"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="siteName" className="block text-sm font-medium text-gray-700 mb-2">
                            Site Name
                        </label>
                        <input
                            id="siteName"
                            type="text"
                            placeholder="Your Website Name"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            value={siteName}
                            onChange={(e) => setSiteName(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="twitter" className="block text-sm font-medium text-gray-700 mb-2">
                            Twitter Handle
                        </label>
                        <input
                            id="twitter"
                            type="text"
                            placeholder="@yourusername"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            value={twitterHandle}
                            onChange={(e) => setTwitterHandle(e.target.value)}
                        />
                    </div>
                </div>

                <button
                    onClick={generateTags}
                    disabled={!title || !description}
                    className={`w-full py-4 px-6 rounded-xl text-white font-bold text-lg transition-all transform hover:-translate-y-1 ${!title || !description
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-emerald-600 hover:bg-emerald-700 shadow-lg hover:shadow-emerald-200'
                        }`}
                >
                    🏷️ Generate Meta Tags
                </button>

                {/* Generated Tags Display */}
                {generatedTags && (
                    <div className="mt-8 space-y-6 animate-fade-in">
                        <div className="flex justify-between items-center">
                            <h3 className="text-xl font-bold text-gray-900">Your Generated Tags</h3>
                            <button
                                onClick={copyAll}
                                className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium transition-all flex items-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                                Copy All
                            </button>
                        </div>

                        {/* Basic Tags */}
                        <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
                            <div className="flex items-center justify-between px-4 py-3 bg-gray-100 border-b border-gray-200">
                                <h4 className="font-bold text-gray-900">Basic Meta Tags</h4>
                                <button
                                    onClick={() => copyToClipboard(generatedTags.basic)}
                                    className="text-sm px-3 py-1 bg-white rounded-md hover:bg-gray-50 transition-colors"
                                >
                                    Copy
                                </button>
                            </div>
                            <pre className="p-4 overflow-x-auto">
                                <code className="text-sm text-gray-800">{generatedTags.basic}</code>
                            </pre>
                        </div>

                        {/* Open Graph Tags */}
                        <div className="bg-blue-50 rounded-xl border border-blue-200 overflow-hidden">
                            <div className="flex items-center justify-between px-4 py-3 bg-blue-100 border-b border-blue-200">
                                <h4 className="font-bold text-gray-900">Open Graph Tags</h4>
                                <button
                                    onClick={() => copyToClipboard(generatedTags.openGraph)}
                                    className="text-sm px-3 py-1 bg-white rounded-md hover:bg-gray-50 transition-colors"
                                >
                                    Copy
                                </button>
                            </div>
                            <pre className="p-4 overflow-x-auto">
                                <code className="text-sm text-gray-800">{generatedTags.openGraph}</code>
                            </pre>
                        </div>

                        {/* Twitter Tags */}
                        <div className="bg-sky-50 rounded-xl border border-sky-200 overflow-hidden">
                            <div className="flex items-center justify-between px-4 py-3 bg-sky-100 border-b border-sky-200">
                                <h4 className="font-bold text-gray-900">Twitter Card Tags</h4>
                                <button
                                    onClick={() => copyToClipboard(generatedTags.twitter)}
                                    className="text-sm px-3 py-1 bg-white rounded-md hover:bg-gray-50 transition-colors"
                                >
                                    Copy
                                </button>
                            </div>
                            <pre className="p-4 overflow-x-auto">
                                <code className="text-sm text-gray-800">{generatedTags.twitter}</code>
                            </pre>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
