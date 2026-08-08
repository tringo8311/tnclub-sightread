import { fontSizeAtom } from '@/features/persist'
import { useAtomValue } from 'jotai'
import { useEffect } from 'react'

export function useApplyFontSettings() {
  const fontSize = useAtomValue(fontSizeAtom)

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Scale root font-size using CSS percentage based on 16px baseline (1rem = 100% = 16px)
    // 14px -> 87.5% (0.875rem), 16px -> 100% (1rem), 18px -> 112.5% (1.125rem), 20px -> 125% (1.25rem)
    const remScalePercentage = (fontSize / 16) * 100
    document.documentElement.style.fontSize = `${remScalePercentage}%`
  }, [fontSize])
}
