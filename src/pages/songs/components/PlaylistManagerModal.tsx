import { Button, TextInput } from '@/components'
import {
  activeProfileIdAtom,
  createPlaylist,
  deletePlaylist,
  playlistsAtom,
  removeSongFromPlaylist,
} from '@/features/persist/persistence'
import { useAtomValue } from 'jotai'
import { ListMusic, Music, Plus, Trash2, X } from 'lucide-react'
import { useState } from 'react'

type PlaylistManagerModalProps = {
  onClose: () => void
  songTitleMap?: Map<string, string>
}

export default function PlaylistManagerModal({
  onClose,
  songTitleMap = new Map(),
}: PlaylistManagerModalProps) {
  const activeProfileId = useAtomValue(activeProfileIdAtom)
  const allPlaylistsMap = useAtomValue(playlistsAtom)
  const playlists = allPlaylistsMap[activeProfileId] || []

  const [isCreating, setIsCreating] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newDesc, setNewDesc] = useState('')
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string | null>(
    playlists[0]?.id || null,
  )

  const selectedPlaylist = playlists.find((p) => p.id === selectedPlaylistId)

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTitle.trim()) return
    const created = createPlaylist(newTitle.trim(), newDesc.trim() || undefined)
    setNewTitle('')
    setNewDesc('')
    setIsCreating(false)
    setSelectedPlaylistId(created.id)
  }

  const handleDelete = (id: string) => {
    deletePlaylist(id)
    if (selectedPlaylistId === id) {
      const remaining = playlists.filter((p) => p.id !== id)
      setSelectedPlaylistId(remaining[0]?.id || null)
    }
  }

  return (
    <div
      data-ui="playlist-modal"
      data-component="PlaylistManagerModal"
      className="p-6"
    >
      <div className="border-border mb-6 flex items-center justify-between border-b pb-4 pr-8">
        <div className="flex items-center gap-3">
          <div className="rounded-xl border border-violet-500/30 bg-violet-500/10 p-2 text-violet-400">
            <ListMusic className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-foreground text-xl font-bold">Quản Lý Danh Sách Phát</h2>
            <p className="text-muted-foreground text-xs">Tạo và phân loại bài hát theo playlist</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
        {/* Playlist List Column */}
        <div className="space-y-3 md:col-span-5">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-xs font-semibold uppercase">
              Danh sách ({playlists.length})
            </span>
            <Button
              variant="outline"
              size="sm"
              elementId="playlist-modal-create-btn"
              data-ui="playlist-modal"
              aria-label="Create playlist"
              onClick={() => setIsCreating(true)}
              className="border-violet-500/30 text-xs text-violet-400 hover:bg-violet-500/10"
            >
              <Plus className="mr-1 h-3.5 w-3.5" />
              Tạo mới
            </Button>
          </div>

          {isCreating && (
            <form
              onSubmit={handleCreate}
              data-ui="playlist-modal-create-form"
              className="border-border bg-foreground/5 space-y-3 rounded-xl border p-3"
            >
              <TextInput
                placeholder="Tên danh sách phát..."
                value={newTitle}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewTitle(e.target.value)}
                elementId="playlist-new-title-input"
                data-ui="playlist-modal"
                autoFocus
                className="w-full text-xs"
              />
              <TextInput
                placeholder="Mô tả ngắn (tùy chọn)..."
                value={newDesc}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewDesc(e.target.value)}
                elementId="playlist-new-desc-input"
                data-ui="playlist-modal"
                className="w-full text-xs"
              />
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  elementId="playlist-cancel-create-btn"
                  data-ui="playlist-modal"
                  onClick={() => setIsCreating(false)}
                  className="text-xs"
                >
                  Hủy
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  elementId="playlist-confirm-create-btn"
                  data-ui="playlist-modal"
                  className="text-xs"
                >
                  Tạo Playlist
                </Button>
              </div>
            </form>
          )}

          <div className="max-h-[300px] space-y-1.5 overflow-y-auto pr-1">
            {playlists.length === 0 ? (
              <div className="border-border/60 text-muted-foreground rounded-xl border border-dashed py-8 text-center text-xs">
                Chưa có danh sách phát nào
              </div>
            ) : (
              playlists.map((pl) => {
                const isActive = pl.id === selectedPlaylistId
                return (
                  <div
                    key={pl.id}
                    data-element-id={`playlist-item-${pl.id}`}
                    data-ui="playlist-modal"
                    onClick={() => setSelectedPlaylistId(pl.id)}
                    className={`group flex cursor-pointer items-center justify-between rounded-xl p-3 text-xs font-medium transition-all ${
                      isActive
                        ? 'border border-violet-500/40 bg-violet-500/15 text-violet-300 shadow-sm'
                        : 'hover:bg-foreground/5 text-foreground/80 border border-transparent'
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold">{pl.name}</p>
                      <p className="text-muted-foreground text-[10px]">
                        {pl.songIds.length} bài hát
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      elementId={`playlist-delete-btn-${pl.id}`}
                      data-ui="playlist-modal"
                      aria-label={`Delete playlist ${pl.name}`}
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDelete(pl.id)
                      }}
                      className="text-muted-foreground hover:text-destructive h-7 w-7 rounded-lg p-0 opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                )
              })
            )}
          </div>
        </div>

        {/* Selected Playlist Songs Column */}
        <div className="border-border space-y-3 border-t pt-4 md:col-span-7 md:border-t-0 md:border-l md:pt-0 md:pl-6">
          {selectedPlaylist ? (
            <>
              <div>
                <h3 className="text-foreground text-base font-bold">{selectedPlaylist.name}</h3>
                {selectedPlaylist.description && (
                  <p className="text-muted-foreground mt-0.5 text-xs">
                    {selectedPlaylist.description}
                  </p>
                )}
              </div>

              <div className="max-h-[320px] space-y-1.5 overflow-y-auto pr-1">
                {selectedPlaylist.songIds.length === 0 ? (
                  <div className="text-muted-foreground flex flex-col items-center justify-center py-10 text-center text-xs">
                    <Music className="mb-2 h-8 w-8 opacity-30" />
                    Chưa có bài hát nào trong playlist này.
                  </div>
                ) : (
                  selectedPlaylist.songIds.map((songId) => {
                    const title = songTitleMap.get(songId) || songId
                    return (
                      <div
                        key={songId}
                        data-element-id={`playlist-song-item-${songId}`}
                        data-ui="playlist-modal"
                        className="border-border/60 hover:bg-foreground/5 flex items-center justify-between rounded-xl border p-2.5 text-xs transition-colors"
                      >
                        <div className="flex min-w-0 flex-1 items-center gap-2.5">
                          <Music className="h-3.5 w-3.5 shrink-0 text-violet-400" />
                          <span className="truncate font-medium">{title}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          elementId={`playlist-remove-song-btn-${songId}`}
                          data-ui="playlist-modal"
                          aria-label={`Remove ${title} from playlist`}
                          onClick={() => removeSongFromPlaylist(selectedPlaylist.id, songId)}
                          className="text-muted-foreground hover:text-destructive h-7 w-7 rounded-lg p-0"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    )
                  })
                )}
              </div>
            </>
          ) : (
            <div className="text-muted-foreground flex h-full flex-col items-center justify-center text-center text-xs">
              Chọn hoặc tạo một playlist để xem các bài hát
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
