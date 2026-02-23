import Container from '@/components/layout/container'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo/metadata'

export const metadata = generateSEOMetadata({
    title: 'Privacy Policy',
    description: 'Privacy policy for Tools Guide Hub - how we handle your data and protect your privacy.',
    path: '/privacy',
})

export default function PrivacyPage() {
    const lastUpdated = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })

    return (
        <Container className="py-20 md:py-28">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
                    Privacy Policy
                </h1>
                <p className="text-gray-500 mb-12">
                    Last Updated: {lastUpdated}
                </p>

                <div className="prose prose-lg prose-indigo max-w-none">
                    <p>
                        Welcome to Tools Guide Hub. Your privacy is critically important to us.
                        This Privacy Policy explains how we collect, use, and protect your information
                        when you visit our website (toolsguidehub.com).
                    </p>

                    <h2>1. Information We Collect</h2>
                    <p>
                        We collect information about you in several ways:
                    </p>
                    <ul>
                        <li>
                            <strong>Directly from you:</strong> Such as when you contact us via email.
                        </li>
                        <li>
                            <strong>Automatically:</strong> Like many websites, we collect information about how you
                            interact with our tools and pages via cookies and web analytics tools.
                        </li>
                    </ul>

                    <h2>2. How We Use Your Information</h2>
                    <p>
                        We use the information we collect to:
                    </p>
                    <ul>
                        <li>Provide, maintain, and improve our free interactive tools.</li>
                        <li>Personalize your experience on our website.</li>
                        <li>Analyze usage patterns to create better guides and tutorials.</li>
                        <li>Respond to your inquiries and support requests.</li>
                    </ul>

                    <h2>3. Cookies and Tracking Technologies</h2>
                    <p>
                        We use cookies to enhance your browsing experience. Cookies are small data files
                        stored on your device. You can control cookie preferences through your browser settings.
                    </p>
                    <p>
                        <strong>Google AdSense:</strong> We may use Google AdSense to serve ads. Google
                        uses cookies (like the DART cookie) to serve ads based on your visit to this
                        and other sites on the Internet. You can opt out of the DART cookie by visiting
                        the Google Ad and Content Network privacy policy.
                    </p>

                    <h2>4. Data Security</h2>
                    <p>
                        We implement appropriate technical and organizational measures to protect your
                        personal data against unauthorized access, loss, or alteration.
                    </p>

                    <h2>5. Third-Party Links</h2>
                    <p>
                        Our website contains links to other sites (like AI platforms or software tools).
                        We are not responsible for the privacy practices of those third-party sites.
                    </p>

                    <h2>6. GDPR and CCPA Compliance</h2>
                    <p>
                        If you are a resident of the European Economic Area (EEA) or California,
                        you have specific rights regarding your personal information, including the
                        right to access, correct, or delete your data.
                    </p>

                    <h2>7. Contact Us</h2>
                    <p>
                        If you have any questions about this Privacy Policy, please contact us at
                        privacy@toolsguidehub.com.
                    </p>
                </div>
            </div>
        </Container>
    )
}
