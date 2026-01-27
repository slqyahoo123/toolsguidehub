import type { Metadata } from 'next'
import { siteConfig } from '@/config/site'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: ['web development', 'tools', 'guides', 'tutorials'],
  authors: [{ name: siteConfig.author }],
  creator: siteConfig.author,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.defaultImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.defaultImage],
    creator: siteConfig.twitterHandle,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // 生成资源提示（优化LCP）
  // 注意：在Next.js App Router中，资源提示通过metadata或其他方式添加
  // 当前使用系统字体栈，无需外部资源提示

  return (
    <html lang={siteConfig.language}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        {/* 
          AdSense脚本将在获得批准后添加
          注意：AdSense脚本应异步加载，不影响页面渲染
          <script async src="..." crossOrigin="anonymous" />
        */}
      </body>
    </html>
  )
}

