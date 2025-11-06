/**
 * 转换相关类型定义
 */

// 编码选项（与 TOON 文档一致）
export interface EncodeOptions {
  indent?: number          // 缩进空格数（默认: 2）
  delimiter?: ',' | '\t' | '|'
  lengthMarker?: '#' | false  // 长度标记（顺序与官方一致）
}

// 解码选项（与 TOON 文档一致）
export interface DecodeOptions {
  indent?: number
  strict?: boolean
}

// 转换方向
export type ConversionDirection = 'json-to-toon' | 'toon-to-json'

// 转换结果
export interface ConversionResult {
  success: boolean
  output: string
  error?: string
  mode?: 'tabular' | 'list' | 'inline' | 'object' // TOON 格式模式
}

// Token 统计
export interface TokenStats {
  jsonTokens: number
  toonTokens: number
  savings: number // 节省百分比
}

