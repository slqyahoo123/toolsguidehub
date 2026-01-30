import { ToolLayout } from '@/components/tools/tool-layout'
import { AITextHumanizer } from '@/components/tools/ai-text-humanizer'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo/metadata'
import type { Metadata } from 'next'

export const metadata: Metadata = generateSEOMetadata({
    title: 'AI Text Humanizer - Bypass AI Detection Free',
    description: 'Free AI text humanizer to bypass AI detection. Check if your text sounds like ChatGPT and get tips to make it sound more human. Perfect for writers and students.',
    path: '/tools/ai-text-humanizer',
})

export default function AITextHumanizerPage() {
    return (
        <ToolLayout
            title="AI Text Humanizer"
            description="Check and humanize your AI-generated content to bypass detection and sound more natural"
            icon={
                <svg className="w-12 h-12 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            }
        >
            <AITextHumanizer />

            {/* SEO Content Section */}
            <div className="mt-16 prose prose-lg max-w-none">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 md:p-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">
                        How to Humanize AI Text
                    </h2>

                    <div className="space-y-6 text-gray-700 leading-relaxed">
                        <p>
                            As AI writing tools like ChatGPT and Claude become more common, so do AI detectors.
                            Whether you're a student, writer, or content creator, you might need to ensure your
                            content sounds natural and bypasses AI detection flags.
                        </p>

                        <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                            Why Does AI Text Sound "Robotic"?
                        </h3>
                        <p>
                            AI models predict the most statistically probable next word. This leads to text that is:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Too Uniform:</strong> Sentence lengths and structures often lack variety.</li>
                            <li><strong>Overly Formal:</strong> AI struggles with casual idioms and slang.</li>
                            <li><strong>Repetitive:</strong> It often restates the same point using different words.</li>
                            <li><strong>Lacks Perplexity:</strong> A measure of randomness that human writing naturally has.</li>
                        </ul>

                        <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                            3 Steps to Bypass AI Detectors
                        </h3>

                        <div className="bg-indigo-50 border-l-4 border-indigo-500 p-6 my-6 rounded-r-xl">
                            <h4 className="font-bold text-indigo-900 mb-2">1. Vary Sentence Length</h4>
                            <p className="text-indigo-800">
                                AI loves medium-length sentences. Mix it up! Use short, punchy sentences.
                                Then follow up with a longer, more complex sentence that explores an idea in depth.
                                This "burstiness" is a key human trait.
                            </p>
                        </div>

                        <div className="bg-purple-50 border-l-4 border-purple-500 p-6 my-6 rounded-r-xl">
                            <h4 className="font-bold text-purple-900 mb-2">2. Add Personal Experience</h4>
                            <p className="text-purple-800">
                                AI has no life experience. Using phrases like "In my opinion," "I remember when,"
                                or sharing a specific anecdote immediately signals human authorship to readers
                                and detectors alike.
                            </p>
                        </div>

                        <div className="bg-pink-50 border-l-4 border-pink-500 p-6 my-6 rounded-r-xl">
                            <h4 className="font-bold text-pink-900 mb-2">3. Use Active Voice</h4>
                            <p className="text-pink-800">
                                AI frequently defaults to passive voice (e.g., "The ball was thrown").
                                Change this to active voice (e.g., "I threw the ball") to make your writing
                                more dynamic and less machine-like.
                            </p>
                        </div>

                        <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                            Does This Tool Guarantee 100% Human Score?
                        </h3>
                        <p>
                            No tool can guarantee a 100% bypass because AI detectors are constantly evolving
                            (and often inaccurate!). Our tool analyzes patterns commonly flagged by detectors
                            to give you the best chance of passing. The goal shouldn't just be "beating the detector"
                            but creating high-quality content that engages your readers.
                        </p>
                    </div>
                </div>
            </div>
        </ToolLayout>
    )
}
