import React from 'react'
import { useTranslation } from 'react-i18next'
import { Article } from './Article'

export function RoadmapSection() {
  const { t } = useTranslation()

  return (
    <Article header={t('about.sections.roadmap', 'Roadmap')}>
      <p>{t('about.roadmap.intro', 'Exciting features currently planned for future updates:')}</p>
      <ul className="list-disc space-y-1.5 px-6 pt-2 text-sm leading-relaxed">
        <li>{t('about.roadmap.items.mobile', 'Mobile tablet and phone optimized layout.')}</li>
        <li>
          {t('about.roadmap.items.musicxml', 'MusicXML file import and full sheet music renderer.')}
        </li>
        <li>
          {t('about.roadmap.items.scoring', 'Practice scoring and performance progress tracking.')}
        </li>
        <li>
          {t(
            'about.roadmap.items.freeplay_record',
            'Record performances in Free Play mode and share links.',
          )}
        </li>
        <li>
          {t(
            'about.roadmap.items.training_games',
            'Interactive note recognition games and sight-reading drills.',
          )}
        </li>
      </ul>
    </Article>
  )
}
