/**
 * 转换工具 - 集成 @toon-format/toon 库
 * 遵循 SRP：单一转换职责
 */

import { encode, decode } from '@toon-format/toon'
import type { EncodeOptions, DecodeOptions, ConversionResult } from '../types/conversion'

/**
 * JSON 转 TOON
 */
export function jsonToToon(
  jsonString: string,
  options: EncodeOptions = {}
): ConversionResult {
  try {
    // 解析 JSON
    const data = JSON.parse(jsonString)
    
    // 编码为 TOON
    const toonString = encode(data, options)
    
    // 检测模式（简单启发式）
    const mode = detectToonMode(toonString)
    
    return {
      success: true,
      output: toonString,
      mode,
    }
  } catch (error) {
    return {
      success: false,
      output: '',
      error: error instanceof Error ? error.message : '未知错误',
    }
  }
}

/**
 * TOON 转 JSON
 */
export function toonToJson(
  toonString: string,
  options: DecodeOptions = { strict: true, indent: 2 }
): ConversionResult {
  try {
    // 解码 TOON
    const data = decode(toonString, options)
    
    // 格式化 JSON
    const jsonString = JSON.stringify(data, null, 2)
    
    return {
      success: true,
      output: jsonString,
    }
  } catch (error) {
    return {
      success: false,
      output: '',
      error: error instanceof Error ? error.message : '未知错误',
    }
  }
}

/**
 * 往返一致性校验
 */
export function validateRoundTrip(
  input: string,
  direction: 'json-first' | 'toon-first',
  encodeOptions: EncodeOptions = {},
  decodeOptions: DecodeOptions = { strict: true, indent: 2 }
): { valid: boolean; error?: string } {
  try {
    if (direction === 'json-first') {
      // JSON → TOON → JSON
      const data1 = JSON.parse(input)
      const toon = encode(data1, encodeOptions)
      const data2 = decode(toon, decodeOptions)
      
      // 深度比较对象
      const valid = JSON.stringify(data1) === JSON.stringify(data2)
      return { valid }
    } else {
      // TOON → JSON → TOON
      const data1 = decode(input, decodeOptions)
      const json = JSON.stringify(data1)
      const data2 = JSON.parse(json)
      
      // 深度比较对象
      const valid = JSON.stringify(data1) === JSON.stringify(data2)
      return { valid }
    }
  } catch (error) {
    return {
      valid: false,
      error: error instanceof Error ? error.message : '往返校验失败',
    }
  }
}

/**
 * 检测 TOON 格式模式（启发式）
 */
function detectToonMode(toonString: string): 'tabular' | 'list' | 'inline' | 'object' {
  // 表格模式：包含 [{...}]: 头部
  if (/\[\d+\]\{[^}]+\}:/.test(toonString)) {
    return 'tabular'
  }
  
  // 列表模式：包含 - 前缀
  if (/^\s*-\s+/m.test(toonString)) {
    return 'list'
  }
  
  // 内联数组：包含 [N]: 但没有对象头部
  if (/\[\d+\]:\s*[^\n{]+/.test(toonString)) {
    return 'inline'
  }
  
  // 默认对象模式
  return 'object'
}

/**
 * 自动检测输入格式
 */
export function detectInputFormat(input: string): 'json' | 'toon' | 'unknown' {
  const trimmed = input.trim()
  
  if (!trimmed) {
    return 'unknown'
  }
  
  // 尝试 JSON 解析
  try {
    JSON.parse(trimmed)
    return 'json'
  } catch {
    // JSON 解析失败
  }
  
  // TOON 特征检测
  const toonPatterns = [
    /^\w+:/m,                    // key: value
    /\[\d+\]:/,                  // [N]:
    /\[\d+\]\{[^}]+\}:/,        // [N]{...}:
    /^\s*-\s+/m,                 // - item
  ]
  
  if (toonPatterns.some(pattern => pattern.test(trimmed))) {
    return 'toon'
  }
  
  return 'unknown'
}

