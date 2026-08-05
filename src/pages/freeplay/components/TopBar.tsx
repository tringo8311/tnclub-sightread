import { Tooltip } from '@/components'
import { PickInstrument } from '@/features/controls'
import { InstrumentName } from '@/features/synth'
import { ArrowLeft, KeyboardMusic, StartRecord, StopRecord } from '@/icons'
import { ButtonWithTooltip } from '@/pages/play/components/TopBar'
import clsx from 'clsx'
import React, { MouseEvent } from 'react'
import { TooltipTrigger } from 'react-aria-components'
import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'

type TopBarProps = {
  isError: boolean
  isLoading: boolean
  isRecordingAudio: boolean
  value: InstrumentName
  onChange: (instrument: InstrumentName) => void
  onClickMidi: (e: MouseEvent<any>) => void
  onClickRecord: (e: MouseEvent<any>) => void
}

export default function TopBar({
  isError,
  isLoading,
  isRecordingAudio,
  value,
  onChange,
  onClickMidi,
  onClickRecord,
}: TopBarProps) {
  const { t } = useTranslation()
  const recordTooltip = isRecordingAudio ? t('freeplay.stop_recording') : t('freeplay.start_recording')

  return (
    <div className="relative z-10 h-14 w-screen border-b border-[#20222a] bg-[#15161b] px-4">
      <div className="flex h-full items-center gap-4 text-white">
        <ButtonWithTooltip tooltip={t('freeplay.back')}>
          <Link to="/">
            <ArrowLeft size={24} />
          </Link>
        </ButtonWithTooltip>
        <RecordPillButton
          className="ml-auto"
          isRecording={isRecordingAudio}
          tooltip={recordTooltip}
          onClick={onClickRecord}
        />
        <PillActionButton
          tooltip={t('freeplay.choose_midi')}
          onClick={onClickMidi}
          icon={<KeyboardMusic />}
        >
          MIDI
        </PillActionButton>
        <PickInstrument
          className="w-auto min-w-[160px]"
          isLoading={isLoading}
          errorMessage={isError ? t('freeplay.error_loading_instruments') : undefined}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  )
}

type RecordPillButtonProps = {
  isRecording: boolean
  tooltip: string
  onClick: (e: MouseEvent<any>) => void
  className?: string
}

function RecordPillButton({ isRecording, tooltip, onClick, className }: RecordPillButtonProps) {
  const { t } = useTranslation()
  return (
    <TooltipTrigger>
      <button
        type="button"
        className={clsx(
          className,
          'flex h-8 items-center gap-2 rounded px-3 text-sm font-medium transition',
          isRecording
            ? 'border border-violet-500/30 bg-violet-500/10 text-violet-200 hover:bg-violet-500/20'
            : 'border border-transparent bg-[#1e2028] text-gray-300 hover:bg-[#232633]',
        )}
        onClick={onClick}
        onMouseDown={(event) => event.preventDefault()}
      >
        {isRecording ? (
          <StopRecord size={14} />
        ) : (
          <StartRecord size={14} className="text-red-500" />
        )}
        <span>{t('freeplay.record')}</span>
      </button>
      <Tooltip>{tooltip}</Tooltip>
    </TooltipTrigger>
  )
}

type PillActionButtonProps = {
  tooltip: string
  onClick: (e: MouseEvent<any>) => void
  icon: React.ReactElement<{ className?: string }>
  children: React.ReactNode
  className?: string
}

function PillActionButton({ tooltip, onClick, icon, children, className }: PillActionButtonProps) {
  return (
    <TooltipTrigger>
      <button
        type="button"
        className={clsx(
          className,
          'flex h-8 items-center gap-2 rounded px-3 text-sm font-medium text-gray-300 transition',
          'border border-transparent bg-[#1e2028] hover:bg-[#232633]',
        )}
        onClick={onClick}
        onMouseDown={(event) => event.preventDefault()}
      >
        {React.cloneElement(icon, {
          className: 'h-4 w-4 text-gray-300',
        })}
        <span>{children}</span>
      </button>
      <Tooltip>{tooltip}</Tooltip>
    </TooltipTrigger>
  )
}
