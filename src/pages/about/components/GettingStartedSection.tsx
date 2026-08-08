import React from 'react'
import { useTranslation } from 'react-i18next'
import { Article } from './Article'

export function GettingStartedSection() {
  const { t } = useTranslation()

  return (
    <Article
      header={t('about.sections.getting_started', 'Hướng dẫn bắt đầu')}
      first={t('about.gettingStarted.subtitle', 'Kết nối đàn. Bắt đầu chậm rãi. Nâng dần tốc độ.')}
    >
      <p>
        {t(
          'about.gettingStarted.separate_hands',
          'Khi mới bắt đầu học một bài hát, chúng tôi khuyên bạn nên luyện tập riêng từng tay (tay trái và tay phải). Bạn nên tận dụng bộ điều chỉnh BPM để giảm tốc độ bài hát xuống ít nhất 50%. Việc đánh đúng nốt với tư thế chuẩn ở tốc độ chậm hiệu quả hơn nhiều so với việc vội vã đánh nhanh.',
        )}
      </p>
      <p>
        {t(
          'about.gettingStarted.wait_mode',
          'Nếu bạn kết nối đàn Piano điện / MIDI Keyboard via USB, bạn có thể bật chế độ Chờ (Wait mode) – bản nhạc sẽ tạm dừng cho đến khi bạn nhấn đúng phím đàn tương ứng.',
        )}
      </p>
      <p>
        {t(
          'about.gettingStarted.education',
          'TNClub Sightread đạt hiệu quả tốt nhất khi kết hợp với sự hướng dẫn của giáo viên Piano hoặc lộ trình học nhạc lý bài bản.',
        )}
      </p>
    </Article>
  )
}
