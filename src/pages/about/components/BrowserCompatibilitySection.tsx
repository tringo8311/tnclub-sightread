import React from 'react'
import { useTranslation } from 'react-i18next'
import { Article } from './Article'

export function BrowserCompatibilitySection() {
  const { t } = useTranslation()

  return (
    <Article
      header={t('about.sections.browser_compatibility', 'Browser Compatibility')}
      first={t(
        'about.browserCompatibility.intro',
        'TNClub Sightread is fully compatible with modern browsers like Google Chrome, Microsoft Edge, and Mozilla Firefox.',
      )}
    >
      <p>
        {t(
          'about.browserCompatibility.midi_note',
          'For connecting a MIDI keyboard via USB, a WebMIDI capable browser (such as Chrome, Edge, or Brave) is recommended.',
        )}
      </p>
    </Article>
  )
}
