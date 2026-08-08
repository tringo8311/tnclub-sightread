import { Loader, Play } from '@/icons'
import clsx from 'clsx'
import { MouseEvent } from 'react'

type PreviewIconProps = {
  isPlaying: boolean
  isLoading: boolean
  onPlay: (e: MouseEvent) => void
}
export default function PreviewIcon({ isPlaying, isLoading, onPlay }: PreviewIconProps) {
  if (isPlaying) {
    return null
  }
  const icon = isLoading ? (
    <Loader width={60} height={60} className="animate-spin text-white" />
  ) : (
    <div
      data-element-id="preview-modal-overlay-play-btn"
      data-ui="midi-preview-modal"
      role="button"
      tabIndex={0}
      aria-label="Play song preview"
      className={clsx(
        'text-purple-primary hover:text-purple-hover cursor-pointer',
        'grid h-16 w-16 transform place-items-center rounded-full bg-white shadow-lg transition hover:scale-105 active:scale-95',
      )}
      onClick={onPlay}
    >
      <Play height={36} width={36} />
    </div>
  )
  return (
    <div
      className="absolute z-10 grid h-full w-full place-items-center bg-gray-700/70"
      onClick={(e) => e.stopPropagation()}
    >
      {icon}
    </div>
  )
}
