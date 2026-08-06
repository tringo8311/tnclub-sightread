import { ChevronDown } from '@/icons'
import { SongMetadata } from '@/types'
import { formatTime } from '@/utils'
import clsx from 'clsx'
import * as React from 'react'
import { useMemo, useState } from 'react'
import { useAtomValue } from 'jotai'
import { activeProfileIdAtom, songProgressAtom } from '@/features/persist/persistence'
import { useCollator, useFilter } from 'react-aria'
import { Cell, Column, Table as RacTable, Row, TableBody, TableHeader } from 'react-aria-components'

type SongsTableProps = {
  rows: SongMetadata[]
  search: string
  levelFilter: string
  onSelectRow: (id: string) => void
}

type SortState = {
  column: 'title' | 'duration' | 'level' | 'category' | 'progress'
  direction: 'ascending' | 'descending'
}

export default function Table({ rows, search, levelFilter, onSelectRow }: SongsTableProps) {
  const { contains } = useFilter({ sensitivity: 'base' })
  const collator = useCollator({ numeric: true, sensitivity: 'base' })
  const activeProfileId = useAtomValue(activeProfileIdAtom)
  const songProgress = useAtomValue(songProgressAtom)

  const [sortDescriptor, setSortDescriptor] = useState<SortState>({
    column: 'duration',
    direction: 'ascending',
  })

  const filtered = useMemo(() => {
    return rows.filter((row) => {
      const matchSearch = !search || contains(row.title, search)
      const matchLevel = levelFilter === 'All' || row.level === levelFilter
      return matchSearch && matchLevel
    })
  }, [contains, rows, search, levelFilter])

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
    <div
      className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm"
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
          <TableHeader className="table w-full table-fixed bg-gray-50">
            <Column
              id="stt"
              className="w-16 border-b border-gray-200 px-4 py-2 text-left text-sm font-semibold tracking-wider text-gray-500 uppercase"
            >
              STT
            </Column>
            <Column
              id="title"
              isRowHeader
              allowsSorting
              className="border-b border-gray-200 px-4 py-2 text-left text-sm font-semibold tracking-wider text-gray-500 uppercase"
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
                className="table w-full table-fixed cursor-pointer text-gray-900 hover:bg-violet-50"
                onAction={() => onSelectRow(item.id)}
              >
                <Cell className="border-b border-gray-200 px-4 py-2 text-gray-400 w-16">
                  {idx}
                </Cell>
                <Cell className="border-b border-gray-200 px-4 py-2">
                  <span className="block truncate whitespace-nowrap">{item.title}</span>
                </Cell>
                <Cell className="border-b border-gray-200 px-4 py-2 w-32">
                  <span className="block truncate whitespace-nowrap text-gray-500">{item.category || '-'}</span>
                </Cell>
                <Cell className="border-b border-gray-200 px-4 py-2 w-32">
                  <span className="block truncate whitespace-nowrap text-gray-500">{item.level || '-'}</span>
                </Cell>
                <Cell
                  className="border-b border-gray-200 px-4 py-2 text-right w-28"
                  style={{ paddingRight: 'calc(1rem + var(--sort-icon-gap))' }}
                >
                  <span className={clsx("font-semibold", progress === 100 ? "text-green-600" : progress > 0 ? "text-violet-600" : "text-gray-400")}>
                    {progress}%
                  </span>
                </Cell>
                <Cell
                  className="border-b border-gray-200 px-4 py-2 text-right text-gray-500 w-32"
                  style={{ paddingRight: 'calc(1rem + var(--sort-icon-gap))' }}
                >
                  {formatTime(Number(item.duration))}
                </Cell>
              </Row>
            )}}
          </TableBody>
        </RacTable>
      </div>
      <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50 px-4 py-2 text-xs text-gray-500">
        <span>Showing {sorted.length} songs</span>
      </div>
    </div>
  )
}

export function TableSkeleton() {
  const rows = Array.from({ length: 8 })
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="table w-full table-fixed bg-gray-50">
          <div className="table-row">
            <div className="table-cell w-16 border-b border-gray-200 px-4 py-2 text-left text-sm font-semibold tracking-wider text-gray-500 uppercase">
              STT
            </div>
            <div className="table-cell border-b border-gray-200 px-4 py-2 text-sm font-semibold tracking-wider text-gray-500 uppercase">
              Title
            </div>
            <div className="table-cell w-32 border-b border-gray-200 px-4 py-2 text-left text-sm font-semibold tracking-wider text-gray-500 uppercase">
              Category
            </div>
            <div className="table-cell w-32 border-b border-gray-200 px-4 py-2 text-left text-sm font-semibold tracking-wider text-gray-500 uppercase">
              Level
            </div>
            <div className="table-cell w-28 border-b border-gray-200 px-4 py-2 text-right text-sm font-semibold tracking-wider text-gray-500 uppercase">
              Progress
            </div>
            <div className="table-cell w-32 border-b border-gray-200 px-4 py-2 text-right text-sm font-semibold tracking-wider text-gray-500 uppercase">
              Length
            </div>
          </div>
        </div>
        <div className="block flex-1 overflow-y-auto">
          {rows.map((_, index) => (
            <div key={index} className="table w-full table-fixed">
              <div className="table-row" style={{ height: '36.5px' }}>
                <div className="table-cell border-b border-gray-200 px-4 py-2 align-middle w-16">
                  <div className="shimmer h-4 w-4 rounded bg-gray-200" />
                </div>
                <div className="table-cell border-b border-gray-200 px-4 py-2 align-middle">
                  <div className="shimmer h-4 w-[65%] rounded bg-gray-200" />
                </div>
                <div className="table-cell border-b border-gray-200 px-4 py-2 align-middle w-32">
                  <div className="shimmer h-4 w-[65%] rounded bg-gray-200" />
                </div>
                <div className="table-cell border-b border-gray-200 px-4 py-2 align-middle w-32">
                  <div className="shimmer h-4 w-[65%] rounded bg-gray-200" />
                </div>
                <div className="table-cell border-b border-gray-200 px-4 py-2 text-right align-middle w-28">
                  <div className="shimmer ml-auto h-4 w-8 rounded bg-gray-200" />
                </div>
                <div className="table-cell border-b border-gray-200 px-4 py-2 text-right align-middle w-32">
                  <div className="shimmer ml-auto h-4 w-12 rounded bg-gray-200" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50 px-4 py-2 text-xs text-gray-500">
        <span className="shimmer h-3 w-24 rounded bg-gray-200" />
      </div>
    </div>
  )
}
