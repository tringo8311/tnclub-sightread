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
    {
      id: 'all',
      label: t('theory.tabs.all', 'All Theory'),
      icon: <BookOpen className="h-4 w-4" />,
    },
    {
      id: 'fundamentals',
      label: t('theory.tabs.fundamentals', 'Fundamentals'),
      icon: <Layers className="h-4 w-4" />,
    },
    {
      id: 'time-signatures',
      label: t('theory.tabs.time_signatures', 'Time Signatures (2/4, 3/4, 4/4)'),
      icon: <Clock className="h-4 w-4 text-cyan-400" />,
    },
    {
      id: 'chords',
      label: t('theory.tabs.chords', 'Chords & Scales'),
      icon: <Music className="h-4 w-4 text-amber-400" />,
    },
    {
      id: 'history',
      label: t('theory.tabs.history', 'History & Evolution'),
      icon: <History className="h-4 w-4 text-emerald-400" />,
    },
    {
      id: 'types',
      label: t('theory.tabs.types', 'Piano Types'),
      icon: <Piano className="h-4 w-4 text-blue-400" />,
    },
    {
      id: 'craftsmanship',
      label: t('theory.tabs.craftsmanship', 'Craftsmanship & Anatomy'),
      icon: <Hammer className="h-4 w-4 text-orange-400" />,
    },
    {
      id: 'brands',
      label: t('theory.tabs.brands', 'Brands'),
      icon: <Crown className="h-4 w-4 text-amber-300" />,
    },
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
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/50 bg-amber-950/80 px-4 py-1.5 text-xs font-medium text-amber-300 shadow-md">
          <BookOpen className="h-4 w-4 text-amber-400" />
          <span>{t('theory.hero.badge', 'Music Theory Fundamentals & Piano Encyclopedia')}</span>
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-white drop-shadow-md sm:text-5xl">
          {t('theory.hero.title', 'Music Theory Fundamentals & ')}
          <span className="text-amber-400">{t('theory.hero.titleHighlight', 'Chord Lookup')}</span>
        </h1>

        <p className="mx-auto max-w-3xl text-sm leading-relaxed font-normal text-zinc-200 drop-shadow sm:text-base">
          {t(
            'theory.hero.subtitle',
            'Master clefs (Treble/Bass), note values, accidentals, time signatures (2/4, 3/4, 4/4, 6/8), and lookup chords and scales with correct fingerings.',
          )}
        </p>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 pt-3">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex cursor-pointer items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-medium transition-all duration-200 ${
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
  )
}
