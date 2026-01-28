'use client'

import React, { useState } from 'react'

interface PromptTemplate {
    id: string
    name: string
    category: string
    description: string
    template: string
    variables: string[]
    example: string
}

const PROMPT_TEMPLATES: PromptTemplate[] = [
    {
        id: 'content-writer',
        name: 'Content Writer',
        category: 'Writing',
        description: 'Generate high-quality blog posts and articles',
        template: 'Write a comprehensive {length} article about {topic}. The target audience is {audience}. The tone should be {tone}. Include {sections} main sections with practical examples and actionable insights.',
        variables: ['topic', 'length', 'audience', 'tone', 'sections'],
        example: 'Write a comprehensive 2000-word article about AI in healthcare. The target audience is healthcare professionals. The tone should be professional and informative. Include 5 main sections with practical examples and actionable insights.'
    },
    {
        id: 'code-generator',
        name: 'Code Generator',
        category: 'Development',
        description: 'Generate code snippets and functions',
        template: 'Create a {language} function that {functionality}. The code should be {style} and include {features}. Add comments explaining the logic and provide usage examples.',
        variables: ['language', 'functionality', 'style', 'features'],
        example: 'Create a Python function that validates email addresses. The code should be clean and efficient and include error handling and type hints. Add comments explaining the logic and provide usage examples.'
    },
    {
        id: 'social-media',
        name: 'Social Media Post',
        category: 'Marketing',
        description: 'Create engaging social media content',
        template: 'Create a {platform} post about {topic}. The post should be {tone} and appeal to {audience}. Include {elements} and make it {length}. Add relevant hashtags.',
        variables: ['platform', 'topic', 'tone', 'audience', 'elements', 'length'],
        example: 'Create a LinkedIn post about productivity tips. The post should be professional yet friendly and appeal to remote workers. Include a personal story and actionable advice and make it concise (under 200 words). Add relevant hashtags.'
    },
    {
        id: 'email-writer',
        name: 'Email Writer',
        category: 'Business',
        description: 'Compose professional emails',
        template: 'Write a {type} email to {recipient} about {subject}. The tone should be {tone}. Include {elements} and keep it {length}.',
        variables: ['type', 'recipient', 'subject', 'tone', 'elements', 'length'],
        example: 'Write a follow-up email to a potential client about our SaaS proposal. The tone should be professional and friendly. Include a brief recap of our meeting and next steps and keep it concise.'
    },
    {
        id: 'data-analyst',
        name: 'Data Analysis',
        category: 'Analysis',
        description: 'Analyze data and generate insights',
        template: 'Analyze the following {datatype} data and provide insights about {focus}. Look for {patterns} and present findings in {format}. Include actionable recommendations.',
        variables: ['datatype', 'focus', 'patterns', 'format'],
        example: 'Analyze the following sales data and provide insights about quarterly trends. Look for seasonal patterns and customer segments and present findings in a structured report with charts. Include actionable recommendations.'
    },
    {
        id: 'tutor',
        name: 'Educational Tutor',
        category: 'Education',
        description: 'Explain concepts and teach topics',
        template: 'Explain {concept} to a {level} student. Use {method} and include {examples}. Make it {style} and ensure the explanation is {clarity}.',
        variables: ['concept', 'level', 'method', 'examples', 'style', 'clarity'],
        example: 'Explain quantum computing to a high school student. Use analogies and real-world examples and include 2-3 practical applications. Make it engaging and conversational and ensure the explanation is clear and easy to understand.'
    }
]

