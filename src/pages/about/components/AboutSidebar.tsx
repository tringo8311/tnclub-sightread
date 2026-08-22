import { Sizer } from '@/components'
import React, { PropsWithChildren } from 'react'
import { useTranslation } from 'react-i18next'
import { slugify } from '../utils'

function SidebarLink({ children }: PropsWithChildren<{ children: string }>) {
  return (
    <a
      className="hover:text-primary text-foreground/80 hover:text-foreground text-sm font-medium transition-colors"
      href={`#${slugify(children)}`}
    >
      {children}
    </a>
  )
}

export function AboutSidebar() {
  const { t } = useTranslation()

  const sections = [
    t('about.sections.what', 'What is TNClub Sightread?'),
    t('about.sections.getting_started', 'Getting Started'),
    t('about.sections.music_selection', 'Music Catalog'),
    t('about.sections.browser_compatibility', 'Browser Compatibility'),
    t('about.sections.roadmap', 'Roadmap'),
    t('about.sections.feedback', 'Feedback & Community'),
    t('about.sections.product_recommendations', 'Hardware Recommendations'),
    t('about.sections.attributions', 'Attributions'),
  ]

  return (
    <div className="sticky top-0 hidden max-h-screen p-8 md:block">
      <section className="mx-auto flex flex-col">
        <h2 className="text-2xl font-bold tracking-tight">{t('about.title', 'About')}</h2>
        <Sizer height={24} />
        <ul className="flex flex-col gap-4 whitespace-nowrap">
          {sections.map((title) => (
            <li key={title}>
              <SidebarLink>{title}</SidebarLink>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
