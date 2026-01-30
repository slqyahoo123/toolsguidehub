import { ToolLayout } from '@/components/tools/tool-layout'
import { YouTubeScriptGenerator } from '@/components/tools/youtube-script-generator'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo/metadata'
import type { Metadata } from 'next'

export const metadata: Metadata = generateSEOMetadata({
    title: 'YouTube Script Generator - Free Video Script Templates',
    description: 'Free YouTube script generator with proven templates. Create engaging video scripts for tutorials, reviews, vlogs, and listicles in seconds.',
    path: '/tools/youtube-script-generator',
})

export default function YouTubeScriptGeneratorPage() {
    return (
        <ToolLayout
            title="YouTube Script Generator"
            description="Create professional video scripts using proven templates for maximum engagement"
            icon={
                <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
            }
        >
            <YouTubeScriptGenerator />

            {/* SEO Content Section */}
            <div className="mt-16 prose prose-lg max-w-none">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 md:p-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">
                        How to Write High-Performing YouTube Scripts
                    </h2>

                    <div className="space-y-6 text-gray-700 leading-relaxed">
                        <p>
                            The difference between a video that gets 100 views and one that gets 100,000 views often
                            comes down to the first 15 seconds—your hook. A well-structured script is the foundation
                            of every viral YouTube video.
                        </p>

                        <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                            The 3-Part Script Structure
                        </h3>

                        <div className="bg-red-50 border-l-4 border-red-500 p-6 my-6 rounded-r-xl">
                            <h4 className="font-bold text-red-900 mb-2">Part 1: The Hook (0-15 seconds)</h4>
                            <p className="text-red-800">
                                You have literally 3 seconds to stop the scroll. Use pattern interrupts like
                                "Stop!", bold statements, or curiosity gaps ("The thing nobody tells you about...").
                                Never waste this time with long intros.
                            </p>
                        </div>

                        <div className="bg-orange-50 border-l-4 border-orange-500 p-6 my-6 rounded-r-xl">
                            <h4 className="font-bold text-orange-900 mb-2">Part 2: Value Delivery (Main Content)</h4>
                            <p className="text-orange-800">
                                This is where you fulfill the promise made in your hook. Use numbered lists,
                                step-by-step breakdowns, or before/after comparisons. Keep it tight—no fluff.
                                YouTubers who ramble lose viewers fast.
                            </p>
                        </div>

                        <div className="bg-pink-50 border-l-4 border-pink-500 p-6 my-6 rounded-r-xl">
                            <h4 className="font-bold text-pink-900 mb-2">Part 3: Call to Action (Last 30 seconds)</h4>
                            <p className="text-pink-800">
                                Ask for the like, ask for the subscribe, and most importantly—ask an engaging question
                                to boost comments. "What feature do you want next?" gets way more responses than
                                "Thanks for watching."
                            </p>
                        </div>

                        <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                            Script Templates for Different Video Types
                        </h3>

                        <h4 className="text-xl font-bold text-gray-900 mt-6 mb-3">Educational/Tutorial Format</h4>
                        <p>
                            Best for: How-to videos, software demos, skill-building content.
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Hook with the end result ("By the end of this, you'll...").</li>
                            <li>Break complex topics into 3-5 digestible steps.</li>
                            <li>Use screen recordings or visual diagrams to support each step.</li>
                        </ul>

                        <h4 className="text-xl font-bold text-gray-900 mt-6 mb-3">Product Review Format</h4>
                        <p>
                            Best for: Tech reviews, unboxings, software comparisons.
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Start with your verdict first, then back it up.</li>
                            <li>Be honest about cons—viewers trust balanced reviews more.</li>
                            <li>Include affiliate links in description (disclose properly).</li>
                        </ul>

                        <h4 className="text-xl font-bold text-gray-900 mt-6 mb-3">Listicle/Countdown Format</h4>
                        <p>
                            Best for: "Top 10" videos, rankings, compilation content.
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Tease #1 at the start to create suspense.</li>
                            <li>Use timestamps in the description so viewers can jump around.</li>
                            <li>Always explain WHY each item made the list.</li>
                        </ul>

                        <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                            Common Script Mistakes to Avoid
                        </h3>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Writing word-for-word dialogue:</strong> Scripts should be bullet points, not essays. You'll sound robotic if you memorize every word.</li>
                            <li><strong>Forgetting B-roll cues:</strong> Note where you need supporting visuals. "Show graph here" or "Cut to product demo."</li>
                            <li><strong>Not timing your script:</strong> Read it out loud. If your 10-minute script takes 18 minutes when spoken, edit ruthlessly.</li>
                        </ul>

                        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mt-8 rounded-r-xl">
                            <p className="text-blue-900 font-medium">
                                💡 <strong>Pro Tip:</strong> The best scripts feel conversational, not scripted.
                                Write like you talk. Use contractions. Ask rhetorical questions. Make it feel like
                                a conversation, not a lecture.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </ToolLayout>
    )
}
