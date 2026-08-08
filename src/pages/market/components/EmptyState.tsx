import { ExternalLink, Globe, Music, Search } from 'lucide-react'
import React from 'react'
import { useTranslation } from 'react-i18next'

interface EmptyStateProps {
  searchQuery?: string
}

export function EmptyState({ searchQuery }: EmptyStateProps) {
  const { t } = useTranslation()

  const googleSearchUrl = searchQuery
    ? `https://www.google.com/search?q=${encodeURIComponent(searchQuery + ' piano midi file download')}`
    : 'https://bitmidi.com'

  const bitmidiSearchUrl = searchQuery
    ? `https://bitmidi.com/search?q=${encodeURIComponent(searchQuery)}`
    : 'https://bitmidi.com'

  return (
    <div
      className="glass-card flex flex-col items-center justify-center rounded-3xl p-12 text-center border border-dashed border-primary/30 my-6 space-y-4"
      data-ui="market-empty-state"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary border border-primary/20 shadow-md">
        <Music className="h-8 w-8" />
      </div>
      <div>
        <h3 className="text-xl font-bold text-foreground">
          {t('market.empty.title', 'Chưa tìm thấy bài hát này trong thư viện có sẵn')}
        </h3>
        <p className="text-muted-foreground text-xs md:text-sm mt-1 max-w-md mx-auto">
          {searchQuery ? (
            <>
              Không tìm thấy kết quả cho từ khóa "<span className="text-foreground font-semibold">{searchQuery}</span>". Bạn có thể tìm nhanh trên các kho MIDI mở bên dưới và dán liên kết vào app!
            </>
          ) : (
            t('market.empty.description', 'Thử tìm kiếm với từ khóa khác hoặc dán URL file .mid vào ô tìm kiếm ở trên.')
          )}
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <a
          href={bitmidiSearchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl bg-primary text-primary-foreground font-bold px-4 py-2 text-xs shadow-md transition-transform hover:scale-105"
        >
          <Search className="h-3.5 w-3.5" />
          <span>Tìm "{searchQuery || 'MIDI'}" trên BitMidi (110k+ bài)</span>
          <ExternalLink className="h-3.5 w-3.5" />
        </a>

        <a
          href={googleSearchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2 font-medium text-xs text-foreground hover:border-primary hover:text-primary transition-colors shadow-sm"
        >
          <Globe className="h-3.5 w-3.5 text-primary" />
          <span>Tra cứu trên Google MIDI</span>
          <ExternalLink className="h-3.5 w-3.5 opacity-60" />
        </a>
      </div>
    </div>
  )
}
