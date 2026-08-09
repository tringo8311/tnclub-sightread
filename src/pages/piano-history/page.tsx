import { AppBar, MarketingFooter, PreviewableImage, Sizer } from '@/components'
import { BookOpen, Crown, Hammer, History, Piano } from 'lucide-react'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  PianoBrandsSection,
  PianoCraftsmanshipSection,
  PianoHistorySection,
  PianoTypesSection,
} from '../theory/components'

export default function PianoHistoryPage() {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState<string>('all')

  const tabs = [
    { id: 'all', label: 'Tất cả Bách Khoa', icon: <BookOpen className="h-4 w-4" /> },
    { id: 'history', label: 'Lịch Sử & Tiến Hóa', icon: <History className="h-4 w-4" /> },
    { id: 'types', label: 'Các Dòng Đàn Piano', icon: <Piano className="h-4 w-4" /> },
    { id: 'craftsmanship', label: 'Cấu Tạo & Chế Tác', icon: <Hammer className="h-4 w-4" /> },
    { id: 'brands', label: 'Thương Hiệu Huyền Thoại', icon: <Crown className="h-4 w-4" /> },
  ]

  return (
    <div className="bg-background text-foreground flex min-h-screen w-full flex-col">
      <title>Lịch Sử & Bách Khoa Piano | TNClub Sightread</title>
      <AppBar />

      <main className="w-full flex-1">
        {/* Piano History & Craftsmanship Hero Banner */}
        <div className="relative overflow-hidden border-b border-amber-500/20 px-6 py-12 sm:py-16">
          <div className="absolute inset-0 z-0">
            <PreviewableImage
              src={`${import.meta.env.BASE_URL}images/theory_banner.png`}
              alt="Luxurious Grand Piano Banner"
              title="Luxurious Grand Piano Banner"
              className="h-full w-full"
              imgClassName="h-full w-full object-cover object-center"
              showEyeText={false}
            >
              <div className="pointer-events-none absolute inset-0 bg-slate-950/75 backdrop-brightness-75" />
            </PreviewableImage>
          </div>

          <div className="relative z-10 mx-auto max-w-5xl space-y-5 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/50 bg-amber-950/80 px-4 py-1.5 text-xs font-bold text-amber-300 shadow-md">
              <Piano className="h-4 w-4 text-amber-400" />
              <span>Nghệ Thuật, Lịch Sử & Chế Tác Piano</span>
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-white drop-shadow-md sm:text-5xl">
              Hành Trình <span className="text-amber-400">Đàn Piano Qua Các Thế Kỷ</span>
            </h1>

            <p className="mx-auto max-w-3xl text-sm leading-relaxed font-medium text-zinc-200 drop-shadow sm:text-base">
              Khám phá lịch sử tiến hóa từ Harpsichord đến Grand Piano hiện đại, nghệ thuật chế tác
              thủ công đỉnh cao và các thương hiệu piano huyền thoại thế giới.
            </p>

            {/* Category Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 pt-3">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex cursor-pointer items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all duration-200 ${
                      isActive
                        ? 'scale-105 bg-amber-500 text-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.5)]'
                        : 'border border-slate-700/80 bg-slate-900/80 text-zinc-200 hover:border-amber-400/50 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="mx-auto w-full max-w-6xl space-y-16 px-6 py-12">
          {(activeTab === 'all' || activeTab === 'history') && <PianoHistorySection />}
          {(activeTab === 'all' || activeTab === 'types') && <PianoTypesSection />}
          {(activeTab === 'all' || activeTab === 'craftsmanship') && <PianoCraftsmanshipSection />}
          {(activeTab === 'all' || activeTab === 'brands') && <PianoBrandsSection />}
        </div>
      </main>

      <Sizer height={40} />
      <MarketingFooter />
    </div>
  )
}
