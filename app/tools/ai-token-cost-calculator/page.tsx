import { ToolLayout } from '@/components/tools/tool-layout'
import { TokenCostCalculator } from '@/components/tools/token-cost-calculator'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo/metadata'
import type { Metadata } from 'next'

export const metadata: Metadata = generateSEOMetadata({
    title: 'AI Token Cost Calculator - Compare GPT-4, Claude, Gemini Pricing',
    description: 'Free AI token cost calculator. Compare pricing for ChatGPT, Claude, Gemini and other AI models. Calculate your daily, monthly, and yearly API costs instantly.',
    path: '/tools/ai-token-cost-calculator',
})

export default function AITokenCostCalculatorPage() {
    return (
        <ToolLayout
            title="AI Token Cost Calculator"
            description="Compare pricing across different AI models and estimate your API costs"
            icon={
                <svg className="w-12 h-12 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
            }
        >
            <TokenCostCalculator />

            {/* SEO Content Section */}
            <div className="mt-16 prose prose-lg max-w-none">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 md:p-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">
                        Understanding AI Token Costs
                    </h2>

                    <div className="space-y-6 text-gray-700 leading-relaxed">
                        <p>
                            AI language models like GPT-4, Claude, and Gemini charge based on the number of tokens processed.
                            A token is roughly equivalent to 4 characters or 0.75 words in English. Understanding token costs
                            is crucial for budgeting your AI application or workflow.
                        </p>

                        <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                            What Are Tokens?
                        </h3>
                        <p>
                            Tokens are the basic units that AI models use to process text. Both your input (prompt) and
                            the model's output (response) are measured in tokens. Different models have different pricing
                            for input and output tokens.
                        </p>

                        <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                            Why Do Costs Vary Between Models?
                        </h3>
                        <p>
                            Different AI models have varying capabilities, speeds, and operational costs. More advanced
                            models like GPT-4 Turbo or Claude 3 Opus typically cost more but offer superior performance
                            for complex tasks. Lighter models like GPT-3.5 Turbo or Claude 3 Haiku are more economical
                            for simpler applications.
                        </p>

                        <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                            How to Optimize Your AI Costs
                        </h3>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>
                                <strong>Choose the right model:</strong> Use lighter models for simple tasks and reserve
                                premium models for complex reasoning.
                            </li>
                            <li>
                                <strong>Optimize prompts:</strong> Write concise, clear prompts to reduce input token usage.
                            </li>
                            <li>
                                <strong>Limit output length:</strong> Set maximum token limits for responses to control costs.
                            </li>
                            <li>
                                <strong>Cache responses:</strong> Store and reuse common responses instead of making
                                repeated API calls.
                            </li>
                            <li>
                                <strong>Batch processing:</strong> Group similar requests together to reduce overhead.
                            </li>
                        </ul>

                        <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                            Current AI Model Pricing (2026)
                        </h3>
                        <p>
                            Our calculator includes the latest pricing for major AI providers including OpenAI (GPT models),
                            Anthropic (Claude models), and Google (Gemini models). Prices are updated regularly to reflect
                            current market rates.
                        </p>

                        <div className="bg-primary-50 border-l-4 border-primary-500 p-6 mt-6 rounded-r-xl">
                            <p className="text-primary-900 font-medium">
                                💡 <strong>Pro Tip:</strong> Start with a smaller, cheaper model for testing and development.
                                Scale up to premium models only when you need advanced capabilities or higher quality outputs.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </ToolLayout>
    )
}
