import { Modal } from '@/components'
import {
  activeProfileIdAtom,
  favoritesAtom,
  songProgressAtom,
} from '@/features/persist/persistence'
import { ChevronDown, ListPlus } from '@/icons'
import { SongMetadata } from '@/types'
import { formatTime } from '@/utils'
import clsx from 'clsx'
import { useAtom, useAtomValue } from 'jotai'
import { Star } from 'lucide-react'
import * as React from 'react'
import { useMemo, useState } from 'react'
import { useCollator, useFilter } from 'react-aria'
import { Cell, Column, Table as RacTable, Row, TableBody, TableHeader } from 'react-aria-components'
import AddToPlaylistModal from '../AddToPlaylistModal'
import styles from '../components.module.css'

type SongsTableProps = {
  rows: SongMetadata[]
  search: string
  levelFilter: string
  favoritesOnly: boolean
  onSelectRow: (id: string) => void
}

type SortState = {
  column: 'title' | 'duration' | 'level' | 'category' | 'progress'
  direction: 'ascending' | 'descending'
}

export default function Table({
  rows,
  search,
  levelFilter,
  favoritesOnly,
  onSelectRow,
}: SongsTableProps) {
  const { contains } = useFilter({ sensitivity: 'base' })
  const collator = useCollator({ numeric: true, sensitivity: 'base' })
  const activeProfileId = useAtomValue(activeProfileIdAtom)
  const songProgress = useAtomValue(songProgressAtom)

  const [sortDescriptor, setSortDescriptor] = useState<SortState>({
    column: 'duration',
    direction: 'ascending',
  })
  const [favorites, setFavorites] = useAtom(favoritesAtom)
  const [playlistModalSong, setPlaylistModalSong] = useState<{ id: string; title: string } | null>(
    null,
  )

  const toggleFavorite = (e: React.MouseEvent, songId: string) => {
    e.stopPropagation()
    const key = `${activeProfileId}_${songId}`
    setFavorites((prev) => ({ ...prev, [key]: !prev[key] }))
  }

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
      } else if (column === 'title') {
        cmp = collator.compare(a.title, b.title)
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
        data-ui="song-list-table"
        data-component="SongTable"
        className={styles.tableOuterContainer}
        style={{
          ['--sort-icon-gap' as any]: '1.5rem',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        <div className="flex min-h-0 flex-1 flex-col">
          <RacTable
            aria-label="Songs"
            data-element-id="songs-table"
            data-ui="song-list-table"
            className="flex h-full w-full flex-col text-sm"
            sortDescriptor={sortDescriptor}
            onSortChange={(descriptor) =>
              setSortDescriptor({
                column: descriptor.column as SortState['column'],
                direction: descriptor.direction as SortState['direction'],
              })
            }
          >
            <TableHeader className={styles.tableHeader}>
              <Column id="stt" className={styles.tableHeaderCell} style={{ width: '4rem' }}>
                STT
              </Column>
              <Column
                id="favorite"
                className={styles.tableHeaderCell}
                style={{ width: '3rem', textAlign: 'center' }}
              >
                <Star size={14} className="text-foreground/40 mx-auto" />
              </Column>
              <Column
                id="playlist"
                className={styles.tableHeaderCell}
                style={{ width: '3rem', textAlign: 'center' }}
              >
                <ListPlus size={14} className="text-foreground/40 mx-auto" />
              </Column>
              <Column
                id="title"
                isRowHeader
                allowsSorting
                className={styles.tableHeaderCell}
                style={{ width: '33.33%' }}
              >
                {({ sortDirection }) => (
                  <div className="relative flex items-center">
                    <span className="truncate pr-[var(--sort-icon-gap)]">Title</span>
                    <span className="absolute right-0 flex h-4 w-4 items-center justify-center">
                      {sortDirection && (
                        <ChevronDown
                          className={clsx(
                            'h-4 w-4',
                            sortDirection === 'descending' && 'rotate-180',
                          )}
                        />
                      )}
                    </span>
                  </div>
                )}
              </Column>
              <Column
                id="author"
                allowsSorting
                className={styles.tableHeaderCell}
                style={{ width: '12rem' }}
              >
                {({ sortDirection }) => (
                  <div className="relative flex items-center">
                    <span className="truncate pr-[var(--sort-icon-gap)]">Author</span>
                    <span className="absolute right-0 flex h-4 w-4 items-center justify-center">
                      {sortDirection && (
                        <ChevronDown
                          className={clsx(
                            'h-4 w-4',
                            sortDirection === 'descending' && 'rotate-180',
                          )}
                        />
                      )}
                    </span>
                  </div>
                )}
              </Column>
              <Column
                id="category"
                allowsSorting
                className={styles.tableHeaderCell}
                style={{ width: '8rem' }}
              >
                {({ sortDirection }) => (
                  <div className="relative flex items-center">
                    <span className="truncate pr-[var(--sort-icon-gap)]">Category</span>
                    <span className="absolute right-0 flex h-4 w-4 items-center justify-center">
                      {sortDirection && (
                        <ChevronDown
                          className={clsx(
                            'h-4 w-4',
                            sortDirection === 'descending' && 'rotate-180',
                          )}
                        />
                      )}
                    </span>
                  </div>
                )}
              </Column>
              <Column
                id="level"
                allowsSorting
                className={styles.tableHeaderCell}
                style={{ width: '8rem' }}
              >
                {({ sortDirection }) => (
                  <div className="relative flex items-center">
                    <span className="truncate pr-[var(--sort-icon-gap)]">Level</span>
                    <span className="absolute right-0 flex h-4 w-4 items-center justify-center">
                      {sortDirection && (
                        <ChevronDown
                          className={clsx(
                            'h-4 w-4',
                            sortDirection === 'descending' && 'rotate-180',
                          )}
                        />
                      )}
                    </span>
                  </div>
                )}
              </Column>
              <Column
                id="progress"
                allowsSorting
                className={styles.tableHeaderCell}
                style={{ width: '7rem', textAlign: 'right' }}
              >
                {({ sortDirection }) => (
                  <div className="relative flex items-center justify-end">
                    <span className="truncate pr-[var(--sort-icon-gap)] text-right">Progress</span>
                    <span className="absolute right-0 flex h-4 w-4 items-center justify-center">
                      {sortDirection && (
                        <ChevronDown
                          className={clsx(
                            'h-4 w-4',
                            sortDirection === 'descending' && 'rotate-180',
                          )}
                        />
                      )}
                    </span>
                  </div>
                )}
              </Column>
              <Column
                id="duration"
                allowsSorting
                className={styles.tableHeaderCell}
                style={{ width: '8rem', textAlign: 'right' }}
              >
                {({ sortDirection }) => (
                  <div className="relative flex items-center justify-end">
                    <span className="truncate pr-[var(--sort-icon-gap)] text-right">Length</span>
                    <span className="absolute right-0 flex h-4 w-4 items-center justify-center">
                      {sortDirection && (
                        <ChevronDown
                          className={clsx(
                            'h-4 w-4',
                            sortDirection === 'descending' && 'rotate-180',
                          )}
                        />
                      )}
                    </span>
                  </div>
                )}
              </Column>
            </TableHeader>
            <TableBody
              className={clsx(
                styles.tableBody,
                sorted.length === 0 && 'flex h-full flex-col items-center justify-center',
              )}
              items={sorted}
              renderEmptyState={() => (
                <div className="animate-in fade-in flex h-full w-full flex-col items-center justify-center py-12 text-center duration-300">
                  <div className="bg-foreground/5 text-foreground/40 mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                    <Star className="h-8 w-8" />
                  </div>
                  <h3 className="text-foreground mb-1 text-lg font-medium">
                    Không tìm thấy bài hát nào
                  </h3>
                  <p className="text-foreground/50 max-w-sm text-sm leading-relaxed">
                    Thử thay đổi từ khóa tìm kiếm hoặc chọn bộ lọc khác.
                  </p>
                </div>
              )}
            >
              {(item) => {
                const idx = sorted.findIndex((s) => s.id === item.id) + 1
                const progress = songProgress[`${activeProfileId}_${item.id}`] || 0
                return (
                  <Row
                    id={item.id}
                    className={styles.tableRow}
                    onAction={() => onSelectRow(item.id)}
                  >
                    <Cell
                      className={clsx(styles.tableCell, 'text-foreground/40')}
                      style={{ width: '4rem' }}
                    >
                      {idx}
                    </Cell>
                    <Cell
                      className={styles.tableCell}
                      style={{ width: '3rem', textAlign: 'center' }}
                    >
                      <button
                        data-element-id={`song-favorite-btn-${item.id}`}
                        data-ui="song-list-table"
                        aria-label="Favorite song"
                        onClick={(e) => toggleFavorite(e, item.id)}
                        className="hover:bg-foreground/10 rounded-full p-1 transition-colors"
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
                    </Cell>
                    <Cell
                      className={styles.tableCell}
                      style={{ width: '3rem', textAlign: 'center' }}
                    >
                      <button
                        data-element-id={`song-add-playlist-btn-${item.id}`}
                        data-ui="song-list-table"
                        aria-label="Add to playlist"
                        onClick={(e) => {
                          e.stopPropagation()
                          setPlaylistModalSong({ id: item.id, title: item.title })
                        }}
                        className="hover:bg-foreground/10 text-foreground/40 rounded-full p-1 transition-colors hover:text-violet-400"
                        title="Thêm vào Playlist"
                      >
                        <ListPlus size={16} />
                      </button>
                    </Cell>
                    <Cell
                      className={clsx(styles.tableCell, 'font-medium')}
                      style={{ width: '33.33%' }}
                    >
                      <span className="block truncate whitespace-nowrap">{item.title}</span>
                    </Cell>
                    <Cell className={styles.tableCell} style={{ width: '12rem' }}>
                      <span className="text-foreground/70 block truncate whitespace-nowrap">
                        {item.author || '-'}
                      </span>
                    </Cell>
                    <Cell className={styles.tableCell} style={{ width: '8rem' }}>
                      <span className="text-foreground/70 block truncate whitespace-nowrap">
                        {item.category || '-'}
                      </span>
                    </Cell>
                    <Cell className={styles.tableCell} style={{ width: '8rem' }}>
                      <span
                        className={clsx(
                          'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold',
                          item.level === 'Fresher'
                            ? 'border border-emerald-500/40 bg-emerald-500/20 text-emerald-300'
                            : item.level === 'Beginner'
                              ? 'border border-cyan-500/30 bg-cyan-500/20 text-cyan-300'
                              : item.level === 'Intermediate'
                                ? 'border border-amber-500/30 bg-amber-500/20 text-amber-300'
                                : 'border border-rose-500/30 bg-rose-500/20 text-rose-300',
                        )}
                      >
                        {item.level === 'Fresher' ? '🌱 Fresher' : item.level || '-'}
                      </span>
                    </Cell>
                    <Cell
                      className={styles.tableCell}
                      style={{
                        width: '7rem',
                        textAlign: 'right',
                        paddingRight: 'calc(1rem + var(--sort-icon-gap))',
                      }}
                    >
                      <span
                        className={clsx(
                          'font-semibold',
                          progress === 100
                            ? 'glow-text-green text-[var(--color-green-neon)]'
                            : progress > 0
                              ? 'glow-text-cyan text-[var(--color-cyan-neon)]'
                              : 'text-foreground/40',
                        )}
                      >
                        {progress}%
                      </span>
                    </Cell>
                    <Cell
                      className={clsx(styles.tableCell, 'text-foreground/70')}
                      style={{
                        width: '8rem',
                        textAlign: 'right',
                        paddingRight: 'calc(1rem + var(--sort-icon-gap))',
                      }}
                    >
                      {formatTime(Number(item.duration))}
                    </Cell>
                  </Row>
                )
              }}
            </TableBody>
          </RacTable>
        </div>
        <div className={styles.tableFooter}>
          <span>Showing {sorted.length} songs</span>
        </div>
      </div>
    </>
  )
}

export function TableSkeleton() {
  const rows = Array.from({ length: 8 })
  return (
    <div className={styles.tableOuterContainer}>
      <div className="flex min-h-0 flex-1 flex-col">
        <div className={styles.tableHeader}>
          <div className="table-row">
            <div className={clsx(styles.tableHeaderCell, 'w-16')}>STT</div>
            <div className={clsx(styles.tableHeaderCell, 'w-12')}></div>
            <div className={clsx(styles.tableHeaderCell, 'w-1/3')}>Title</div>
            <div className={clsx(styles.tableHeaderCell, 'w-48')}>Author</div>
            <div className={clsx(styles.tableHeaderCell, 'w-32')}>Category</div>
            <div className={clsx(styles.tableHeaderCell, 'w-32')}>Level</div>
            <div className={clsx(styles.tableHeaderCell, 'w-28 text-right')}>Progress</div>
            <div className={clsx(styles.tableHeaderCell, 'w-32 text-right')}>Length</div>
          </div>
        </div>
        <div className={styles.tableBody}>
          {rows.map((_, index) => (
            <div key={index} className={styles.tableRow}>
              <div className="table-row" style={{ height: '36.5px' }}>
                <div className={clsx(styles.tableCell, 'w-16 align-middle')}>
                  <div className="shimmer bg-foreground/10 h-4 w-4 rounded" />
                </div>
                <div className={clsx(styles.tableCell, 'w-12 align-middle')}>
                  <div className="shimmer bg-foreground/10 mx-auto h-4 w-4 rounded" />
                </div>
                <div className={clsx(styles.tableCell, 'w-1/3 align-middle')}>
                  <div className="shimmer bg-foreground/10 h-4 w-[65%] rounded" />
                </div>
                <div className={clsx(styles.tableCell, 'w-48 align-middle')}>
                  <div className="shimmer bg-foreground/10 h-4 w-[65%] rounded" />
                </div>
                <div className={clsx(styles.tableCell, 'w-32 align-middle')}>
                  <div className="shimmer bg-foreground/10 h-4 w-[65%] rounded" />
                </div>
                <div className={clsx(styles.tableCell, 'w-32 align-middle')}>
                  <div className="shimmer bg-foreground/10 h-4 w-[65%] rounded" />
                </div>
                <div className={clsx(styles.tableCell, 'w-28 text-right align-middle')}>
                  <div className="shimmer bg-foreground/10 ml-auto h-4 w-8 rounded" />
                </div>
                <div className={clsx(styles.tableCell, 'w-32 text-right align-middle')}>
                  <div className="shimmer bg-foreground/10 ml-auto h-4 w-12 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.tableFooter}>
        <span className="shimmer bg-foreground/10 h-3 w-24 rounded" />
      </div>
    </div>
  )
}
