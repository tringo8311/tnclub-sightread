import { PreviewableImage } from '@/components'
import { CheckCircle2, Music, Piano, Zap } from 'lucide-react'
import React from 'react'
import { useTranslation } from 'react-i18next'

export function PianoTypesSection() {
  const { t } = useTranslation()

  const types = [
    {
      id: 'grand',
      name: t('theory.types.grand.name', 'Grand Piano (Horizontal Acoustic)'),
      badge: t('theory.types.grand.badge', 'Pinnacle Concert Sound'),
      image: `${import.meta.env.BASE_URL}images/theory/grand_piano.png`,
      desc: t(
        'theory.types.grand.desc',
        'Strings and soundboard are positioned horizontally. The gravity-assisted action allows lightning-fast repetition and ultimate dynamic expression.',
      ),
      features: [
        t('theory.types.grand.feature1', 'Length: 1.5m (Baby Grand) to 2.7m+ (Concert Grand).'),
        t(
          'theory.types.grand.feature2',
          'Open lid design maximizes acoustic projection in large halls.',
        ),
      ],
    },
    {
      id: 'upright',
      name: t('theory.types.upright.name', 'Upright Piano (Vertical Acoustic)'),
      badge: t('theory.types.upright.badge', 'Standard Home Choice'),
      image: `${import.meta.env.BASE_URL}images/theory/upright_piano.png`,
      desc: t(
        'theory.types.upright.desc',
        'Strings and soundboard run vertically perpendicular to the floor. Compact footprint, making it ideal for homes and music classrooms.',
      ),
      features: [
        t('theory.types.upright.feature1', 'Spring-assisted hammer return mechanism.'),
        t(
          'theory.types.upright.feature2',
          'Space-saving cabinet while preserving genuine acoustic sound.',
        ),
      ],
    },
    {
      id: 'digital',
      name: t('theory.types.digital.name', 'Digital Piano'),
      badge: t('theory.types.digital.badge', 'Modern & Versatile'),
      image: `${import.meta.env.BASE_URL}images/theory/digital_piano.png`,
      desc: t(
        'theory.types.digital.desc',
        'Employs high-resolution sampling or physical modeling from world-class concert grand pianos. Features headphone outputs, USB MIDI, and computer connectivity.',
      ),
      features: [
        t('theory.types.digital.feature1', 'Weighted action keybed simulates authentic feel.'),
        t(
          'theory.types.digital.feature2',
          'No tuning required, easy recording and silent night practice.',
        ),
      ],
    },
    {
      id: 'hybrid',
      name: t('theory.types.hybrid.name', 'Hybrid Piano (Acoustic-Digital)'),
      badge: t('theory.types.hybrid.badge', 'Pinnacle Technology'),
      image: `${import.meta.env.BASE_URL}images/theory/hybrid_piano.png`,
      desc: t(
        'theory.types.hybrid.desc',
        'Combines a real 100% wooden acoustic action with high-precision optical electronic sensors.',
      ),
      features: [
        t('theory.types.hybrid.feature1', '100% real acoustic key action touch.'),
        t('theory.types.hybrid.feature2', 'Adjustable volume or silent headphone playing.'),
      ],
    },
  ]

  return (
    <section className="space-y-8">
      <div className="flex items-center gap-3">
        <div className="bg-primary/10 text-primary border-primary/20 rounded-2xl border p-3 shadow-md">
          <Piano className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-foreground text-2xl font-bold tracking-tight md:text-3xl">
            {t('theory.types.title', 'Piano Types & Characteristics')}
          </h2>
          <p className="text-muted-foreground text-xs md:text-sm">
            {t(
              'theory.types.subtitle',
              'Explore diversity in cabinet design and acoustic mechanisms',
            )}
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {types.map((item) => (
          <div
            key={item.id}
            className="glass-card group relative flex flex-col justify-between overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div>
              {item.image && (
                <PreviewableImage
                  src={item.image}
                  alt={item.name}
                  title={item.name}
                  className="-mx-6 -mt-6 mb-6 h-52 overflow-hidden"
                >
                  <div className="from-card pointer-events-none absolute inset-0 bg-gradient-to-t via-transparent to-transparent opacity-90" />
                  <span className="pointer-events-none absolute top-4 left-4 z-10 inline-block rounded-lg border border-amber-500/30 bg-black/60 px-3 py-1 text-xs font-semibold text-amber-300 backdrop-blur-md">
                    {item.badge}
                  </span>
                </PreviewableImage>
              )}

              {!item.image && (
                <div className="mb-4 flex items-center justify-between">
                  <span className="inline-block rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-400">
                    {item.badge}
                  </span>
                  {item.id === 'digital' ? (
                    <Zap className="h-5 w-5 text-cyan-400" />
                  ) : (
                    <Music className="h-5 w-5 text-amber-400" />
                  )}
                </div>
              )}

              <h3 className="text-foreground group-hover:text-primary text-xl font-bold transition-colors">
                {item.name}
              </h3>

              <p className="text-muted-foreground mt-2 text-xs leading-relaxed md:text-sm">
                {item.desc}
              </p>
            </div>

            <div className="border-border mt-6 space-y-2 border-t pt-4">
              {item.features.map((feat, fIdx) => (
                <div key={fIdx} className="text-foreground/80 flex items-start gap-2 text-xs">
                  <CheckCircle2 className="text-primary mt-0.5 h-3.5 w-3.5 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
