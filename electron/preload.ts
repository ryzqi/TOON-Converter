import { contextBridge, ipcRenderer } from 'electron'

/**
 * 预加载脚本 - 在渲染进程加载前执行
 * 通过 contextBridge 安全地暴露受控的 API 到渲染进程
 * 遵循最小权限原则（ISP - Interface Segregation Principle）
 */

// 暴露给渲染进程的 API
const api = {
  // 平台信息
  platform: process.platform,
  
  // 剪贴板操作
  clipboard: {
    writeText: (text: string) => {
      return ipcRenderer.invoke('clipboard:write', text)
    },
    readText: () => {
      return ipcRenderer.invoke('clipboard:read')
    },
  },
  
  // 未来可扩展的 IPC 通道
  // 例如：文件操作、窗口控制等
}

// 类型定义（用于渲染进程）
export type API = typeof api

// 将 API 暴露到 window 对象
contextBridge.exposeInMainWorld('electronAPI', api)

