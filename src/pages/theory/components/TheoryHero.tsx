import { BookOpen, Crown, Hammer, History, Layers, Piano } from 'lucide-react'
import React from 'react'
import { useTranslation } from 'react-i18next'

interface TheoryHeroProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function TheoryHero({ activeTab, setActiveTab }: TheoryHeroProps) {
  const { t } = useTranslation()

  const tabs = [
    { id: 'all', label: t('theory.tabs.all', 'Tất cả'), icon: <BookOpen className="h-4 w-4" /> },
    { id: 'history', label: t('theory.tabs.history', 'Lịch Sử & Tiến Hóa'), icon: <History className="h-4 w-4" /> },
    { id: 'types', label: t('theory.tabs.types', 'Các Dòng Đàn Piano'), icon: <Piano className="h-4 w-4" /> },
    { id: 'craftsmanship', label: t('theory.tabs.craftsmanship', 'Cấu Tạo & Chế Tác'), icon: <Hammer className="h-4 w-4" /> },
    { id: 'brands', label: t('theory.tabs.brands', 'Thương Hiệu Huyền Thoại'), icon: <Crown className="h-4 w-4" /> },
    { id: 'fundamentals', label: t('theory.tabs.fundamentals', 'Căn Bản Nhạc Lý'), icon: <Layers className="h-4 w-4" /> },
  ]

  return (
    <div className="border-border bg-card/40 relative overflow-hidden border-b px-6 py-12 backdrop-blur-md">
      <div className="mx-auto max-w-5xl space-y-6 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold text-amber-400 shadow-sm">
          <Piano className="h-4 w-4 text-amber-400" />
          <span>{t('theory.title', 'Bách Khoa Toàn Thư Piano & Nhạc Lý')}</span>
        </div>

        <h1 className="from-foreground via-foreground to-foreground/70 bg-gradient-to-r bg-clip-text text-3xl font-extrabold tracking-tight text-transparent sm:text-5xl">
          Nghệ Thuật, Lịch Sử & Bàn Phím Piano
        </h1>

        <p className="text-muted-foreground mx-auto max-w-3xl text-sm leading-relaxed sm:text-base">
          {t(
            'theory.subtitle',
            'Khám phá lịch sử, nghệ thuật chế tác thủ công, các loại đàn Piano huyền thoại và nền tảng nhạc lý căn bản.',
          )}
        </p>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex cursor-pointer items-center gap-2 rounded-xl px-4 py-2 text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'glass-card text-foreground/70 hover:bg-foreground/10 hover:text-foreground'
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
  )
}
