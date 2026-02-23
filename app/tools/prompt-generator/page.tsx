import { ToolLayout } from '@/components/tools/tool-layout'
import { PromptGenerator } from '@/components/tools/prompt-generator'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo/metadata'
import type { Metadata } from 'next'

export const metadata: Metadata = generateSEOMetadata({
    title: 'AI Prompt Generator - Create Optimized Prompts for ChatGPT & Claude',
    description: 'Free AI prompt generator with templates for content writing, coding, marketing, and more. Generate optimized prompts for ChatGPT, Claude, Gemini, and other AI models.',
    path: '/tools/prompt-generator',
})

export default function PromptGeneratorPage() {
    return (
        <ToolLayout
            title="AI Prompt Generator"
            description="Create optimized prompts for ChatGPT, Claude, and other AI models using professional templates"
            icon={
                <svg className="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
            }
        >
            <PromptGenerator />

            {/* SEO Content Section */}
            <div className="mt-16 prose prose-lg max-w-none">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 md:p-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">
                        Master the Art of AI Prompting
                    </h2>

                    <div className="space-y-6 text-gray-700 leading-relaxed">
                        <p>
                            Effective prompting is the key to getting the best results from AI language models like
                            ChatGPT, Claude, and Gemini. Our prompt generator helps you create well-structured,
                            optimized prompts that produce high-quality outputs.
                        </p>

                        <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                            What Makes a Good AI Prompt?
                        </h3>
                        <p>
                            A well-crafted prompt should be clear, specific, and provide sufficient context. The best
                            prompts include:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Clear objectives:</strong> State exactly what you want the AI to do</li>
                            <li><strong>Relevant context:</strong> Provide background information and constraints</li>
                            <li><strong>Specific requirements:</strong> Define format, length, tone, and style</li>
                            <li><strong>Target audience:</strong> Specify who the output is for</li>
                            <li><strong>Examples:</strong> Include examples when possible to guide the AI</li>
                        </ul>

                        <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                            Prompt Engineering Best Practices
                        </h3>
                        <p>
                            Prompt engineering is the practice of designing inputs to get optimal outputs from AI models.
                            Here are proven techniques:
                        </p>

                        <div className="bg-purple-50 border-l-4 border-purple-500 p-6 my-6 rounded-r-xl">
                            <h4 className="font-bold text-purple-900 mb-2">Role-Based Prompting</h4>
                            <p className="text-purple-900">
                                Start your prompt by assigning the AI a specific role: "Act as a professional copywriter..."
                                or "You are an expert data analyst...". This helps the AI understand the perspective and
                                expertise level to apply.
                            </p>
                        </div>

                        <div className="bg-pink-50 border-l-4 border-pink-500 p-6 my-6 rounded-r-xl">
                            <h4 className="font-bold text-pink-900 mb-2">Chain of Thought</h4>
                            <p className="text-pink-900">
                                Ask the AI to "think step by step" or "explain your reasoning". This technique improves
                                accuracy for complex tasks by encouraging the model to break down problems logically.
                            </p>
                        </div>

                        <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                            Common Prompt Templates
                        </h3>
                        <p>
                            Our generator includes templates for the most common use cases:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Content Writing:</strong> Blog posts, articles, and long-form content</li>
                            <li><strong>Code Generation:</strong> Functions, scripts, and programming solutions</li>
                            <li><strong>Marketing:</strong> Social media posts, ad copy, and email campaigns</li>
                            <li><strong>Business Communication:</strong> Professional emails and documents</li>
                            <li><strong>Data Analysis:</strong> Insights, reports, and recommendations</li>
                            <li><strong>Education:</strong> Explanations, tutorials, and learning materials</li>
                        </ul>

                        <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                            How to Use This Tool
                        </h3>
                        <ol className="list-decimal pl-6 space-y-2">
                            <li>Select a template that matches your use case</li>
                            <li>Fill in the variables with your specific requirements</li>
                            <li>Click "Generate Prompt" to create your custom prompt</li>
                            <li>Copy the generated prompt and use it with any AI model</li>
                            <li>Refine the variables based on the results you get</li>
                        </ol>

                        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mt-6 rounded-r-xl">
                            <p className="text-blue-900 font-medium">
                                💡 <strong>Pro Tip:</strong> Save your best-performing prompts for reuse. Small tweaks
                                to a proven prompt often work better than starting from scratch each time.
                            </p>
                        </div>

                        <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
                            Advanced Prompting Frameworks
                        </h3>
                        <p>
                            To get elite results, professional prompt engineers use structured frameworks. Our generator
                            integrates these behind the scenes. Here are the three most powerful frameworks we use:
                        </p>

                        <div className="grid md:grid-cols-2 gap-6 mt-8">
                            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
                                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                    <span className="bg-primary-100 text-primary-700 w-8 h-8 rounded-full flex items-center justify-center text-xs">A</span>
                                    CO-STAR Framework
                                </h4>
                                <ul className="text-sm space-y-2 text-gray-600">
                                    <li><strong>Context:</strong> Background information</li>
                                    <li><strong>Objective:</strong> Specific goal</li>
                                    <li><strong>Style:</strong> Desired writing style</li>
                                    <li><strong>Tone:</strong> Emotional quality</li>
                                    <li><strong>Audience:</strong> Who is it for?</li>
                                    <li><strong>Response:</strong> Output format</li>
                                </ul>
                            </div>

                            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
                                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                    <span className="bg-accent-100 text-accent-700 w-8 h-8 rounded-full flex items-center justify-center text-xs">B</span>
                                    RTF Framework
                                </h4>
                                <ul className="text-sm space-y-2 text-gray-600">
                                    <li><strong>Role:</strong> Act as [Expert]</li>
                                    <li><strong>Task:</strong> Complete [Action]</li>
                                    <li><strong>Format:</strong> In [Style/Structure]</li>
                                    <li className="pt-2 italic border-t border-gray-200 mt-2">Best for: Quick, direct tasks and specific data formatting.</li>
                                </ul>
                            </div>
                        </div>

                        <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
                            Why Methodology Matters
                        </h3>
                        <p>
                            Most users get "low-value" responses from AI because they use "low-value" prompts. By using a
                            structured generator, you ensure that the AI's internal "attention mechanism" is focused
                            on the right variables.
                        </p>
                        <p>
                            Specifically, providing a <strong>Persona</strong> (Role) reduces the search space for the LLM,
                            allowing it to pull from more relevant training data. Defining the <strong>Constraint</strong>
                            prevents common hallucinations and ensures the response fits your technical requirements.
                        </p>

                        <div className="bg-emerald-50 border-2 border-emerald-100 p-8 rounded-2xl mt-8">
                            <h4 className="font-bold text-emerald-900 mb-4">Our Commitment to Value</h4>
                            <p className="text-emerald-800 text-sm leading-relaxed">
                                Tools Guide Hub is dedicated to providing unique, high-value AI solutions. Unlike generic
                                prompt lists, our generator is built on the latest cognitive science principles of how
                                Transformer models process tokens. We regularly update our internal templates to reflect
                                the changing "latent space" of newest models like Claude 4 and GPT-5.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </ToolLayout>
    )
}
