#!/usr/bin/env node
/**
 * 最小化构建工具
 * - 模板渲染
 * - CSS/JS内联优化
 * - HTML压缩
 * - 资源复制
 */

import { readFileSync, writeFileSync, mkdirSync, copyFileSync, existsSync, statSync, readdirSync, rmSync } from 'fs';
import { join, dirname, extname, relative } from 'path';
import { fileURLToPath } from 'url';
import chokidar from 'chokidar';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SRC_DIR = 'src';
const DIST_DIR = 'dist';
const CONTENT_DIR = join(SRC_DIR, 'content');
const TEMPLATES_DIR = join(SRC_DIR, 'templates');
const ASSETS_DIR = join(SRC_DIR, 'assets');

// 配置
const config = {
  siteName: 'Tools Guide Hub',
  siteUrl: 'https://toolsguidehub.com',
  description: 'Comprehensive guides and tools for developers and professionals',
  author: 'Tools Guide Hub',
  lang: 'en',
  watch: process.argv.includes('--watch')
};

/**
 * 读取文件内容
 */
function readFile(filePath) {
  try {
    return readFileSync(filePath, 'utf-8');
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error.message);
    return null;
  }
}

/**
 * 写入文件
 */
function writeFile(filePath, content) {
  const dir = dirname(filePath);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
  writeFileSync(filePath, content, 'utf-8');
}

/**
 * 复制目录
 */
function copyDir(src, dest) {
  if (!existsSync(src)) return;
  
  if (!existsSync(dest)) {
    mkdirSync(dest, { recursive: true });
  }
  
  const entries = readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = join(src, entry.name);
    const destPath = join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      copyFileSync(srcPath, destPath);
    }
  }
}

/**
 * 压缩HTML（简单版本，保留关键空白）
 */
function minifyHTML(html) {
  return html
    .replace(/\s+/g, ' ')           // 合并空白
    .replace(/>\s+</g, '><')        // 移除标签间空白
    .replace(/\s+>/g, '>')          // 移除结束前空白
    .replace(/<\s+/g, '<')          // 移除开始后空白
    .trim();
}

/**
 * 内联CSS/JS资源
 */
function inlineAssets(html, basePath) {
  // 内联CSS
  html = html.replace(
    /<link\s+rel="stylesheet"\s+href="([^"]+)"\s*>/gi,
    (match, href) => {
      const cssPath = join(basePath, href);
      const css = readFile(cssPath);
      if (css) {
        return `<style>${css.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s+/g, ' ').trim()}</style>`;
      }
      return match;
    }
  );
  
  // 内联JS（仅小文件）
  html = html.replace(
    /<script\s+src="([^"]+)"\s*><\/script>/gi,
    (match, src) => {
      const jsPath = join(basePath, src);
      const stats = statSync(jsPath);
      // 只内联小于10KB的JS
      if (stats.size < 10240) {
        const js = readFile(jsPath);
        if (js) {
          return `<script>${js}</script>`;
        }
      }
      return match;
    }
  );
  
  return html;
}

/**
 * 渲染模板
 */
