/**
 * 配置面板组件 - 编解码选项
 * 遵循 SRP：单一配置管理职责
 */

import type { EncodeOptions, DecodeOptions, ConversionDirection } from '../types/conversion'

interface ConfigPanelProps {
  direction: ConversionDirection
  encodeOptions: EncodeOptions
  decodeOptions: DecodeOptions
  onEncodeOptionsChange: (options: EncodeOptions) => void
  onDecodeOptionsChange: (options: DecodeOptions) => void
  onToggleDirection: () => void
}

export function ConfigPanel({
  direction,
  encodeOptions,
  decodeOptions,
  onEncodeOptionsChange,
  onDecodeOptionsChange,
  onToggleDirection,
}: ConfigPanelProps) {
  const isJsonToToon = direction === 'json-to-toon'
  
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-gray-900 dark:text-gray-100">
          转换配置
        </h3>
        
        <button
          onClick={onToggleDirection}
          className="px-3 py-1 bg-primary hover:bg-primary-dark text-white rounded text-sm transition-colors"
          title="切换方向"
        >
          {isJsonToToon ? 'JSON → TOON' : 'TOON → JSON'} ⇄
        </button>
      </div>
      
      <div className="h-px bg-gray-200 dark:bg-gray-700" />
      
      {/* JSON → TOON 编码选项 */}
      {isJsonToToon && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
            编码选项 (Encode)
          </h4>
          
          {/* 分隔符 */}
          <div>
            <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
              分隔符 (delimiter)
            </label>
            <select
              value={encodeOptions.delimiter || ','}
              onChange={e => onEncodeOptionsChange({
                ...encodeOptions,
                delimiter: e.target.value as ',' | '\t' | '|',
              })}
              className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              <option value=",">逗号 (,)</option>
              <option value="\t">制表符 (\t)</option>
              <option value="|">竖线 (|)</option>
            </select>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              用于表格模式的列分隔符
            </p>
          </div>
          
          {/* 长度标记 */}
          <div>
            <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
              长度标记 (lengthMarker)
            </label>
            <input
              type="text"
              value={encodeOptions.lengthMarker === false ? 'false' : encodeOptions.lengthMarker || ''}
              onChange={e => onEncodeOptionsChange({
                ...encodeOptions,
                lengthMarker: e.target.value === '' ? undefined : 
                             e.target.value === 'false' ? false : 
                             e.target.value === '#' ? '#' : '#',
              })}
              placeholder="例: # 或 false"
              className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              可选前缀，如 [#3] 而非 [3]
            </p>
          </div>
        </div>
      )}
      
      {/* TOON → JSON 解码选项 */}
      {!isJsonToToon && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
            解码选项 (Decode)
          </h4>
          
          {/* 严格模式 */}
          <div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={decodeOptions.strict !== false}
                onChange={e => onDecodeOptionsChange({
                  ...decodeOptions,
                  strict: e.target.checked,
                })}
                className="w-4 h-4"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                严格模式 (strict)
              </span>
            </label>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 ml-6">
              启用严格校验（转义、语法、长度、分隔符）
            </p>
          </div>
          
          {/* 缩进 */}
          <div>
            <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
              期望缩进 (indent)
            </label>
            <input
              type="number"
              value={decodeOptions.indent || 2}
              onChange={e => onDecodeOptionsChange({
                ...decodeOptions,
                indent: parseInt(e.target.value) || 2,
              })}
              min={0}
              max={8}
              className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              期望的缩进空格数（默认 2）
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

