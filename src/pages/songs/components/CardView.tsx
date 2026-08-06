import { SongMetadata } from '@/types'
import { formatTime } from '@/utils'
import clsx from 'clsx'
import * as React from 'react'
import { useMemo, useState } from 'react'
import { useAtom, useAtomValue } from 'jotai'
import { activeProfileIdAtom, songProgressAtom, favoritesAtom } from '@/features/persist/persistence'
import { useCollator, useFilter } from 'react-aria'
import { Music, BarChart, Clock, Star } from 'lucide-react'

type CardViewProps = {
  rows: SongMetadata[]
  search: string
  levelFilter: string
  favoritesOnly: boolean
  onSelectRow: (id: string) => void
}

export default function CardView({ rows, search, levelFilter, favoritesOnly, onSelectRow }: CardViewProps) {
  const { contains } = useFilter({ sensitivity: 'base' })
  const collator = useCollator({ numeric: true, sensitivity: 'base' })
  const activeProfileId = useAtomValue(activeProfileIdAtom)
  const songProgress = useAtomValue(songProgressAtom)
  const [favorites, setFavorites] = useAtom(favoritesAtom)

  const toggleFavorite = (e: React.MouseEvent, songId: string) => {
    e.stopPropagation()
    const key = `${activeProfileId}_${songId}`
    setFavorites(prev => ({ ...prev, [key]: !prev[key] }))
  }

  // In CardView, we can just sort by title by default, or keep duration
  const [sortDescriptor, setSortDescriptor] = useState({
    column: 'title',
    direction: 'ascending',
  })

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
    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overflow-x-hidden p-1">
      {sorted.length === 0 ? (
        <div className="p-5 text-2xl text-center text-gray-500 mt-10">No results</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-6">
          {sorted.map((item) => {
            const progress = songProgress[`${activeProfileId}_${item.id}`] || 0
            return (
              <div
                key={item.id}
                onClick={() => onSelectRow(item.id)}
                className="group relative flex flex-col rounded-2xl bg-white p-5 shadow-sm border border-gray-200 transition-all hover:shadow-lg hover:-translate-y-1 hover:border-violet-300 cursor-pointer overflow-hidden"
              >
                {/* Decorative background accent */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-400 to-fuchsia-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="flex justify-between items-start mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-600 transition-transform group-hover:scale-110">
                    <Music size={20} />
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex flex-col items-end">
                      <span className={clsx("text-sm font-bold", progress === 100 ? "text-green-600" : progress > 0 ? "text-violet-600" : "text-gray-400")}>
                        {progress}%
                      </span>
                      <span className="text-[10px] text-gray-400 uppercase tracking-wide">Progress</span>
                    </div>
                    <button 
                      onClick={(e) => toggleFavorite(e, item.id)}
                      className="p-1 -mr-1 -mt-1 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <Star size={18} className={clsx(favorites[`${activeProfileId}_${item.id}`] ? "fill-amber-400 text-amber-400" : "text-gray-300")} />
                    </button>
                  </div>
                </div>

                <div className="flex-1 mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 leading-tight group-hover:text-violet-700 transition-colors">
                    {item.title}
                  </h3>
                  {item.author && <p className="text-sm text-gray-600 mt-1 line-clamp-1">{item.author}</p>}
                  <p className="text-sm text-gray-400 mt-1 line-clamp-1">{item.category || 'No Category'}</p>
                </div>

                <div className="flex items-center gap-4 text-xs font-medium text-gray-500 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-1.5" title="Level">
                    <BarChart size={14} className={clsx(
                      item.level === 'Advanced' ? 'text-rose-500' :
                      item.level === 'Intermediate' ? 'text-amber-500' : 'text-emerald-500'
                    )} />
                    <span>{item.level || 'Beginner'}</span>
                  </div>
                  <div className="flex items-center gap-1.5 ml-auto" title="Duration">
                    <Clock size={14} className="text-gray-400" />
                    <span>{formatTime(Number(item.duration))}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
