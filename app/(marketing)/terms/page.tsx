import Container from '@/components/layout/container'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo/metadata'

export const metadata = generateSEOMetadata({
    title: 'Terms of Service',
    description: 'Terms of service for Tools Guide Hub - the rules for using our free tools and guides.',
    path: '/terms',
})

export default function TermsPage() {
    const lastUpdated = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })

    return (
        <Container className="py-20 md:py-28">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
                    Terms of Service
                </h1>
                <p className="text-gray-500 mb-12">
                    Last Updated: {lastUpdated}
                </p>

                <div className="prose prose-lg prose-indigo max-w-none">
                    <p>
                        By accessing or using Tools Guide Hub (toolsguidehub.com), you agree to comply with
                        and be bound by these Terms of Service. Please read them carefully.
                    </p>

                    <h2>1. Use of Content and Tools</h2>
                    <p>
                        All content provided on Tools Guide Hub is for informational purposes only.
                        Our interactive tools are designed to provide estimates and should not be
                        treated as definitive financial or professional advice.
                    </p>

                    <h2>2. Intellectual Property</h2>
                    <p>
                        The content, design, and code of Tools Guide Hub are the property of
                        Tools Guide Hub and are protected by copyright and other intellectual property laws.
                        You may not reproduce or distribute our content without prior written permission.
                    </p>

                    <h2>3. User Conduct</h2>
                    <p>
                        You agree not to use our website for any unlawful purpose. You must not:
                    </p>
                    <ul>
                        <li>Attempt to interfere with the proper working of the tools or website.</li>
                        <li>Use automated scripts to scrape content or perform bulk calculations.</li>
                        <li>Attempt to bypass any security measures we have in place.</li>
                    </ul>

                    <h2>4. Disclaimer of Warranties</h2>
                    <p>
                        Tools Guide Hub is provided on an "as-is" and "as-available" basis. We make
                        no warranties, expressed or implied, regarding the accuracy or reliability of
                        the calculators or information provided. Your use of the site is at your own risk.
                    </p>

                    <h2>5. Limitation of Liability</h2>
                    <p>
                        In no event shall Tools Guide Hub or its owners be liable for any damages
                        (including, without limitation, damages for loss of profit or data)
                        arising out of the use or inability to use the materials on our website.
                    </p>

                    <h2>6. Governing Law</h2>
                    <p>
                        These terms are governed by and construed in accordance with the laws
                        of the jurisdiction in which the owner of Tools Guide Hub resides.
                    </p>

                    <h2>7. Changes to Terms</h2>
                    <p>
                        We reserve the right to modify these terms at any time. Your continued
                        use of the site constitutes acceptance of the new terms.
                    </p>

                    <h2>8. Termination</h2>
                    <p>
                        We reserve the right to block access to our website or tools for any
                        user who violates these terms.
                    </p>
                </div>
            </div>
        </Container>
    )
}
