import { AppBar, MarketingFooter, Modal, Sizer } from '@/components'
import { useSongManifest } from '@/features/data/library'
import { isInitializedAtom, activeProfileIdAtom } from '@/features/persist/persistence'
import { usePersistedState } from '@/features/persist'
import { SongPreviewModal } from '@/features/SongPreview'
import { useEventListener } from '@/hooks'
import { ChevronDown, FolderOpen } from '@/icons'
import { SongMetadata } from '@/types'
import clsx from 'clsx'
import { useAtomValue } from 'jotai'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { Table } from './components'
import ManageFoldersForm from './components/AddFolderForm'
import { SearchBox } from './components/Table/SearchBox'
import { TableSkeleton } from './components/Table/Table'
import { useTranslation } from 'react-i18next'
import { List, LayoutGrid, Star } from 'lucide-react'
import CardView from './components/CardView'

// TODO: after an upload, scroll to the newly uploaded song / make it focused.
export default function SelectSongPage() {
  const { t } = useTranslation()
  let songs: SongMetadata[] = useSongManifest()
  const isInitialized = useAtomValue(isInitializedAtom)
  const [isUploadFormOpen, setUploadForm] = useState<boolean>(false)
  const [selectedSongId, setSelectedSongId] = useState<any>('')
  const selectedSongMeta = songs.find((s) => s.id === selectedSongId)
  const activeProfileId = useAtomValue(activeProfileIdAtom)
  const [search, setSearch] = usePersistedState<string>(`sightread_${activeProfileId}_songs_search`, '')
  const [levelFilter, setLevelFilter] = usePersistedState<string>(`sightread_${activeProfileId}_songs_level_filter`, 'All')
  const [favoritesOnly, setFavoritesOnly] = usePersistedState<boolean>(`sightread_${activeProfileId}_songs_favorites_only`, false)
  const [layout, setLayout] = usePersistedState<'table' | 'card'>(`sightread_${activeProfileId}_songs_layout`, 'table')

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
      <div className="flex h-screen w-full flex-col overflow-hidden bg-background text-foreground">
        {/* Background glow effects */}
        <div className="pointer-events-none absolute left-0 top-0 w-full h-screen overflow-hidden z-0">
          <div className="absolute top-[10%] -left-[5%] w-[40%] h-[40%] rounded-full bg-[var(--color-cyan-neon)] opacity-[0.07] blur-[120px] animate-float-slow" />
          <div className="absolute bottom-[20%] -right-[10%] w-[30%] h-[50%] rounded-full bg-[var(--color-pink-neon)] opacity-[0.05] blur-[150px] animate-float" />
        </div>
        <div className="shrink-0 relative z-10">
          <AppBar />
        </div>
        <div className="mx-auto flex min-h-0 w-full max-w-(--breakpoint-lg) flex-1 flex-col p-6 relative z-10">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">{t('home.learn_song')}</h2>
          <Sizer height={8} />
          <h3 className="text-sm text-foreground/60">
            {t('songs.subtitle')}
          </h3>
          <Sizer height={16} />
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <SearchBox placeholder={t('songs.search_placeholder')} onSearch={setSearch} autoFocus={true} />
            </div>
            
            <select
              className="glass-card cursor-pointer rounded-xl px-3 py-2 text-sm font-medium text-foreground shadow-sm transition-colors hover:border-[var(--color-cyan-neon)]/50 focus:outline-none focus:ring-1 focus:ring-[var(--color-cyan-neon)] [&>option]:bg-background"
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
                'inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-foreground shadow-sm',
                'transition-all hover:border-[var(--color-cyan-neon)]/50 glass-card hover:-translate-y-0.5 neon-glow-cyan active:scale-95',
              )}
              onClick={handleAddNew}
            >
              <FolderOpen width={16} height={16} className="text-[var(--color-cyan-neon)]" />
              {t('songs.folders')}
              <ChevronDown width={16} height={16} className="text-foreground/50" />
            </button>
            
            <div className="hidden sm:flex glass-card !p-1 !rounded-xl gap-1 ml-2 items-center">
              <button 
                onClick={() => setFavoritesOnly(!favoritesOnly)} 
                className={clsx("p-1.5 rounded-lg flex items-center gap-1.5 transition-all duration-300", favoritesOnly ? "bg-[var(--color-pink-neon)]/20 text-[var(--color-pink-neon)] shadow-[0_0_10px_rgba(255,0,187,0.3)]" : "text-foreground/40 hover:text-foreground hover:bg-foreground/10")}
                title="Toggle Favorites"
              >
                <Star size={16} className={favoritesOnly ? "fill-[var(--color-pink-neon)] text-[var(--color-pink-neon)]" : ""} />
                <span className="text-sm font-medium pr-1 hidden lg:inline">Favorites</span>
              </button>
              <div className="w-px h-6 bg-foreground/10 mx-1"></div>
              <button 
                onClick={() => setLayout('table')} 
                className={clsx("p-1.5 rounded-lg transition-all duration-300", layout === 'table' ? "bg-foreground/10 text-[var(--color-cyan-neon)] shadow-[0_0_10px_rgba(0,243,255,0.2)]" : "text-foreground/40 hover:text-foreground hover:bg-foreground/10")}
                title="Table View"
              >
                <List size={16} />
              </button>
              <button 
                onClick={() => setLayout('card')} 
                className={clsx("p-1.5 rounded-lg transition-all duration-300", layout === 'card' ? "bg-foreground/10 text-[var(--color-cyan-neon)] shadow-[0_0_10px_rgba(0,243,255,0.2)]" : "text-foreground/40 hover:text-foreground hover:bg-foreground/10")}
                title="Card View"
              >
                <LayoutGrid size={16} />
              </button>
            </div>
          </div>
          <Sizer height={20} />
          {isInitialized ? (
            layout === 'table' ? (
              <Table rows={songs} search={search} levelFilter={levelFilter} favoritesOnly={favoritesOnly} onSelectRow={setSelectedSongId} />
            ) : (
              <CardView rows={songs} search={search} levelFilter={levelFilter} favoritesOnly={favoritesOnly} onSelectRow={setSelectedSongId} />
            )
          ) : (
            <TableSkeleton />
          )}
        </div>
        <div className="shrink-0 relative z-10 bg-background">
          <MarketingFooter />
        </div>
      </div>
    </>
  )
}
