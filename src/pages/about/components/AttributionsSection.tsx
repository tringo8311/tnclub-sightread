import manifest from '@/manifest.json'
import { SongMetadata } from '@/types'
import React, { PropsWithChildren } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, LinkProps } from 'react-router'
import { Article } from './Article'

function MutedLink({ children, ...props }: PropsWithChildren<LinkProps>) {
  return (
    <Link
      {...props}
      className="text-foreground/80 hover:text-foreground cursor-pointer underline-offset-4 transition-colors hover:underline"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </Link>
  )
}

export function AttributionsSection() {
  const { t } = useTranslation()
  const sortedSongs = (manifest as SongMetadata[])
    .slice()
    .sort((a, b) => a.title.localeCompare(b.title))

  return (
    <Article header={t('about.sections.attributions', 'Ghi nhận tác quyền')}>
      <p>
        {t(
          'about.attributions.intro',
          'Một số bản nhạc và bản phối trong ứng dụng được tham khảo từ cộng đồng mở.',
        )}
      </p>
      <p>
        {t(
          'about.attributions.thanks',
          'Chúng tôi trân trọng đóng góp của các tác giả và cộng đồng âm nhạc.',
        )}
      </p>
      <ul className="list-disc pt-2 pl-6 text-sm">
        {sortedSongs.map((song) => (
          <li key={song.id} className="mb-2">
            <div className="font-semibold">{song.title}:</div>
            <div className="ml-2 flex flex-wrap gap-2">
              {song.url && <MutedLink to={song.url}>[source]</MutedLink>}
              {song.license && <MutedLink to={song.license}>[license]</MutedLink>}
            </div>
          </li>
        ))}
      </ul>
    </Article>
  )
}
