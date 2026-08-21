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
    : 'https://tnclubmanagement.github.io/tnclub-bitmidi/'

  const tnMidiStudioUrl = 'https://tnclubmanagement.github.io/tnclub-bitmidi/'

  return (
    <div
      className="glass-card border-primary/30 my-6 flex flex-col items-center justify-center space-y-4 rounded-3xl border border-dashed p-12 text-center"
      data-ui="market-empty-state"
    >
      <div className="bg-primary/10 text-primary border-primary/20 flex h-16 w-16 items-center justify-center rounded-2xl border shadow-md">
        <Music className="h-8 w-8" />
      </div>
      <div>
        <h3 className="text-foreground text-xl font-bold">
          {t('market.empty.title', 'Chưa tìm thấy bài hát này trong thư viện có sẵn')}
        </h3>
        <p className="text-muted-foreground mx-auto mt-1 max-w-md text-xs md:text-sm">
          {searchQuery ? (
            <>
              Không tìm thấy kết quả cho từ khóa "
              <span className="text-foreground font-semibold">{searchQuery}</span>". Bạn có thể tìm
              nhanh trên các kho MIDI mở bên dưới và dán liên kết vào app!
            </>
          ) : (
            t(
              'market.empty.description',
              'Thử tìm kiếm với từ khóa khác hoặc dán URL file .mid vào ô tìm kiếm ở trên.',
            )
          )}
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <a
          href={tnMidiStudioUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-primary text-primary-foreground inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold shadow-md transition-transform hover:scale-105"
        >
          <Search className="h-3.5 w-3.5" />
          <span>Khám phá kho MIDI trên TN Web MIDI Studio</span>
          <ExternalLink className="h-3.5 w-3.5" />
        </a>

        <a
          href={googleSearchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="border-border bg-card text-foreground hover:border-primary hover:text-primary inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-xs font-medium shadow-sm transition-colors"
        >
          <Globe className="text-primary h-3.5 w-3.5" />
          <span>Tra cứu trên Google MIDI</span>
          <ExternalLink className="h-3.5 w-3.5 opacity-60" />
        </a>
      </div>
    </div>
  )
}
