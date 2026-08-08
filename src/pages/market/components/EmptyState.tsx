import { Music } from 'lucide-react'
import React from 'react'
import { useTranslation } from 'react-i18next'

export function EmptyState() {
  const { t } = useTranslation()

  return (
    <div
      className="flex flex-col items-center justify-center py-20 text-center"
      data-ui="market-empty-state"
    >
      <Music className="text-muted-foreground/30 mb-3 h-12 w-12" />
      <h3 className="text-lg font-semibold">{t('market.empty.title', 'Không tìm thấy bài hát MIDI nào')}</h3>
      <p className="text-muted-foreground text-xs">
        {t('market.empty.description', 'Thử tìm kiếm với từ khóa khác hoặc lọc lại thể loại.')}
      </p>
    </div>
  )
}
