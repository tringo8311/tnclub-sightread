import React from 'react'
import { useTranslation } from 'react-i18next'
import { Article } from './Article'

export function ProductRecommendationsSection() {
  const { t } = useTranslation()

  return (
    <Article
      header={t('about.sections.product_recommendations', 'Gợi ý thiết bị')}
      first={t('about.recommendations.intro', 'Tìm kiếm Đàn Piano điện / Keyboard phù hợp để luyện tập?')}
    >
      <p>
        {t(
          'about.recommendations.usb_advice',
          'TNClub Sightread cần kết nối MIDI-out (thường qua cổng USB B hoặc Bluetooth MIDI). Bạn nên ưu tiên kết nối cáp USB trực tiếp để đảm bảo độ độ trễ thấp nhất.',
        )}
      </p>

      <ul className="ml-6 space-y-2 list-disc pt-2 text-sm leading-relaxed">
        <li>
          <b>{t('about.recommendations.beginner_title', 'Người mới bắt đầu:')}</b>{' '}
          {t(
            'about.recommendations.beginner_desc',
            'Các dòng đàn Piano điện / Organ 61 phím có hỗ trợ USB MIDI.',
          )}
        </li>
        <li>
          <b>{t('about.recommendations.intermediate_title', 'Nâng cao:')}</b>{' '}
          {t(
            'about.recommendations.intermediate_desc',
            'Đàn Piano điện 88 phím có phím nặng (Weighted Keys) giúp cảm giác phím chân thực.',
          )}
        </li>
      </ul>
    </Article>
  )
}
