import { MarketMidiItem } from '@/features/market/marketStorage'
import React from 'react'
import { EmptyState } from './EmptyState'
import { SongCard } from './SongCard'

interface SongsGridProps {
  songs: MarketMidiItem[]
  favorites: Record<string, boolean>
  activeProfileId: string
  searchQuery?: string
  onToggleFavorite: (item: MarketMidiItem) => void
  onPreview: (item: MarketMidiItem) => void
  onDownload: (item: MarketMidiItem) => void
  onPlayNow: (item: MarketMidiItem) => void
}

export function SongsGrid({
  songs,
  favorites,
  activeProfileId,
  searchQuery,
  onToggleFavorite,
  onPreview,
  onDownload,
  onPlayNow,
}: SongsGridProps) {
  if (songs.length === 0) {
    return <EmptyState searchQuery={searchQuery} />
  }

  return (
    <div
      className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
      data-ui="market-songs-grid"
    >
      {songs.map((item) => {
        const favKey = `${activeProfileId}_${item.id}`
        return (
          <SongCard
            key={item.id}
            item={item}
            isFavorite={!!favorites[favKey]}
            onToggleFavorite={onToggleFavorite}
            onPreview={onPreview}
            onDownload={onDownload}
            onPlayNow={onPlayNow}
          />
        )
      })}
    </div>
  )
}
