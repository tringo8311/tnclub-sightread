import { Sizer } from '@/components'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Article } from './Article'
import { CaptionedImage } from './CaptionedImage'

export function WhatSection() {
  const { t } = useTranslation()

  return (
    <Article
      header={t('about.sections.what', 'What is TNClub Sightread?')}
      first={t(
        'about.what.intro',
        'TNClub Sightread is a free web app for learning and practicing piano interactive sight-reading.',
      )}
    >
      <p>
        {t(
          'about.what.falling_notes_desc',
          'TNClub Sightread is great for beginners – you can play songs without needing to learn complex sheet music right away. TNClub Sightread creates an intuitive Falling Notes visualization, similar to popular rhythm games.',
        )}
      </p>
      <Sizer height={8} />
      <CaptionedImage
        src={`${import.meta.env.BASE_URL}images/mode_falling_notes_screenshot.png`}
        caption={t('about.what.caption_falling_notes', 'Falling Notes mode with note labels')}
        height={1628}
        width={1636}
        fetchPriority="high"
      />
      <Sizer height={24} />
      <p>
        {t(
          'about.what.sheet_hero_desc',
          'For those who want to learn sheet music, TNClub Sightread offers Sheet Hero (beta) mode. Sheet Hero acts as a bridge between falling notes and full sheet music. Notes are laid out on a musical staff with simplified timing.',
        )}
      </p>
      <Sizer height={8} />
      <CaptionedImage
        src={`${import.meta.env.BASE_URL}images/mode_sheet_hero_screenshot.png`}
        width={1980}
        height={1148}
        caption={t('about.what.caption_sheet_hero', 'Sheet Hero (beta) mode with note labels')}
      />
    </Article>
  )
}
