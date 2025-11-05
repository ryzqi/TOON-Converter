/**
 * Electron API 类型定义
 */
export interface ElectronAPI {
  platform: string
  clipboard: {
    writeText: (text: string) => Promise<void>
    readText: () => Promise<string>
  }
}

declare global {
  interface Window {
    electronAPI?: ElectronAPI
  }
}

export {}

