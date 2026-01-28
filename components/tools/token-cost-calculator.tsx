'use client'

import React, { useState, useMemo } from 'react'

interface AIModel {
    id: string
    name: string
    provider: string
    inputCost: number  // Cost per 1M tokens
    outputCost: number // Cost per 1M tokens
    color: string
}

const AI_MODELS: AIModel[] = [
    {
        id: 'gpt-4o',
        name: 'GPT-4o',
        provider: 'OpenAI',
        inputCost: 2.50,
        outputCost: 10.00,
        color: 'from-emerald-500 to-teal-600'
    },
    {
        id: 'gpt-4-turbo',
        name: 'GPT-4 Turbo',
        provider: 'OpenAI',
        inputCost: 10.00,
        outputCost: 30.00,
        color: 'from-blue-500 to-indigo-600'
    },
    {
        id: 'gpt-3.5-turbo',
        name: 'GPT-3.5 Turbo',
        provider: 'OpenAI',
        inputCost: 0.50,
        outputCost: 1.50,
        color: 'from-green-500 to-emerald-600'
    },
    {
        id: 'claude-3-opus',
        name: 'Claude 3 Opus',
        provider: 'Anthropic',
        inputCost: 15.00,
        outputCost: 75.00,
        color: 'from-purple-500 to-pink-600'
    },
    {
        id: 'claude-3-sonnet',
        name: 'Claude 3.5 Sonnet',
        provider: 'Anthropic',
        inputCost: 3.00,
        outputCost: 15.00,
        color: 'from-violet-500 to-purple-600'
    },
    {
        id: 'claude-3-haiku',
        name: 'Claude 3 Haiku',
        provider: 'Anthropic',
        inputCost: 0.25,
        outputCost: 1.25,
        color: 'from-pink-500 to-rose-600'
    },
    {
        id: 'gemini-pro',
        name: 'Gemini 1.5 Pro',
        provider: 'Google',
        inputCost: 1.25,
        outputCost: 5.00,
        color: 'from-amber-500 to-orange-600'
    },
]

