import { FileAudio, Globe, ExternalLink, Sparkles, Upload } from 'lucide-react'
import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from '../market.module.css'
import { DirectUrlForm } from './DirectUrlForm'

interface MarketHeroProps {
  urlInput: string
  setUrlInput: (val: string) => void
  urlLoading: boolean
  urlError: string | null
  onLookupUrl: (e: React.FormEvent) => void
  onFileUpload: (file: File) => void
}

export function MarketHero({
  urlInput,
  setUrlInput,
  urlLoading,
  urlError,
  onLookupUrl,
  onFileUpload,
}: MarketHeroProps) {
  const { t } = useTranslation()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isDragOver, setIsDragOver] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onFileUpload(file)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    const file = e.dataTransfer.files?.[0]
    if (file && (file.name.endsWith('.mid') || file.name.endsWith('.midi'))) {
      onFileUpload(file)
    }
  }

  return (
    <div className="border-border bg-card/40 relative overflow-hidden border-b px-6 py-10 backdrop-blur-md">
      <div className="mx-auto max-w-4xl space-y-6 text-center">
        <div className={styles.badge}>
          <Sparkles className="h-4 w-4" />
          <span>{t('market.hero.badge', 'MIDI Hub & Direct Import Center')}</span>
        </div>

        <h1 className={`text-3xl font-bold tracking-tight sm:text-4xl ${styles.heroTitle}`}>
          {t('market.hero.title', 'Thư Viện & Trung Tâm Tải Nhạc MIDI Piano')}
        </h1>

        <p className="text-muted-foreground mx-auto max-w-2xl text-sm leading-relaxed sm:text-base">
          {t(
            'market.hero.description',
            'Tải file `.mid` từ máy tính, kéo thả bài hát của bạn hoặc dán đường dẫn công khai để xem và thực hành luyện đọc nốt nhạc ngay lập tức.',
          )}
        </p>

        {/* Drag & Drop File Upload Area */}
        <div
          onDragOver={(e) => {
            e.preventDefault()
            setIsDragOver(true)
          }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`cursor-pointer group relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-6 transition-all duration-300 ${isDragOver
              ? 'border-primary bg-primary/10 shadow-lg scale-[1.01]'
              : 'border-primary/30 bg-foreground/5 hover:border-primary hover:bg-primary/5'
            }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".mid,.midi"
            onChange={handleFileChange}
            className="hidden"
          />
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 text-primary mb-3 shadow-md group-hover:scale-110 transition-transform">
            <Upload className="h-6 w-6" />
          </div>
          <h3 className="text-foreground text-sm font-bold">
            Kéo & Thả File MIDI (.mid / .midi) vào đây
          </h3>
          <p className="text-muted-foreground text-xs mt-1">
            hoặc <span className="text-primary font-semibold underline">bấm để chọn file từ máy tính của bạn</span>
          </p>
        </div>

        {/* Direct URL Form */}
        <DirectUrlForm
          urlInput={urlInput}
          setUrlInput={setUrlInput}
          urlLoading={urlLoading}
          urlError={urlError}
          onSubmit={onLookupUrl}
        />

        {/* Trusted Free External MIDI Search Portals */}
        <div className="pt-4 border-t border-border/50">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-3">
            🌐 Kho Nguồn Tải File MIDI Miễn Phí Uy Tín
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
            {[
              { name: 'BitMidi (Kho 110k+ MIDI)', url: 'https://bitmidi.com' },
              { name: 'Mutopia Classical', url: 'https://www.mutopiaproject.org' },
              { name: 'Ichigos Anime MIDI', url: 'https://ichigos.com' },
            ].map((portal) => (
              <a
                key={portal.name}
                href={portal.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-3 py-1.5 font-medium text-foreground hover:border-primary hover:text-primary transition-colors shadow-sm"
              >
                <Globe className="h-3.5 w-3.5 text-primary" />
                <span>{portal.name}</span>
                <ExternalLink className="h-3 w-3 opacity-60" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
