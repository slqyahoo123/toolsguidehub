import Container from '@/components/layout/container'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo/metadata'

export const metadata = generateSEOMetadata({
    title: 'Cookie Policy',
    description: 'How Tools Guide Hub uses cookies to improve your user experience.',
    path: '/cookie-policy',
})

export default function CookiePolicyPage() {
    const lastUpdated = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })

    return (
        <Container className="py-20 md:py-28">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
                    Cookie Policy
                </h1>
                <p className="text-gray-500 mb-12">
                    Last Updated: {lastUpdated}
                </p>

                <div className="prose prose-lg prose-indigo max-w-none">
                    <p>
                        This Cookie Policy explains how Tools Guide Hub ("we", "us", and "our") uses
                        cookies and similar technologies to recognize you when you visit our
                        website at toolsguidehub.com.
                    </p>

                    <h2>1. What are cookies?</h2>
                    <p>
                        Cookies are small data files that are placed on your computer or mobile device
                        when you visit a website. Cookies are widely used by website owners in order
                        to make their websites work, or to work more efficiently, as well as to
                        provide reporting information.
                    </p>

                    <h2>2. Why do we use cookies?</h2>
                    <p>
                        We use first-party and third-party cookies for several reasons:
                    </p>
                    <ul>
                        <li>
                            <strong>Essential Cookies:</strong> These cookies are strictly necessary to provide
                            you with services available through our Website and to use some of its features,
                            such as access to secure areas.
                        </li>
                        <li>
                            <strong>Analytics and Customization Cookies:</strong> These cookies collect
                            information that is used either in aggregate form to help us understand
                            how our Website is being used or how effective our marketing campaigns
                            are, or to help us customize our Website for you.
                        </li>
                        <li>
                            <strong>Advertising Cookies:</strong> These cookies are used to make advertising
                            messages more relevant to you. They perform functions like preventing the
                            same ad from continuously reappearing, ensuring that ads are properly
                            displayed for advertisers, and in some cases selecting advertisements
                            that are based on your interests.
                        </li>
                    </ul>

                    <h2>3. How can I control cookies?</h2>
                    <p>
                        You have the right to decide whether to accept or reject cookies. You can
                        set or amend your web browser controls to accept or refuse cookies. If
                        you choose to reject cookies, you may still use our website though your
                        access to some functionality and areas of our website may be restricted.
                    </p>

                    <h2>4. Google AdSense Cookies</h2>
                    <p>
                        As mentioned in our Privacy Policy, Google uses cookies to serve ads on
                        this site. Google's use of advertising cookies enables it and its partners
                        to serve ads to our users based on their visit to our site and/or other
                        sites on the Internet.
                    </p>

                    <h2>5. Updates to this policy</h2>
                    <p>
                        We may update this Cookie Policy from time to time in order to reflect,
                        for example, changes to the cookies we use or for other operational,
                        legal, or regulatory reasons.
                    </p>

                    <h2>6. Where can I get further information?</h2>
                    <p>
                        If you have any questions about our use of cookies or other technologies,
                        please email us at cookies@toolsguidehub.com.
                    </p>
                </div>
            </div>
        </Container>
    )
}
