import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Page Not Found | Tools Guide Hub',
    description: "The page you're looking for doesn't exist. Explore our guides and tools instead.",
}

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center px-4">
            <div className="max-w-4xl mx-auto text-center">
                {/* 404 Illustration */}
                <div className="mb-12 relative">
                    <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-primary-100 to-accent-100 mb-8 animate-pulse">
                        <svg className="w-16 h-16 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>

                    <h1 className="text-8xl md:text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-600 mb-4">
                        404
                    </h1>
                </div>

                {/* Error Message */}
                <div className="bg-white rounded-3xl shadow-2xl border-2 border-gray-200 p-12 md:p-16 mb-8">
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                        Oops! Page Not Found
                    </h2>
                    <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-2xl mx-auto">
                        The page you're looking for doesn't exist or has been moved. But don't worry,
                        we have plenty of helpful guides and tools to explore!
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            href="/"
                            className="px-8 py-4 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-xl font-bold hover:shadow-xl transition-all hover:-translate-y-1"
                        >
                            Go to Homepage
                        </Link>
                        <Link
                            href="/tools"
                            className="px-8 py-4 bg-white text-primary-600 border-2 border-primary-600 rounded-xl font-bold hover:bg-primary-50 transition-all"
                        >
                            Try Our Tools
                        </Link>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="grid md:grid-cols-3 gap-6">
                    <Link
                        href="/ai-tools-platforms"
                        className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-gray-200 hover:border-blue-400"
                    >
                        <div className="text-4xl mb-3">🤖</div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                            AI Tools & Platforms
                        </h3>
                        <p className="text-sm text-gray-600">
                            Comprehensive AI guides
                        </p>
                    </Link>

                    <Link
                        href="/software-saas-issues"
                        className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-gray-200 hover:border-purple-400"
                    >
                        <div className="text-4xl mb-3">🔧</div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                            Software & SaaS
                        </h3>
                        <p className="text-sm text-gray-600">
                            Troubleshooting guides
                        </p>
                    </Link>

                    <Link
                        href="/contact"
                        className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-gray-200 hover:border-emerald-400"
                    >
                        <div className="text-4xl mb-3">💬</div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                            Contact Us
                        </h3>
                        <p className="text-sm text-gray-600">
                            Get in touch
                        </p>
                    </Link>
                </div>
            </div>
        </div>
    )
}
