#!/usr/bin/env node
/**
 * 文章创建助手脚本
 * 用法: node scripts/create-article.js
 */

const fs = require('fs')
const path = require('path')
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const categories = [
  { slug: 'ai-tools-platforms', name: 'AI Tools & Platforms' },
  { slug: 'software-saas-issues', name: 'Software & SaaS Issues' },
  { slug: 'accounts-subscriptions', name: 'Accounts & Subscriptions' },
  { slug: 'how-things-work', name: 'How Things Work' },
  { slug: 'troubleshooting-guides', name: 'Troubleshooting Guides' },
]

function question(query) {
  return new Promise(resolve => rl.question(query, resolve))
}

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function getCurrentDate() {
  return new Date().toISOString().split('T')[0]
}

async function createArticle() {
  console.log('\n📝 文章创建助手\n')
  console.log('请回答以下问题来创建新文章：\n')

  // 选择分类
  console.log('可用分类：')
  categories.forEach((cat, index) => {
    console.log(`  ${index + 1}. ${cat.name} (${cat.slug})`)
  })
  
  const categoryChoice = await question('\n选择分类 (1-5): ')
  const categoryIndex = parseInt(categoryChoice) - 1
  
  if (categoryIndex < 0 || categoryIndex >= categories.length) {
    console.error('❌ 无效的分类选择')
    rl.close()
    return
  }
  
  const category = categories[categoryIndex]

  // 文章标题
  const title = await question('\n文章标题: ')
  if (!title.trim()) {
    console.error('❌ 标题不能为空')
    rl.close()
    return
  }

  // 生成slug
  const customSlug = await question(`\n文章slug (按Enter使用自动生成: "${slugify(title)}"): `)
  const slug = customSlug.trim() || slugify(title)

  // 描述
  const description = await question('\n文章描述 (150-160字符，用于SEO): ')
  if (!description.trim()) {
    console.error('❌ 描述不能为空')
    rl.close()
    return
  }

  // 作者
  const author = await question('\n作者名称 (按Enter跳过): ')

  // 是否特色
  const featured = await question('\n是否设为特色文章? (y/n, 默认n): ')
  const isFeatured = featured.toLowerCase() === 'y'

  // 日期
  const date = await question(`\n发布日期 (YYYY-MM-DD, 默认今天: ${getCurrentDate()}): `)
  const articleDate = date.trim() || getCurrentDate()

  // 生成Front Matter
  const frontMatter = {
    title: title.trim(),
    description: description.trim(),
    category: category.slug,
    slug: slug,
    date: articleDate,
  }

  if (author.trim()) {
    frontMatter.author = author.trim()
  }

  if (isFeatured) {
    frontMatter.featured = true
  }

  // 生成Markdown内容
  const frontMatterString = Object.entries(frontMatter)
    .map(([key, value]) => {
      if (typeof value === 'string') {
        return `${key}: ${value}`
      }
      return `${key}: ${value}`
    })
    .join('\n')

  const markdownContent = `---
${frontMatterString}
---

# ${title.trim()}

${description.trim()}

## Introduction

Write your introduction here...

## Main Content

### Section 1

Add your content here...

### Section 2

Add more content here...

## Conclusion

Summarize your article here...
`

  // 确定文件路径
  const categoryDir = path.join(process.cwd(), 'content', 'articles', category.slug)
  const filePath = path.join(categoryDir, `${slug}.md`)

  // 检查文件是否已存在
  if (fs.existsSync(filePath)) {
    const overwrite = await question(`\n⚠️  文件已存在: ${filePath}\n是否覆盖? (y/n): `)
    if (overwrite.toLowerCase() !== 'y') {
      console.log('❌ 已取消')
      rl.close()
      return
    }
  }

  // 确保目录存在
  if (!fs.existsSync(categoryDir)) {
    fs.mkdirSync(categoryDir, { recursive: true })
  }

  // 写入文件
  try {
    fs.writeFileSync(filePath, markdownContent, 'utf8')
    console.log(`\n✅ 文章已创建: ${filePath}`)
    console.log(`\n📄 文件路径: ${filePath}`)
    console.log(`\n🌐 URL: http://localhost:3000/${category.slug}/${slug}/`)
    console.log(`\n💡 提示: 运行 'npm run dev' 查看文章`)
  } catch (error) {
    console.error(`\n❌ 创建文件失败: ${error.message}`)
  }

  rl.close()
}

// 运行
createArticle().catch(error => {
  console.error('❌ 发生错误:', error)
  rl.close()
  process.exit(1)
})

