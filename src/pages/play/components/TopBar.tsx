import { Tooltip } from '@/components'
import { ArrowLeft, BarChart2, KeyboardMusic, Settings } from '@/icons'
import { Mic, ChevronDown } from 'lucide-react'
import clsx from 'clsx'
import { useAtomValue } from 'jotai'
import { detectedMicNoteAtom } from '@/features/audio/useMicrophonePitch'
import { getNoteName } from '@/features/theory'
import React, { MouseEvent, PropsWithChildren } from 'react'
import { Button, TooltipTrigger } from 'react-aria-components'

type TopBarProps = {
  title?: string
  subtitle?: string
  onClickBack: () => void
  onClickMidi: (e: MouseEvent<any>) => void
  onClickStats: (e: MouseEvent<any>) => void
  statsVisible: boolean
  isMicActive: boolean
  onClickMic: (e: MouseEvent<any>) => void
  isSettingsOpen: boolean
  onToggleSettings: () => void
  onOpenMicTest: () => void
}

export default function TopBar({
  onClickBack,
  title,
  subtitle,
  onClickMidi,
  statsVisible,
  onClickStats,
  isMicActive,
  onClickMic,
  isSettingsOpen,
  onToggleSettings,
  onOpenMicTest,
}: TopBarProps) {
  const detectedMidi = useAtomValue(detectedMicNoteAtom)

  return (
    <div className="relative z-10 h-14 w-screen border-b border-[#20222a] bg-[#15161b] px-4">
      <div className="flex h-full items-center justify-between">
        <div className="flex items-center gap-3">
          <ButtonWithTooltip tooltip="Back" onClick={onClickBack}>
            <ArrowLeft size={24} />
          </ButtonWithTooltip>
          <div className="flex flex-col">
            {title && (
              <span
                className="max-w-[320px] truncate text-sm font-semibold text-white"
                title={title}
              >
                {title}
              </span>
            )}
            {subtitle && (
              <span className="text-xs font-medium tracking-wider text-gray-500 uppercase">
                {subtitle}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-4 md:gap-8">
          <ButtonWithTooltip
            tooltip={statsVisible ? 'Hide Stats' : 'Show Stats'}
            isActive={statsVisible}
            onClick={onClickStats}
          >
            <BarChart2 size={20} />
          </ButtonWithTooltip>
          <ButtonWithTooltip tooltip="Choose a MIDI device" onClick={onClickMidi}>
            <KeyboardMusic size={24} />
          </ButtonWithTooltip>
          <div className="flex items-center gap-1 rounded-md bg-[#252836] p-1">
            <ButtonWithTooltip 
              tooltip={isMicActive ? 'Turn off Microphone' : 'Use Microphone'} 
              isActive={isMicActive}
              onClick={onClickMic}
            >
              <Mic size={24} />
            </ButtonWithTooltip>
            {isMicActive && (
              <div className="flex min-w-[32px] items-center justify-center px-1 text-sm font-bold text-white">
                {detectedMidi !== null ? getNoteName(detectedMidi) : '--'}
              </div>
            )}
            <ButtonWithTooltip
              tooltip="Microphone Settings"
              onClick={(e) => {
                e.stopPropagation()
                onOpenMicTest()
              }}
              className="flex items-center justify-center rounded p-1 hover:bg-white/10"
            >
              <ChevronDown size={16} />
            </ButtonWithTooltip>
          </div>
          <ButtonWithTooltip
            tooltip="Settings"
            isActive={isSettingsOpen}
            onClick={onToggleSettings}
          >
            <Settings size={24} />
          </ButtonWithTooltip>
        </div>
      </div>
    </div>
  )
}

type ButtonWithTooltipProps = PropsWithChildren<
  React.ComponentProps<typeof Button> & { tooltip: string; isActive?: boolean }
>

export function ButtonWithTooltip({
  tooltip,
  children,
  isActive,
  className,
  ...rest
}: ButtonWithTooltipProps) {
  return (
    <TooltipTrigger delay={0}>
      <Button
        {...rest}
        aria-label={rest['aria-label'] ?? tooltip}
        aria-pressed={typeof isActive === 'boolean' ? isActive : undefined}
        className={clsx(
          className,
          isActive ? 'fill-purple-primary text-purple-primary' : 'fill-white text-white',
          'hover:fill-purple-hover hover:text-purple-hover',
        )}
      >
        {children}
      </Button>
      <Tooltip> {tooltip} </Tooltip>
    </TooltipTrigger>
  )
}
