import Container from '@/components/layout/container'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo/metadata'
import Link from 'next/link'

export const metadata = generateSEOMetadata({
  title: 'About Us',
  description: 'Learn about Tools Guide Hub - your trusted source for AI tools, software guides, and free interactive calculators. We help everyday users understand modern technology.',
  path: '/about',
})

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-accent-600 text-white py-20 md:py-28 border-b-4 border-primary-700">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            {/* Icon */}
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-white/10 backdrop-blur-sm mb-8 shadow-xl border border-white/20">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              About Tools Guide Hub
            </h1>
            <p className="text-xl md:text-2xl text-primary-50 leading-relaxed max-w-3xl mx-auto">
              Empowering everyday users with knowledge, guides, and free tools for the modern digital world
            </p>
          </div>
        </Container>
      </div>

      {/* Main Content */}
      <Container className="py-16">
        <div className="max-w-6xl mx-auto">
          {/* Mission Section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Our Mission
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-200 p-8 md:p-12">
                <div className="prose prose-lg max-w-none">
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    At Tools Guide Hub, we believe that <strong>technology should be accessible to everyone</strong>.
                    Our mission is to empower everyday users by providing clear, comprehensive guides
                    and solutions for the modern digital world.
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Whether you're troubleshooting a problem, learning how to use a new AI tool,
                    or trying to understand how subscription services work, we're here to help you
                    navigate the complexity with confidence.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 text-white shadow-xl">
                  <div className="text-4xl font-bold mb-2">500+</div>
                  <div className="text-blue-100">Helpful Guides</div>
                </div>
                <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-6 text-white shadow-xl">
                  <div className="text-4xl font-bold mb-2">3</div>
                  <div className="text-purple-100">Free Tools</div>
                </div>
                <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white shadow-xl">
                  <div className="text-4xl font-bold mb-2">24/7</div>
                  <div className="text-emerald-100">Available</div>
                </div>
                <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-6 text-white shadow-xl">
                  <div className="text-4xl font-bold mb-2">100%</div>
                  <div className="text-amber-100">Free Access</div>
                </div>
              </div>
            </div>
          </div>

          {/* What We Do Section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                What We Do
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Card 1 */}
              <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300 group">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white">
                  <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
                    🤖
                  </div>
                  <h3 className="text-xl font-bold">AI Tools & Platforms</h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 leading-relaxed">
                    Comprehensive guides for understanding and using AI tools, platforms, and artificial intelligence solutions.
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300 group">
                <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-6 text-white">
                  <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
                    🔧
                  </div>
                  <h3 className="text-xl font-bold">Software & SaaS</h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 leading-relaxed">
                    Solutions and guides for common software and SaaS platform issues, errors, and troubleshooting.
                  </p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300 group">
                <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6 text-white">
                  <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
                    🛠️
                  </div>
                  <h3 className="text-xl font-bold">Free Tools</h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 leading-relaxed">
                    Interactive calculators and generators to help you make better decisions about AI and SaaS investments.
                  </p>
                </div>
              </div>

              {/* Card 4 */}
              <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300 group">
                <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-6 text-white">
                  <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
                    💡
                  </div>
                  <h3 className="text-xl font-bold">How Things Work</h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 leading-relaxed">
                    Explanatory guides and tutorials explaining how various technologies, tools, and systems work.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Our Approach Section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Our Approach
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto rounded-full"></div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-200 p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Clear & Simple</h3>
                    <p className="text-gray-600 leading-relaxed">
                      We break down complex topics into easy-to-understand guides that anyone can follow.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-500 to-accent-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Step-by-Step</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Our guides provide detailed, actionable instructions that get you results.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-accent-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Up-to-Date</h3>
                    <p className="text-gray-600 leading-relaxed">
                      We regularly update our content to reflect the latest tools and best practices.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-500 to-primary-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">User-Focused</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Every guide is written with the everyday user in mind, not tech experts.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Editorial Standards Section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Editorial Standards
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto rounded-full"></div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-200 p-8 md:p-12">
              <div className="prose prose-lg max-w-none text-gray-700">
                <p>
                  At Tools Guide Hub, we maintain strict editorial standards to ensure our readers receive
                  the most accurate and helpful information. Every guide and tool calculation on our
                  site undergoes a rigorous review process:
                </p>
                <div className="grid md:grid-cols-2 gap-8 mt-8">
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <h4 className="font-bold text-gray-900 mb-2">Accuracy First</h4>
                    <p className="text-sm">We fact-check every technical instruction and verify calculation formulas against official documentation from providers like OpenAI, Anthropic, and Google.</p>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <h4 className="font-bold text-gray-900 mb-2">Regular Updates</h4>
                    <p className="text-sm">The digital world moves fast. We review our primary guides monthly to ensure they reflect the latest software updates and pricing changes.</p>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <h4 className="font-bold text-gray-900 mb-2">Objectivity</h4>
                    <p className="text-sm">Our tool comparisons and software reviews are unbiased. We highlight both the pros and cons to help you make the best decision for your specific needs.</p>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <h4 className="font-bold text-gray-900 mb-2">User Experience</h4>
                    <p className="text-sm">We prioritize clarity and simplicity. If a guide is too complex, we rewrite it until it's accessible to an everyday user.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Expert Team Section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Meet the Experts
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-200 p-8 flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left transition-all hover:border-primary-300">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex-shrink-0 shadow-lg border-4 border-white flex items-center justify-center text-4xl">
                  👨‍💻
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Alex Chen</h3>
                  <p className="text-primary-600 font-semibold mb-3">Lead AI Strategist</p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    With over 10 years of experience in software engineering and 3 years specializing in LLM implementations,
                    Alex ensures our technical guides are both deep and accurate.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-200 p-8 flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left transition-all hover:border-accent-300">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex-shrink-0 shadow-lg border-4 border-white flex items-center justify-center text-4xl">
                  👩‍💼
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Sarah Miller</h3>
                  <p className="text-accent-600 font-semibold mb-3">SaaS Optimization Expert</p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Sarah focuses on software economics and productivity. She has helped dozens of startups optimize
                    their SaaS stack to reduce waste and improve ROI.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Our Values
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border-2 border-blue-200">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Accessibility</h3>
                <p className="text-gray-700 leading-relaxed">
                  Technology should be accessible to everyone, regardless of their technical background.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border-2 border-purple-200">
                <div className="text-4xl mb-4">✨</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Quality</h3>
                <p className="text-gray-700 leading-relaxed">
                  We're committed to creating high-quality, accurate, and helpful content.
                </p>
              </div>

              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 border-2 border-emerald-200">
                <div className="text-4xl mb-4">🤝</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Community</h3>
                <p className="text-gray-700 leading-relaxed">
                  We listen to our community and create content based on real user needs.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-primary-600 to-accent-600 rounded-2xl p-8 md:p-12 text-white shadow-2xl">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-primary-50 mb-8 leading-relaxed">
                Explore our comprehensive guides or try our free interactive tools
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/tools"
                  className="px-8 py-4 bg-white text-primary-600 rounded-xl font-semibold hover:shadow-xl transition-all hover:-translate-y-1"
                >
                  Try Our Free Tools
                </Link>
                <Link
                  href="/ai-tools-platforms"
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-xl font-semibold hover:bg-white/20 transition-all"
                >
                  Browse AI Guides
                </Link>
                <Link
                  href="/contact"
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-xl font-semibold hover:bg-white/20 transition-all"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