function renderTemplate(template, data) {
  let html = template;
  
  // 替换变量 {{variable}}
  for (const [key, value] of Object.entries(data)) {
    const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
    html = html.replace(regex, value || '');
  }
  
  // 处理条件块 {{#if condition}}...{{/if}}
  html = html.replace(
    /{{\s*#if\s+(\w+)\s*}}([\s\S]*?){{\s*\/if\s*}}/g,
    (match, condition, content) => {
      return data[condition] ? content : '';
    }
  );
  
  // 处理循环 {{#each items}}...{{/each}}
  html = html.replace(
    /{{\s*#each\s+(\w+)\s*}}([\s\S]*?){{\s*\/each\s*}}/g,
    (match, arrayName, content) => {
      const items = data[arrayName] || [];
      return items.map(item => {
        let itemContent = content;
        for (const [key, value] of Object.entries(item)) {
          itemContent = itemContent.replace(
            new RegExp(`{{\\s*${key}\\s*}}`, 'g'),
            value || ''
          );
        }
        return itemContent;
      }).join('');
    }
  );
  
  return html;
}

/**
 * 简单的Markdown到HTML转换器
 */
function markdownToHTML(markdown) {
  let html = markdown;
  
  // 代码块
  html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
    const language = lang || 'text';
    return `<pre><code class="language-${language}">${escapeHTML(code.trim())}</code></pre>`;
  });
  
  // 行内代码
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  
  // 标题
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
  
  // 粗体
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/__(.+?)__/g, '<strong>$1</strong>');
  
  // 斜体
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
  html = html.replace(/_(.+?)_/g, '<em>$1</em>');
  
  // 链接
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  
  // 图片
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1">');
  
  // 处理列表（先处理，避免被段落处理影响）
  const lines = html.split('\n');
  const processedLines = [];
  let inList = false;
  let listType = null;
  let listItems = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const ulMatch = line.match(/^[\*\-]\s+(.+)$/);
    const olMatch = line.match(/^\d+\.\s+(.+)$/);
    
    if (ulMatch || olMatch) {
      const itemText = ulMatch ? ulMatch[1] : olMatch[1];
      const currentType = ulMatch ? 'ul' : 'ol';
      
      if (!inList) {
        inList = true;
        listType = currentType;
        listItems = [itemText];
      } else if (listType === currentType) {
        listItems.push(itemText);
      } else {
        // 列表类型改变，结束当前列表
        processedLines.push(`<${listType}>${listItems.map(item => `<li>${item}</li>`).join('')}</${listType}>`);
        listType = currentType;
        listItems = [itemText];
      }
    } else {
      if (inList) {
        processedLines.push(`<${listType}>${listItems.map(item => `<li>${item}</li>`).join('')}</${listType}>`);
        inList = false;
        listType = null;
        listItems = [];
      }
      processedLines.push(line);
    }
  }
  
  // 处理末尾的列表
  if (inList) {
    processedLines.push(`<${listType}>${listItems.map(item => `<li>${item}</li>`).join('')}</${listType}>`);
  }
  
  html = processedLines.join('\n');
  
  // 段落（处理连续换行）
  html = html.split(/\n\s*\n/).map(para => {
    para = para.trim();
    if (para && !para.match(/^<(h[1-6]|ul|ol|pre|code|blockquote)/)) {
      return `<p>${para}</p>`;
    }
    return para;
  }).join('\n');
  
  // 水平线
  html = html.replace(/^---$/gim, '<hr>');
  
  return html;
}

/**
 * HTML转义
 */
