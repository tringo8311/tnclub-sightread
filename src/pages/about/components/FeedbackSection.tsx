import React from 'react'
import { useTranslation } from 'react-i18next'
import { Article } from './Article'

export function FeedbackSection() {
  const { t } = useTranslation()

  return (
    <Article header={t('about.sections.feedback', 'Phản hồi & Đóng góp')}>
      <p>
        {t(
          'about.feedback.text',
          'Bạn phát hiện lỗi hoặc có góp ý tính năng mới? Hãy gửi đóng góp cho cộng đồng phát triển TNClub Sightread.',
        )}
      </p>
    </Article>
  )
}
