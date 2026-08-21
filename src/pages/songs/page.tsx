import { AppBar, MarketingFooter, Modal, Select, SelectItem, Sizer } from '@/components'
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
import { Folder, LayoutGrid, List, ListMusic, Star } from 'lucide-react'
import * as React from 'react'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ManageFoldersForm, Table } from './components'
import CardView from './components/CardView'
import PlaylistManagerModal from './components/PlaylistManagerModal'
import { SearchBox } from './components/Table/SearchBox'
import { TableSkeleton } from './components/Table/Table'
import styles from './page.module.css'

export default function SelectSongPage() {
  const { t } = useTranslation()
  const songs: SongMetadata[] = useSongManifest()
  const isInitialized = useAtomValue(isInitializedAtom)
  const [isPlaylistModalOpen, setIsPlaylistModalOpen] = useState<boolean>(false)
  const [isFolderModalOpen, setIsFolderModalOpen] = useState<boolean>(false)
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
      setIsFolderModalOpen(false)
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
        className="bg-card text-card-foreground w-[min(96vw,720px)] overflow-hidden rounded-2xl p-0"
        modalClassName="max-w-[720px]"
      >
        <PlaylistManagerModal
          onClose={() => setIsPlaylistModalOpen(false)}
          songTitleMap={songTitleMap}
        />
      </Modal>
      <Modal
        show={isFolderModalOpen}
        onClose={() => setIsFolderModalOpen(false)}
        className="bg-card text-card-foreground w-[min(96vw,600px)] overflow-hidden rounded-2xl border-none p-0 shadow-2xl"
        modalClassName="max-w-[600px]"
      >
        <ManageFoldersForm onClose={() => setIsFolderModalOpen(false)} />
      </Modal>
      <div data-ui="songs-page" data-component="SelectSongPage" className={styles.pageContainer}>
        <div className={styles.headerWrapper}>
          <AppBar />
        </div>
        <div className={styles.contentWrapper}>
          <div className={styles.headerSection}>
            <div>
              <h2 className={styles.titleText}>{t('home.learn_song')}</h2>
              <Sizer height={4} />
              <h3 className={styles.subtitleText}>{t('songs.subtitle')}</h3>
            </div>

            <div className={styles.actionButtons}>
              <button
                data-element-id="songs-playlists-btn"
                data-ui="songs-page"
                aria-label="Manage playlists"
                className={styles.actionButton}
                onClick={() => setIsPlaylistModalOpen(true)}
              >
                <ListMusic width={16} height={16} className="text-[var(--color-cyan-neon)]" />
                <span>Danh sách phát</span>
              </button>

              <button
                data-element-id="songs-folders-btn"
                data-ui="songs-page"
                aria-label="Manage music folders"
                className={styles.actionButton}
                onClick={() => setIsFolderModalOpen(true)}
              >
                <Folder width={16} height={16} className="text-[var(--color-cyan-neon)]" />
                <span>Thư mục</span>
              </button>
            </div>
          </div>

          <Sizer height={16} />

          {/* Unified Search & Filter Toolbar */}
          <div className={styles.toolbar}>
            <div className={styles.searchBoxWrapper}>
              <SearchBox
                value={search}
                placeholder={t('songs.search_placeholder')}
                onSearch={setSearch}
                autoFocus={true}
              />
            </div>

            <Select
              aria-label="Filter by level"
              data-element-id="songs-level-filter-select"
              data-ui="songs-page"
              className={styles.selectLevel}
              size="lg"
              selectedKey={levelFilter}
              onSelectionChange={(key) => setLevelFilter(String(key))}
            >
              <SelectItem id="All">Tất cả Trình độ</SelectItem>
              <SelectItem id="Fresher">Fresher</SelectItem>
              <SelectItem id="Beginner">Beginner</SelectItem>
              <SelectItem id="Intermediate">Intermediate</SelectItem>
              <SelectItem id="Advanced">Advanced</SelectItem>
            </Select>

            <Select
              aria-label="Filter by playlist"
              data-element-id="songs-playlist-filter-select"
              data-ui="songs-page"
              className={styles.selectPlaylist}
              size="lg"
              selectedKey={playlistFilter}
              onSelectionChange={(key) => setPlaylistFilter(String(key))}
            >
              <SelectItem id="All">Tất cả Bài hát</SelectItem>
              {playlists.map((pl) => (
                <SelectItem key={pl.id} id={pl.id}>
                  Playlist: {pl.name} ({pl.songIds.length})
                </SelectItem>
              ))}
            </Select>

            <div className={styles.layoutToggleGroup}>
              <button
                data-element-id="songs-toggle-favorites-btn"
                data-ui="songs-page"
                aria-label="Toggle favorites filter"
                onClick={() => setFavoritesOnly(!favoritesOnly)}
                className={clsx(styles.favoriteButton, favoritesOnly && styles.favoriteActive)}
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
              <div className={styles.layoutDivider}></div>
              <button
                data-element-id="songs-table-layout-btn"
                data-ui="songs-page"
                aria-label="Switch to table layout"
                onClick={() => setLayout('table')}
                className={clsx(styles.layoutButton, layout === 'table' && styles.layoutActive)}
                title="Table View"
              >
                <List size={16} />
              </button>
              <button
                data-element-id="songs-card-layout-btn"
                data-ui="songs-page"
                aria-label="Switch to card layout"
                onClick={() => setLayout('card')}
                className={clsx(styles.layoutButton, layout === 'card' && styles.layoutActive)}
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
        <div className={styles.footerWrapper}>
          <MarketingFooter />
        </div>
      </div>
    </>
  )
}
