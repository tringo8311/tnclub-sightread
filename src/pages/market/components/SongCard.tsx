import { Button } from '@/components'
import { MarketMidiItem } from '@/features/market/marketStorage'
import { Download, Eye, Play, Star } from 'lucide-react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import styles from '../market.module.css'

interface SongCardProps {
  item: MarketMidiItem
  isFavorite: boolean
  onToggleFavorite: (item: MarketMidiItem) => void
  onPreview: (item: MarketMidiItem) => void
  onDownload: (item: MarketMidiItem) => void
  onPlayNow: (item: MarketMidiItem) => void
}

export function SongCard({
  item,
  isFavorite,
  onToggleFavorite,
  onPreview,
  onDownload,
  onPlayNow,
}: SongCardProps) {
  const { t } = useTranslation()

  return (
    <div
      data-element-id={`market-song-card-${item.id}`}
      data-ui="market-song-card"
      className="glass-card group relative flex flex-col justify-between rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className={styles.cardCategoryBadge}>{item.category}</span>
            <span className="text-muted-foreground text-xs font-medium">{item.level}</span>
          </div>

          {/* Favorite Toggle Button */}
          <button
            type="button"
            onClick={() => onToggleFavorite(item)}
            title={
              isFavorite
                ? t('market.songCard.favoriteRemove', 'Remove from favorites')
                : t('market.songCard.favoriteAdd', 'Add to favorites')
            }
            className="text-muted-foreground/60 p-1 transition-colors hover:text-amber-400"
            data-action="toggle-favorite"
          >
            <Star
              className={`h-4 w-4 transition-transform hover:scale-110 ${
                isFavorite ? 'fill-amber-400 text-amber-400' : ''
              }`}
            />
          </button>
        </div>

        <div>
          <h3 className="text-foreground group-hover:text-primary line-clamp-1 text-base font-semibold transition-colors">
            {item.title}
          </h3>
          <p className="text-muted-foreground mt-0.5 line-clamp-1 text-xs font-medium">
            {item.author}
          </p>
        </div>

        {item.description && (
          <p className="text-foreground/70 line-clamp-2 text-xs leading-relaxed">
            {item.description}
          </p>
        )}

        {item.tags && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="text-muted-foreground/70 bg-foreground/5 rounded-md px-2 py-0.5 text-[10px]"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Actions Bar */}
      <div className="border-border mt-6 flex items-center justify-between gap-2 border-t pt-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onPreview(item)}
          action="preview-song"
          description={t('market.songCard.previewDescription', {
            defaultValue: `Preview sheet music for ${item.title}`,
            title: item.title,
          })}
        >
          <Eye className="text-primary h-3.5 w-3.5" />
          <span>{t('market.songCard.preview', 'Preview')}</span>
        </Button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onDownload(item)}
            title={t('market.songCard.downloadTooltip', 'Download .mid file')}
            className="bg-foreground/5 text-muted-foreground hover:text-foreground hover:bg-foreground/15 flex h-8 w-8 cursor-pointer items-center justify-center rounded-xl transition-all"
            data-action="download-midi"
          >
            <Download className="h-4 w-4" />
          </button>

          <Button
            size="sm"
            variant="primary"
            onClick={() => onPlayNow(item)}
            data-action="play-now"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-sm"
          >
            <Play className="h-3.5 w-3.5 fill-current" />
            <span>{t('market.songCard.playNow', 'Play Now')}</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
