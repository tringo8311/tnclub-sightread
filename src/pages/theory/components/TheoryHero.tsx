import { BookOpen, Clock, Crown, Hammer, History, Layers, Music, Piano } from 'lucide-react'
import React from 'react'
import { useTranslation } from 'react-i18next'

interface TheoryHeroProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function TheoryHero({ activeTab, setActiveTab }: TheoryHeroProps) {
  const { t } = useTranslation()

  const tabs = [
    { id: 'all', label: t('theory.tabs.all', 'Tất cả Nhạc Lý'), icon: <BookOpen className="h-4 w-4" /> },
    { id: 'fundamentals', label: t('theory.tabs.fundamentals', 'Căn Bản Nhạc Lý'), icon: <Layers className="h-4 w-4" /> },
    { id: 'time-signatures', label: 'Chỉ Số Nhịp (2/4, 3/4, 4/4)', icon: <Clock className="h-4 w-4 text-cyan-400" /> },
    { id: 'chords', label: 'Hợp Âm & Âm Giai', icon: <Music className="h-4 w-4 text-amber-400" /> },
  ]

  return (
    <div className="relative overflow-hidden border-b border-amber-500/20 px-6 py-12 sm:py-16">
      {/* Concert Grand Piano Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={`${import.meta.env.BASE_URL}images/theory_banner.png`}
          alt="Luxurious Grand Piano Banner"
          className="h-full w-full object-cover object-center"
        />
        {/* Crisp Dark Tint Overlay for Excellent Text Readability */}
        <div className="absolute inset-0 bg-slate-950/75 backdrop-brightness-75" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl space-y-5 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/50 bg-amber-950/80 px-4 py-1.5 text-xs font-bold text-amber-300 shadow-md">
          <BookOpen className="h-4 w-4 text-amber-400" />
          <span>Căn Bản Nhạc Lý & Hợp Âm Piano</span>
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl drop-shadow-md">
          Nền Tảng Nhạc Lý & <span className="text-amber-400">Tra Cứu Hợp Âm</span>
        </h1>

        <p className="mx-auto max-w-3xl text-sm leading-relaxed text-zinc-200 sm:text-base font-medium drop-shadow">
          Nắm vững khóa nhạc (Sol/Fa), trường độ nốt, dấu hóa, giải thích chỉ số nhịp (2/4, 3/4, 4/4, 6/8) và tra cứu hợp âm, âm giai kèm thế bấm ngón tay chuẩn.
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
                    ? 'bg-amber-500 text-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.5)] scale-105'
                    : 'bg-slate-900/80 border border-slate-700/80 text-zinc-200 hover:bg-slate-800 hover:text-white hover:border-amber-400/50'
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
