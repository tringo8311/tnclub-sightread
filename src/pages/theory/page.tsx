import { AppBar, MarketingFooter, Sizer } from '@/components'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  MusicFundamentalsSection,
  PianoBrandsSection,
  PianoCraftsmanshipSection,
  PianoHistorySection,
  PianoTypesSection,
  TheoryHero,
} from './components'

export default function TheoryPage() {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState<string>('all')

  return (
    <div className="bg-background text-foreground flex min-h-screen w-full flex-col">
      <title>{t('theory.title', 'Bách Khoa Toàn Thư Piano & Nhạc Lý')} | TNClub Sightread</title>
      <AppBar />

      <main className="w-full flex-1">
        <TheoryHero activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="mx-auto w-full max-w-6xl space-y-16 px-6 py-12">
          {(activeTab === 'all' || activeTab === 'history') && <PianoHistorySection />}
          {(activeTab === 'all' || activeTab === 'types') && <PianoTypesSection />}
          {(activeTab === 'all' || activeTab === 'craftsmanship') && <PianoCraftsmanshipSection />}
          {(activeTab === 'all' || activeTab === 'brands') && <PianoBrandsSection />}
          {(activeTab === 'all' || activeTab === 'fundamentals') && <MusicFundamentalsSection />}
        </div>
      </main>

      <Sizer height={40} />
      <MarketingFooter />
    </div>
  )
}