function escapeHTML(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

/**
 * 解析嵌套的YAML front matter（支持对象）
 */
function parseYAML(yamlText) {
  const result = {};
  const lines = yamlText.split('\n');
  let currentKey = null;
  let currentValue = [];
  let inObject = false;
  let objectKey = null;
  
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    
    // 检查是否是对象开始
    if (trimmed.endsWith(':') && !trimmed.includes(':')) {
      currentKey = trimmed.slice(0, -1).trim();
      inObject = true;
      result[currentKey] = {};
      continue;
    }
    
    // 检查是否是对象内的键
    if (inObject && trimmed.match(/^\w+:/)) {
      const [key, ...valueParts] = trimmed.split(':');
      objectKey = key.trim();
      const value = valueParts.join(':').trim().replace(/^["']|["']$/g, '');
      result[currentKey][objectKey] = value;
      continue;
    }
    
    // 普通键值对
    if (trimmed.includes(':')) {
      if (currentKey && inObject) {
        inObject = false;
      }
      const [key, ...valueParts] = trimmed.split(':');
      currentKey = key.trim();
      const value = valueParts.join(':').trim().replace(/^["']|["']$/g, '');
      
      if (inObject && objectKey) {
        result[currentKey][objectKey] = value;
      } else {
        result[currentKey] = value;
      }
    }
  }
  
  return result;
}

/**
 * 读取内容元数据
 */
function parseContent(filePath) {
  const content = readFile(filePath);
  if (!content) return null;
  
  const frontMatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontMatterRegex);
  
  if (match) {
    const frontMatter = match[1];
    const body = match[2];
    const metadata = parseYAML(frontMatter);
    
    // 转换Markdown body为HTML
    const htmlBody = markdownToHTML(body);
    
    return { ...metadata, body: htmlBody };
  }
  
  // 没有front matter，直接转换整个内容
  return { body: markdownToHTML(content) };
}

/**
 * 构建单个页面
 */
function buildPage(contentFile, templateFile) {
  const contentData = parseContent(contentFile);
  if (!contentData) return;
  
  const template = readFile(templateFile);
  if (!template) return;
  
  // 确定页面路径
  const pagePath = contentData.path || '/';
  
  // 收集页面信息用于sitemap
  allPages.push({
    path: pagePath,
    lastmod: contentData.meta?.date || new Date().toISOString().split('T')[0],
    changefreq: 'weekly',
    priority: pagePath === '/' ? '1.0' : '0.8'
  });
  
  // 构建页面数据
  const pageData = {
    ...config,
    ...contentData,
    currentYear: new Date().getFullYear(),
    canonicalUrl: `${config.siteUrl}${pagePath}`,
    ogImage: contentData.image || `${config.siteUrl}/og-default.jpg`
  };
  
  // 渲染HTML
  let html = renderTemplate(template, pageData);
  
  // 内联资源
  html = inlineAssets(html, __dirname);
  
  // 压缩HTML
  html = minifyHTML(html);
  
  // 确定输出路径
  const relativePath = relative(CONTENT_DIR, contentFile);
  const outputPath = join(DIST_DIR, relativePath.replace(/\.md$/, '.html'));
  
  writeFile(outputPath, html);
  console.log(`✓ Built: ${outputPath}`);
}

/**
 * 构建所有页面
 */
function buildAll() {
  console.log('Building site...\n');
  
  // 清空页面列表
  allPages.length = 0;
  
  // 清理dist目录
  if (existsSync(DIST_DIR)) {
    rmSync(DIST_DIR, { recursive: true, force: true });
  }
  mkdirSync(DIST_DIR, { recursive: true });
  
  // 复制静态资源
  if (existsSync(ASSETS_DIR)) {
    copyDir(ASSETS_DIR, join(DIST_DIR, 'assets'));
    console.log('✓ Copied assets');
  }
  
  // 构建页面
  const templateFile = join(TEMPLATES_DIR, 'page.html');
  if (!existsSync(templateFile)) {
    console.error('Template file not found:', templateFile);
    return;
  }
  
  function processContentDir(dir) {
    if (!existsSync(dir)) return;
    
    const entries = readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = join(dir, entry.name);
      
      if (entry.isDirectory()) {
        processContentDir(fullPath);
      } else if (entry.name.endsWith('.md')) {
        buildPage(fullPath, templateFile);
      }
    }
  }
  
  processContentDir(CONTENT_DIR);
  
  // 生成sitemap
  generateSitemap();
  
  // 生成robots.txt
  generateRobots();
  
  console.log('\n✓ Build complete!');
}

/**
 * 收集所有页面URL
 */
const allPages = [];

/**
 * 生成sitemap.xml
 */
function generateSitemap() {
  const today = new Date().toISOString().split('T')[0];
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;
  
  // 添加所有收集的页面
  allPages.forEach(page => {
    sitemap += `  <url>
    <loc>${config.siteUrl}${page.path}</loc>
    <lastmod>${page.lastmod || today}</lastmod>
    <changefreq>${page.changefreq || 'weekly'}</changefreq>
    <priority>${page.priority || '0.8'}</priority>
  </url>
`;
  });
  
  sitemap += `</urlset>`;
  
  writeFile(join(DIST_DIR, 'sitemap.xml'), sitemap);
  console.log('✓ Generated sitemap.xml');
}

/**
 * 生成robots.txt
 */
function generateRobots() {
  const robots = `User-agent: *
Allow: /

Sitemap: ${config.siteUrl}/sitemap.xml`;
  
  writeFile(join(DIST_DIR, 'robots.txt'), robots);
  console.log('✓ Generated robots.txt');
}

// 主执行
if (config.watch) {
  console.log('Watching for changes...\n');
  
  chokidar.watch([SRC_DIR]).on('change', (path) => {
    console.log(`\nChange detected: ${path}`);
    buildAll();
  });
  
  buildAll();
} else {
  buildAll();
}

