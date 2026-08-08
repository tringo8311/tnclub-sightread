import { MarketMidiItem } from '@/features/market/marketStorage'
import React from 'react'
import { EmptyState } from './EmptyState'
import { SongCard } from './SongCard'

interface SongsGridProps {
  songs: MarketMidiItem[]
  savedIds: Record<string, boolean>
  onPreview: (item: MarketMidiItem) => void
  onDownload: (item: MarketMidiItem) => void
  onSave: (item: MarketMidiItem) => void
}

export function SongsGrid({ songs, savedIds, onPreview, onDownload, onSave }: SongsGridProps) {
  if (songs.length === 0) {
    return <EmptyState />
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3" data-ui="market-songs-grid">
      {songs.map((item) => (
        <SongCard
          key={item.id}
          item={item}
          isSaved={!!savedIds[item.id]}
          onPreview={onPreview}
          onDownload={onDownload}
          onSave={onSave}
        />
      ))}
    </div>
  )
}
