import { usePlayer } from '@/features/player'
import { SongPreview } from '@/features/SongPreview/SongPreview'
import { useEventListener, useOnUnmount, usePlayerState } from '@/hooks'
import useDelayedFlag from '@/hooks/useDelayedFlag'
import { Pause, Play } from '@/icons'
import type { SongSource } from '@/types'
import clsx from 'clsx'
import { Select, SelectItem } from '@/components'
import { useState } from 'react'

const FEATURED_SONGS: { [id: string]: { source: SongSource; id: string } } = {
  gymnopedie: { source: 'builtin', id: 'gymnopedie-no1.mid' },
  ode: { source: 'builtin', id: 'ode-to-joy.mid' },
  canon: { source: 'builtin', id: 'canon-in-d.mid' },
}

export function FeaturedSongsPreview({
  marginTop = 0,
  className,
}: {
  marginTop?: number
  className?: string
}) {
  const playerState = usePlayerState()
  const [currentSong, setCurrentSong] = useState<keyof typeof FEATURED_SONGS>('ode')
  const { id: songId, source } = FEATURED_SONGS[currentSong]
  const showPlaceholder = !playerState.canPlay
  const showSpinner = useDelayedFlag(showPlaceholder, 300)
  const player = usePlayer()

  useEventListener('keydown', (event: Event) => {
    const e = event as KeyboardEvent
    if (e.key === ' ') {
      e.preventDefault()
      player.toggle()
      return
    }
  })

  useOnUnmount(() => player.pause())

  return (
    <div
      className={clsx(
        'relative h-[360px] w-full overflow-hidden rounded-lg shadow-xl',
        'bg-background',
        className,
      )}
      style={{ marginTop }}
    >
      <SongPreview songId={songId} source={source} />
      {showPlaceholder && (
        <div className="bg-background absolute inset-0 flex items-center justify-center">
          {showSpinner && (
            <div className="border-foreground h-12 w-12 animate-spin rounded-full border-4 border-t-transparent"></div>
          )}
        </div>
      )}
      <div className="border-border bg-card absolute top-0 right-0 left-0 z-20 flex h-14 items-center justify-between border-b px-4">
        <div className="flex items-center gap-3">
          <button
            className={clsx(
              'bg-primary hover:bg-primary/80 text-primary-foreground flex h-8 w-8 items-center justify-center rounded-full transition',
              !playerState.canPlay && 'cursor-progress',
            )}
            onClick={() => player.toggle()}
          >
            {playerState.playing ? <Pause size={18} /> : <Play size={18} />}
          </button>
          <span className="text-muted-foreground text-sm">Preview</span>
        </div>
        <div className="text-foreground relative">
          <Select
            aria-label="Select Featured Song"
            selectedKey={currentSong}
            onSelectionChange={(key) => setCurrentSong(key as any)}
            className="w-[160px]"
            size="md"
          >
            <SelectItem id="ode">Ode to Joy</SelectItem>
            <SelectItem id="canon">Canon in D</SelectItem>
            <SelectItem id="gymnopedie">Gymnopédie No.1</SelectItem>
          </Select>
        </div>
      </div>
    </div>
  )
}
