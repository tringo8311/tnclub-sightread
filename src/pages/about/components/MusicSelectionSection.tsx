import React from 'react'
import { useTranslation } from 'react-i18next'
import { Article } from './Article'

export function MusicSelectionSection() {
  const { t } = useTranslation()

  return (
    <Article
      header={t('about.sections.music_selection', 'Thư viện bài hát')}
      first={t(
        'about.musicSelection.intro',
        'Thư viện nhạc của TNClub Sightread gồm hai phần chính: Bài hát có sẵn và Nhập file MIDI cá nhân.',
      )}
    >
      <p>
        {t(
          'about.musicSelection.builtin',
          'Ứng dụng tích hợp bộ sưu tập các bản nhạc Piano phổ biến và nhạc cổ điển công cộng.',
        )}
      </p>
      <p>
        {t(
          'about.musicSelection.upload',
          'Bạn có thể tải trực tiếp file MIDI (.mid) của riêng mình lên ứng dụng để thực hành, dữ liệu được lưu an toàn ngay trên trình duyệt của bạn.',
        )}
      </p>
    </Article>
  )
}
