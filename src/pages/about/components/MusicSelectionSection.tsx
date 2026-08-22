import React from 'react'
import { useTranslation } from 'react-i18next'
import { Article } from './Article'

export function MusicSelectionSection() {
  const { t } = useTranslation()

  return (
    <Article
      header={t('about.sections.music_selection', 'Music Catalog')}
      first={t(
        'about.musicSelection.intro',
        'The catalog consists of two components: built-in pieces and local MIDI file imports.',
      )}
    >
      <p>
        {t(
          'about.musicSelection.builtin',
          'Includes curated public domain classical and practice pieces.',
        )}
      </p>
      <p>
        {t(
          'about.musicSelection.upload',
          'Upload your own .mid files directly to practice; files remain stored safely in your browser.',
        )}
      </p>
    </Article>
  )
}
