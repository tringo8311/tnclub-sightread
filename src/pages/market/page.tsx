import { AppBar, MarketingFooter, Sizer } from '@/components'
import {
  CURATED_MARKET_SONGS,
  downloadMidiFileToDisk,
  MarketMidiItem,
} from '@/features/market/marketStorage'
import { createMidiWorker, searchTracks } from '@/features/market/midiSqlWorker'
import { getMidiUrl } from '@/features/market/midiUtils'
import { parseMidi } from '@/features/parsers'
import { usePersistedState } from '@/features/persist'
import { activeProfileIdAtom, favoritesAtom } from '@/features/persist/persistence'
import { SongPreviewModal } from '@/features/SongPreview'
import { SongMetadata } from '@/types'
import { useAtom, useAtomValue } from 'jotai'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { createSearchParams, useNavigate } from 'react-router'
import type { WorkerHttpvfs } from 'sql.js-httpvfs'
import { MarketCatalogControls, SourceFilterType } from './components/MarketCatalogControls'
import { MarketHero } from './components/MarketHero'
import { SongsGrid } from './components/SongsGrid'

export default function MidiMarketPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const activeProfileId = useAtomValue(activeProfileIdAtom)
  const [favorites, setFavorites] = useAtom(favoritesAtom)

  const [search, setSearch] = usePersistedState<string>(
    `sightread_${activeProfileId}_market_search`,
    '',
  )
  const [sourceFilter, setSourceFilter] = usePersistedState<SourceFilterType>(
    `sightread_${activeProfileId}_market_source_filter`,
    'Local',
  )
  const [favoritesOnly, setFavoritesOnly] = usePersistedState<boolean>(
    `sightread_${activeProfileId}_market_favorites_only`,
    false,
  )
  const [sqliteSongs, setSqliteSongs] = useState<MarketMidiItem[]>([])
  const workerRef = useRef<WorkerHttpvfs | null>(null)

  // Direct URL Lookup states
  const [urlInput, setUrlInput] = useState('')
  const [urlLoading, setUrlLoading] = useState(false)
  const [urlError, setUrlError] = useState<string | null>(null)

  const [previewSongMeta, setPreviewSongMeta] = useState<SongMetadata | undefined>(undefined)
  const [savedIds, setSavedIds] = useState<Record<string, boolean>>({})

  // Initialize SQLite Web Worker on mount
  useEffect(() => {
    let isMounted = true

    async function initWorker() {
      try {
        const worker = await createMidiWorker()
        if (!isMounted || !worker) return
        workerRef.current = worker

        // Fetch tracks with persisted search keyword
        const initialTracks = await searchTracks(worker, search, 60)
        if (!isMounted) return

        const formatted = initialTracks.map((tr) => ({
          id: `sqlite-${tr.id}`,
          title: tr.title,
          author: tr.artist,
          category: 'Pop' as const,
          level: 'Intermediate' as const,
          duration: 180,
          provider: 'TN Web MIDI Studio',
          midiUrl: getMidiUrl(tr.file_path),
          description: `${tr.artist} - ${tr.title} (Kho SQLite 17,256 bài).`,
          tags: ['TN Studio', 'SQLite', tr.artist],
        }))
        setSqliteSongs(formatted)
      } catch (err) {
        console.warn('SQLite worker initialization fallback:', err)
      }
    }

    initWorker()

    return () => {
      isMounted = false
    }
  }, [])

  // Query SQLite Web Worker on search change
  useEffect(() => {
    let isCancelled = false
    const worker = workerRef.current
    if (!worker) return

    const timer = setTimeout(async () => {
      try {
        const tracks = await searchTracks(worker, search, 60)
        if (isCancelled) return

        const formatted = tracks.map((tr) => ({
          id: `sqlite-${tr.id}`,
          title: tr.title,
          author: tr.artist,
          category: 'Pop' as const,
          level: 'Intermediate' as const,
          duration: 180,
          provider: 'TN Web MIDI Studio',
          midiUrl: getMidiUrl(tr.file_path),
          description: `${tr.artist} - ${tr.title} (Kho SQLite 17,256 bài).`,
          tags: ['TN Studio', 'SQLite', tr.artist],
        }))
        setSqliteSongs(formatted)
      } catch (e) {
        console.error('Error querying SQLite worker:', e)
      }
    }, 150)

    return () => {
      isCancelled = true
      clearTimeout(timer)
    }
  }, [search])

  // Active songs based on selected source filter
  const activeSongs: MarketMidiItem[] =
    sourceFilter === 'Local'
      ? CURATED_MARKET_SONGS.map((song) => ({
          ...song,
          provider: song.provider || 'App Library',
        }))
      : sqliteSongs

  // Filter collection based on search term and favorites toggle
  const filteredSongs = activeSongs.filter((song) => {
    const favKey = `${activeProfileId}_${song.id}`
    const isFavorite = !!favorites[favKey]
    if (favoritesOnly && !isFavorite) return false

    const query = search.trim().toLowerCase()
    return (
      !query ||
      song.title.toLowerCase().includes(query) ||
      song.author.toLowerCase().includes(query) ||
      (song.description && song.description.toLowerCase().includes(query)) ||
      (song.tags && song.tags.some((t) => t.toLowerCase().includes(query)))
    )
  })

  // Handle previewing a market song
  const handlePreview = (item: MarketMidiItem) => {
    setPreviewSongMeta({
      id: item.midiUrl,
      title: item.title,
      source: 'market',
      author: item.author,
      category: item.category,
      level: item.level,
      duration: item.duration,
      difficulty: 0,
      file: item.midiUrl,
    })
  }

  const getMidiFetchUrl = (url: string) => {
    if (url.startsWith('http')) return url
    const baseUrl = import.meta.env.BASE_URL.endsWith('/')
      ? import.meta.env.BASE_URL
      : `${import.meta.env.BASE_URL}/`
    const cleanPath = url.startsWith('/') ? url.slice(1) : url
    return `${baseUrl}${cleanPath}`
  }

  // Handle direct Play Now navigation
  const handlePlayNow = (item: MarketMidiItem) => {
    const playSongSearch = createSearchParams({
      id: item.midiUrl,
      source: 'market',
    }).toString()
    navigate({ pathname: '/play', search: `?${playSongSearch}` })
  }

  // Handle toggling favorite status
  const handleToggleFavorite = (item: MarketMidiItem) => {
    const favKey = `${activeProfileId}_${item.id}`
    setFavorites((prev) => ({ ...prev, [favKey]: !prev[favKey] }))
  }

  // Handle downloading .mid file to device disk
  const handleDownloadFile = async (item: MarketMidiItem) => {
    try {
      const res = await fetch(getMidiFetchUrl(item.midiUrl))
      const buffer = await res.arrayBuffer()
      downloadMidiFileToDisk(`${item.title}.mid`, buffer)
    } catch (e) {
      console.error(e)
    }
  }

  // Handle local file upload (Drag & Drop or File Picker)
  const handleFileUpload = async (file: File) => {
    try {
      const buffer = await file.arrayBuffer()
      const parsed = parseMidi(new Uint8Array(buffer))
      const cleanTitle = file.name.replace(/\.(mid|midi)$/i, '')
      const fileId = `uploaded-${Date.now()}-${file.name}`

      const uploadedMeta: SongMetadata = {
        id: fileId,
        title: cleanTitle,
        source: 'downloaded',
        author: 'Local Upload',
        category: 'Custom',
        level: 'Intermediate',
        duration: Math.round(parsed.duration || 120),
        difficulty: 0,
        file: fileId,
      }

      setPreviewSongMeta(uploadedMeta)
    } catch (e) {
      console.error('Error reading MIDI file:', e)
    }
  }

  // Handle fetching & previewing custom MIDI URL
  const handleLookupUrl = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!urlInput.trim()) return

    setUrlLoading(true)
    setUrlError(null)

    try {
      const res = await fetch(urlInput.trim())
      if (!res.ok) {
        throw new Error(
          t(
            'market.directUrl.fetchError',
            'Could not fetch file from this URL. Please verify the link.',
          ),
        )
      }
      const buffer = await res.arrayBuffer()
      const parsed = parseMidi(new Uint8Array(buffer))

      const urlSongMeta: SongMetadata = {
        id: urlInput.trim(),
        title:
          urlInput
            .split('/')
            .pop()
            ?.replace(/\.(mid|midi)$/i, '') || 'Custom MIDI File',
        source: 'market',
        author: 'Online Import',
        category: 'Custom',
        level: 'Intermediate',
        duration: Math.round(parsed.duration || 120),
        difficulty: 0,
        file: urlInput.trim(),
      }

      setPreviewSongMeta(urlSongMeta)
    } catch (err: any) {
      setUrlError(
        err.message ||
          t('market.directUrl.defaultError', 'Error fetching MIDI file from specified URL.'),
      )
    } finally {
      setUrlLoading(false)
    }
  }

  return (
    <>
      <title>MIDI Market & Import | TNClub Sightread</title>

      {/* Song Preview Modal */}
      <SongPreviewModal
        show={!!previewSongMeta}
        songMeta={previewSongMeta}
        onClose={() => setPreviewSongMeta(undefined)}
      />

      <div className="bg-background text-foreground flex min-h-screen flex-col">
        <AppBar />

        {/* Modular Hero Section */}
        <MarketHero
          urlInput={urlInput}
          setUrlInput={setUrlInput}
          urlLoading={urlLoading}
          urlError={urlError}
          onLookupUrl={handleLookupUrl}
          onFileUpload={handleFileUpload}
        />

        {/* Modular Content Section */}
        <div className="mx-auto w-full max-w-6xl flex-1 px-6 py-8" data-ui="market-catalog-section">
          <MarketCatalogControls
            search={search}
            setSearch={setSearch}
            sourceFilter={sourceFilter}
            setSourceFilter={setSourceFilter}
            favoritesOnly={favoritesOnly}
            setFavoritesOnly={setFavoritesOnly}
          />

          <SongsGrid
            songs={filteredSongs}
            favorites={favorites}
            activeProfileId={activeProfileId}
            searchQuery={search}
            onToggleFavorite={handleToggleFavorite}
            onPreview={handlePreview}
            onDownload={handleDownloadFile}
            onPlayNow={handlePlayNow}
          />
        </div>

        <Sizer height={40} />
        <MarketingFooter />
      </div>
    </>
  )
}
