/**
 * Token 近似计数工具
 * 使用简化算法，避免引入大型 tokenizer 依赖（YAGNI）
 * 文档已说明：不同 tokenizer 结果不同，此处仅为近似值
 */

import type { TokenStats } from '../types/conversion'

/**
 * 近似估算 token 数量
 * 简化算法：
 * 1. 英文单词/数字：按空格分割
 * 2. 标点符号：单独计数
 * 3. 中文字符：每个字符约 1-2 token
 */
export function estimateTokens(text: string): number {
  if (!text) return 0
  
  let tokens = 0
  
  // 分割为单词、数字、标点
  const parts = text.match(/[\u4e00-\u9fa5]|[a-zA-Z0-9]+|[^\w\s]/g) || []
  
  for (const part of parts) {
    if (/[\u4e00-\u9fa5]/.test(part)) {
      // 中文字符，约 1.5 token
      tokens += 1.5
    } else if (/[a-zA-Z0-9]+/.test(part)) {
      // 英文单词/数字，约 1 token
      tokens += 1
    } else {
      // 标点符号，约 0.5 token
      tokens += 0.5
    }
  }
  
  return Math.ceil(tokens)
}

/**
 * 计算 Token 统计信息
 */
export function calculateTokenStats(
  jsonString: string,
  toonString: string
): TokenStats {
  const jsonTokens = estimateTokens(jsonString)
  const toonTokens = estimateTokens(toonString)
  
  const savings = jsonTokens > 0
    ? ((jsonTokens - toonTokens) / jsonTokens) * 100
    : 0
  
  return {
    jsonTokens,
    toonTokens,
    savings: Math.max(0, savings), // 确保非负
  }
}

