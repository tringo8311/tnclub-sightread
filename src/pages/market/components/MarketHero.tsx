import { Sparkles } from 'lucide-react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import styles from '../market.module.css'
import { DirectUrlForm } from './DirectUrlForm'

interface MarketHeroProps {
  urlInput: string
  setUrlInput: (val: string) => void
  urlLoading: boolean
  urlError: string | null
  onLookupUrl: (e: React.FormEvent) => void
}

export function MarketHero({
  urlInput,
  setUrlInput,
  urlLoading,
  urlError,
  onLookupUrl,
}: MarketHeroProps) {
  const { t } = useTranslation()

  return (
    <div className="border-border bg-card/40 relative overflow-hidden border-b px-6 py-10 backdrop-blur-md">
      <div className="mx-auto max-w-4xl space-y-4 text-center">
        <div className={styles.badge}>
          <Sparkles className="h-4 w-4" />
          <span>{t('market.hero.badge', 'MIDI Music Hub & Direct Import')}</span>
        </div>

        <h1 className={`text-3xl font-bold tracking-tight sm:text-4xl ${styles.heroTitle}`}>
          {t('market.hero.title', 'Thư Viện Nhạc MIDI Thực Hành Piano')}
        </h1>

        <p className="text-muted-foreground mx-auto max-w-2xl text-sm leading-relaxed sm:text-base">
          {t(
            'market.hero.description',
            'Khám phá bộ sưu tập bản nhạc MIDI Piano tuyển chọn hoặc dán trực tiếp đường dẫn file `.mid` công khai để thực hành đọc nốt ngay lập tức.',
          )}
        </p>

        <DirectUrlForm
          urlInput={urlInput}
          setUrlInput={setUrlInput}
          urlLoading={urlLoading}
          urlError={urlError}
          onSubmit={onLookupUrl}
        />
      </div>
    </div>
  )
}
