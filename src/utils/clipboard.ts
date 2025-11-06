/**
 * 剪贴板工具函数
 * 遵循 DRY 原则：统一剪贴板操作，兼容 Electron 和浏览器环境
 */

/**
 * 复制文本到剪贴板
 */
export async function copyToClipboard(text: string): Promise<void> {
  if (window.electronAPI) {
    await window.electronAPI.clipboard.writeText(text)
  } else {
    await navigator.clipboard.writeText(text)
  }
}

/**
 * 从剪贴板读取文本
 */
export async function readFromClipboard(): Promise<string> {
  if (window.electronAPI) {
    return await window.electronAPI.clipboard.readText()
  } else {
    return await navigator.clipboard.readText()
  }
}
