/**
 * 全局类型声明
 */

// CSS 模块声明
declare module '*.css' {
  const content: Record<string, string>
  export default content
}

// Electron 相关声明
interface Window {
  electron?: {
    // 未来扩展用
  }
}