export function PromptGenerator() {
    const [selectedTemplate, setSelectedTemplate] = useState<PromptTemplate>(PROMPT_TEMPLATES[0])
    const [variables, setVariables] = useState<Record<string, string>>({})
    const [generatedPrompt, setGeneratedPrompt] = useState<string>('')
    const [copied, setCopied] = useState(false)

    const handleTemplateChange = (templateId: string) => {
        const template = PROMPT_TEMPLATES.find(t => t.id === templateId)
        if (template) {
            setSelectedTemplate(template)
            setVariables({})
            setGeneratedPrompt('')
        }
    }

    const handleVariableChange = (variable: string, value: string) => {
        setVariables(prev => ({
            ...prev,
            [variable]: value
        }))
    }

    const generatePrompt = () => {
        let prompt = selectedTemplate.template

        selectedTemplate.variables.forEach(variable => {
            const value = variables[variable] || `[${variable}]`
            prompt = prompt.replace(`{${variable}}`, value)
        })

        setGeneratedPrompt(prompt)
    }

    const copyToClipboard = async () => {
        if (generatedPrompt) {
            await navigator.clipboard.writeText(generatedPrompt)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        }
    }

    const categories = Array.from(new Set(PROMPT_TEMPLATES.map(t => t.category)))

    return (
        <div className="space-y-8">
            {/* Template Selection */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose a Template</h2>
                    <p className="text-gray-600">Select a prompt template to get started</p>
                </div>

                <div className="p-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {PROMPT_TEMPLATES.map(template => (
                            <button
                                key={template.id}
                                onClick={() => handleTemplateChange(template.id)}
                                className={`
                  text-left p-4 rounded-xl border-2 transition-all duration-200
                  ${selectedTemplate.id === template.id
                                        ? 'border-purple-500 bg-purple-50 shadow-md'
                                        : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                                    }
                `}
                            >
                                <div className="flex items-start justify-between gap-2 mb-2">
                                    <div className="font-semibold text-gray-900">{template.name}</div>
                                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-medium">
                                        {template.category}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600">{template.description}</p>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Variable Inputs */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Customize Your Prompt</h2>
                    <p className="text-gray-600">Fill in the variables to generate your custom prompt</p>
                </div>

                <div className="p-6 md:p-8">
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                        {selectedTemplate.variables.map(variable => (
                            <div key={variable}>
                                <label htmlFor={variable} className="block text-sm font-semibold text-gray-900 mb-2 capitalize">
                                    {variable.replace(/-/g, ' ')}
                                </label>
                                <input
                                    id={variable}
                                    type="text"
                                    value={variables[variable] || ''}
                                    onChange={(e) => handleVariableChange(variable, e.target.value)}
                                    placeholder={`Enter ${variable}...`}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                                />
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={generatePrompt}
                        className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all hover:-translate-y-1"
                    >
                        Generate Prompt
                    </button>
                </div>
            </div>

            {/* Generated Prompt */}
            {generatedPrompt && (
                <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 border-b border-gray-200 flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Generated Prompt</h2>
                            <p className="text-gray-600">Copy and use this prompt with any AI model</p>
                        </div>
                        <button
                            onClick={copyToClipboard}
                            className={`
                px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2
                ${copied
                                    ? 'bg-green-500 text-white'
                                    : 'bg-purple-600 text-white hover:bg-purple-700'
                                }
              `}
                        >
                            {copied ? (
                                <>
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    Copied!
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                    Copy
                                </>
                            )}
                        </button>
                    </div>

                    <div className="p-6 md:p-8">
                        <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
                            <p className="text-gray-900 leading-relaxed whitespace-pre-wrap font-mono text-sm">
                                {generatedPrompt}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Example Section */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    Example Prompt
                </h4>
                <div className="bg-white rounded-xl p-4 border border-blue-200">
                    <p className="text-sm text-gray-700 font-mono leading-relaxed">
                        {selectedTemplate.example}
                    </p>
                </div>
            </div>

            {/* Tips Section */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Tips for Better Prompts</h3>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center flex-shrink-0">
                            <span className="text-xl">✨</span>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-1">Be Specific</h4>
                            <p className="text-sm text-gray-600">The more specific your inputs, the better the AI's response will be</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center flex-shrink-0">
                            <span className="text-xl">🎯</span>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-1">Define Context</h4>
                            <p className="text-sm text-gray-600">Provide context about your audience and purpose</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center flex-shrink-0">
                            <span className="text-xl">📝</span>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-1">Set Expectations</h4>
                            <p className="text-sm text-gray-600">Specify format, length, and style preferences</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center flex-shrink-0">
                            <span className="text-xl">🔄</span>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-1">Iterate</h4>
                            <p className="text-sm text-gray-600">Refine your prompts based on the results you get</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
