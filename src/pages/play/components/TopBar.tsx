import { Tooltip } from '@/components'
import { ArrowLeft, BarChart2, KeyboardMusic, Settings } from '@/icons'
import clsx from 'clsx'
import React, { MouseEvent, PropsWithChildren } from 'react'
import { Button, TooltipTrigger } from 'react-aria-components'

type TopBarProps = {
  title?: string
  subtitle?: string
  onClickBack: () => void
  onClickMidi: (e: MouseEvent<any>) => void
  onClickStats: (e: MouseEvent<any>) => void
  statsVisible: boolean
  isSettingsOpen: boolean
  onToggleSettings: () => void
}

export default function TopBar({
  onClickBack,
  title,
  subtitle,
  onClickMidi,
  statsVisible,
  onClickStats,
  isSettingsOpen,
  onToggleSettings,
}: TopBarProps) {
  return (
    <div
      data-ui="play-top-bar"
      data-component="TopBar"
      className="relative z-10 h-14 w-screen border-b border-[#20222a] bg-[#15161b] px-4"
    >
      <div className="flex h-full items-center justify-between">
        <div className="flex items-center gap-3">
          <ButtonWithTooltip elementId="play-topbar-back-btn" tooltip="Back" onClick={onClickBack}>
            <ArrowLeft size={24} />
          </ButtonWithTooltip>
          <div className="flex flex-col">
            {title && (
              <span
                data-element-id="play-topbar-song-title"
                data-ui="play-top-bar"
                className="max-w-[320px] truncate text-sm font-semibold text-white"
                title={title}
              >
                {title}
              </span>
            )}
            {subtitle && (
              <span
                data-element-id="play-topbar-song-subtitle"
                data-ui="play-top-bar"
                className="text-xs font-medium tracking-wider text-gray-500 uppercase"
              >
                {subtitle}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-4 md:gap-8">
          <ButtonWithTooltip
            elementId="play-topbar-stats-btn"
            tooltip={statsVisible ? 'Hide Stats' : 'Show Stats'}
            isActive={statsVisible}
            onClick={onClickStats}
          >
            <BarChart2 size={20} />
          </ButtonWithTooltip>
          <ButtonWithTooltip
            elementId="play-topbar-midi-btn"
            tooltip="Choose a MIDI device"
            onClick={onClickMidi}
          >
            <KeyboardMusic size={24} />
          </ButtonWithTooltip>
          <ButtonWithTooltip
            elementId="play-topbar-settings-btn"
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
  React.ComponentProps<typeof Button> & {
    tooltip: string
    isActive?: boolean
    elementId?: string
  }
>

export function ButtonWithTooltip({
  tooltip,
  children,
  isActive,
  className,
  elementId,
  ...rest
}: ButtonWithTooltipProps) {
  return (
    <TooltipTrigger delay={0}>
      <Button
        {...rest}
        data-element-id={elementId}
        data-ui="play-top-bar"
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
