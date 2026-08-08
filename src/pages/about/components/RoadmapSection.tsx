import React from 'react'
import { useTranslation } from 'react-i18next'
import { Article } from './Article'

export function RoadmapSection() {
  const { t } = useTranslation()

  return (
    <Article header={t('about.sections.roadmap', 'Lộ trình phát triển')}>
      <p>{t('about.roadmap.intro', 'Các tính năng và cải tiến đang được phát triển trong tương lai:')}</p>
      <ul className="list-disc space-y-1.5 px-6 pt-2 text-sm leading-relaxed">
        <li>
          {t('about.roadmap.items.mobile', 'Ứng dụng di động tối ưu cho máy tính bảng và điện thoại.')}
        </li>
        <li>
          {t(
            'about.roadmap.items.musicxml',
            'Hỗ trợ định dạng MusicXML và hiển thị bản nhạc đầy đủ.',
          )}
        </li>
        <li>
          {t(
            'about.roadmap.items.scoring',
            'Theo dõi tiến trình học và chấm điểm bài luyện tập.',
          )}
        </li>
        <li>
          {t(
            'about.roadmap.items.freeplay_record',
            'Ghi âm phần biểu diễn ở chế độ Chơi tự do và chia sẻ liên kết.',
          )}
        </li>
        <li>
          {t(
            'about.roadmap.items.training_games',
            'Các bài tập nhỏ và trò chơi luyện phản xạ nhận biết nốt.',
          )}
        </li>
      </ul>
    </Article>
  )
}
