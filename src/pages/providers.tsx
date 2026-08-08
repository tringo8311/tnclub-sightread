import { PlayerProvider } from '@/features/player'
import { useApplyFontSettings } from '@/hooks/useApplyFontSettings'
import * as RadixToast from '@radix-ui/react-toast'
import { PropsWithChildren } from 'react'

export function Providers({ children }: PropsWithChildren<{}>) {
  useApplyFontSettings()

  return (
    <PlayerProvider>
      <RadixToast.ToastProvider swipeDirection="right" duration={2000}>
        {children}
      </RadixToast.ToastProvider>
    </PlayerProvider>
  )
}
