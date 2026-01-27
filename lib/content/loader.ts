/**
 * 内容加载器
 * 负责从文件系统读取和加载Markdown文件
 */

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { renderMarkdownToHTML, sanitizeMarkdown } from './markdown-renderer'
import type { Article, ArticleFrontMatter } from '@/types/content'

const contentDirectory = path.join(process.cwd(), 'content/articles')

/**
 * 获取所有分类
 */
export function getAllCategories(): string[] {
  if (!fs.existsSync(contentDirectory)) {
    return []
  }

  const categories = fs
    .readdirSync(contentDirectory, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name)

  return categories
}

/**
 * 获取所有文章
 */
export async function getAllArticles(): Promise<Article[]> {
  const categories = getAllCategories()
  const allArticles: Article[] = []

  for (const category of categories) {
    const categoryPath = path.join(contentDirectory, category)
    if (!fs.existsSync(categoryPath)) continue

    const files = fs
      .readdirSync(categoryPath)
      .filter((file) => file.endsWith('.md'))

    for (const file of files) {
      const slug = file.replace('.md', '')
      const article = await getArticleBySlug(category, slug)
      if (article) {
        allArticles.push(article)
      }
    }
  }

  return allArticles.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

/**
 * 根据分类和slug获取文章
 */
export async function getArticleBySlug(
  category: string,
  slug: string
): Promise<Article | null> {
  const fullPath = path.join(contentDirectory, category, `${slug}.md`)

  if (!fs.existsSync(fullPath)) {
    return null
  }

  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    // 清理Markdown内容（移除危险内容）
    const sanitizedContent = sanitizeMarkdown(content)

    // 将Markdown转换为安全的HTML
    const contentHtml = await renderMarkdownToHTML(sanitizedContent, {
      allowHTML: false, // 不允许原始HTML标签
      strictSanitization: true, // 严格清理模式
      supportGFM: true, // 支持GitHub Flavored Markdown（表格、任务列表等）
    })

    return {
      slug,
      category,
      title: data.title || '',
      description: data.description || '',
      date: data.date || new Date().toISOString(),
      updated: data.updated,
      content: sanitizedContent, // 保存清理后的Markdown
      contentHtml, // 安全的HTML
      image: data.image,
      ogImage: data.ogImage,
      featured: data.featured || false,
      related: data.related || [],
      author: data.author,
    }
  } catch (error) {
    console.error(`Error loading article ${category}/${slug}:`, error)
    return null
  }
}

/**
 * 根据分类获取文章列表
 */
export async function getArticlesByCategory(
  category: string
): Promise<Article[]> {
  const allArticles = await getAllArticles()
  return allArticles.filter((article) => article.category === category)
}

/**
 * 获取相关文章
 */
export async function getRelatedArticles(
  category: string,
  slug: string,
  limit: number = 3
): Promise<Article[]> {
  const article = await getArticleBySlug(category, slug)
  if (!article || !article.related) {
    // 如果没有指定相关文章，返回同分类的其他文章
    const categoryArticles = await getArticlesByCategory(category)
    return categoryArticles
      .filter((a) => a.slug !== slug)
      .slice(0, limit)
  }

  const related: Article[] = []
  for (const relatedSlug of article.related.slice(0, limit)) {
    const relatedArticle = await getArticleBySlug(category, relatedSlug)
    if (relatedArticle) {
      related.push(relatedArticle)
    }
  }

  return related
}

/**
 * 获取特色文章
 */
export async function getFeaturedArticles(limit: number = 6): Promise<Article[]> {
  const allArticles = await getAllArticles()
  return allArticles.filter((article) => article.featured).slice(0, limit)
}

