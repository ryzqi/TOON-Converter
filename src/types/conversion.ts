/**
 * 转换相关类型定义
 */

// 编码选项（与 TOON 文档一致）
export interface EncodeOptions {
  delimiter?: ',' | '\t' | '|'
  lengthMarker?: false | '#'
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

// 转换状态
export interface ConversionState {
  direction: ConversionDirection
  input: string
  output: string
  encodeOptions: EncodeOptions
  decodeOptions: DecodeOptions
  result: ConversionResult | null
  isConverting: boolean
}

// Token 统计
export interface TokenStats {
  jsonTokens: number
  toonTokens: number
  savings: number // 节省百分比
}

