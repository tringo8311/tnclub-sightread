import { Canvas } from '@/components'
import * as touchscroll from '@/features/SongVisualization/touchscroll'
import { transposeKeySignature } from '@/features/theory'
import { useSize } from '@/hooks'
import { Hand, Song, SongConfig } from '@/types'
import { LegacyRef, useEffect, useMemo, useRef } from 'react'
import { usePlayer } from '../player'
import { GivenState, render } from './canvas-renderer'
import { waitForImages } from './images'
import { PIXELS_PER_SECOND as pps } from './utils'

type HandSettings = {
  [trackId: string]: {
    hand: Hand | 'none'
  }
}

type CanvasRendererProps = {
  song: Song | undefined
  config: SongConfig
  hand: Hand
  handSettings: HandSettings
  getTime: () => number
  constrictView?: boolean
  selectedRange?: { start: number; end: number }
  enableTouchscroll?: boolean
  game?: boolean
}

function CanvasRenderer({
  song,
  config,
  hand,
  handSettings,
  selectedRange,
  getTime,
  constrictView = true,
  enableTouchscroll = false,
  game = false,
}: CanvasRendererProps) {
  const isReady = useRef(false)
  const { width, height, measureRef } = useSize()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const player = usePlayer()

  useEffect(() => {
    waitForImages().then(() => (isReady.current = true))
  })

  const canvasRect: DOMRect = useMemo(() => {
    return canvasRef.current?.getBoundingClientRect() ?? {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width, height]) as DOMRect

  function renderCanvas(ctx: CanvasRenderingContext2D, { width, height }: any) {
    if (!song || !isReady.current) {
      return
    }

    const baseKeySignature = config.keySignature ?? song.keySignature
    const transpose = config.transpose ?? 0
    const effectiveKeySignature = baseKeySignature ?? 'C'
    const state: GivenState = {
      time: getTime(),
      visualization: config.visualization,
      noteLabels: config.noteLabels,
      coloredNotes: config.coloredNotes,
      transpose,
      windowWidth: width,
      height,
      pps,
      hands: handSettings,
      hand,
      ctx,
      items: song.items,
      constrictView: !!constrictView,
      keySignature: transposeKeySignature(effectiveKeySignature, transpose),
      displayKeySignature: baseKeySignature
        ? transposeKeySignature(baseKeySignature, transpose)
        : undefined,
      timeSignature: song.timeSignature,
      canvasRect,
      selectedRange,
      game,
      player,
    }
    render(state)
  }

  return (
    <div
      className="absolute h-full w-full touch-none"
      ref={measureRef}
      onPointerMove={(e) => {
        if (config.visualization === 'sheet-a4') {
          // Manual drag for A4 paper
          if (e.buttons > 0) {
            import('./sheet-a4').then(m => m.handleManualScroll(-e.movementY))
          }
        } else if (enableTouchscroll) {
          touchscroll.handleMove(player, e.nativeEvent)
        }
      }}
      onPointerDown={(e) => {
        if (config.visualization === 'sheet-a4') {
          const target = e.target as HTMLDivElement
          target.setPointerCapture(e.pointerId)
        } else if (enableTouchscroll) {
          touchscroll.handleDown(player, e.nativeEvent)
        }
      }}
      onPointerUp={(e) => {
        if (config.visualization === 'sheet-a4') {
          const target = e.target as HTMLDivElement
          target.releasePointerCapture(e.pointerId)
        } else if (enableTouchscroll) {
          touchscroll.handleUp(player, e.nativeEvent)
        }
      }}
      onWheel={(e) => {
        if (config.visualization === 'sheet-a4') {
          import('./sheet-a4').then(m => m.handleManualScroll(e.deltaY))
        } else if (enableTouchscroll) {
          const seekAmount = (e.deltaY / 100)
          const newTime = Math.max(0, Math.min(player.getDuration(), player.getTime() + seekAmount))
          player.seek(newTime)
        }
      }}
    >
      <Canvas ref={canvasRef as LegacyRef<HTMLCanvasElement>} render={renderCanvas} />
    </div>
  )
}

export default CanvasRenderer
