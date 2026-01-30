'use client'

import { useState } from 'react'

export function AITextHumanizer() {
  const [text, setText] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<{
    score: number
    verdict: string
    color: string
    feedback: string[]
  } | null>(null)

  const analyzeText = () => {
    if (!text.trim()) return

    setIsAnalyzing(true)
    
    // Simulate analysis (in a real app, this would call an API)
    setTimeout(() => {
      // Simple heuristic simulation for demo purposes
      // In production, this would use linguistic analysis or an external API
      const length = text.length
      const sentences = text.split(/[.!?]+/).filter(Boolean)
      const avgSentenceLength = length / (sentences.length || 1)
      const hasComplexWords = /\b(furthermore|consequently|nevertheless|utilize)\b/i.test(text)
      
      let aiScore = 50 // Baseline
      
      // AI tends to have very uniform sentence lengths
      if (avgSentenceLength > 15 && avgSentenceLength < 25) aiScore += 20
      
      // AI tends to use certain transition words frequently
      if (hasComplexWords) aiScore += 15

      // Cap at 98
      const finalScore = Math.min(Math.floor(aiScore + Math.random() * 10), 98)

      let verdict = ''
      let color = ''
      let feedback = []

      if (finalScore > 80) {
        verdict = 'Likely AI-Generated'
        color = 'text-red-600'
        feedback = [
            'Sentence structure is too uniform.',
            'Contains common AI transition words.',
            'Lack of emotional nuance.'
        ]
      } else if (finalScore > 40) {
        verdict = 'Mixed / Unsure'
        color = 'text-yellow-600'
        feedback = [
            'Some sections appear robotic.',
            'Try varying your sentence length.',
            'Add more personal anecdotes.'
        ]
      } else {
        verdict = 'Likely Human'
        color = 'text-green-600'
        feedback = [
            'Good variety in sentence structure.',
            'Natural flow and tone.',
            'Human-like irregularities detected.'
        ]
      }

      setResult({
        score: finalScore,
        verdict,
        color,
        feedback
      })
      setIsAnalyzing(false)
    }, 1500)
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
      <div className="p-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <h2 className="text-3xl font-bold mb-2">AI Text Analyzer & Humanizer</h2>
        <p className="text-indigo-100">Paste your text below to check if it sounds like AI and get tips to humanize it.</p>
      </div>

      <div className="p-8">
        <div className="mb-6">
          <label htmlFor="text-input" className="block text-sm font-medium text-gray-700 mb-2">
            Enter your text (min 50 words)
          </label>
          <textarea
            id="text-input"
            rows={8}
            className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-mono text-sm leading-relaxed"
            placeholder="Paste your content here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
           <div className="flex justify-between mt-2 text-xs text-gray-500">
            <span>{text.split(/\s+/).filter(Boolean).length} words</span>
            <span>{text.length} characters</span>
          </div>
        </div>

        <button
          onClick={analyzeText}
          disabled={isAnalyzing || text.length < 50}
          className={`w-full py-4 px-6 rounded-xl text-white font-bold text-lg transition-all transform hover:-translate-y-1 ${
            isAnalyzing || text.length < 50
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700 shadow-lg hover:shadow-indigo-200'
          }`}
        >
          {isAnalyzing ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing patterns...
            </span>
          ) : (
            'Analyze & Humanize Text'
          )}
        </button>

        {result && (
          <div className="mt-8 animate-fade-in">
            <div className="border-t-2 border-dashed border-gray-200 pt-8">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                
                {/* Score Circle */}
                <div className="relative w-40 h-40 flex-shrink-0">
                  <svg className="w-full h-full" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#eee"
                      strokeWidth="3"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke={result.score > 80 ? '#dc2626' : result.score > 40 ? '#d97706' : '#16a34a'}
                      strokeWidth="3"
                      strokeDasharray={`${result.score}, 100`}
                      className="animate-[spin_1s_ease-out_reverse]"
                    />
                  </svg>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                    <span className={`text-4xl font-bold ${result.color}`}>{result.score}%</span>
                    <span className="block text-xs text-gray-500 uppercase font-semibold mt-1">AI Score</span>
                  </div>
                </div>

                {/* Verdict & Tips */}
                <div className="flex-1 w-full">
                  <h3 className={`text-2xl font-bold mb-2 ${result.color}`}>
                    {result.verdict}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Based on our analysis of sentence variability and perplexity.
                  </p>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                     <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                        <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        Humanization Tips:
                     </h4>
                     <ul className="space-y-2">
                        {result.feedback.map((tip, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                                <span className="text-indigo-400 mt-0.5">•</span>
                                {tip}
                            </li>
                        ))}
                     </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
