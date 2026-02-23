import Container from '@/components/layout/container'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo/metadata'
import { siteConfig } from '@/config/site'

export const metadata = generateSEOMetadata({
  title: 'Contact Us',
  description: 'Get in touch with Tools Guide Hub. We\'re here to help with your questions about AI tools, software, and digital services.',
  path: '/contact',
})

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-accent-600 text-white py-16 md:py-20 border-b-4 border-primary-700">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            {/* Icon */}
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm mb-6 shadow-xl border border-white/20">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Get in Touch
            </h1>
            <p className="text-xl md:text-2xl text-primary-50 leading-relaxed max-w-3xl mx-auto">
              Have a question or suggestion? We'd love to hear from you!
            </p>
          </div>
        </Container>
      </div>

      {/* Main Content */}
      <Container className="py-16">
        <div className="max-w-4xl mx-auto">
          {/* Contact Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Email Card */}
            <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold">Email Us</h2>
                </div>
              </div>
              <div className="p-8">
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Send us an email and we'll get back to you as soon as possible.
                </p>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="inline-flex items-center gap-2 text-lg font-semibold text-primary-600 hover:text-primary-700 transition-colors group"
                >
                  <span>{siteConfig.email}</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Social Card */}
            <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-6 text-white">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold">Follow Us</h2>
                </div>
              </div>
              <div className="p-8">
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Stay updated with our latest guides and tools on social media.
                </p>
                <div className="flex gap-4">
                  <a
                    href={siteConfig.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-12 h-12 rounded-xl bg-gray-100 hover:bg-blue-500 hover:text-white transition-all shadow-sm hover:shadow-md"
                    aria-label="Twitter"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a
                    href={siteConfig.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-12 h-12 rounded-xl bg-gray-100 hover:bg-gray-900 hover:text-white transition-all shadow-sm hover:shadow-md"
                    aria-label="GitHub"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">
              <div className="border-l-4 border-primary-500 pl-6 py-2">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  How quickly will I get a response?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  We typically respond to emails within 24-48 hours during business days.
                  For urgent matters, please mention it in your subject line.
                </p>
              </div>

              <div className="border-l-4 border-accent-500 pl-6 py-2">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Can I suggest topics for new guides?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Absolutely! We love hearing from our community. Send us your suggestions
                  and we'll do our best to create helpful content around those topics.
                </p>
              </div>

              <div className="border-l-4 border-primary-500 pl-6 py-2">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Do you offer consulting or custom services?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Currently, we focus on creating free, accessible guides and tools.
                  However, feel free to reach out with your specific needs and we'll see how we can help.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mt-12 pt-12 border-t border-gray-100">
              <div>
                <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="text-xl">⏰</span> Office Hours
                </h4>
                <p className="text-sm text-gray-600">
                  Monday – Friday: 9:00 AM – 6:00 PM (UTC+8)<br />
                  Saturday – Sunday: Limited support
                </p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="text-xl">📢</span> Media & Partnerships
                </h4>
                <p className="text-sm text-gray-600">
                  Interested in featuring our tools or a partnership? Contact our media team at <span className="font-semibold">media@toolsguidehub.com</span>
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-12 bg-gradient-to-r from-primary-600 to-accent-600 rounded-2xl p-8 md:p-12 text-white text-center shadow-xl">
            <h2 className="text-3xl font-bold mb-4">
              Explore Our Resources
            </h2>
            <p className="text-lg text-primary-50 mb-8 max-w-2xl mx-auto">
              While you're here, check out our comprehensive guides and free interactive tools
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/tools"
                className="px-8 py-4 bg-white text-primary-600 rounded-xl font-semibold hover:shadow-xl transition-all hover:-translate-y-1"
              >
                Try Our Tools
              </a>
              <a
                href="/ai-tools-platforms"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-xl font-semibold hover:bg-white/20 transition-all"
              >
                Browse Guides
              </a>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
