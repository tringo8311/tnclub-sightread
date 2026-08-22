import { AppBar, MarketingFooter, Sizer } from '@/components'
import { BookOpen, Home, Music, Piano, Search } from 'lucide-react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'

export default function NotFoundPage() {
  const { t } = useTranslation()

  return (
    <div className="bg-background text-foreground flex min-h-screen w-full flex-col">
      <title>{t('not_found.title', '404 - Page Not Found')} | TNClub Sightread</title>
      <AppBar />

      <main className="flex w-full flex-1 flex-col items-center justify-center px-6 py-16 text-center">
        {/* Glowing Ambient Background Backdrop */}
        <div className="relative mx-auto max-w-2xl space-y-6">
          <div className="absolute -top-20 left-1/2 -z-10 h-64 w-64 -translate-x-1/2 rounded-full bg-amber-500/20 blur-3xl" />
          <div className="absolute -bottom-20 left-1/2 -z-10 h-64 w-64 -translate-x-1/2 rounded-full bg-violet-500/20 blur-3xl" />

          {/* Glowing 404 Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-950/70 px-5 py-2 text-xs font-medium text-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.3)] backdrop-blur-md">
            <Piano className="h-4 w-4 text-amber-400" />
            <span>{t('not_found.badge', '404 Error - Page Not Found')}</span>
          </div>

          {/* Huge 404 Heading */}
          <h1 className="bg-gradient-to-r from-amber-400 via-amber-200 to-white bg-clip-text text-7xl font-bold tracking-tight text-transparent drop-shadow-2xl sm:text-9xl">
            404
          </h1>

          <h2 className="text-foreground text-2xl font-semibold tracking-tight sm:text-3xl">
            {t('not_found.heading', 'Oops! This Melody Does Not Exist')}
          </h2>

          <p className="text-muted-foreground mx-auto max-w-md text-sm leading-relaxed font-normal">
            {t(
              'not_found.description',
              'The link you followed may be broken, removed, or mistyped. Explore our exciting piano learning sections below!',
            )}
          </p>

          {/* Quick Action Navigation Grid */}
          <div className="grid gap-3 pt-4 sm:grid-cols-2">
            <Link
              to="/"
              className="flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-5 py-3 text-xs font-medium text-slate-950 shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all hover:scale-105 hover:bg-amber-400"
            >
              <Home className="h-4 w-4" />
              <span>{t('not_found.home', 'Back to Home')}</span>
            </Link>

            <Link
              to="/songs"
              className="border-border bg-foreground/5 text-foreground hover:bg-foreground/15 flex items-center justify-center gap-2 rounded-xl border px-5 py-3 text-xs font-medium transition-all hover:border-amber-400/50"
            >
              <Music className="h-4 w-4 text-amber-400" />
              <span>{t('not_found.songs', 'Song Library')}</span>
            </Link>

            <Link
              to="/theory"
              className="border-border bg-foreground/5 text-foreground hover:bg-foreground/15 flex items-center justify-center gap-2 rounded-xl border px-5 py-3 text-xs font-medium transition-all hover:border-amber-400/50"
            >
              <BookOpen className="h-4 w-4 text-cyan-400" />
              <span>{t('not_found.theory', 'Music Theory & Chords')}</span>
            </Link>

            <Link
              to="/piano-history"
              className="border-border bg-foreground/5 text-foreground hover:bg-foreground/15 flex items-center justify-center gap-2 rounded-xl border px-5 py-3 text-xs font-medium transition-all hover:border-amber-400/50"
            >
              <Piano className="h-4 w-4 text-fuchsia-400" />
              <span>{t('not_found.history', 'Piano History & Encyclopedia')}</span>
            </Link>
          </div>
        </div>
      </main>

      <Sizer height={40} />
      <MarketingFooter />
    </div>
  )
}
