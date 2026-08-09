import { AppBar, MarketingFooter, Sizer } from '@/components'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ChordScaleSection, MusicFundamentalsSection, TheoryHero } from './components'

export default function TheoryPage() {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState<string>('all')

  return (
    <div className="bg-background text-foreground flex min-h-screen w-full flex-col">
      <title>{t('theory.title', 'Căn Bản Nhạc Lý & Hợp Âm Piano')} | TNClub Sightread</title>
      <AppBar />

      <main className="w-full flex-1">
        <TheoryHero activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="mx-auto w-full max-w-6xl space-y-16 px-6 py-12">
          {(activeTab === 'all' ||
            activeTab === 'fundamentals' ||
            activeTab === 'time-signatures') && <MusicFundamentalsSection />}
          {(activeTab === 'all' || activeTab === 'chords') && <ChordScaleSection />}
        </div>
      </main>

      <Sizer height={40} />
      <MarketingFooter />
    </div>
  )
}
