'use client'

import React, { useState, useMemo } from 'react'

interface ROIMetrics {
    totalCost: number
    totalSavings: number
    netBenefit: number
    roi: number
    paybackPeriod: number
    monthlyROI: number
}

export function SaasROICalculator() {
    // Cost inputs
    const [subscriptionCost, setSubscriptionCost] = useState<number>(99)
    const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly')
    const [numberOfUsers, setNumberOfUsers] = useState<number>(10)
    const [implementationCost, setImplementationCost] = useState<number>(500)
    const [trainingCost, setTrainingCost] = useState<number>(200)

    // Benefit inputs
    const [timeSavedPerUser, setTimeSavedPerUser] = useState<number>(5) // hours per week
    const [hourlyRate, setHourlyRate] = useState<number>(50)
    const [productivityIncrease, setProductivityIncrease] = useState<number>(15) // percentage
    const [errorReduction, setErrorReduction] = useState<number>(20) // percentage
    const [errorCostPerMonth, setErrorCostPerMonth] = useState<number>(1000)

    const calculations: ROIMetrics = useMemo(() => {
        // Calculate monthly subscription cost
        const monthlyCost = billingPeriod === 'monthly'
            ? subscriptionCost * numberOfUsers
            : (subscriptionCost * numberOfUsers) / 12

        // Calculate annual costs
        const annualSubscriptionCost = monthlyCost * 12
        const totalFirstYearCost = annualSubscriptionCost + implementationCost + trainingCost

        // Calculate time savings value
        const weeklyTimeSavings = timeSavedPerUser * numberOfUsers
        const monthlyTimeSavings = weeklyTimeSavings * 4.33 // average weeks per month
        const annualTimeSavings = monthlyTimeSavings * 12
        const annualTimeSavingsValue = annualTimeSavings * hourlyRate

        // Calculate productivity gains
        const monthlyProductivityValue = (monthlyCost * (productivityIncrease / 100))
        const annualProductivityValue = monthlyProductivityValue * 12

        // Calculate error reduction savings
        const monthlyErrorSavings = errorCostPerMonth * (errorReduction / 100)
        const annualErrorSavings = monthlyErrorSavings * 12

        // Total benefits
        const totalAnnualBenefit = annualTimeSavingsValue + annualProductivityValue + annualErrorSavings

        // ROI calculations
        const netBenefit = totalAnnualBenefit - totalFirstYearCost
        const roi = (netBenefit / totalFirstYearCost) * 100
        const paybackPeriod = totalFirstYearCost / (totalAnnualBenefit / 12)
        const monthlyROI = ((totalAnnualBenefit / 12) - monthlyCost) / monthlyCost * 100

        return {
            totalCost: totalFirstYearCost,
            totalSavings: totalAnnualBenefit,
            netBenefit,
            roi,
            paybackPeriod,
            monthlyROI
        }
    }, [
        subscriptionCost,
        billingPeriod,
        numberOfUsers,
        implementationCost,
        trainingCost,
        timeSavedPerUser,
        hourlyRate,
        productivityIncrease,
        errorReduction,
        errorCostPerMonth
    ])

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount)
    }

    const formatPercentage = (value: number) => {
        return `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`
    }

    return (
        <div className="space-y-8">
            {/* Input Section */}
            <div className="grid lg:grid-cols-2 gap-8">
                {/* Cost Inputs */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                    <div className="bg-gradient-to-r from-red-50 to-orange-50 p-6 border-b border-gray-200">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">💰 Costs</h2>
                        <p className="text-gray-600">Enter your SaaS investment costs</p>
                    </div>

                    <div className="p-6 space-y-6">
                        {/* Subscription Cost */}
                        <div>
                            <label htmlFor="subscription-cost" className="block text-sm font-semibold text-gray-900 mb-3">
                                Subscription Cost per User
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">$</span>
                                <input
                                    id="subscription-cost"
                                    type="number"
                                    value={subscriptionCost}
                                    onChange={(e) => setSubscriptionCost(Math.max(0, parseFloat(e.target.value) || 0))}
                                    className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all text-lg font-semibold"
                                    min="0"
                                    step="1"
                                />
                            </div>
                            <div className="mt-3 flex gap-2">
                                <button
                                    onClick={() => setBillingPeriod('monthly')}
                                    className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${billingPeriod === 'monthly'
                                            ? 'bg-emerald-600 text-white shadow-md'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    Monthly
                                </button>
                                <button
                                    onClick={() => setBillingPeriod('yearly')}
                                    className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${billingPeriod === 'yearly'
                                            ? 'bg-emerald-600 text-white shadow-md'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    Yearly
                                </button>
                            </div>
                        </div>

                        {/* Number of Users */}
                        <div>
                            <label htmlFor="num-users" className="block text-sm font-semibold text-gray-900 mb-3">
                                Number of Users
                            </label>
                            <input
                                id="num-users"
                                type="number"
                                value={numberOfUsers}
                                onChange={(e) => setNumberOfUsers(Math.max(1, parseInt(e.target.value) || 1))}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all text-lg font-semibold"
                                min="1"
                            />
                            <div className="mt-2 flex gap-2">
                                {[5, 10, 25, 50].map(val => (
                                    <button
                                        key={val}
                                        onClick={() => setNumberOfUsers(val)}
                                        className="px-3 py-1 text-xs font-medium bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                                    >
                                        {val}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Implementation Cost */}
                        <div>
                            <label htmlFor="implementation-cost" className="block text-sm font-semibold text-gray-900 mb-3">
                                One-time Implementation Cost
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">$</span>
                                <input
                                    id="implementation-cost"
                                    type="number"
                                    value={implementationCost}
                                    onChange={(e) => setImplementationCost(Math.max(0, parseFloat(e.target.value) || 0))}
                                    className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all text-lg font-semibold"
                                    min="0"
                                />
                            </div>
                        </div>

                        {/* Training Cost */}
                        <div>
                            <label htmlFor="training-cost" className="block text-sm font-semibold text-gray-900 mb-3">
                                Training & Onboarding Cost
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">$</span>
                                <input
                                    id="training-cost"
                                    type="number"
                                    value={trainingCost}
                                    onChange={(e) => setTrainingCost(Math.max(0, parseFloat(e.target.value) || 0))}
                                    className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all text-lg font-semibold"
                                    min="0"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Benefit Inputs */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 border-b border-gray-200">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">📈 Benefits</h2>
                        <p className="text-gray-600">Estimate the value you'll gain</p>
                    </div>

                    <div className="p-6 space-y-6">
                        {/* Time Saved */}
                        <div>
                            <label htmlFor="time-saved" className="block text-sm font-semibold text-gray-900 mb-3">
                                Time Saved per User (hours/week)
                            </label>
                            <input
                                id="time-saved"
                                type="number"
                                value={timeSavedPerUser}
                                onChange={(e) => setTimeSavedPerUser(Math.max(0, parseFloat(e.target.value) || 0))}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all text-lg font-semibold"
                                min="0"
                                step="0.5"
                            />
                            <div className="mt-2 flex gap-2">
                                {[2, 5, 10, 20].map(val => (
                                    <button
                                        key={val}
                                        onClick={() => setTimeSavedPerUser(val)}
                                        className="px-3 py-1 text-xs font-medium bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                                    >
                                        {val}h
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Hourly Rate */}
                        <div>
                            <label htmlFor="hourly-rate" className="block text-sm font-semibold text-gray-900 mb-3">
                                Average Hourly Rate
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">$</span>
                                <input
                                    id="hourly-rate"
                                    type="number"
                                    value={hourlyRate}
                                    onChange={(e) => setHourlyRate(Math.max(0, parseFloat(e.target.value) || 0))}
                                    className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all text-lg font-semibold"
                                    min="0"
                                />
                            </div>
                        </div>

                        {/* Productivity Increase */}
                        <div>
                            <label htmlFor="productivity" className="block text-sm font-semibold text-gray-900 mb-3">
                                Productivity Increase (%)
                            </label>
                            <input
                                id="productivity"
                                type="number"
                                value={productivityIncrease}
                                onChange={(e) => setProductivityIncrease(Math.max(0, parseFloat(e.target.value) || 0))}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all text-lg font-semibold"
                                min="0"
                                max="100"
                            />
                            <input
                                type="range"
                                value={productivityIncrease}
                                onChange={(e) => setProductivityIncrease(parseFloat(e.target.value))}
                                className="w-full mt-2"
                                min="0"
                                max="100"
                            />
                        </div>

                        {/* Error Reduction */}
                        <div>
                            <label htmlFor="error-reduction" className="block text-sm font-semibold text-gray-900 mb-3">
                                Error Reduction (%)
                            </label>
                            <input
                                id="error-reduction"
                                type="number"
                                value={errorReduction}
                                onChange={(e) => setErrorReduction(Math.max(0, parseFloat(e.target.value) || 0))}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all text-lg font-semibold"
                                min="0"
                                max="100"
                            />
                            <input
                                type="range"
                                value={errorReduction}
                                onChange={(e) => setErrorReduction(parseFloat(e.target.value))}
                                className="w-full mt-2"
                                min="0"
                                max="100"
                            />
                        </div>

                        {/* Error Cost */}
                        <div>
                            <label htmlFor="error-cost" className="block text-sm font-semibold text-gray-900 mb-3">
                                Monthly Cost of Errors
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">$</span>
                                <input
                                    id="error-cost"
                                    type="number"
                                    value={errorCostPerMonth}
                                    onChange={(e) => setErrorCostPerMonth(Math.max(0, parseFloat(e.target.value) || 0))}
                                    className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all text-lg font-semibold"
                                    min="0"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Results Section */}
            <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-2xl shadow-2xl border-2 border-emerald-700 overflow-hidden">
                <div className="p-8 md:p-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
                        Your ROI Analysis
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        {/* Total Investment */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                            <div className="text-emerald-100 text-sm font-medium mb-2">Total First Year Investment</div>
                            <div className="text-3xl font-bold text-white">{formatCurrency(calculations.totalCost)}</div>
                        </div>

                        {/* Total Savings */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                            <div className="text-emerald-100 text-sm font-medium mb-2">Total Annual Benefit</div>
                            <div className="text-3xl font-bold text-white">{formatCurrency(calculations.totalSavings)}</div>
                        </div>

                        {/* Net Benefit */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                            <div className="text-emerald-100 text-sm font-medium mb-2">Net Benefit (Year 1)</div>
                            <div className={`text-3xl font-bold ${calculations.netBenefit >= 0 ? 'text-white' : 'text-red-300'}`}>
                                {formatCurrency(calculations.netBenefit)}
                            </div>
                        </div>
                    </div>

                    {/* Key Metrics */}
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* ROI Percentage */}
                        <div className="bg-white rounded-2xl p-8 shadow-xl">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-900">Return on Investment</h3>
                                <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                                    <span className="text-2xl">📊</span>
                                </div>
                            </div>
                            <div className={`text-5xl font-bold mb-2 ${calculations.roi >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                                {formatPercentage(calculations.roi)}
                            </div>
                            <p className="text-gray-600">
                                {calculations.roi >= 0
                                    ? `You'll gain ${formatPercentage(calculations.roi)} return on your investment`
                                    : 'Investment may not pay off in the first year'
                                }
                            </p>
                        </div>

                        {/* Payback Period */}
                        <div className="bg-white rounded-2xl p-8 shadow-xl">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-900">Payback Period</h3>
                                <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center">
                                    <span className="text-2xl">⏱️</span>
                                </div>
                            </div>
                            <div className="text-5xl font-bold text-teal-600 mb-2">
                                {calculations.paybackPeriod.toFixed(1)}
                            </div>
                            <p className="text-gray-600">
                                months to recover your initial investment
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Breakdown Section */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Detailed Breakdown</h3>

                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <span className="text-gray-700 font-medium">Monthly Subscription Cost</span>
                        <span className="text-xl font-bold text-gray-900">
                            {formatCurrency((billingPeriod === 'monthly' ? subscriptionCost : subscriptionCost / 12) * numberOfUsers)}
                        </span>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-xl">
                        <span className="text-gray-700 font-medium">Monthly ROI</span>
                        <span className={`text-xl font-bold ${calculations.monthlyROI >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                            {formatPercentage(calculations.monthlyROI)}
                        </span>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <span className="text-gray-700 font-medium">Break-even Point</span>
                        <span className="text-xl font-bold text-gray-900">
                            {calculations.paybackPeriod < 12 ? `${calculations.paybackPeriod.toFixed(1)} months` : `${(calculations.paybackPeriod / 12).toFixed(1)} years`}
                        </span>
                    </div>
                </div>
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    Understanding Your Results
                </h4>
                <ul className="space-y-2 text-sm text-blue-900">
                    <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-0.5">•</span>
                        <span><strong>Positive ROI:</strong> Indicates the investment is worthwhile and will generate returns</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-0.5">•</span>
                        <span><strong>Payback Period:</strong> How long until you recover your initial investment</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-0.5">•</span>
                        <span><strong>Monthly ROI:</strong> The ongoing return you get each month after the payback period</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-0.5">•</span>
                        <span>These calculations are estimates based on your inputs - actual results may vary</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}
