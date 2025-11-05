/**
 * 状态栏组件 - Token 统计与转换状态
 * 遵循 SRP：单一状态展示职责
 */

import { useMemo } from 'react'
import type { ConversionResult } from '../types/conversion'
import { calculateTokenStats } from '../utils/tokenEstimator'

interface StatusBarProps {
  result: ConversionResult | null
  jsonContent: string
  toonContent: string
  darkMode: boolean
  onToggleDarkMode: () => void
}

export function StatusBar({
  result,
  jsonContent,
  toonContent,
  darkMode,
  onToggleDarkMode,
}: StatusBarProps) {
  // 计算 Token 统计
  const stats = useMemo(() => {
    if (!jsonContent || !toonContent) {
      return null
    }
    return calculateTokenStats(jsonContent, toonContent)
  }, [jsonContent, toonContent])
  
  return (
    <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 py-2">
      <div className="flex items-center justify-between text-sm">
        {/* 左侧：转换状态 */}
        <div className="flex items-center gap-4">
          {result && (
            <>
              {result.success ? (
                <span className="text-green-600 dark:text-green-400 flex items-center gap-1">
                  ✅ 转换成功
                </span>
              ) : (
                <span className="text-red-600 dark:text-red-400 flex items-center gap-1">
                  ❌ 转换失败
                </span>
              )}
              
              {result.mode && (
                <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded text-xs">
                  模式: {result.mode === 'tabular' ? '表格' : result.mode === 'list' ? '列表' : result.mode === 'inline' ? '内联' : '对象'}
                </span>
              )}
            </>
          )}
        </div>
        
        {/* 中间：Token 统计 */}
        {stats && (
          <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
            <span>
              JSON: <span className="font-mono">{stats.jsonTokens}</span> tokens
            </span>
            <span>
              TOON: <span className="font-mono">{stats.toonTokens}</span> tokens
            </span>
            <span className="font-medium text-primary">
              节省: {stats.savings.toFixed(1)}%
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-500">
              (近似值)
            </span>
          </div>
        )}
        
        {/* 右侧：深色模式切换 */}
        <button
          onClick={onToggleDarkMode}
          className="px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
          title="切换深色模式"
        >
          {darkMode ? '🌙 深色' : '☀️ 浅色'}
        </button>
      </div>
    </div>
  )
}

