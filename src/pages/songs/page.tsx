import { AppBar, MarketingFooter, Modal, Sizer } from '@/components'
import { useSongManifest } from '@/features/data/library'
import { usePersistedState } from '@/features/persist'
import {
  activeProfileIdAtom,
  isInitializedAtom,
  playlistsAtom,
} from '@/features/persist/persistence'
import { SongPreviewModal } from '@/features/SongPreview'
import { useEventListener } from '@/hooks'
import { SongMetadata } from '@/types'
import clsx from 'clsx'
import { useAtomValue } from 'jotai'
import { LayoutGrid, List, ListMusic, Star } from 'lucide-react'
import * as React from 'react'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Table } from './components'
import CardView from './components/CardView'
import PlaylistManagerModal from './components/PlaylistManagerModal'
import { SearchBox } from './components/Table/SearchBox'
import { TableSkeleton } from './components/Table/Table'

export default function SelectSongPage() {
  const { t } = useTranslation()
  const songs: SongMetadata[] = useSongManifest()
  const isInitialized = useAtomValue(isInitializedAtom)
  const [isPlaylistModalOpen, setIsPlaylistModalOpen] = useState<boolean>(false)
  const [selectedSongId, setSelectedSongId] = useState<any>('')
  const selectedSongMeta = songs.find((s) => s.id === selectedSongId)
  const activeProfileId = useAtomValue(activeProfileIdAtom)
  const allPlaylistsMap = useAtomValue(playlistsAtom)
  const playlists = allPlaylistsMap[activeProfileId] || []

  const [search, setSearch] = usePersistedState<string>(
    `sightread_${activeProfileId}_songs_search`,
    '',
  )
  const [levelFilter, setLevelFilter] = usePersistedState<string>(
    `sightread_${activeProfileId}_songs_level_filter`,
    'All',
  )
  const [playlistFilter, setPlaylistFilter] = usePersistedState<string>(
    `sightread_${activeProfileId}_songs_playlist_filter`,
    'All',
  )
  const [favoritesOnly, setFavoritesOnly] = usePersistedState<boolean>(
    `sightread_${activeProfileId}_songs_favorites_only`,
    false,
  )
  const [layout, setLayout] = usePersistedState<'table' | 'card'>(
    `sightread_${activeProfileId}_songs_layout`,
    'table',
  )

  useEventListener<KeyboardEvent>('keydown', (event) => {
    if (event.key === 'Escape') {
      setIsPlaylistModalOpen(false)
    }
  })

  const songTitleMap = useMemo(() => {
    const map = new Map<string, string>()
    songs.forEach((s) => map.set(s.id, s.title))
    return map
  }, [songs])

  const filteredByPlaylistSongs = useMemo(() => {
    if (playlistFilter === 'All') return songs
    const target = playlists.find((p) => p.id === playlistFilter)
    if (!target) return songs
    return songs.filter((s) => target.songIds.includes(s.id))
  }, [songs, playlistFilter, playlists])

  return (
    <>
      <title>{t('songs.page_title')}</title>
      <SongPreviewModal
        show={!!selectedSongId}
        songMeta={selectedSongMeta}
        onClose={() => {
          setSelectedSongId(null)
        }}
      />
      <Modal
        show={isPlaylistModalOpen}
        onClose={() => setIsPlaylistModalOpen(false)}
        className="w-[min(96vw,720px)] overflow-hidden rounded-2xl bg-card text-card-foreground p-0"
        modalClassName="max-w-[720px]"
      >
        <PlaylistManagerModal
          onClose={() => setIsPlaylistModalOpen(false)}
          songTitleMap={songTitleMap}
        />
      </Modal>
      <div
        data-ui="songs-page"
        data-component="SelectSongPage"
        className="bg-background text-foreground flex h-screen w-full flex-col overflow-hidden"
      >
        <div className="relative z-10 shrink-0">
          <AppBar />
        </div>
        <div className="relative z-10 mx-auto flex min-h-0 w-full max-w-(--breakpoint-lg) flex-1 flex-col p-6">
          <h2 className="from-foreground to-foreground/60 bg-gradient-to-r bg-clip-text text-3xl font-bold text-transparent">
            {t('home.learn_song')}
          </h2>
          <Sizer height={8} />
          <h3 className="text-foreground/60 text-sm">{t('songs.subtitle')}</h3>
          <Sizer height={16} />
          <div className="flex flex-wrap items-center gap-3">
            <div className="min-w-[200px] flex-1">
              <SearchBox
                value={search}
                placeholder={t('songs.search_placeholder')}
                onSearch={setSearch}
                autoFocus={true}
              />
            </div>

            <select
              aria-label="Filter by level"
              data-element-id="songs-level-filter-select"
              data-ui="songs-page"
              className="glass-card text-foreground [&>option]:bg-background cursor-pointer rounded-xl px-3 py-2 text-sm font-medium shadow-sm transition-colors hover:border-[var(--color-cyan-neon)]/50 focus:ring-1 focus:ring-[var(--color-cyan-neon)] focus:outline-none"
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
            >
              <option value="All">Tất cả Trình độ</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>

            <select
              aria-label="Filter by playlist"
              data-element-id="songs-playlist-filter-select"
              data-ui="songs-page"
              className="glass-card text-foreground [&>option]:bg-background cursor-pointer rounded-xl px-3 py-2 text-sm font-medium shadow-sm transition-colors hover:border-[var(--color-cyan-neon)]/50 focus:ring-1 focus:ring-[var(--color-cyan-neon)] focus:outline-none"
              value={playlistFilter}
              onChange={(e) => setPlaylistFilter(e.target.value)}
            >
              <option value="All">Tất cả Bài hát</option>
              {playlists.map((pl) => (
                <option key={pl.id} value={pl.id}>
                  Playlist: {pl.name} ({pl.songIds.length})
                </option>
              ))}
            </select>

            <button
              data-element-id="songs-playlists-btn"
              data-ui="songs-page"
              aria-label="Manage playlists"
              className={clsx(
                'cursor-pointer flex-nowrap whitespace-nowrap',
                'text-foreground inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium shadow-sm',
                'glass-card neon-glow-cyan transition-all hover:-translate-y-0.5 hover:border-[var(--color-cyan-neon)]/50 active:scale-95',
              )}
              onClick={() => setIsPlaylistModalOpen(true)}
            >
              <ListMusic width={16} height={16} className="text-[var(--color-cyan-neon)]" />
              <span>Danh sách phát</span>
            </button>

            <div className="glass-card ml-auto flex items-center gap-1 !rounded-xl !p-1">
              <button
                data-element-id="songs-toggle-favorites-btn"
                data-ui="songs-page"
                aria-label="Toggle favorites filter"
                onClick={() => setFavoritesOnly(!favoritesOnly)}
                className={clsx(
                  'flex items-center gap-1.5 rounded-lg p-1.5 transition-all duration-300',
                  favoritesOnly
                    ? 'bg-[var(--color-pink-neon)]/20 text-[var(--color-pink-neon)] shadow-[0_0_10px_rgba(255,0,187,0.3)]'
                    : 'text-foreground/40 hover:text-foreground hover:bg-foreground/10',
                )}
                title="Toggle Favorites"
              >
                <Star
                  size={16}
                  className={
                    favoritesOnly
                      ? 'fill-[var(--color-pink-neon)] text-[var(--color-pink-neon)]'
                      : ''
                  }
                />
                <span className="hidden pr-1 text-sm font-medium lg:inline">Yêu thích</span>
              </button>
              <div className="bg-foreground/10 mx-1 h-6 w-px"></div>
              <button
                data-element-id="songs-table-layout-btn"
                data-ui="songs-page"
                aria-label="Switch to table layout"
                onClick={() => setLayout('table')}
                className={clsx(
                  'rounded-lg p-1.5 transition-all duration-300',
                  layout === 'table'
                    ? 'bg-foreground/10 text-[var(--color-cyan-neon)] shadow-[0_0_10px_rgba(0,243,255,0.2)]'
                    : 'text-foreground/40 hover:text-foreground hover:bg-foreground/10',
                )}
                title="Table View"
              >
                <List size={16} />
              </button>
              <button
                data-element-id="songs-card-layout-btn"
                data-ui="songs-page"
                aria-label="Switch to card layout"
                onClick={() => setLayout('card')}
                className={clsx(
                  'rounded-lg p-1.5 transition-all duration-300',
                  layout === 'card'
                    ? 'bg-foreground/10 text-[var(--color-cyan-neon)] shadow-[0_0_10px_rgba(0,243,255,0.2)]'
                    : 'text-foreground/40 hover:text-foreground hover:bg-foreground/10',
                )}
                title="Card View"
              >
                <LayoutGrid size={16} />
              </button>
            </div>
          </div>
          <Sizer height={20} />
          {isInitialized ? (
            layout === 'table' ? (
              <Table
                rows={filteredByPlaylistSongs}
                search={search}
                levelFilter={levelFilter}
                favoritesOnly={favoritesOnly}
                onSelectRow={setSelectedSongId}
              />
            ) : (
              <CardView
                rows={filteredByPlaylistSongs}
                search={search}
                levelFilter={levelFilter}
                favoritesOnly={favoritesOnly}
                onSelectRow={setSelectedSongId}
              />
            )
          ) : (
            <TableSkeleton />
          )}
        </div>
        <div className="bg-background relative z-10 shrink-0">
          <MarketingFooter />
        </div>
      </div>
    </>
  )
}
