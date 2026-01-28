import { ToolLayout } from '@/components/tools/tool-layout'
import { SaasROICalculator } from '@/components/tools/saas-roi-calculator'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo/metadata'
import type { Metadata } from 'next'

export const metadata: Metadata = generateSEOMetadata({
    title: 'SaaS ROI Calculator - Calculate Return on Investment for Software',
    description: 'Free SaaS ROI calculator. Calculate return on investment, payback period, and cost-benefit analysis for software subscriptions and cloud services.',
    path: '/tools/saas-roi-calculator',
})

export default function SaasROICalculatorPage() {
    return (
        <ToolLayout
            title="SaaS ROI Calculator"
            description="Calculate the return on investment for your SaaS subscriptions and software tools"
            icon={
                <svg className="w-12 h-12 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            }
        >
            <SaasROICalculator />

            {/* SEO Content Section */}
            <div className="mt-16 prose prose-lg max-w-none">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 md:p-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">
                        Understanding SaaS ROI
                    </h2>

                    <div className="space-y-6 text-gray-700 leading-relaxed">
                        <p>
                            Return on Investment (ROI) is a critical metric for evaluating whether a SaaS tool or
                            software subscription is worth the cost. Our calculator helps you quantify the financial
                            impact of your software investments by comparing costs against tangible benefits.
                        </p>

                        <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                            What is SaaS ROI?
                        </h3>
                        <p>
                            SaaS ROI measures the financial return you get from a software subscription relative to
                            its cost. A positive ROI means the software generates more value than it costs, while a
                            negative ROI suggests the investment may not be worthwhile.
                        </p>

                        <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 my-6 rounded-r-xl">
                            <p className="text-emerald-900 font-mono text-sm">
                                <strong>ROI Formula:</strong><br />
                                ROI = (Total Benefits - Total Costs) / Total Costs × 100%
                            </p>
                        </div>

                        <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                            Key Components of SaaS ROI
                        </h3>

                        <h4 className="text-xl font-bold text-gray-900 mt-6 mb-3">Costs to Consider</h4>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Subscription fees:</strong> Monthly or annual software licensing costs</li>
                            <li><strong>Implementation costs:</strong> Setup, configuration, and integration expenses</li>
                            <li><strong>Training costs:</strong> Time and resources spent onboarding users</li>
                            <li><strong>Migration costs:</strong> Data transfer from previous systems</li>
                            <li><strong>Maintenance:</strong> Ongoing support and customization needs</li>
                        </ul>

                        <h4 className="text-xl font-bold text-gray-900 mt-6 mb-3">Benefits to Measure</h4>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Time savings:</strong> Hours saved through automation and efficiency</li>
                            <li><strong>Productivity gains:</strong> Increased output from existing resources</li>
                            <li><strong>Error reduction:</strong> Fewer mistakes and associated costs</li>
                            <li><strong>Revenue increase:</strong> New capabilities that drive sales</li>
                            <li><strong>Cost avoidance:</strong> Expenses prevented by the software</li>
                        </ul>

                        <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                            How to Calculate SaaS ROI
                        </h3>
                        <ol className="list-decimal pl-6 space-y-3">
                            <li>
                                <strong>Identify all costs:</strong> Include subscription, implementation, training,
                                and any hidden costs
                            </li>
                            <li>
                                <strong>Quantify benefits:</strong> Convert time savings, productivity gains, and
                                error reduction into dollar values
                            </li>
                            <li>
                                <strong>Calculate net benefit:</strong> Subtract total costs from total benefits
                            </li>
                            <li>
                                <strong>Determine ROI percentage:</strong> Divide net benefit by total costs and
                                multiply by 100
                            </li>
                            <li>
                                <strong>Find payback period:</strong> Calculate how many months until you recover
                                your investment
                            </li>
                        </ol>

                        <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                            What is a Good SaaS ROI?
                        </h3>
                        <p>
                            While ROI benchmarks vary by industry and use case, here are general guidelines:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>100%+ ROI:</strong> Excellent - the software pays for itself and generates significant additional value</li>
                            <li><strong>50-100% ROI:</strong> Good - solid return that justifies the investment</li>
                            <li><strong>0-50% ROI:</strong> Acceptable - positive return but may need optimization</li>
                            <li><strong>Negative ROI:</strong> Concerning - costs exceed benefits, reconsider the investment</li>
                        </ul>

                        <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                            Understanding Payback Period
                        </h3>
                        <p>
                            The payback period tells you how long it takes to recover your initial investment.
                            A shorter payback period is generally better:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Under 6 months:</strong> Excellent - quick return on investment</li>
                            <li><strong>6-12 months:</strong> Good - reasonable timeframe for most businesses</li>
                            <li><strong>12-24 months:</strong> Acceptable - longer term but still viable</li>
                            <li><strong>Over 24 months:</strong> Risky - consider alternatives or negotiate better terms</li>
                        </ul>

                        <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                            Tips for Maximizing SaaS ROI
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4 mt-4">
                            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                                <h4 className="font-bold text-gray-900 mb-2">✅ Choose the Right Plan</h4>
                                <p className="text-sm text-gray-600">
                                    Don't overpay for features you won't use. Start with a basic plan and scale up as needed.
                                </p>
                            </div>

                            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                                <h4 className="font-bold text-gray-900 mb-2">📚 Invest in Training</h4>
                                <p className="text-sm text-gray-600">
                                    Proper training ensures users leverage all features, maximizing productivity gains.
                                </p>
                            </div>

                            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                                <h4 className="font-bold text-gray-900 mb-2">🔄 Review Regularly</h4>
                                <p className="text-sm text-gray-600">
                                    Reassess ROI quarterly to ensure the software continues to deliver value.
                                </p>
                            </div>

                            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                                <h4 className="font-bold text-gray-900 mb-2">🤝 Negotiate Terms</h4>
                                <p className="text-sm text-gray-600">
                                    Annual billing often offers discounts. Don't hesitate to negotiate with vendors.
                                </p>
                            </div>
                        </div>

                        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mt-8 rounded-r-xl">
                            <p className="text-blue-900 font-medium">
                                💡 <strong>Pro Tip:</strong> Track actual results after implementation and compare them
                                to your ROI projections. This helps you make better decisions for future software investments
                                and identify areas where you can improve adoption and usage.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </ToolLayout>
    )
}
