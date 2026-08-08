import { Button } from '@/components'
import { MarketMidiItem } from '@/features/market/marketStorage'
import { Check, Download, Play, Store } from 'lucide-react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import styles from '../market.module.css'

interface SongCardProps {
  item: MarketMidiItem
  isSaved: boolean
  onPreview: (item: MarketMidiItem) => void
  onDownload: (item: MarketMidiItem) => void
  onSave: (item: MarketMidiItem) => void
}

export function SongCard({ item, isSaved, onPreview, onDownload, onSave }: SongCardProps) {
  const { t } = useTranslation()

  return (
    <div
      data-element-id={`market-song-card-${item.id}`}
      data-ui="market-song-card"
      className="glass-card group relative flex flex-col justify-between rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-2">
          <span className={styles.cardCategoryBadge}>{item.category}</span>
          <span className="text-muted-foreground text-xs font-medium">{item.level}</span>
        </div>

        <div>
          <h3 className="text-foreground group-hover:text-primary line-clamp-1 text-lg font-bold transition-colors">
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
            defaultValue: `Xem thử bản nhạc ${item.title}`,
            title: item.title,
          })}
        >
          <Play className="text-primary h-3.5 w-3.5" />
          <span>{t('market.songCard.preview', 'Xem thử')}</span>
        </Button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onDownload(item)}
            title={t('market.songCard.downloadTooltip', 'Tải file .mid về máy')}
            className="bg-foreground/5 text-muted-foreground hover:text-foreground hover:bg-foreground/15 flex h-8 w-8 cursor-pointer items-center justify-center rounded-xl transition-all"
            data-action="download-midi"
          >
            <Download className="h-4 w-4" />
          </button>

          <Button
            size="sm"
            variant={isSaved ? 'secondary' : 'primary'}
            onClick={() => !isSaved && onSave(item)}
            className={isSaved ? 'bg-emerald-600 text-white hover:bg-emerald-500' : ''}
            data-action="save-to-app"
          >
            {isSaved ? (
              <>
                <Check className="h-3.5 w-3.5" />
                <span>{t('market.songCard.saved', 'Đã lưu')}</span>
              </>
            ) : (
              <>
                <Store className="h-3.5 w-3.5" />
                <span>{t('market.songCard.saveToApp', 'Thêm vào App')}</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
