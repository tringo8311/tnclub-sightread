import { PreviewableImage } from '@/components'
import { Hammer, ShieldCheck, SlidersHorizontal, Sparkles } from 'lucide-react'
import React from 'react'
import { useTranslation } from 'react-i18next'

export function PianoCraftsmanshipSection() {
  const { t } = useTranslation()

  return (
    <section className="space-y-8">
      <div className="flex items-center gap-3">
        <div className="bg-primary/10 text-primary border-primary/20 rounded-2xl border p-3 shadow-md">
          <Hammer className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-foreground text-2xl font-semibold tracking-tight md:text-3xl">
            {t('theory.craftsmanship.title', 'Anatomy & Craftsmanship Marvels')}
          </h2>
          <p className="text-muted-foreground text-xs md:text-sm">
            {t(
              'theory.craftsmanship.subtitle',
              'Over 8,000 precision mechanical parts harmonizing to produce acoustic perfection',
            )}
          </p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
        {/* Anatomy Cards */}
        <div className="space-y-4 lg:col-span-7">
          <div className="glass-card space-y-2 rounded-2xl border-l-4 border-l-amber-500 p-5">
            <div className="text-foreground flex items-center gap-2 font-semibold">
              <ShieldCheck className="h-4 w-4 text-amber-400" />
              <span>{t('theory.craftsmanship.frame_title', 'Cast-Iron Plate')}</span>
            </div>
            <p className="text-muted-foreground text-xs leading-relaxed md:text-sm">
              {t(
                'theory.craftsmanship.frame_desc',
                'A single-piece cast-iron frame withstands up to 20 tons of string tension across 230+ steel strings.',
              )}
            </p>
          </div>

          <div className="glass-card space-y-2 rounded-2xl border-l-4 border-l-emerald-500 p-5">
            <div className="text-foreground flex items-center gap-2 font-semibold">
              <Sparkles className="h-4 w-4 text-emerald-400" />
              <span>{t('theory.craftsmanship.soundboard_title', 'Sitka Spruce Soundboard')}</span>
            </div>
            <p className="text-muted-foreground text-xs leading-relaxed md:text-sm">
              {t(
                'theory.craftsmanship.soundboard_desc',
                'Crafted from aged Sitka Spruce, acting as the acoustic amplifier heart of the instrument.',
              )}
            </p>
          </div>

          <div className="glass-card space-y-2 rounded-2xl border-l-4 border-l-cyan-500 p-5">
            <div className="text-foreground flex items-center gap-2 font-semibold">
              <Hammer className="h-4 w-4 text-cyan-400" />
              <span>{t('theory.craftsmanship.action_title', 'Action Mechanism')}</span>
            </div>
            <p className="text-muted-foreground text-xs leading-relaxed md:text-sm">
              {t(
                'theory.craftsmanship.action_desc',
                'Over 8,000 parts made of wood, felt, and leather calibrated to sub-millimeter precision.',
              )}
            </p>
          </div>
        </div>

        {/* Action Illustration Image */}
        <div className="overflow-hidden rounded-2xl border border-white/10 shadow-2xl lg:col-span-5">
          <PreviewableImage
            src={`${import.meta.env.BASE_URL}images/theory/craftsmanship.png`}
            alt="Piano Action Craftsmanship"
            title="Piano Action Craftsmanship"
            className="relative aspect-4/3 overflow-hidden"
          >
            <div className="from-background pointer-events-none absolute inset-0 bg-gradient-to-t via-transparent to-transparent opacity-50" />
          </PreviewableImage>
        </div>
      </div>

      {/* 3-Pedal System Card */}
      <div className="glass-card rounded-2xl p-6">
        <div className="mb-4 flex items-center gap-3">
          <SlidersHorizontal className="h-5 w-5 text-amber-400" />
          <h3 className="text-foreground text-lg font-semibold">
            {t('theory.craftsmanship.pedals_title', '3-Pedal System')}
          </h3>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="border-border bg-foreground/5 space-y-1 rounded-xl border p-4">
            <span className="text-xs font-medium text-amber-400">1. Sustain Pedal (Right)</span>
            <p className="text-muted-foreground text-xs leading-relaxed">
              {t(
                'theory.craftsmanship.pedal_sustain',
                'Lifts all dampers to allow strings to vibrate freely.',
              )}
            </p>
          </div>

          <div className="border-border bg-foreground/5 space-y-1 rounded-xl border p-4">
            <span className="text-xs font-semibold text-cyan-400">2. Sostenuto Pedal (Middle)</span>
            <p className="text-muted-foreground text-xs leading-relaxed">
              {t(
                'theory.craftsmanship.pedal_sostenuto',
                'Sustains only the notes currently held down when pressed.',
              )}
            </p>
          </div>

          <div className="border-border bg-foreground/5 space-y-1 rounded-xl border p-4">
            <span className="text-xs font-semibold text-emerald-400">
              3. Una Corda / Soft (Left)
            </span>
            <p className="text-muted-foreground text-xs leading-relaxed">
              {t(
                'theory.craftsmanship.pedal_soft',
                'Shifts action so hammers strike fewer strings for a softer tone.',
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
