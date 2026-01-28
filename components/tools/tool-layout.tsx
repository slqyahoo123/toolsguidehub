import React from 'react'
import type { Metadata } from 'next'

interface ToolLayoutProps {
    children: React.ReactNode
    title: string
    description: string
    icon?: React.ReactNode
    category?: string
}

export function ToolLayout({
    children,
    title,
    description,
    icon,
    category = 'Interactive Tools'
}: ToolLayoutProps) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
            {/* Tool Header */}
            <div className="bg-gradient-to-r from-primary-600 to-accent-600 text-white py-12 md:py-16 border-b-4 border-primary-700">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        {/* Breadcrumb */}
                        <div className="flex items-center gap-2 text-sm mb-6 text-primary-100">
                            <a href="/" className="hover:text-white transition-colors">Home</a>
                            <span>/</span>
                            <a href="/tools" className="hover:text-white transition-colors">{category}</a>
                            <span>/</span>
                            <span className="text-white font-medium">{title}</span>
                        </div>

                        {/* Title Section */}
                        <div className="flex items-start gap-6">
                            {icon && (
                                <div className="hidden md:flex w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm items-center justify-center flex-shrink-0 shadow-xl border border-white/20">
                                    {icon}
                                </div>
                            )}
                            <div className="flex-1">
                                <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                                    {title}
                                </h1>
                                <p className="text-lg md:text-xl text-primary-50 leading-relaxed">
                                    {description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tool Content */}
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-6xl mx-auto">
                    {children}
                </div>
            </div>

            {/* Tool Footer - SEO Content */}
            <div className="bg-gray-50 border-t border-gray-200 py-12">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            Free to Use, No Signup Required
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            All our tools are completely free and work directly in your browser.
                            No registration, no hidden fees, no data collection.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
