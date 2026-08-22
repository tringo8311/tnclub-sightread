import { PreviewableImage } from '@/components'
import { History, Sparkles } from 'lucide-react'
import React from 'react'
import { useTranslation } from 'react-i18next'

export function PianoHistorySection() {
  const { t } = useTranslation()

  const timelineItems = [
    {
      year: '1700',
      title: t('theory.history.cristofori_title', '1700 – Invented by Bartolomeo Cristofori'),
      desc: t(
        'theory.history.cristofori_desc',
        'In Florence, Italy, master craftsman Cristofori invented "Un cimbalo di cipresso di piano e forte" - allowing performers to play soft (piano) or loud (forte) dynamics via touch sensitivity.',
      ),
    },
    {
      year: '1780s',
      title: t('theory.history.fortepiano_title', '18th Century – The Classical Fortepiano Era'),
      desc: t(
        'theory.history.fortepiano_desc',
        'Masters such as Mozart, Haydn, and Beethoven composed masterpieces for the fortepiano, pushing the evolution of hammer action and expanded keyboard register.',
      ),
    },
    {
      year: '1850s',
      title: t(
        'theory.history.industrial_title',
        '19th Century – Cast-Iron Plate & Industrial Revolution',
      ),
      desc: t(
        'theory.history.industrial_desc',
        'Single-piece cast-iron plates and felt-covered hammers allowed immense string tension, creating the powerful concert grand projection needed for large concert halls.',
      ),
    },
    {
      year: 'Modern',
      title: t('theory.history.modern_title', '20th - 21st Century – The Modern & Digital Era'),
      desc: t(
        'theory.history.modern_desc',
        'Refinement of the modern concert grand alongside the invention of digital pianos and hybrid acoustic-digital instruments, making piano music accessible worldwide.',
      ),
    },
  ]

  return (
    <section className="space-y-8">
      <div className="flex items-center gap-3">
        <div className="bg-primary/10 text-primary border-primary/20 rounded-2xl border p-3 shadow-md">
          <History className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-foreground text-2xl font-bold tracking-tight md:text-3xl">
            {t('theory.history.title', 'Origins & Evolution of the Piano')}
          </h2>
          <p className="text-muted-foreground text-xs md:text-sm">
            {t(
              'theory.history.subtitle',
              'From early keyboard instruments to the King of Instruments',
            )}
          </p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
        {/* History Illustration */}
        <div className="overflow-hidden rounded-2xl border border-white/10 shadow-2xl lg:col-span-5">
          <PreviewableImage
            src={`${import.meta.env.BASE_URL}images/theory/history.png`}
            alt="Vintage Fortepiano History"
            title="Fortepiano thế kỷ 18 (Florence, Italia)"
            className="relative aspect-4/3 overflow-hidden"
          >
            <div className="from-background pointer-events-none absolute inset-0 bg-gradient-to-t via-transparent to-transparent opacity-60" />
            <div className="pointer-events-none absolute right-4 bottom-4 left-4 z-10 rounded-xl border border-white/10 bg-black/60 p-3 backdrop-blur-md">
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-300">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Fortepiano thế kỷ 18 (Florence, Italia)</span>
              </div>
            </div>
          </PreviewableImage>
        </div>

        {/* Timeline Items */}
        <div className="space-y-4 lg:col-span-7">
          {timelineItems.map((item, idx) => (
            <div
              key={idx}
              className="glass-card group relative flex gap-4 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="bg-primary/10 text-primary border-primary/20 flex h-10 w-12 shrink-0 items-center justify-center rounded-xl border text-xs font-bold shadow-sm">
                {item.year}
              </div>
              <div className="space-y-1">
                <h3 className="text-foreground group-hover:text-primary text-base font-bold transition-colors">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-xs leading-relaxed md:text-sm">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
