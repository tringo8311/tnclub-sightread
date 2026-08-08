import { Sizer } from '@/components'
import React, { PropsWithChildren } from 'react'
import { useTranslation } from 'react-i18next'
import { slugify } from '../utils'

function SidebarLink({ children }: PropsWithChildren<{ children: string }>) {
  return (
    <a
      className="hover:text-primary text-foreground/80 hover:text-foreground text-sm font-medium transition-colors"
      href={`#${slugify(children)}`}
    >
      {children}
    </a>
  )
}

export function AboutSidebar() {
  const { t } = useTranslation()

  const sections = [
    t('about.sections.what', 'TNClub Sightread là gì?'),
    t('about.sections.getting_started', 'Hướng dẫn bắt đầu'),
    t('about.sections.music_selection', 'Thư viện bài hát'),
    t('about.sections.browser_compatibility', 'Tương thích trình duyệt'),
    t('about.sections.roadmap', 'Lộ trình phát triển'),
    t('about.sections.feedback', 'Phản hồi & Đóng góp'),
    t('about.sections.product_recommendations', 'Gợi ý thiết bị'),
    t('about.sections.attributions', 'Ghi nhận tác quyền'),
  ]

  return (
    <div className="sticky top-0 hidden max-h-screen p-8 md:block">
      <section className="mx-auto flex flex-col">
        <h2 className="text-2xl font-bold tracking-tight">{t('about.title', 'Giới thiệu')}</h2>
        <Sizer height={24} />
        <ul className="flex flex-col gap-4 whitespace-nowrap">
          {sections.map((title) => (
            <li key={title}>
              <SidebarLink>{title}</SidebarLink>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
