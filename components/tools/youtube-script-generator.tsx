'use client'

import { useState } from 'react'

interface ScriptTemplate {
    id: string
    name: string
    description: string
    icon: string
}

const templates: ScriptTemplate[] = [
    {
        id: 'educational',
        name: 'Educational/Tutorial',
        description: 'Step-by-step teaching format',
        icon: '📚'
    },
    {
        id: 'product-review',
        name: 'Product Review',
        description: 'Honest review with pros/cons',
        icon: '⭐'
    },
    {
        id: 'storytelling',
        name: 'Storytelling/Vlog',
        description: 'Personal narrative structure',
        icon: '🎬'
    },
    {
        id: 'listicle',
        name: 'Top 10 List',
        description: 'Countdown or ranked list format',
        icon: '🔢'
    }
]

export function YouTubeScriptGenerator() {
    const [selectedTemplate, setSelectedTemplate] = useState<string>('')
    const [topic, setTopic] = useState('')
    const [targetAudience, setTargetAudience] = useState('')
    const [videoLength, setVideoLength] = useState('5-10')
    const [script, setScript] = useState<string>('')
    const [isGenerating, setIsGenerating] = useState(false)

    const generateScript = () => {
        if (!topic || !selectedTemplate) return

        setIsGenerating(true)

        setTimeout(() => {
            const template = templates.find(t => t.id === selectedTemplate)
            let generatedScript = ''

            // Hook (First 15 seconds)
            generatedScript += `[HOOK - 0:00 to 0:15]\n\n`
            generatedScript += `"Stop scrolling! ${topic}... and by the end of this video, you'll know exactly how to [solve problem]. Let's dive in!"\n\n`
            generatedScript += `[Show engaging visual: Quick preview of the result]\n\n`
            generatedScript += `---\n\n`

            // Introduction
            generatedScript += `[INTRO - 0:15 to 0:45]\n\n`
            generatedScript += `"Hey everyone, welcome back to [Your Channel]! ${targetAudience ? `For those of you who are ${targetAudience}, ` : ''}today's video is going to be a game-changer.\n\n`
            generatedScript += `We're talking about ${topic}, and I'm going to break down everything you need to know in a simple, easy-to-follow format."\n\n`
            generatedScript += `[Quick reminder to like and subscribe]\n\n`
            generatedScript += `---\n\n`

            // Main Content (varies by template)
            if (selectedTemplate === 'educational') {
                generatedScript += `[MAIN CONTENT - 0:45 to ${parseInt(videoLength.split('-')[1]) - 2}:00]\n\n`
                generatedScript += `**Step 1: [First Key Point]**\n`
                generatedScript += `"The first thing you need to understand is [concept]. Here's why this matters: [reason]."\n\n`
                generatedScript += `[Visual: Screen recording or diagram]\n\n`
                generatedScript += `**Step 2: [Second Key Point]**\n`
                generatedScript += `"Now that you've got that down, let's move to [next concept]. A lot of people get stuck here because [common mistake]."\n\n`
                generatedScript += `**Step 3: [Final Key Point]**\n`
                generatedScript += `"Finally, here's the secret sauce that ties it all together: [advanced tip]."\n\n`
            } else if (selectedTemplate === 'product-review') {
                generatedScript += `[MAIN CONTENT - 0:45 to ${parseInt(videoLength.split('-')[1]) - 2}:00]\n\n`
                generatedScript += `**What It Is**\n`
                generatedScript += `"So first, let me show you exactly what ${topic} is and who it's designed for."\n\n`
                generatedScript += `[B-roll of product]\n\n`
                generatedScript += `**The Good**\n`
                generatedScript += `"Here are the 3 things I absolutely love: [Feature 1], [Feature 2], and [Feature 3]."\n\n`
                generatedScript += `**The Not-So-Good**\n`
                generatedScript += `"But let's be honest, nothing's perfect. Here are 2 downsides: [Con 1] and [Con 2]."\n\n`
                generatedScript += `**The Verdict**\n`
                generatedScript += `"So, is it worth it? Here's my take..."\n\n`
            } else if (selectedTemplate === 'listicle') {
                generatedScript += `[MAIN CONTENT - 0:45 to ${parseInt(videoLength.split('-')[1]) - 2}:00]\n\n`
                generatedScript += `**#10: [Item Name]**\n`
                generatedScript += `"Coming in at number 10, we have [description]. This is great because [reason]."\n\n`
                generatedScript += `[Continue for items 9 through 2...]\n\n`
                generatedScript += `**#1: [Top Item]**\n`
                generatedScript += `"And the number one ${topic} has to be [item]. If you only remember one thing from this video, remember this."\n\n`
            } else {
                generatedScript += `[MAIN CONTENT - 0:45 to ${parseInt(videoLength.split('-')[1]) - 2}:00]\n\n`
                generatedScript += `"Let me tell you a quick story about why ${topic} matters so much to me...\n\n`
                generatedScript += `[Share personal anecdote with emotional beats]\n\n`
                generatedScript += `The turning point came when [key moment]. And that's when I realized [lesson]."\n\n`
            }

            generatedScript += `---\n\n`

            // Call to Action
            generatedScript += `[OUTRO/CTA - Last 1-2 minutes]\n\n`
            generatedScript += `"Alright, that's everything you need to know about ${topic}! If this video helped you, smash that like button and subscribe for more content like this.\n\n`
            generatedScript += `Drop a comment below telling me: [engaging question related to topic].\n\n`
            generatedScript += `And if you want to dive even deeper, check out [related video/resource] in the description.\n\n`
            generatedScript += `Thanks for watching, and I'll see you in the next one!"\n\n`
            generatedScript += `[End screen: Subscribe button + 2 video suggestions]\n\n`

            setScript(generatedScript)
            setIsGenerating(false)
        }, 1500)
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(script)
        alert('Script copied to clipboard!')
    }

    return (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div className="p-8 bg-gradient-to-r from-red-600 to-pink-600 text-white">
                <h2 className="text-3xl font-bold mb-2">YouTube Script Generator</h2>
                <p className="text-red-100">Create engaging video scripts in seconds with proven templates</p>
            </div>

            <div className="p-8">
                {/* Template Selection */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                        Choose a Script Template
                    </label>
                    <div className="grid md:grid-cols-2 gap-4">
                        {templates.map((template) => (
                            <button
                                key={template.id}
                                onClick={() => setSelectedTemplate(template.id)}
                                className={`p-4 rounded-xl border-2 transition-all text-left ${selectedTemplate === template.id
                                        ? 'border-red-500 bg-red-50 shadow-md'
                                        : 'border-gray-200 hover:border-red-200 hover:bg-gray-50'
                                    }`}
                            >
                                <div className="flex items-start gap-3">
                                    <span className="text-3xl">{template.icon}</span>
                                    <div>
                                        <h3 className="font-bold text-gray-900">{template.name}</h3>
                                        <p className="text-sm text-gray-600">{template.description}</p>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Topic Input */}
                <div className="mb-6">
                    <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-2">
                        Video Topic
                    </label>
                    <input
                        id="topic"
                        type="text"
                        placeholder="e.g., How to Start a YouTube Channel in 2026"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                    />
                </div>

                {/* Target Audience */}
                <div className="mb-6">
                    <label htmlFor="audience" className="block text-sm font-medium text-gray-700 mb-2">
                        Target Audience (Optional)
                    </label>
                    <input
                        id="audience"
                        type="text"
                        placeholder="e.g., beginner content creators"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        value={targetAudience}
                        onChange={(e) => setTargetAudience(e.target.value)}
                    />
                </div>

                {/* Video Length */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Target Video Length
                    </label>
                    <div className="flex gap-4">
                        {['5-10', '10-15', '15-20'].map((length) => (
                            <button
                                key={length}
                                onClick={() => setVideoLength(length)}
                                className={`px-6 py-2 rounded-lg font-medium transition-all ${videoLength === length
                                        ? 'bg-red-600 text-white shadow-md'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {length} min
                            </button>
                        ))}
                    </div>
                </div>

                <button
                    onClick={generateScript}
                    disabled={isGenerating || !topic || !selectedTemplate}
                    className={`w-full py-4 px-6 rounded-xl text-white font-bold text-lg transition-all transform hover:-translate-y-1 ${isGenerating || !topic || !selectedTemplate
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-red-600 hover:bg-red-700 shadow-lg hover:shadow-red-200'
                        }`}
                >
                    {isGenerating ? (
                        <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Generating script...
                        </span>
                    ) : (
                        '🎬 Generate Video Script'
                    )}
                </button>

                {/* Generated Script */}
                {script && (
                    <div className="mt-8 animate-fade-in">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold text-gray-900">Your Generated Script</h3>
                            <button
                                onClick={copyToClipboard}
                                className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 font-medium transition-all flex items-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                                Copy Script
                            </button>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                            <pre className="whitespace-pre-wrap font-mono text-sm text-gray-800 leading-relaxed">
                                {script}
                            </pre>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
