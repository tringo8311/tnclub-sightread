import { Modal } from '@/components'
import {
  activeProfileIdAtom,
  favoritesAtom,
  songProgressAtom,
} from '@/features/persist/persistence'
import { SongMetadata } from '@/types'
import { formatTime } from '@/utils'
import clsx from 'clsx'
import { useAtom, useAtomValue } from 'jotai'
import { BarChart, Clock, ListPlus, Music, Star } from 'lucide-react'
import * as React from 'react'
import { useMemo, useState } from 'react'
import { useCollator, useFilter } from 'react-aria'
import AddToPlaylistModal from './AddToPlaylistModal'

type CardViewProps = {
  rows: SongMetadata[]
  search: string
  levelFilter: string
  favoritesOnly: boolean
  onSelectRow: (id: string) => void
}

export default function CardView({
  rows,
  search,
  levelFilter,
  favoritesOnly,
  onSelectRow,
}: CardViewProps) {
  const { contains } = useFilter({ sensitivity: 'base' })
  const collator = useCollator({ numeric: true, sensitivity: 'base' })
  const activeProfileId = useAtomValue(activeProfileIdAtom)
  const songProgress = useAtomValue(songProgressAtom)
  const [favorites, setFavorites] = useAtom(favoritesAtom)
  const [playlistModalSong, setPlaylistModalSong] = useState<{ id: string; title: string } | null>(
    null,
  )

  const toggleFavorite = (e: React.MouseEvent, songId: string) => {
    e.stopPropagation()
    const key = `${activeProfileId}_${songId}`
    setFavorites((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  // In CardView, we can just sort by title by default, or keep duration
  const [sortDescriptor, setSortDescriptor] = useState({
    column: 'title',
    direction: 'ascending',
  })

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase()
    return rows.filter((row) => {
      const matchSearch =
        !query ||
        row.title.toLowerCase().includes(query) ||
        (row.author && row.author.toLowerCase().includes(query)) ||
        (row.category && row.category.toLowerCase().includes(query))
      const matchLevel = levelFilter === 'All' || row.level === levelFilter
      const isFavorite = favorites[`${activeProfileId}_${row.id}`]
      const matchFavorites = !favoritesOnly || isFavorite
      return matchSearch && matchLevel && matchFavorites
    })
  }, [rows, search, levelFilter, favoritesOnly, favorites, activeProfileId])

  const sorted = useMemo(() => {
    const next = [...filtered]
    const { column, direction } = sortDescriptor
    next.sort((a, b) => {
      let cmp = 0
      if (column === 'duration') {
        cmp = a.duration - b.duration
      } else if (column === 'level') {
        cmp = collator.compare(a.level || '', b.level || '')
      } else if (column === 'category') {
        cmp = collator.compare(a.category || '', b.category || '')
      } else if (column === 'progress') {
        const progA = songProgress[`${activeProfileId}_${a.id}`] || 0
        const progB = songProgress[`${activeProfileId}_${b.id}`] || 0
        cmp = progA - progB
      } else {
        cmp = collator.compare(a.title, b.title)
      }

      if (cmp === 0) {
        cmp = collator.compare(a.title, b.title)
      }

      return direction === 'descending' ? -cmp : cmp
    })
    return next
  }, [collator, filtered, sortDescriptor, songProgress, activeProfileId])

  return (
    <>
      <Modal
        show={!!playlistModalSong}
        onClose={() => setPlaylistModalSong(null)}
        className="bg-card text-card-foreground w-[min(96vw,440px)] overflow-hidden rounded-2xl border-none p-0 shadow-2xl"
        modalClassName="max-w-[440px]"
      >
        {playlistModalSong && (
          <AddToPlaylistModal
            songId={playlistModalSong.id}
            songTitle={playlistModalSong.title}
            onClose={() => setPlaylistModalSong(null)}
          />
        )}
      </Modal>
      <div
        data-ui="song-card-grid"
        data-component="CardView"
        data-element-id="song-card-grid"
        className="flex min-h-0 flex-1 flex-col overflow-x-hidden overflow-y-auto p-1"
      >
        {sorted.length === 0 ? (
          <div
            data-ui="song-card-empty"
            className="animate-in fade-in flex flex-1 flex-col items-center justify-center py-16 text-center duration-300"
          >
            <div className="bg-foreground/5 text-foreground/40 mb-4 flex h-16 w-16 items-center justify-center rounded-full">
              <Music className="h-8 w-8" />
            </div>
            <h3 className="text-foreground mb-1 text-lg font-medium">Không tìm thấy bài hát nào</h3>
            <p className="text-foreground/50 max-w-sm text-sm leading-relaxed">
              Thử thay đổi từ khóa tìm kiếm hoặc chọn bộ lọc khác.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 pb-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {sorted.map((item) => {
              const progress = songProgress[`${activeProfileId}_${item.id}`] || 0
              return (
                <div
                  key={item.id}
                  data-element-id={`song-card-${item.id}`}
                  data-ui="song-card-item"
                  onClick={() => onSelectRow(item.id)}
                  className="glass-card group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl p-5"
                >
                  {/* Decorative background accent */}
                  <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-[var(--color-cyan-neon)] to-[var(--color-pink-neon)] opacity-0 transition-opacity group-hover:opacity-100" />

                  <div className="mb-4 flex items-start justify-between">
                    <div className="bg-foreground/5 flex h-10 w-10 items-center justify-center rounded-xl text-[var(--color-cyan-neon)] transition-transform group-hover:scale-110 group-hover:bg-[var(--color-cyan-neon)]/10">
                      <Music size={20} />
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="flex flex-col items-end">
                        <span
                          className={clsx(
                            'text-sm font-bold',
                            progress === 100
                              ? 'glow-text-green text-[var(--color-green-neon)]'
                              : progress > 0
                                ? 'glow-text-cyan text-[var(--color-cyan-neon)]'
                                : 'text-foreground/40',
                          )}
                        >
                          {progress}%
                        </span>
                        <span className="text-foreground/40 text-[10px] tracking-wide uppercase">
                          Progress
                        </span>
                      </div>
                      <button
                        data-element-id={`song-add-playlist-btn-${item.id}`}
                        data-ui="song-card-item"
                        aria-label="Add to playlist"
                        onClick={(e) => {
                          e.stopPropagation()
                          setPlaylistModalSong({ id: item.id, title: item.title })
                        }}
                        className="hover:bg-foreground/10 text-foreground/40 -mt-1 rounded-full p-1 transition-colors hover:text-violet-400"
                        title="Thêm vào Playlist"
                      >
                        <ListPlus size={18} />
                      </button>
                      <button
                        data-element-id={`song-favorite-btn-${item.id}`}
                        data-ui="song-card-item"
                        aria-label="Favorite song"
                        onClick={(e) => toggleFavorite(e, item.id)}
                        className="hover:bg-foreground/10 -mt-1 -mr-1 rounded-full p-1 transition-colors"
                      >
                        <Star
                          size={18}
                          className={clsx(
                            favorites[`${activeProfileId}_${item.id}`]
                              ? 'fill-[var(--color-pink-neon)] text-[var(--color-pink-neon)]'
                              : 'text-foreground/20',
                          )}
                        />
                      </button>
                    </div>
                  </div>

                  <div className="mb-4 flex-1">
                    <h3 className="text-foreground line-clamp-2 text-lg leading-tight font-semibold transition-colors group-hover:text-[var(--color-cyan-neon)]">
                      {item.title}
                    </h3>
                    {item.author && (
                      <p className="text-foreground/60 mt-1 line-clamp-1 text-sm">{item.author}</p>
                    )}
                    <p className="text-foreground/40 mt-1 line-clamp-1 text-sm">
                      {item.category || 'No Category'}
                    </p>
                  </div>

                  <div className="text-foreground/50 border-foreground/10 flex items-center gap-4 border-t pt-4 text-xs font-medium">
                    <div className="flex items-center gap-1.5" title="Level">
                      <BarChart
                        size={14}
                        className={clsx(
                          item.level === 'Advanced'
                            ? 'text-[var(--color-pink-neon)]'
                            : item.level === 'Intermediate'
                              ? 'text-amber-400'
                              : item.level === 'Fresher'
                                ? 'text-emerald-400'
                                : 'text-[var(--color-green-neon)]',
                        )}
                      />
                      <span
                        className={item.level === 'Fresher' ? 'font-bold text-emerald-400' : ''}
                      >
                        {item.level === 'Fresher' ? '🌱 Fresher' : item.level || 'Beginner'}
                      </span>
                    </div>
                    <div className="ml-auto flex items-center gap-1.5" title="Duration">
                      <Clock size={14} className="text-foreground/40" />
                      <span>{formatTime(Number(item.duration))}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </>
  )
}
