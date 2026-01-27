import Link from 'next/link'
import { siteConfig } from '@/config/site'
import { footerNavigation } from '@/config/navigation'
import { getAllCategories } from '@/config/categories'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const categories = getAllCategories()

  return (
    <footer className="border-t-2 border-gray-200 bg-white mt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* 品牌信息 */}
          <div className="space-y-4 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-600 to-primary-700 flex items-center justify-center shadow-md">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">{siteConfig.name}</h3>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              {siteConfig.description}
            </p>
          </div>
          
          {/* 分类导航 */}
          <div>
            <h4 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">Categories</h4>
            <ul className="space-y-3">
              {categories.slice(0, 5).map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/${category.slug}`}
                    className="text-sm text-gray-600 hover:text-primary-600 hover:translate-x-1 inline-block transition-all duration-200"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* 快速链接 */}
          <div>
            <h4 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-3">
              {footerNavigation.content.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-600 hover:text-primary-600 hover:translate-x-1 inline-block transition-all duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* 法律信息 */}
          <div>
            <h4 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">Legal</h4>
            <ul className="space-y-3">
              {footerNavigation.legal.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-600 hover:text-primary-600 hover:translate-x-1 inline-block transition-all duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* 底部版权信息 */}
        <div className="border-t-2 border-gray-200 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600">
              &copy; {currentYear} <span className="font-semibold text-gray-900">{siteConfig.name}</span>. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>Built with</span>
              <span className="px-2 py-1 bg-gray-100 rounded text-xs font-semibold text-gray-700">Next.js</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

