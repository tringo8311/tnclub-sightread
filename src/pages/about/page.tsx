import { AppBar, MarketingFooter } from '@/components'
import React from 'react'
import { useTranslation } from 'react-i18next'
import {
  AboutSidebar,
  AttributionsSection,
  BrowserCompatibilitySection,
  FeedbackSection,
  GettingStartedSection,
  MusicSelectionSection,
  ProductRecommendationsSection,
  RoadmapSection,
  WhatSection,
} from './components'

export default function AboutPage() {
  const { t } = useTranslation()
  return (
    <div className="flex min-h-screen flex-col">
      <title>{t('about.title', 'About')} | TNClub Sightread</title>
      <AppBar />
      <div className="w-full">
        <div className="mx-auto flex max-w-(--breakpoint-lg)">
          <AboutSidebar />
          <div className="glass-card mx-auto my-8 w-full flex-1 p-8 text-base">
            <div className="mx-auto flex max-w-prose flex-col gap-12">
              <WhatSection />
              <GettingStartedSection />
              <MusicSelectionSection />
              <BrowserCompatibilitySection />
              <RoadmapSection />
              <FeedbackSection />
              <ProductRecommendationsSection />
              <AttributionsSection />
            </div>
          </div>
        </div>
      </div>
      <MarketingFooter />
    </div>
  )
}
