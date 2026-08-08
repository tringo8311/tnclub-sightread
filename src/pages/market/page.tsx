import { AppBar, MarketingFooter, Sizer } from '@/components'
import {
  CURATED_MARKET_SONGS,
  downloadMidiFileToDisk,
  MarketMidiItem,
  saveMarketSongToIndexedDB,
} from '@/features/market/marketStorage'
import { parseMidi } from '@/features/parsers'
import { SongPreviewModal } from '@/features/SongPreview'
import { SongMetadata } from '@/types'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MarketCatalogControls } from './components/MarketCatalogControls'
import { MarketHero } from './components/MarketHero'
import { SongsGrid } from './components/SongsGrid'

export default function MidiMarketPage() {
  const { t } = useTranslation()

  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('All')

  // Direct URL Lookup states
  const [urlInput, setUrlInput] = useState('')
  const [urlLoading, setUrlLoading] = useState(false)
  const [urlError, setUrlError] = useState<string | null>(null)

  const [previewSongMeta, setPreviewSongMeta] = useState<SongMetadata | undefined>(undefined)
  const [savedIds, setSavedIds] = useState<Record<string, boolean>>({})

  // Filter curated collection
  const filteredSongs = CURATED_MARKET_SONGS.filter((song) => {
    const query = search.trim().toLowerCase()
    const matchSearch =
      !query ||
      song.title.toLowerCase().includes(query) ||
      song.author.toLowerCase().includes(query) ||
      (song.tags && song.tags.some((t) => t.toLowerCase().includes(query)))
    const matchCat = categoryFilter === 'All' || song.category === categoryFilter
    return matchSearch && matchCat
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

  // Handle adding song to App IndexedDB library
  const handleSaveToApp = async (item: MarketMidiItem) => {
    try {
      const res = await fetch(item.midiUrl)
      const buffer = await res.arrayBuffer()
      const songMeta: SongMetadata = {
        id: item.id,
        title: item.title,
        source: 'downloaded',
        author: item.author,
        category: item.category,
        level: item.level,
        duration: item.duration,
        difficulty: 0,
        file: item.id,
      }
      await saveMarketSongToIndexedDB(songMeta, buffer)
      setSavedIds((prev) => ({ ...prev, [item.id]: true }))
    } catch (e) {
      console.error(e)
    }
  }

  // Handle downloading .mid file to device disk
  const handleDownloadFile = async (item: MarketMidiItem) => {
    try {
      const res = await fetch(item.midiUrl)
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

      await saveMarketSongToIndexedDB(uploadedMeta, buffer)
      setSavedIds((prev) => ({ ...prev, [fileId]: true }))
      setPreviewSongMeta(uploadedMeta)
    } catch (e) {
      console.error('Lỗi đọc file MIDI:', e)
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
            'Không thể tải file từ URL này. Hãy kiểm tra lại liên kết.',
          ),
        )
      }
      const buffer = await res.arrayBuffer()
      const parsed = parseMidi(new Uint8Array(buffer))

      const urlSongMeta: SongMetadata = {
        id: urlInput.trim(),
        title: urlInput.split('/').pop()?.replace(/\.(mid|midi)$/i, '') || 'Custom MIDI File',
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
        err.message || t('market.directUrl.defaultError', 'Lỗi khi tải file MIDI từ đường dẫn.'),
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
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
          />

          <SongsGrid
            songs={filteredSongs}
            savedIds={savedIds}
            searchQuery={search}
            onPreview={handlePreview}
            onDownload={handleDownloadFile}
            onSave={handleSaveToApp}
          />
        </div>

        <Sizer height={40} />
        <MarketingFooter />
      </div>
    </>
  )
}
