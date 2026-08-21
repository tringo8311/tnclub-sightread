import { Button, Modal } from '@/components'
import { useEventListener, usePlayerState } from '@/hooks'
import { SongMetadata } from '@/types'
import clsx from 'clsx'
import { useAtomValue } from 'jotai'
import { ChevronLeft, ChevronRight, Pause, Play, Printer } from 'lucide-react'
import { useState } from 'react'
import { Heading, Text } from 'react-aria-components'
import { createSearchParams, useNavigate } from 'react-router'
import { SongScrubBar, useSongScrubTimes } from '../controls'
import { usePlayer } from '../player'
import { SheetMusicPrintModal } from '../SongVisualization/SheetMusicPrintModal'
import PreviewIcon from './PreviewIcon'
import { SongPreview } from './SongPreview'

type ModalProps = {
  show: boolean
  onClose: () => void
  songMeta?: SongMetadata
}
export default function SongPreviewModal({
  show = true,
  onClose = () => {},
  songMeta = undefined,
}: ModalProps) {
  const [showPrintModal, setShowPrintModal] = useState(false)
  const { title, id, source } = songMeta ?? {}
  const player = usePlayer()
  const playerState = usePlayerState()
  const navigate = useNavigate()
  const song = useAtomValue(player.song)
  const trackCount = song ? Object.keys(song.tracks).length : undefined
  const noteCount = song?.notes.length
  const playSongSearch = id && source ? createSearchParams({ id, source }).toString() : ''
  const { currentTime, duration } = useSongScrubTimes()

  useEventListener<KeyboardEvent>('keydown', (event) => {
    if (!show) return

    if (event.key === ' ') {
      event.preventDefault()
      player.toggle()
    }
    if (event.key === 'Enter') {
      event.preventDefault()
      if (playSongSearch) {
        navigate({ pathname: '/play', search: `?${playSongSearch}` })
      }
    }
  })

  function handleClose() {
    player.stop()
    return onClose()
  }

  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false)

  if (!show || !id || !source) {
    return null
  }

  const trackCountLabel = trackCount === undefined ? '--' : String(trackCount).padStart(2, '0')
  const noteCountLabel = noteCount === undefined ? '--' : noteCount.toLocaleString()

  return (
    <Modal
      show={show && !!id}
      onClose={handleClose}
      className="overflow-hidden rounded-2xl bg-transparent p-0"
      modalClassName="max-w-none w-[min(94vw,1100px)] max-h-[90vh] my-auto"
    >
      <div className="flex h-auto max-h-[88vh] w-full flex-col overflow-y-auto bg-white text-left transition-all md:h-[min(85vh,680px)] md:flex-row md:overflow-hidden">
        {/* Main Visualization Canvas */}
        <div
          className="relative h-[260px] min-h-[220px] w-full shrink-0 overflow-hidden bg-[#21242b] sm:h-[340px] md:h-auto md:flex-1"
          onClick={() => player.toggle()}
        >
          {!playerState.canPlay && (
            <PreviewIcon
              isLoading={!playerState.canPlay}
              isPlaying={playerState.playing}
              onPlay={(e) => {
                e.stopPropagation()
                player.play()
              }}
            />
          )}
          {id && source && <SongPreview songId={id} source={source} />}
        </div>

        {/* Sidebar Panel */}
        <div
          className={clsx(
            'relative flex w-full flex-col border-t border-gray-200 bg-white transition-all duration-300 md:border-t-0 md:border-l',
            isSidebarCollapsed ? 'items-center py-4 md:w-16' : 'md:w-[360px] lg:w-[380px]',
          )}
        >
          {/* Collapse / Expand Toggle Button */}
          <button
            onClick={() => setSidebarCollapsed(!isSidebarCollapsed)}
            title={isSidebarCollapsed ? 'Expand Panel' : 'Collapse Panel'}
            aria-label={isSidebarCollapsed ? 'Expand Panel' : 'Collapse Panel'}
            data-element-id="preview-modal-sidebar-toggle"
            data-ui="midi-preview-modal"
            className={clsx(
              'z-20 flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-600 shadow-sm transition hover:bg-violet-100 hover:text-violet-600 active:scale-95',
              isSidebarCollapsed ? 'mb-4' : 'absolute top-5 right-5',
            )}
          >
            {isSidebarCollapsed ? (
              <ChevronLeft className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>

          {isSidebarCollapsed ? (
            /* Collapsed Compact 1-Column Layout */
            <div
              className="flex h-full flex-col items-center justify-between py-2 text-center"
              data-ui="midi-preview-modal"
            >
              <div className="flex flex-col items-center gap-6">
                <Button
                  variant="primary"
                  size="md"
                  elementId="preview-modal-play-pause-collapsed"
                  data-ui="midi-preview-modal"
                  aria-label={playerState.playing ? 'Pause preview' : 'Play preview'}
                  className="h-10 w-10 rounded-full p-0"
                  onPress={() => player.toggle()}
                >
                  {playerState.playing ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="ml-0.5 h-4 w-4" />
                  )}
                </Button>

                <div className="flex flex-col items-center gap-1 font-mono text-[10px] text-gray-500">
                  <span>{currentTime}</span>
                  <div className="h-3 w-px bg-gray-300" />
                  <span>{duration}</span>
                </div>

                <div className="flex flex-col items-center gap-3 text-xs font-semibold text-gray-600">
                  <div className="flex flex-col items-center" title="Tracks">
                    <span className="text-[9px] text-gray-400 uppercase">Trk</span>
                    <span>{trackCountLabel}</span>
                  </div>
                  <div className="flex flex-col items-center" title="Total Notes">
                    <span className="text-[9px] text-gray-400 uppercase">Nts</span>
                    <span>{noteCountLabel}</span>
                  </div>
                </div>
              </div>

              <Button
                variant="primary"
                size="md"
                elementId="preview-modal-play-now-collapsed"
                data-ui="midi-preview-modal"
                aria-label="Play Now"
                className="h-10 w-10 p-0"
                onPress={() => navigate({ pathname: '/play', search: `?${playSongSearch}` })}
                title="Play Now"
              >
                <Play className="ml-0.5 h-5 w-5" />
              </Button>
            </div>
          ) : (
            /* Expanded Full Sidebar */
            <>
              <div className="px-6 pt-6 pr-16 pb-3">
                <Heading
                  className="truncate text-xl leading-tight font-semibold text-gray-900"
                  title={title}
                >
                  {title}
                </Heading>
                <Text className="mt-1 text-sm font-medium text-gray-500">MIDI Preview</Text>
              </div>

              <div className="px-6 pb-6">
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
                  <div className="flex items-center gap-3">
                    <Button
                      variant="ghost"
                      elementId="preview-modal-play-pause-btn"
                      data-ui="midi-preview-modal"
                      aria-label={playerState.playing ? 'Pause preview' : 'Play preview'}
                      className="h-8 w-8 rounded-full p-0 text-gray-600 hover:bg-gray-200/60 hover:text-violet-600"
                      onPress={() => player.toggle()}
                    >
                      {playerState.playing ? (
                        <Pause className="h-4 w-4" />
                      ) : (
                        <Play className="h-4 w-4" />
                      )}
                    </Button>
                    <div className="flex flex-1 flex-col gap-1">
                      <SongScrubBar height={8} className="w-full" trackClassName="bg-gray-200" />
                      <div className="flex items-center justify-between font-mono text-[10px] text-gray-500">
                        <span>{currentTime}</span>
                        <span>{duration}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-6">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="inline-flex items-center gap-2 rounded-md border border-gray-200 bg-gray-50 px-3 py-1.5 shadow-sm">
                    <Text className="text-[10px] font-semibold tracking-wider text-gray-400 uppercase">
                      Tracks
                    </Text>
                    <Text className="text-sm font-semibold text-gray-900">{trackCountLabel}</Text>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-md border border-gray-200 bg-gray-50 px-3 py-1.5 shadow-sm">
                    <Text className="text-[10px] font-semibold tracking-wider text-gray-400 uppercase">
                      Total Notes
                    </Text>
                    <Text className="text-sm font-semibold text-gray-900">{noteCountLabel}</Text>
                  </div>
                  <Button
                    variant="outline"
                    size="lg"
                    elementId="preview-modal-print-sheet-btn"
                    data-ui="midi-preview-modal"
                    aria-label="In / Xuất Sheet Nhạc"
                    className="flex w-full items-center justify-center gap-2 border-gray-300 font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    onPress={() => setShowPrintModal(true)}
                  >
                    <Printer className="h-4 w-4 text-gray-600 transition-colors group-hover:text-gray-900" />
                    <span>In / Xuất Sheet Nhạc (A4)</span>
                  </Button>
                </div>
              </div>

              <div className="mt-auto border-t border-gray-100 px-6 py-6">
                <div className="mb-3 text-center text-xs text-gray-400">
                  Press{' '}
                  <kbd className="rounded border border-gray-200 bg-gray-100 px-1.5 py-0.5 font-mono text-gray-500">
                    Enter
                  </kbd>{' '}
                  to start
                </div>
                <div className="flex flex-col gap-2">
                  <Button
                    variant="primary"
                    size="lg"
                    elementId="preview-modal-play-now-btn"
                    data-ui="midi-preview-modal"
                    aria-label="Play Now"
                    className="w-full"
                    onPress={() => navigate({ pathname: '/play', search: `?${playSongSearch}` })}
                  >
                    Play Now
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <SheetMusicPrintModal
        show={showPrintModal}
        onClose={() => setShowPrintModal(false)}
        songMeta={songMeta}
        song={song}
      />
    </Modal>
  )
}
