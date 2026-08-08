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
import clsx from 'clsx'
import { Check, Download, ExternalLink, Music, Play, Search, Sparkles, Store } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'

export default function MidiMarketPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('All')
  const [previewSongMeta, setPreviewSongMeta] = useState<SongMetadata | undefined>(undefined)
  const [urlInput, setUrlInput] = useState('')
  const [urlLoading, setUrlLoading] = useState(false)
  const [urlError, setUrlError] = useState<string | null>(null)

  // Track saved state for visual feedback
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

  // Handle fetching & previewing custom MIDI URL
  const handleLookupUrl = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!urlInput.trim()) return

    setUrlLoading(true)
    setUrlError(null)

    try {
      const res = await fetch(urlInput.trim())
      if (!res.ok) throw new Error('Không thể tải file từ URL này. Hãy kiểm tra lại liên kết.')
      const buffer = await res.arrayBuffer()
      const parsed = parseMidi(new Uint8Array(buffer))

      const urlSongMeta: SongMetadata = {
        id: urlInput.trim(),
        title: urlInput.split('/').pop()?.replace('.mid', '') || 'Custom MIDI File',
        source: 'market',
        author: 'Online Import',
        category: 'Custom',
        level: 'Intermediate',
        duration: Math.round(parsed.duration),
        difficulty: 0,
        file: urlInput.trim(),
      }

      setPreviewSongMeta(urlSongMeta)
    } catch (err: any) {
      setUrlError(err.message || 'Lỗi khi tải file MIDI từ đường dẫn.')
    } finally {
      setUrlLoading(false)
    }
  }

  return (
    <>
      <title>MIDI Market & File Lookup | TNClub Sightread</title>

      {/* Song Preview Modal */}
      <SongPreviewModal
        show={!!previewSongMeta}
        songMeta={previewSongMeta}
        onClose={() => setPreviewSongMeta(undefined)}
      />

      <div className="bg-background text-foreground flex min-h-screen flex-col">
        <AppBar />

        {/* Hero Section */}
        <div className="border-border bg-card/40 relative overflow-hidden border-b px-6 py-12 backdrop-blur-md">
          <div className="mx-auto max-w-5xl space-y-4 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-cyan-neon)]/30 bg-[var(--color-cyan-neon)]/10 px-4 py-1.5 text-xs font-semibold text-[var(--color-cyan-neon)] shadow-sm">
              <Sparkles className="h-4 w-4" />
              <span>MIDI Music Hub & File Lookup</span>
            </div>

            <h1 className="from-foreground via-foreground to-foreground/70 bg-gradient-to-r bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl">
              Khám phá & Nhập File MIDI Thực Hành Piano
            </h1>

            <p className="text-muted-foreground mx-auto max-w-2xl text-sm leading-relaxed sm:text-base">
              Tìm kiếm bản nhạc MIDI Piano chất lượng cao từ thư viện mở hoặc dán đường dẫn file
              MIDI công khai bất kỳ để thực hành đọc nốt ngay lập tức.
            </p>

            {/* Direct URL Lookup Form */}
            <div className="mx-auto mt-6 max-w-2xl">
              <form onSubmit={handleLookupUrl} className="relative flex items-center">
                <input
                  type="url"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="Dán đường dẫn (.mid / .midi) công khai từ Internet..."
                  className="border-border bg-background/80 text-foreground placeholder:text-muted-foreground w-full rounded-2xl border py-3.5 pr-32 pl-4 text-sm shadow-inner focus:ring-2 focus:ring-[var(--color-cyan-neon)] focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={urlLoading}
                  className="absolute right-2 rounded-xl bg-violet-600 px-4 py-2 text-xs font-semibold text-white shadow-md transition hover:bg-violet-500 active:scale-95 disabled:opacity-50"
                >
                  {urlLoading ? 'Đang tải...' : 'Tra cứu & Xem'}
                </button>
              </form>
              {urlError && <p className="mt-2 pl-2 text-left text-xs text-red-400">{urlError}</p>}
            </div>
          </div>
        </div>

        {/* Content Container */}
        <div className="mx-auto w-full max-w-6xl flex-1 px-6 py-8">
          {/* Controls Bar */}
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative max-w-md flex-1">
              <Search className="text-muted-foreground absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Tìm kiếm tác phẩm, tác giả hoặc thẻ..."
                className="border-border bg-card text-foreground placeholder:text-muted-foreground w-full rounded-xl border px-4 py-2 pl-10 text-sm focus:ring-1 focus:ring-[var(--color-cyan-neon)] focus:outline-none"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap items-center gap-2">
              {['All', 'Classical', 'Game OST', 'Jazz'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={clsx(
                    'rounded-xl px-3.5 py-1.5 text-xs font-medium transition-all',
                    categoryFilter === cat
                      ? 'bg-violet-600 text-white shadow-md'
                      : 'glass-card text-foreground/70 hover:text-foreground hover:bg-foreground/10',
                  )}
                >
                  {cat === 'All' ? 'Tất cả Thể loại' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Songs Grid */}
          {filteredSongs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Music className="text-muted-foreground/30 mb-3 h-12 w-12" />
              <h3 className="text-lg font-semibold">Không tìm thấy bài hát MIDI nào</h3>
              <p className="text-muted-foreground text-xs">
                Thử tìm kiếm với từ khóa khác hoặc lọc thể loại.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredSongs.map((item) => {
                const isSaved = savedIds[item.id]
                return (
                  <div
                    key={item.id}
                    className="glass-card group relative flex flex-col justify-between rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <span className="inline-block rounded-lg border border-violet-500/20 bg-violet-500/10 px-2.5 py-1 text-[11px] font-semibold text-violet-300">
                          {item.category}
                        </span>
                        <span className="text-muted-foreground text-xs font-medium">
                          {item.level}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-foreground line-clamp-1 text-lg font-bold transition-colors group-hover:text-violet-400">
                          {item.title}
                        </h3>
                        <p className="text-muted-foreground mt-0.5 line-clamp-1 text-xs font-medium">
                          {item.author}
                        </p>
                      </div>

                      {item.description && (
                        <p className="text-foreground/70 line-clamp-2 text-xs leading-relaxed">
                          {item.description}
                        </p>
                      )}

                      {item.tags && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-muted-foreground/70 bg-foreground/5 rounded-md px-2 py-0.5 text-[10px]"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Actions Bar */}
                    <div className="border-border mt-6 flex items-center justify-between gap-2 border-t pt-4">
                      <button
                        onClick={() => handlePreview(item)}
                        className="bg-foreground/5 text-foreground hover:bg-foreground/15 flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold transition-all"
                      >
                        <Play className="h-3.5 w-3.5 text-violet-400" />
                        <span>Xem thử</span>
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleDownloadFile(item)}
                          title="Tải file .mid về máy"
                          className="bg-foreground/5 text-muted-foreground hover:text-foreground hover:bg-foreground/15 flex h-8 w-8 items-center justify-center rounded-xl transition-all"
                        >
                          <Download className="h-4 w-4" />
                        </button>

                        <button
                          onClick={() => handleSaveToApp(item)}
                          className={clsx(
                            'flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold shadow-md transition-all',
                            isSaved
                              ? 'bg-emerald-600 text-white'
                              : 'bg-violet-600 text-white hover:bg-violet-500 active:scale-95',
                          )}
                        >
                          {isSaved ? (
                            <>
                              <Check className="h-3.5 w-3.5" />
                              <span>Đã lưu</span>
                            </>
                          ) : (
                            <>
                              <Store className="h-3.5 w-3.5" />
                              <span>Thêm vào App</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        <Sizer height={40} />
        <MarketingFooter />
      </div>
    </>
  )
}
