import { Sizer } from '@/components'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Article } from './Article'
import { CaptionedImage } from './CaptionedImage'

export function WhatSection() {
  const { t } = useTranslation()

  return (
    <Article
      header={t('about.sections.what', 'TNClub Sightread là gì?')}
      first={t(
        'about.what.intro',
        'TNClub Sightread là ứng dụng web miễn phí giúp học và thực hành chơi đàn Piano trực quan.',
      )}
    >
      <p>
        {t(
          'about.what.falling_notes_desc',
          'TNClub Sightread phù hợp cho người mới bắt đầu – bạn có thể chơi các bản nhạc mà không bắt buộc phải đọc thạo nốt nhạc ngay. Ứng dụng tạo ra giao diện nốt rơi (Falling Notes) trực quan, tương tự như các trò chơi âm nhạc.',
        )}
      </p>
      <Sizer height={8} />
      <CaptionedImage
        src={`${import.meta.env.BASE_URL}images/mode_falling_notes_screenshot.png`}
        caption={t('about.what.caption_falling_notes', 'Giao diện Nốt rơi (Falling Notes) kèm nhãn nốt')}
        height={1628}
        width={1636}
        fetchPriority="high"
      />
      <Sizer height={24} />
      <p>
        {t(
          'about.what.sheet_hero_desc',
          'Dành cho những ai muốn học đọc bản nhạc (Sheet Music), TNClub Sightread cung cấp chế độ Sheet Hero. Chế độ này là cầu nối giữa sự đơn giản của nốt rơi và độ phức tạp của bản nhạc tiêu chuẩn. Các nốt được sắp xếp trên khuông nhạc, nhưng thời lượng được tối giản bằng đuôi nốt trực quan.',
        )}
      </p>
      <Sizer height={8} />
      <CaptionedImage
        src={`${import.meta.env.BASE_URL}images/mode_sheet_hero_screenshot.png`}
        width={1980}
        height={1148}
        caption={t('about.what.caption_sheet_hero', 'Giao diện Sheet Hero (beta) hỗ trợ luyện nốt')}
      />
    </Article>
  )
}
