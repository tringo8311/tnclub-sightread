import { ChevronDown } from '@/icons'
import { SongMetadata } from '@/types'
import { formatTime } from '@/utils'
import clsx from 'clsx'
import * as React from 'react'
import { useMemo, useState } from 'react'
import { useAtom, useAtomValue } from 'jotai'
import { activeProfileIdAtom, songProgressAtom, favoritesAtom } from '@/features/persist/persistence'
import { useCollator, useFilter } from 'react-aria'
import { Cell, Column, Table as RacTable, Row, TableBody, TableHeader } from 'react-aria-components'
import { Star } from 'lucide-react'

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

export default function Table({ rows, search, levelFilter, favoritesOnly, onSelectRow }: SongsTableProps) {
  const { contains } = useFilter({ sensitivity: 'base' })
  const collator = useCollator({ numeric: true, sensitivity: 'base' })
  const activeProfileId = useAtomValue(activeProfileIdAtom)
  const songProgress = useAtomValue(songProgressAtom)

  const [sortDescriptor, setSortDescriptor] = useState<SortState>({
    column: 'duration',
    direction: 'ascending',
  })
  const [favorites, setFavorites] = useAtom(favoritesAtom)

  const toggleFavorite = (e: React.MouseEvent, songId: string) => {
    e.stopPropagation()
    const key = `${activeProfileId}_${songId}`
    setFavorites(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const filtered = useMemo(() => {
    return rows.filter((row) => {
      const matchSearch = !search || contains(row.title, search)
      const matchLevel = levelFilter === 'All' || row.level === levelFilter
      const isFavorite = favorites[`${activeProfileId}_${row.id}`]
      const matchFavorites = !favoritesOnly || isFavorite
      return matchSearch && matchLevel && matchFavorites
    })
  }, [contains, rows, search, levelFilter, favoritesOnly, favorites, activeProfileId])

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
      } else if (column === 'category') {
        cmp = collator.compare(a.category || '', b.category || '')
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
    <div
      className="glass-card flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl"
      style={{
        ['--sort-icon-gap' as any]: '1.5rem',
        fontVariantNumeric: 'tabular-nums',
      }}
    >
      <div className="flex min-h-0 flex-1 flex-col">
        <RacTable
          aria-label="Songs"
          className="flex h-full w-full flex-col text-sm"
          sortDescriptor={sortDescriptor}
          onSortChange={(descriptor) =>
            setSortDescriptor({
              column: descriptor.column as SortState['column'],
              direction: descriptor.direction as SortState['direction'],
            })
          }
        >
          <TableHeader className="table w-full table-fixed bg-foreground/5 backdrop-blur-md">
            <Column
              id="stt"
              className="w-16 border-b border-foreground/10 px-4 py-2 text-left text-sm font-semibold tracking-wider text-foreground/60 uppercase"
            >
              STT
            </Column>
            <Column
              id="favorite"
              className="w-12 border-b border-foreground/10 px-4 py-2 text-center text-sm font-semibold tracking-wider text-foreground/60 uppercase"
            >
              <Star size={14} className="mx-auto text-foreground/40" />
            </Column>
            <Column
              id="title"
              isRowHeader
              allowsSorting
              className="border-b border-foreground/10 px-4 py-2 text-left text-sm font-semibold tracking-wider text-foreground/60 uppercase w-1/3"
            >
              {({ sortDirection }) => (
                <div className="relative flex items-center">
                  <span className="truncate pr-[var(--sort-icon-gap)]">Title</span>
                  <span className="absolute right-0 flex h-4 w-4 items-center justify-center">
                    {sortDirection && (
                      <ChevronDown
                        className={clsx('h-4 w-4', sortDirection === 'descending' && 'rotate-180')}
                      />
                    )}
                  </span>
                </div>
              )}
            </Column>
            <Column
              id="author"
              allowsSorting
              className="border-b border-foreground/10 px-4 py-2 text-left text-sm font-semibold tracking-wider text-foreground/60 uppercase w-48"
            >
              {({ sortDirection }) => (
                <div className="relative flex items-center">
                  <span className="truncate pr-[var(--sort-icon-gap)]">Author</span>
                  <span className="absolute right-0 flex h-4 w-4 items-center justify-center">
                    {sortDirection && <ChevronDown className={clsx('h-4 w-4', sortDirection === 'descending' && 'rotate-180')} />}
                  </span>
                </div>
              )}
            </Column>
            <Column
              id="category"
              allowsSorting
              className="w-32 border-b border-gray-200 px-4 py-2 text-left text-sm font-semibold tracking-wider text-gray-500 uppercase"
            >
              {({ sortDirection }) => (
                <div className="relative flex items-center">
                  <span className="truncate pr-[var(--sort-icon-gap)]">Category</span>
                  <span className="absolute right-0 flex h-4 w-4 items-center justify-center">
                    {sortDirection && <ChevronDown className={clsx('h-4 w-4', sortDirection === 'descending' && 'rotate-180')} />}
                  </span>
                </div>
              )}
            </Column>
            <Column
              id="level"
              allowsSorting
              className="w-32 border-b border-gray-200 px-4 py-2 text-left text-sm font-semibold tracking-wider text-gray-500 uppercase"
            >
              {({ sortDirection }) => (
                <div className="relative flex items-center">
                  <span className="truncate pr-[var(--sort-icon-gap)]">Level</span>
                  <span className="absolute right-0 flex h-4 w-4 items-center justify-center">
                    {sortDirection && <ChevronDown className={clsx('h-4 w-4', sortDirection === 'descending' && 'rotate-180')} />}
                  </span>
                </div>
              )}
            </Column>
            <Column
              id="progress"
              allowsSorting
              className="w-28 border-b border-gray-200 px-4 py-2 text-right text-sm font-semibold tracking-wider text-gray-500 uppercase"
            >
              {({ sortDirection }) => (
                <div className="relative flex items-center justify-end">
                  <span className="truncate pr-[var(--sort-icon-gap)] text-right">Progress</span>
                  <span className="absolute right-0 flex h-4 w-4 items-center justify-center">
                    {sortDirection && <ChevronDown className={clsx('h-4 w-4', sortDirection === 'descending' && 'rotate-180')} />}
                  </span>
                </div>
              )}
            </Column>
            <Column
              id="duration"
              allowsSorting
              className="w-32 border-b border-gray-200 px-4 py-2 text-right text-sm font-semibold tracking-wider text-gray-500 uppercase"
            >
              {({ sortDirection }) => (
                <div className="relative flex items-center justify-end">
                  <span className="truncate pr-[var(--sort-icon-gap)] text-right">Length</span>
                  <span className="absolute right-0 flex h-4 w-4 items-center justify-center">
                    {sortDirection && (
                      <ChevronDown
                        className={clsx('h-4 w-4', sortDirection === 'descending' && 'rotate-180')}
                      />
                    )}
                  </span>
                </div>
              )}
            </Column>
          </TableHeader>
          <TableBody
            className="block flex-1 overflow-y-auto"
            items={sorted}
            renderEmptyState={() => <div className="p-5 text-2xl">No results</div>}
          >
            {(item) => {
              const idx = sorted.findIndex(s => s.id === item.id) + 1
              const progress = songProgress[`${activeProfileId}_${item.id}`] || 0
              return (
              <Row
                id={item.id}
                className="table w-full table-fixed cursor-pointer text-foreground hover:bg-foreground/5 transition-colors"
                onAction={() => onSelectRow(item.id)}
              >
                <Cell className="border-b border-foreground/10 px-4 py-2 text-foreground/40 w-16">
                  {idx}
                </Cell>
                <Cell className="border-b border-foreground/10 px-2 py-2 text-center w-12" style={{ paddingLeft: '0.75rem', paddingRight: '0.75rem' }}>
                  <button 
                    onClick={(e) => toggleFavorite(e, item.id)}
                    className="p-1 rounded-full hover:bg-foreground/10 transition-colors"
                  >
                    <Star size={16} className={clsx(favorites[`${activeProfileId}_${item.id}`] ? "fill-[var(--color-pink-neon)] text-[var(--color-pink-neon)]" : "text-foreground/20")} />
                  </button>
                </Cell>
                <Cell className="border-b border-foreground/10 px-4 py-2 w-1/3">
                  <span className="block truncate whitespace-nowrap">{item.title}</span>
                </Cell>
                <Cell className="border-b border-foreground/10 px-4 py-2 w-48">
                  <span className="block truncate whitespace-nowrap text-foreground/60">{item.author || '-'}</span>
                </Cell>
                <Cell className="border-b border-foreground/10 px-4 py-2 w-32">
                  <span className="block truncate whitespace-nowrap text-foreground/60">{item.category || '-'}</span>
                </Cell>
                <Cell className="border-b border-foreground/10 px-4 py-2 w-32">
                  <span className="block truncate whitespace-nowrap text-foreground/60">{item.level || '-'}</span>
                </Cell>
                <Cell
                  className="border-b border-foreground/10 px-4 py-2 text-right w-28"
                  style={{ paddingRight: 'calc(1rem + var(--sort-icon-gap))' }}
                >
                  <span className={clsx("font-semibold", progress === 100 ? "text-[var(--color-green-neon)] glow-text-green" : progress > 0 ? "text-[var(--color-cyan-neon)] glow-text-cyan" : "text-foreground/40")}>
                    {progress}%
                  </span>
                </Cell>
                <Cell
                  className="border-b border-foreground/10 px-4 py-2 text-right text-foreground/60 w-32"
                  style={{ paddingRight: 'calc(1rem + var(--sort-icon-gap))' }}
                >
                  {formatTime(Number(item.duration))}
                </Cell>
              </Row>
            )}}
          </TableBody>
        </RacTable>
      </div>
      <div className="flex items-center justify-between border-t border-foreground/10 bg-foreground/5 px-4 py-2 text-xs text-foreground/40">
        <span>Showing {sorted.length} songs</span>
      </div>
    </div>
  )
}

export function TableSkeleton() {
  const rows = Array.from({ length: 8 })
  return (
    <div className="glass-card flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl">
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="table w-full table-fixed bg-foreground/5">
          <div className="table-row">
            <div className="table-cell w-16 border-b border-foreground/10 px-4 py-2 text-left text-sm font-semibold tracking-wider text-foreground/60 uppercase">
              STT
            </div>
            <div className="table-cell w-12 border-b border-foreground/10 px-4 py-2 text-left text-sm font-semibold tracking-wider text-foreground/60 uppercase">
              
            </div>
            <div className="table-cell border-b border-foreground/10 px-4 py-2 text-sm font-semibold tracking-wider text-foreground/60 uppercase w-1/3">
              Title
            </div>
            <div className="table-cell w-48 border-b border-foreground/10 px-4 py-2 text-left text-sm font-semibold tracking-wider text-foreground/60 uppercase">
              Author
            </div>
            <div className="table-cell w-32 border-b border-foreground/10 px-4 py-2 text-left text-sm font-semibold tracking-wider text-foreground/60 uppercase">
              Category
            </div>
            <div className="table-cell w-32 border-b border-foreground/10 px-4 py-2 text-left text-sm font-semibold tracking-wider text-foreground/60 uppercase">
              Level
            </div>
            <div className="table-cell w-28 border-b border-foreground/10 px-4 py-2 text-right text-sm font-semibold tracking-wider text-foreground/60 uppercase">
              Progress
            </div>
            <div className="table-cell w-32 border-b border-foreground/10 px-4 py-2 text-right text-sm font-semibold tracking-wider text-foreground/60 uppercase">
              Length
            </div>
          </div>
        </div>
        <div className="block flex-1 overflow-y-auto">
          {rows.map((_, index) => (
            <div key={index} className="table w-full table-fixed">
              <div className="table-row" style={{ height: '36.5px' }}>
                <div className="table-cell border-b border-foreground/10 px-4 py-2 align-middle w-16">
                  <div className="shimmer h-4 w-4 rounded bg-foreground/10" />
                </div>
                <div className="table-cell border-b border-foreground/10 px-2 py-2 align-middle w-12">
                  <div className="shimmer h-4 w-4 rounded bg-foreground/10 mx-auto" />
                </div>
                <div className="table-cell border-b border-foreground/10 px-4 py-2 align-middle w-1/3">
                  <div className="shimmer h-4 w-[65%] rounded bg-foreground/10" />
                </div>
                <div className="table-cell border-b border-foreground/10 px-4 py-2 align-middle w-48">
                  <div className="shimmer h-4 w-[65%] rounded bg-foreground/10" />
                </div>
                <div className="table-cell border-b border-foreground/10 px-4 py-2 align-middle w-32">
                  <div className="shimmer h-4 w-[65%] rounded bg-foreground/10" />
                </div>
                <div className="table-cell border-b border-foreground/10 px-4 py-2 align-middle w-32">
                  <div className="shimmer h-4 w-[65%] rounded bg-foreground/10" />
                </div>
                <div className="table-cell border-b border-foreground/10 px-4 py-2 text-right align-middle w-28">
                  <div className="shimmer ml-auto h-4 w-8 rounded bg-foreground/10" />
                </div>
                <div className="table-cell border-b border-foreground/10 px-4 py-2 text-right align-middle w-32">
                  <div className="shimmer ml-auto h-4 w-12 rounded bg-foreground/10" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-foreground/10 bg-foreground/5 px-4 py-2 text-xs text-foreground/40">
        <span className="shimmer h-3 w-24 rounded bg-foreground/10" />
      </div>
    </div>
  )
}
