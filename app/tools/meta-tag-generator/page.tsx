import { ToolLayout } from '@/components/tools/tool-layout'
import { MetaTagGenerator } from '@/components/tools/meta-tag-generator'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo/metadata'
import type { Metadata } from 'next'

export const metadata: Metadata = generateSEOMetadata({
    title: 'Meta Tag Generator - Free SEO Meta Tags Tool',
    description: 'Free meta tag generator for SEO. Create perfect HTML meta tags, Open Graph tags, and Twitter Cards in seconds. Optimize your website for search engines and social media.',
    path: '/tools/meta-tag-generator',
})

export default function MetaTagGeneratorPage() {
    return (
        <ToolLayout
            title="Meta Tag Generator"
            description="Generate SEO-optimized meta tags for better search engine rankings and social media sharing"
            icon={
                <svg className="w-12 h-12 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                </svg>
            }
        >
            <MetaTagGenerator />

            {/* SEO Content Section */}
            <div className="mt-16 prose prose-lg max-w-none">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 md:p-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">
                        Understanding Meta Tags for SEO
                    </h2>

                    <div className="space-y-6 text-gray-700 leading-relaxed">
                        <p>
                            Meta tags are invisible HTML elements that tell search engines and social media platforms
                            what your page is about. They don't appear on your page, but they're crucial for SEO,
                            click-through rates, and social sharing.
                        </p>

                        <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                            Essential Meta Tags Explained
                        </h3>

                        <h4 className="text-xl font-bold text-gray-900 mt-6 mb-3">1. Title Tag</h4>
                        <p>
                            The title tag is the single most important on-page SEO element. It appears as the clickable
                            headline in search results and browser tabs.
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Optimal Length:</strong> 50-60 characters</li>
                            <li><strong>Best Practice:</strong> Include your primary keyword near the beginning</li>
                            <li><strong>Format:</strong> Primary Keyword | Brand Name</li>
                        </ul>

                        <h4 className="text-xl font-bold text-gray-900 mt-6 mb-3">2. Meta Description</h4>
                        <p>
                            While not a direct ranking factor, meta descriptions heavily influence click-through rates
                            from search results.
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Optimal Length:</strong> 150-160 characters</li>
                            <li><strong>Best Practice:</strong> Write a compelling call-to-action</li>
                            <li><strong>Include:</strong> Primary keyword and benefits</li>
                        </ul>

                        <h4 className="text-xl font-bold text-gray-900 mt-6 mb-3">3. Open Graph Tags</h4>
                        <p>
                            Open Graph (OG) tags control how your content appears when shared on Facebook, LinkedIn,
                            and other platforms.
                        </p>
                        <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 my-4 rounded-r-xl">
                            <p className="text-emerald-900">
                                <strong>Pro Tip:</strong> Pages with OG images get 40% more clicks on social media.
                                Always include an og:image tag with a 1200x630px image.
                            </p>
                        </div>

                        <h4 className="text-xl font-bold text-gray-900 mt-6 mb-3">4. Twitter Card Tags</h4>
                        <p>
                            Twitter/X uses its own set of meta tags. Without them, your links will appear as plain text.
                        </p>

                        <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                            Common Meta Tag Mistakes
                        </h3>

                        <div className="space-y-4">
                            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                                <h5 className="font-bold text-red-900 mb-1">❌ Duplicate Titles</h5>
                                <p className="text-sm text-red-800">
                                    Using the same title tag across multiple pages confuses search engines and dilutes
                                    your SEO. Every page should have a unique title.
                                </p>
                            </div>

                            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg">
                                <h5 className="font-bold text-orange-900 mb-1">❌ Keyword Stuffing</h5>
                                <p className="text-sm text-orange-800">
                                    "Buy Shoes | Cheap Shoes | Best Shoes | Shoes Online" is spam. Google penalizes this.
                                    Write for humans first, search engines second.
                                </p>
                            </div>

                            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg">
                                <h5 className="font-bold text-yellow-900 mb-1">❌ Generic Descriptions</h5>
                                <p className="text-sm text-yellow-800">
                                    "Welcome to our website" tells nobody anything. Be specific about the value your page provides.
                                </p>
                            </div>
                        </div>

                        <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                            How to Implement Your Meta Tags
                        </h3>
                        <ol className="list-decimal pl-6 space-y-3">
                            <li>
                                <strong>Copy the generated code</strong> from our tool above.
                            </li>
                            <li>
                                <strong>Paste it into the  section</strong> of your HTML file.
                            </li>
                            <li>
                                <strong>Test with validation tools:</strong>
                                <ul className="list-disc pl-6 mt-2 text-sm">
                                    <li>Facebook Sharing Debugger</li>
                                    <li>Twitter Card Validator</li>
                                    <li>Google Rich Results Test</li>
                                </ul>
                            </li>
                            <li>
                                <strong>Monitor performance</strong> in Google Search Console to see how your titles
                                and descriptions affect click-through rates.
                            </li>
                        </ol>

                        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mt-8 rounded-r-xl">
                            <p className="text-blue-900 font-medium">
                                💡 <strong>Advanced Tip:</strong> AB test your meta descriptions using Google Search
                                Console data. Small changes in wording can dramatically impact CTR, which indirectly
                                boosts rankings.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </ToolLayout>
    )
}
