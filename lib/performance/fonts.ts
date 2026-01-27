/**
 * 字体优化工具
 * 
 * 策略：
 * - 使用系统字体栈（最快）
 * - 避免外部字体加载阻塞渲染
 * - 如果使用自定义字体，优化加载
 */

/**
 * 系统字体栈（无外部加载，最快）
 * 
 * 优势：
 * - 零加载时间
 * - 无FOUT/FOIT
 * - 最佳性能
 */
export const systemFontStack = [
  '-apple-system',
  'BlinkMacSystemFont',
  '"Segoe UI"',
  'Roboto',
  '"Helvetica Neue"',
  'Arial',
  'sans-serif',
].join(', ')

/**
 * 如果必须使用自定义字体，使用此配置
 * 
 * 注意：当前使用系统字体栈，无需此配置
 */
export const fontOptimization = {
  // 使用next/font优化（如果添加自定义字体）
  // import { Inter } from 'next/font/google'
  // const inter = Inter({ subsets: ['latin'], display: 'swap' })
  
  // 当前策略：使用系统字体栈，无需外部加载
  useSystemFonts: true,
}

