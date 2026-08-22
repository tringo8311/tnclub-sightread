import React from 'react'
import { useTranslation } from 'react-i18next'
import { Article } from './Article'

export function GettingStartedSection() {
  const { t } = useTranslation()

  return (
    <Article
      header={t('about.sections.getting_started', 'Getting Started')}
      first={t(
        'about.gettingStarted.subtitle',
        'Connect a keyboard. Start slow. Gradually speed up.',
      )}
    >
      <p>
        {t(
          'about.gettingStarted.separate_hands',
          'When initially learning a song, we recommend learning left and right hands separately. You can slow down the song using the BPM controls by at least 50%. Practicing slowly with good form is far more effective than rushing at full speed.',
        )}
      </p>
      <p>
        {t(
          'about.gettingStarted.wait_mode',
          'If you connect a MIDI keyboard via USB, enable Wait mode – the song will pause until you press the correct key.',
        )}
      </p>
      <p>
        {t(
          'about.gettingStarted.education',
          'TNClub Sightread works best alongside regular practice and formal music education.',
        )}
      </p>
    </Article>
  )
}
