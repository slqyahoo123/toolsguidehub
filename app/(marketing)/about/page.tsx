import Container from '@/components/layout/container'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo/metadata'

export const metadata = generateSEOMetadata({
  title: 'About Us',
  description: 'We help everyday users understand and fix issues with modern AI tools, software, and digital services.',
  path: '/about',
})

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Container className="py-16 md:py-24">
        {/* Hero Section */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900">
            About Tools Guide Hub
          </h1>
          <p className="text-xl md:text-2xl text-gray-800 leading-relaxed mb-8">
            We help everyday users understand and fix issues with modern AI tools, software, and digital services.
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none 
                         prose-headings:font-bold prose-headings:text-gray-900
                         prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-b prose-h2:border-gray-200 prose-h2:pb-3 prose-h2:text-gray-900
                         prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-h3:text-gray-900
                         prose-p:text-gray-800 prose-p:leading-relaxed prose-p:text-base
                         prose-a:text-primary-600 prose-a:no-underline prose-a:font-medium
                         hover:prose-a:text-primary-700 hover:prose-a:underline
                         prose-strong:text-gray-900 prose-strong:font-semibold
                         prose-ul:text-gray-800 prose-li:my-3 prose-li:leading-relaxed
                         prose-blockquote:border-l-4 prose-blockquote:border-primary-400 
                         prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:bg-gray-50 prose-blockquote:text-gray-800 prose-blockquote:py-2 prose-blockquote:rounded-r-lg">
            
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Our Mission</h2>
              <p className="text-lg text-gray-800 leading-relaxed mb-6">
                At Tools Guide Hub, we believe that technology should be accessible to everyone. 
                Our mission is to empower everyday users by providing clear, comprehensive guides 
                and solutions for the modern digital world.
              </p>
              <p className="text-lg text-gray-800 leading-relaxed">
                We help everyday users understand and fix issues with modern AI tools, software, 
                and digital services. Whether you're troubleshooting a problem, learning how to 
                use a new tool, or managing your accounts and subscriptions, we're here to help.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">What We Do</h2>
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="p-6 bg-white border-2 border-gray-100 rounded-xl hover:border-primary-200 transition-all card-hover">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-xl mb-4">
                    🤖
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">AI Tools & Platforms</h3>
                  <p className="text-gray-700">
                    Comprehensive guides for understanding and using AI tools, platforms, and artificial intelligence solutions.
                  </p>
                </div>

                <div className="p-6 bg-white border-2 border-gray-100 rounded-xl hover:border-primary-200 transition-all card-hover">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-xl mb-4">
                    🔧
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">Software & SaaS Issues</h3>
                  <p className="text-gray-700">
                    Solutions and guides for common software and SaaS platform issues, errors, and troubleshooting.
                  </p>
                </div>

                <div className="p-6 bg-white border-2 border-gray-100 rounded-xl hover:border-primary-200 transition-all card-hover">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-xl mb-4">
                    👤
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">Accounts & Subscriptions</h3>
                  <p className="text-gray-700">
                    Helpful guides for managing accounts, subscriptions, billing, and account-related issues.
                  </p>
                </div>

                <div className="p-6 bg-white border-2 border-gray-100 rounded-xl hover:border-primary-200 transition-all card-hover">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-xl mb-4">
                    💡
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">How Things Work</h3>
                  <p className="text-gray-700">
                    Explanatory guides and tutorials explaining how various technologies, tools, and systems work.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Our Approach</h2>
              <ul className="space-y-4 text-gray-800">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-primary-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span><strong>Clear & Simple:</strong> We break down complex topics into easy-to-understand guides.</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-primary-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span><strong>Step-by-Step:</strong> Our guides provide detailed, actionable instructions.</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-primary-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span><strong>Up-to-Date:</strong> We regularly update our content to reflect the latest tools and best practices.</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-primary-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span><strong>User-Focused:</strong> Every guide is written with the everyday user in mind.</span>
                </li>
              </ul>
            </section>

            <section className="mb-12 bg-gray-50 rounded-2xl p-8 md:p-12 border border-gray-200">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Get Started</h2>
              <p className="text-lg text-gray-800 leading-relaxed mb-6">
                Ready to solve your tech problems or learn something new? Browse our categories 
                to find the guide you need, or use our search to find specific solutions.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="/ai-tools-platforms"
                  className="px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-all shadow-medium hover:shadow-large transform hover:-translate-y-1"
                >
                  Explore AI Tools
                </a>
                <a
                  href="/troubleshooting-guides"
                  className="px-6 py-3 bg-white text-primary-600 border-2 border-primary-600 rounded-lg font-semibold hover:bg-primary-50 transition-all"
                >
                  Find Solutions
                </a>
              </div>
            </section>
          </div>
        </div>
      </Container>
    </div>
  )
}

