/**
 * 导航配置
 */
import { categories } from './categories'

export interface NavItem {
  label: string
  href: string
  external?: boolean
}

export const mainNavigation: NavItem[] = [
  {
    label: 'Home',
    href: '/',
  },
  ...categories.map(cat => ({
    label: cat.name,
    href: `/${cat.slug}`,
  })),
  {
    label: 'About',
    href: '/about',
  },
  {
    label: 'Contact',
    href: '/contact',
  },
]

export const footerNavigation = {
  content: categories.map(cat => ({
    label: cat.name,
    href: `/${cat.slug}`,
  })),
  legal: [
    {
      label: 'Privacy Policy',
      href: '/privacy',
    },
    {
      label: 'Terms of Service',
      href: '/terms',
    },
  ],
}

