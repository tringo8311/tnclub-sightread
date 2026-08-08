import React from 'react'
import { useTranslation } from 'react-i18next'
import { Article } from './Article'

export function BrowserCompatibilitySection() {
  const { t } = useTranslation()

  return (
    <Article
      header={t('about.sections.browser_compatibility', 'Tương thích trình duyệt')}
      first={t(
        'about.browserCompatibility.intro',
        'TNClub Sightread tương thích tốt nhất trên các trình duyệt hiện đại như Google Chrome, Microsoft Edge và Mozilla Firefox.',
      )}
    >
      <p>
        {t(
          'about.browserCompatibility.midi_note',
          'Để kết nối Đàn Piano điện qua cổng USB MIDI, khuyến nghị sử dụng trình duyệt hỗ trợ chuẩn WebMIDI (như Chrome, Edge, Brave).',
        )}
      </p>
    </Article>
  )
}
