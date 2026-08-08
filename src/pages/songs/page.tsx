import { AppBar, MarketingFooter, Modal, Sizer } from '@/components'
import { useSongManifest } from '@/features/data/library'
import { usePersistedState } from '@/features/persist'
import { activeProfileIdAtom, isInitializedAtom } from '@/features/persist/persistence'
import { SongPreviewModal } from '@/features/SongPreview'
import { useEventListener } from '@/hooks'
import { ChevronDown, FolderOpen } from '@/icons'
import { SongMetadata } from '@/types'
import clsx from 'clsx'
import { useAtomValue } from 'jotai'
import { LayoutGrid, List, Star } from 'lucide-react'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Table } from './components'
import ManageFoldersForm from './components/AddFolderForm'
import CardView from './components/CardView'
import { SearchBox } from './components/Table/SearchBox'
import { TableSkeleton } from './components/Table/Table'

// TODO: after an upload, scroll to the newly uploaded song / make it focused.
export default function SelectSongPage() {
  const { t } = useTranslation()
  let songs: SongMetadata[] = useSongManifest()
  const isInitialized = useAtomValue(isInitializedAtom)
  const [isUploadFormOpen, setUploadForm] = useState<boolean>(false)
  const [selectedSongId, setSelectedSongId] = useState<any>('')
  const selectedSongMeta = songs.find((s) => s.id === selectedSongId)
  const activeProfileId = useAtomValue(activeProfileIdAtom)
  const [search, setSearch] = usePersistedState<string>(
    `sightread_${activeProfileId}_songs_search`,
    '',
  )
  const [levelFilter, setLevelFilter] = usePersistedState<string>(
    `sightread_${activeProfileId}_songs_level_filter`,
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
      setUploadForm(false)
    }
  })

  const handleAddNew = (e: any) => {
    setUploadForm(true)
    e.stopPropagation()
  }

  const handleCloseAddNew = () => {
    setUploadForm(false)
  }

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
      <Modal show={isUploadFormOpen} onClose={handleCloseAddNew} className="w-[min(100vw,500px)]">
        <ManageFoldersForm onClose={handleCloseAddNew} />
      </Modal>
      <div className="bg-background text-foreground flex h-screen w-full flex-col overflow-hidden">
        {/* Background glow effects */}
        <div className="pointer-events-none absolute top-0 left-0 z-0 h-screen w-full overflow-hidden">
          <div className="animate-float-slow absolute top-[10%] -left-[5%] h-[40%] w-[40%] rounded-full bg-[var(--color-cyan-neon)] opacity-[0.07] blur-[120px]" />
          <div className="animate-float absolute -right-[10%] bottom-[20%] h-[50%] w-[30%] rounded-full bg-[var(--color-pink-neon)] opacity-[0.05] blur-[150px]" />
        </div>
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
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <SearchBox
                value={search}
                placeholder={t('songs.search_placeholder')}
                onSearch={setSearch}
                autoFocus={true}
              />
            </div>

            <select
              className="glass-card text-foreground [&>option]:bg-background cursor-pointer rounded-xl px-3 py-2 text-sm font-medium shadow-sm transition-colors hover:border-[var(--color-cyan-neon)]/50 focus:ring-1 focus:ring-[var(--color-cyan-neon)] focus:outline-none"
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
            >
              <option value="All">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>

            <button
              className={clsx(
                'cursor-pointer flex-nowrap whitespace-nowrap',
                'text-foreground inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium shadow-sm',
                'glass-card neon-glow-cyan transition-all hover:-translate-y-0.5 hover:border-[var(--color-cyan-neon)]/50 active:scale-95',
              )}
              onClick={handleAddNew}
            >
              <FolderOpen width={16} height={16} className="text-[var(--color-cyan-neon)]" />
              {t('songs.folders')}
              <ChevronDown width={16} height={16} className="text-foreground/50" />
            </button>

            <div className="glass-card ml-2 hidden items-center gap-1 !rounded-xl !p-1 sm:flex">
              <button
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
                <span className="hidden pr-1 text-sm font-medium lg:inline">Favorites</span>
              </button>
              <div className="bg-foreground/10 mx-1 h-6 w-px"></div>
              <button
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
                rows={songs}
                search={search}
                levelFilter={levelFilter}
                favoritesOnly={favoritesOnly}
                onSelectRow={setSelectedSongId}
              />
            ) : (
              <CardView
                rows={songs}
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
