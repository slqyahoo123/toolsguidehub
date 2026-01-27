#!/usr/bin/env node
/**
 * URL验证脚本
 * 检查所有文章的URL是否符合SEO策略
 */

import { readdirSync, readFileSync, existsSync } from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import { validateSEOURL, normalizeURLPath } from '../lib/utils/url'
import { isValidSlug } from '../lib/utils/slug'

const contentDir = join(process.cwd(), 'content/articles')

interface ValidationResult {
  file: string
  valid: boolean
  errors: string[]
  warnings: string[]
}

function validateArticle(filePath: string): ValidationResult {
  const result: ValidationResult = {
    file: filePath,
    valid: true,
    errors: [],
    warnings: [],
  }

  try {
    const content = readFileSync(filePath, 'utf-8')
    const { data } = matter(content)

    // 检查必需字段
    if (!data.category) {
      result.errors.push('缺少category字段')
      result.valid = false
    }

    if (!data.slug) {
      result.errors.push('缺少slug字段')
      result.valid = false
    }

    if (!data.title) {
      result.errors.push('缺少title字段')
      result.valid = false
    }

    // 验证category格式
    if (data.category && !isValidSlug(data.category)) {
      result.errors.push(`category格式无效: ${data.category}`)
      result.valid = false
    }

    // 验证slug格式
    if (data.slug && !isValidSlug(data.slug)) {
      result.errors.push(`slug格式无效: ${data.slug}`)
      result.valid = false
    }

    // 生成标准URL并验证
    if (data.category && data.slug) {
      const url = normalizeURLPath(data.category, data.slug)
      const urlValidation = validateSEOURL(url)

      if (!urlValidation.valid) {
        result.errors.push(...urlValidation.errors)
        result.valid = false
      }

      // 检查URL长度
      if (url.length > 100) {
        result.warnings.push(`URL过长: ${url.length}字符`)
      }
    }

    // 检查是否有日期在slug中
    if (data.slug && /\d{4}[-\/]\d{2}[-\/]\d{2}/.test(data.slug)) {
      result.warnings.push('slug中不应包含日期格式')
    }

  } catch (error) {
    result.errors.push(`读取文件失败: ${error}`)
    result.valid = false
  }

  return result
}

function validateAllArticles(): void {
  console.log('🔍 验证所有文章的URL...\n')

  if (!existsSync(contentDir)) {
    console.error('❌ 内容目录不存在:', contentDir)
    process.exit(1)
  }

  const categories = readdirSync(contentDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

  const results: ValidationResult[] = []

  for (const category of categories) {
    const categoryPath = join(contentDir, category)
    const files = readdirSync(categoryPath)
      .filter(file => file.endsWith('.md'))

    for (const file of files) {
      const filePath = join(categoryPath, file)
      const result = validateArticle(filePath)
      results.push(result)
    }
  }

  // 输出结果
  const validCount = results.filter(r => r.valid).length
  const invalidCount = results.length - validCount

  console.log(`总计: ${results.length} 篇文章`)
  console.log(`✅ 有效: ${validCount}`)
  console.log(`❌ 无效: ${invalidCount}\n`)

  // 显示错误
  const invalidResults = results.filter(r => !r.valid)
  if (invalidResults.length > 0) {
    console.log('❌ 发现错误:\n')
    invalidResults.forEach(result => {
      console.log(`  ${result.file}`)
      result.errors.forEach(error => {
        console.log(`    - ${error}`)
      })
      console.log()
    })
  }

  // 显示警告
  const warningResults = results.filter(r => r.warnings.length > 0)
  if (warningResults.length > 0) {
    console.log('⚠️  警告:\n')
    warningResults.forEach(result => {
      console.log(`  ${result.file}`)
      result.warnings.forEach(warning => {
        console.log(`    - ${warning}`)
      })
      console.log()
    })
  }

  if (invalidCount > 0) {
    process.exit(1)
  }

  console.log('✅ 所有URL验证通过!')
}

// 运行验证
validateAllArticles()

