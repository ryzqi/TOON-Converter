/**
 * 键盘快捷键管理 Hook
 * 遵循 DRY 原则：避免重复的快捷键绑定逻辑
 */

import { useEffect } from 'react'

type ShortcutConfig = Record<string, () => void>

export function useKeyboardShortcuts(shortcuts: ShortcutConfig) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!(e.ctrlKey || e.metaKey)) return

      const action = shortcuts[e.key]
      if (action) {
        e.preventDefault()
        action()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [shortcuts])
}
