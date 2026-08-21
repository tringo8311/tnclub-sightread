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
import styles from './components.module.css'

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
        className={styles.cardGridContainer}
      >
        {sorted.length === 0 ? (
          <div data-ui="song-card-empty" className={styles.emptyState}>
            <div className={styles.emptyIconWrapper}>
              <Music className="h-8 w-8" />
            </div>
            <h3 className={styles.emptyTitle}>Không tìm thấy bài hát nào</h3>
            <p className={styles.emptySubtitle}>
              Thử thay đổi từ khóa tìm kiếm hoặc chọn bộ lọc khác.
            </p>
          </div>
        ) : (
          <div className={styles.grid}>
            {sorted.map((item) => {
              const progress = songProgress[`${activeProfileId}_${item.id}`] || 0
              return (
                <div
                  key={item.id}
                  data-element-id={`song-card-${item.id}`}
                  data-ui="song-card-item"
                  onClick={() => onSelectRow(item.id)}
                  className={styles.cardItem}
                >
                  <div className={styles.cardHeader}>
                    {/* Top Row: Icon + Progress Badge */}
                    <div className={styles.cardTopRow}>
                      <div className={styles.cardIcon}>
                        <Music size={20} />
                      </div>
                      <span
                        className={clsx(
                          styles.progressBadge,
                          progress === 100
                            ? 'glow-text-green text-[var(--color-green-neon)]'
                            : progress > 0
                              ? 'glow-text-cyan text-[var(--color-cyan-neon)]'
                              : 'text-foreground/40',
                        )}
                      >
                        {progress}%
                      </span>
                    </div>

                    {/* Title & Author (100% width) */}
                    <div className={styles.titleContainer}>
                      <h3 className={styles.songTitle} title={item.title}>
                        {item.title}
                      </h3>
                      <span className={styles.songAuthorDefault}>
                        {item.author || item.category || 'Sheet Music'}
                      </span>
                    </div>
                  </div>

                  {/* Footer Meta Row: Level + Duration + Actions */}
                  <div className={styles.hoverMetaInfo}>
                    <div className={styles.cardFooter}>
                      <div className={styles.levelTag} title="Level">
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
                          {item.level === 'Fresher' ? 'Fresher' : item.level || 'Beginner'}
                        </span>
                      </div>

                      <div className={styles.durationTag} title="Duration">
                        <Clock size={14} className="text-foreground/40" />
                        <span>{formatTime(Number(item.duration))}</span>
                      </div>

                      <div className="ml-2 flex items-center gap-1">
                        <button
                          data-element-id={`song-add-playlist-btn-${item.id}`}
                          data-ui="song-card-item"
                          aria-label="Add to playlist"
                          onClick={(e) => {
                            e.stopPropagation()
                            setPlaylistModalSong({ id: item.id, title: item.title })
                          }}
                          className={styles.actionIconBtn}
                          title="Thêm vào Playlist"
                        >
                          <ListPlus size={16} />
                        </button>
                        <button
                          data-element-id={`song-favorite-btn-${item.id}`}
                          data-ui="song-card-item"
                          aria-label="Favorite song"
                          onClick={(e) => toggleFavorite(e, item.id)}
                          className={styles.actionIconBtn}
                        >
                          <Star
                            size={16}
                            className={clsx(
                              favorites[`${activeProfileId}_${item.id}`]
                                ? 'fill-[var(--color-pink-neon)] text-[var(--color-pink-neon)]'
                                : 'text-foreground/20',
                            )}
                          />
                        </button>
                      </div>
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
