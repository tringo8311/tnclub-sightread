import React from 'react'
import { useTranslation } from 'react-i18next'
import { Article } from './Article'

export function ProductRecommendationsSection() {
  const { t } = useTranslation()

  return (
    <Article
      header={t('about.sections.product_recommendations', 'Hardware Recommendations')}
      first={t('about.recommendations.intro', 'Looking for a compatible keyboard?')}
    >
      <p>
        {t(
          'about.recommendations.usb_advice',
          'TNClub Sightread works best with keyboards supporting USB MIDI output for minimal latency.',
        )}
      </p>

      <ul className="ml-6 list-disc space-y-2 pt-2 text-sm leading-relaxed">
        <li>
          <b>{t('about.recommendations.beginner_title', 'Beginner:')}</b>{' '}
          {t(
            'about.recommendations.beginner_desc',
            'Portable 61-key or 88-key electronic keyboards with USB MIDI.',
          )}
        </li>
        <li>
          <b>{t('about.recommendations.intermediate_title', 'Intermediate & Advanced:')}</b>{' '}
          {t(
            'about.recommendations.intermediate_desc',
            'Full 88-key weighted digital pianos for authentic key action.',
          )}
        </li>
      </ul>
    </Article>
  )
}
