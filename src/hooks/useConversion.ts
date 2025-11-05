/**
 * 转换 Hook - 管理转换状态与逻辑
 * 遵循 SRP：单一状态管理职责
 */

import { useState, useCallback, useEffect, useRef } from 'react'
import type {
  ConversionDirection,
  ConversionResult,
  EncodeOptions,
  DecodeOptions,
} from '../types/conversion'
import { jsonToToon, toonToJson, detectInputFormat } from '../utils/conversion'

interface UseConversionOptions {
  debounceMs?: number
  autoDetect?: boolean
}

export function useConversion(options: UseConversionOptions = {}) {
  const { debounceMs = 300, autoDetect = true } = options
  
  const [direction, setDirection] = useState<ConversionDirection>('json-to-toon')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [result, setResult] = useState<ConversionResult | null>(null)
  const [isConverting, setIsConverting] = useState(false)
  
  const [encodeOptions, setEncodeOptions] = useState<EncodeOptions>({
    delimiter: ',',
    lengthMarker: undefined,
  })
  
  const [decodeOptions, setDecodeOptions] = useState<DecodeOptions>({
    indent: 2,
    strict: true,
  })
  
  const debounceTimer = useRef<NodeJS.Timeout>()
  
  /**
   * 执行转换
   */
  const convert = useCallback(() => {
    if (!input.trim()) {
      setOutput('')
      setResult(null)
      return
    }
    
    setIsConverting(true)
    
    try {
      let conversionResult: ConversionResult
      
      if (direction === 'json-to-toon') {
        conversionResult = jsonToToon(input, encodeOptions)
      } else {
        conversionResult = toonToJson(input, decodeOptions)
      }
      
      setResult(conversionResult)
      setOutput(conversionResult.success ? conversionResult.output : '')
    } catch (error) {
      setResult({
        success: false,
        output: '',
        error: error instanceof Error ? error.message : '未知错误',
      })
      setOutput('')
    } finally {
      setIsConverting(false)
    }
  }, [input, direction, encodeOptions, decodeOptions])
  
  /**
   * 防抖转换
   */
  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current)
    }
    
    debounceTimer.current = setTimeout(() => {
      convert()
    }, debounceMs)
    
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current)
      }
    }
  }, [convert, debounceMs])
  
  /**
   * 自动检测输入格式
   */
  useEffect(() => {
    if (autoDetect && input.trim()) {
      const format = detectInputFormat(input)
      if (format === 'json' && direction !== 'json-to-toon') {
        setDirection('json-to-toon')
      } else if (format === 'toon' && direction !== 'toon-to-json') {
        setDirection('toon-to-json')
      }
    }
  }, [input, autoDetect, direction])
  
  /**
   * 切换转换方向
   */
  const toggleDirection = useCallback(() => {
    setDirection(prev => 
      prev === 'json-to-toon' ? 'toon-to-json' : 'json-to-toon'
    )
    // 交换输入输出
    const temp = input
    setInput(output)
    setOutput(temp)
  }, [input, output])
  
  /**
   * 清空输入
   */
  const clearInput = useCallback(() => {
    setInput('')
    setOutput('')
    setResult(null)
  }, [])
  
  return {
    // 状态
    direction,
    input,
    output,
    result,
    isConverting,
    encodeOptions,
    decodeOptions,
    
    // 操作
    setDirection,
    setInput,
    setEncodeOptions,
    setDecodeOptions,
    toggleDirection,
    clearInput,
    convert,
  }
}