export function TokenCostCalculator() {
    const [selectedModels, setSelectedModels] = useState<string[]>(['gpt-4o', 'claude-3-sonnet'])
    const [inputTokens, setInputTokens] = useState<number>(1000)
    const [outputTokens, setOutputTokens] = useState<number>(2000)
    const [requestsPerDay, setRequestsPerDay] = useState<number>(100)

    const toggleModel = (modelId: string) => {
        setSelectedModels(prev =>
            prev.includes(modelId)
                ? prev.filter(id => id !== modelId)
                : [...prev, modelId]
        )
    }

    const calculations = useMemo(() => {
        return AI_MODELS.filter(model => selectedModels.includes(model.id)).map(model => {
            const inputCost = (inputTokens / 1_000_000) * model.inputCost
            const outputCost = (outputTokens / 1_000_000) * model.outputCost
            const costPerRequest = inputCost + outputCost
            const dailyCost = costPerRequest * requestsPerDay
            const monthlyCost = dailyCost * 30
            const yearlyCost = dailyCost * 365

            return {
                model,
                inputCost,
                outputCost,
                costPerRequest,
                dailyCost,
                monthlyCost,
                yearlyCost
            }
        }).sort((a, b) => a.costPerRequest - b.costPerRequest)
    }, [selectedModels, inputTokens, outputTokens, requestsPerDay])

    const formatCurrency = (amount: number) => {
        if (amount < 0.01) return `$${amount.toFixed(4)}`
        if (amount < 1) return `$${amount.toFixed(3)}`
        return `$${amount.toFixed(2)}`
    }

    return (
        <div className="space-y-8">
            {/* Calculator Card */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-primary-50 to-accent-50 p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Calculate Your AI Costs</h2>
                    <p className="text-gray-600">Adjust the parameters below to estimate your AI API costs</p>
                </div>

                <div className="p-6 md:p-8 space-y-8">
                    {/* Model Selection */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-4">
                            Select AI Models to Compare
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                            {AI_MODELS.map(model => (
                                <button
                                    key={model.id}
                                    onClick={() => toggleModel(model.id)}
                                    className={`
                    relative p-4 rounded-xl border-2 transition-all duration-200 text-left
                    ${selectedModels.includes(model.id)
                                            ? 'border-primary-500 bg-primary-50 shadow-md'
                                            : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                                        }
                  `}
                                >
                                    <div className="flex items-start justify-between gap-2">
                                        <div className="flex-1 min-w-0">
                                            <div className="font-semibold text-gray-900 mb-1">{model.name}</div>
                                            <div className="text-xs text-gray-500">{model.provider}</div>
                                        </div>
                                        <div className={`
                      w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0
                      ${selectedModels.includes(model.id)
                                                ? 'border-primary-500 bg-primary-500'
                                                : 'border-gray-300'
                                            }
                    `}>
                                            {selectedModels.includes(model.id) && (
                                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            )}
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Input Parameters */}
                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Input Tokens */}
                        <div>
                            <label htmlFor="input-tokens" className="block text-sm font-semibold text-gray-900 mb-3">
                                Input Tokens per Request
                            </label>
                            <div className="relative">
                                <input
                                    id="input-tokens"
                                    type="number"
                                    value={inputTokens}
                                    onChange={(e) => setInputTokens(Math.max(0, parseInt(e.target.value) || 0))}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all text-lg font-semibold"
                                    min="0"
                                    step="100"
                                />
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400 font-medium">
                                    tokens
                                </div>
                            </div>
                            <div className="mt-2 flex gap-2">
                                {[500, 1000, 5000].map(val => (
                                    <button
                                        key={val}
                                        onClick={() => setInputTokens(val)}
                                        className="px-3 py-1 text-xs font-medium bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                                    >
                                        {val.toLocaleString()}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Output Tokens */}
                        <div>
                            <label htmlFor="output-tokens" className="block text-sm font-semibold text-gray-900 mb-3">
                                Output Tokens per Request
                            </label>
                            <div className="relative">
                                <input
                                    id="output-tokens"
                                    type="number"
                                    value={outputTokens}
                                    onChange={(e) => setOutputTokens(Math.max(0, parseInt(e.target.value) || 0))}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all text-lg font-semibold"
                                    min="0"
                                    step="100"
                                />
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400 font-medium">
                                    tokens
                                </div>
                            </div>
                            <div className="mt-2 flex gap-2">
                                {[1000, 2000, 10000].map(val => (
                                    <button
                                        key={val}
                                        onClick={() => setOutputTokens(val)}
                                        className="px-3 py-1 text-xs font-medium bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                                    >
                                        {val.toLocaleString()}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Requests per Day */}
                        <div>
                            <label htmlFor="requests-per-day" className="block text-sm font-semibold text-gray-900 mb-3">
                                Requests per Day
                            </label>
                            <div className="relative">
                                <input
                                    id="requests-per-day"
                                    type="number"
                                    value={requestsPerDay}
                                    onChange={(e) => setRequestsPerDay(Math.max(0, parseInt(e.target.value) || 0))}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all text-lg font-semibold"
                                    min="0"
                                    step="10"
                                />
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400 font-medium">
                                    req/day
                                </div>
                            </div>
                            <div className="mt-2 flex gap-2">
                                {[50, 100, 500].map(val => (
                                    <button
                                        key={val}
                                        onClick={() => setRequestsPerDay(val)}
                                        className="px-3 py-1 text-xs font-medium bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                                    >
                                        {val}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Results */}
            {calculations.length > 0 ? (
                <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-gray-900">Cost Comparison</h3>

                    {calculations.map((calc, index) => (
                        <div
                            key={calc.model.id}
                            className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300"
                        >
                            {/* Model Header */}
                            <div className={`bg-gradient-to-r ${calc.model.color} p-6 text-white`}>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="text-2xl font-bold mb-1">{calc.model.name}</h4>
                                        <p className="text-white/90">{calc.model.provider}</p>
                                    </div>
                                    {index === 0 && (
                                        <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
                                            <span className="text-sm font-semibold">🏆 Most Affordable</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Cost Breakdown */}
                            <div className="p-6">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                    <div>
                                        <div className="text-sm text-gray-500 mb-1">Per Request</div>
                                        <div className="text-2xl font-bold text-gray-900">
                                            {formatCurrency(calc.costPerRequest)}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-500 mb-1">Daily Cost</div>
                                        <div className="text-2xl font-bold text-primary-600">
                                            {formatCurrency(calc.dailyCost)}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-500 mb-1">Monthly Cost</div>
                                        <div className="text-2xl font-bold text-accent-600">
                                            {formatCurrency(calc.monthlyCost)}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-500 mb-1">Yearly Cost</div>
                                        <div className="text-2xl font-bold text-gray-900">
                                            {formatCurrency(calc.yearlyCost)}
                                        </div>
                                    </div>
                                </div>

                                {/* Token Cost Details */}
                                <div className="mt-6 pt-6 border-t border-gray-200">
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Input cost:</span>
                                            <span className="font-semibold text-gray-900">{formatCurrency(calc.inputCost)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Output cost:</span>
                                            <span className="font-semibold text-gray-900">{formatCurrency(calc.outputCost)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-8 text-center">
                    <div className="text-4xl mb-4">👆</div>
                    <p className="text-lg text-amber-900 font-medium">
                        Please select at least one AI model to see cost calculations
                    </p>
                </div>
            )}

            {/* Info Section */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    How to Use This Calculator
                </h4>
                <ul className="space-y-2 text-sm text-blue-900">
                    <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-0.5">•</span>
                        <span><strong>Input Tokens:</strong> The number of tokens in your prompt (roughly 1 token = 4 characters)</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-0.5">•</span>
                        <span><strong>Output Tokens:</strong> The number of tokens in the AI's response</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-0.5">•</span>
                        <span><strong>Requests per Day:</strong> How many API calls you make daily</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-0.5">•</span>
                        <span>All prices are based on official pricing as of January 2026 and are subject to change</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}
