import Container from '@/components/layout/container'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo/metadata'
import { siteConfig } from '@/config/site'

export const metadata = generateSEOMetadata({
  title: 'Contact Us',
  description: 'Get in touch with Tools Guide Hub',
  path: '/contact',
})

export default function ContactPage() {
  return (
    <div className="bg-white min-h-screen">
      <Container className="py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 text-gray-900">Contact Us</h1>
          <div className="prose prose-lg max-w-none 
                         prose-p:text-gray-800 prose-p:leading-relaxed
                         prose-a:text-primary-600 prose-a:no-underline prose-a:font-medium
                         hover:prose-a:text-primary-700 hover:prose-a:underline">
            <p>
              Have a question or suggestion? We'd love to hear from you!
            </p>
            <p>
              Email us at:{' '}
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            </p>
          </div>
        </div>
      </Container>
    </div>
  )
}

