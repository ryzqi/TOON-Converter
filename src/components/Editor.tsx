/**
 * 编辑器组件 - 输入/输出区域
 * 遵循 SRP：单一编辑器职责
 */

import { useRef, useEffect, useMemo } from 'react'
import { copyToClipboard } from '../utils/clipboard'

interface EditorProps {
  value: string
  onChange?: (value: string) => void
  readOnly?: boolean
  placeholder?: string
  label?: string
  language?: 'json' | 'toon'
  error?: string
  onCopy?: () => void
  onClear?: () => void
}

export function Editor({
  value,
  onChange,
  readOnly = false,
  placeholder,
  label,
  language = 'json',
  error,
  onCopy,
  onClear,
}: EditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  
  // 自动调整高度
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [value])
  
  // 复制到剪贴板
  const handleCopy = async () => {
    if (!value) return
    
    try {
      await copyToClipboard(value)
      onCopy?.()
    } catch (error) {
      console.error('复制失败:', error)
    }
  }
  
  // 行号显示（使用 useMemo 优化性能）
  const lineNumbers = useMemo(() => {
    const lineCount = value.split('\n').length
    return Array.from({ length: lineCount }, (_, i) => i + 1)
  }, [value])
  
  return (
    <div className="flex flex-col h-full">
      {/* 标题栏 */}
      <div className="flex items-center justify-between mb-2 px-2">
        <div className="flex items-center gap-2">
          {label && (
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {label}
            </span>
          )}
          <span className="text-xs px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
            {language.toUpperCase()}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          {!readOnly && onClear && (
            <button
              onClick={onClear}
              className="text-xs px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 transition-colors"
              title="清空 (Ctrl+L)"
            >
              清空
            </button>
          )}
          {value && (
            <button
              onClick={handleCopy}
              className="text-xs px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 transition-colors"
              title="复制 (Ctrl+C)"
            >
              📋 复制
            </button>
          )}
        </div>
      </div>
      
      {/* 编辑器区域 */}
      <div className="flex-1 flex border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden bg-white dark:bg-gray-800">
        {/* 行号 */}
        <div className="bg-gray-50 dark:bg-gray-900 px-3 py-3 text-right select-none border-r border-gray-300 dark:border-gray-600">
          {lineNumbers.map(num => (
            <div
              key={num}
              className="text-xs text-gray-400 dark:text-gray-500 leading-6"
            >
              {num}
            </div>
          ))}
        </div>
        
        {/* 文本区域 */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={e => onChange?.(e.target.value)}
          readOnly={readOnly}
          placeholder={placeholder}
          className="flex-1 px-3 py-3 font-mono text-sm leading-6 resize-none outline-none bg-transparent text-gray-900 dark:text-gray-100"
          spellCheck={false}
        />
      </div>
      
      {/* 错误提示 */}
      {error && (
        <div className="mt-2 px-3 py-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded text-sm text-red-600 dark:text-red-400">
          ❌ {error}
        </div>
      )}
    </div>
  )
}

