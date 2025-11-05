/**
 * 主应用组件 - 整合所有功能模块
 * 遵循 SOLID 原则：组件组合与依赖注入
 */

import { useState, useEffect, useCallback } from 'react'
import { Editor } from './components/Editor'
import { ConfigPanel } from './components/ConfigPanel'
import { StatusBar } from './components/StatusBar'
import { Examples } from './components/Examples'
import { useConversion } from './hooks/useConversion'

function App() {
  // 深色模式状态
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme')
    return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)
  })

  // 转换状态管理
  const {
    direction,
    input,
    output,
    result,
    encodeOptions,
    decodeOptions,
    setInput,
    setEncodeOptions,
    setDecodeOptions,
    toggleDirection,
    clearInput,
    convert,
  } = useConversion({ debounceMs: 300, autoDetect: true })

  // 侧边栏展开状态
  const [showExamples, setShowExamples] = useState(true)

  // 深色模式效果
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [darkMode])

  // 键盘快捷键
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + Enter: 立即转换
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault()
        convert()
      }
      
      // Ctrl/Cmd + L: 清空
      if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
        e.preventDefault()
        clearInput()
      }
      
      // Ctrl/Cmd + D: 切换方向
      if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault()
        toggleDirection()
      }
      
      // Ctrl/Cmd + E: 切换示例面板
      if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
        e.preventDefault()
        setShowExamples(prev => !prev)
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [convert, clearInput, toggleDirection])

  // 插入示例
  const handleInsertExample = useCallback((json: string) => {
    setInput(json)
  }, [setInput])

  // 获取 JSON 和 TOON 内容（用于 Token 统计）
  const jsonContent = direction === 'json-to-toon' ? input : output
  const toonContent = direction === 'json-to-toon' ? output : input

  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
      <div className="h-full flex flex-col">
        {/* 顶部标题栏 */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold">🎒 TOON Converter</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Token-Oriented Object Notation - JSON 转换工具
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowExamples(!showExamples)}
                className="px-3 py-1 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                title="切换示例面板 (Ctrl+E)"
              >
                {showExamples ? '隐藏示例' : '显示示例'}
              </button>
            </div>
          </div>
        </header>
        
        {/* 主内容区 */}
        <main className="flex-1 flex overflow-hidden">
          {/* 左侧：输入编辑器 */}
          <div className="flex-1 p-4">
            <Editor
              value={input}
              onChange={setInput}
              label="输入"
              language={direction === 'json-to-toon' ? 'json' : 'toon'}
              placeholder={
                direction === 'json-to-toon'
                  ? '输入 JSON 数据...'
                  : '输入 TOON 格式数据...'
              }
              error={!result?.success ? result?.error : undefined}
              onClear={clearInput}
            />
          </div>
          
          {/* 中间：配置面板 */}
          <div className="w-80 p-4 border-l border-r border-gray-200 dark:border-gray-700 space-y-4 overflow-y-auto">
            <ConfigPanel
              direction={direction}
              encodeOptions={encodeOptions}
              decodeOptions={decodeOptions}
              onEncodeOptionsChange={setEncodeOptions}
              onDecodeOptionsChange={setDecodeOptions}
              onToggleDirection={toggleDirection}
            />
            
            <button
              onClick={convert}
              className="w-full px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded font-medium transition-colors"
              title="立即转换 (Ctrl+Enter)"
            >
              ⚡ 立即转换
            </button>
            
            <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
              <p><kbd className="px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 rounded">Ctrl+Enter</kbd> 立即转换</p>
              <p><kbd className="px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 rounded">Ctrl+L</kbd> 清空</p>
              <p><kbd className="px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 rounded">Ctrl+D</kbd> 切换方向</p>
              <p><kbd className="px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 rounded">Ctrl+E</kbd> 切换示例</p>
            </div>
          </div>
          
          {/* 右侧：输出编辑器 */}
          <div className="flex-1 p-4">
            <Editor
              value={output}
              readOnly
              label="输出"
              language={direction === 'json-to-toon' ? 'toon' : 'json'}
              placeholder="转换结果将显示在这里..."
            />
          </div>
          
          {/* 右侧边栏：示例库 */}
          {showExamples && (
            <div className="w-64 p-4 border-l border-gray-200 dark:border-gray-700 overflow-y-auto">
              <Examples onInsert={handleInsertExample} />
            </div>
          )}
        </main>
        
        {/* 底部状态栏 */}
        <StatusBar
          result={result}
          jsonContent={jsonContent}
          toonContent={toonContent}
          darkMode={darkMode}
          onToggleDarkMode={() => setDarkMode(!darkMode)}
        />
      </div>
    </div>
  )
}

export default App

