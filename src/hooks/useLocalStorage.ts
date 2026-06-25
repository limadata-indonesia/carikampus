import { useState } from 'react'

export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initial
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initial
    } catch { return initial }
  })

  const set = (val: T | ((prev: T) => T)) => {
    const next = val instanceof Function ? val(value) : val
    setValue(next)
    if (typeof window !== 'undefined') {
      try { window.localStorage.setItem(key, JSON.stringify(next)) } catch {}
    }
  }

  return [value, set] as const
}
