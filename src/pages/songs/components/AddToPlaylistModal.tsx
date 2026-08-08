import { Button } from '@/components'
import {
  activeProfileIdAtom,
  addSongToPlaylist,
  createPlaylist,
  playlistsAtom,
  removeSongFromPlaylist,
} from '@/features/persist/persistence'
import { useAtomValue } from 'jotai'
import { Check, ListPlus, Plus, X } from 'lucide-react'
import { useState } from 'react'

type AddToPlaylistModalProps = {
  songId: string
  songTitle?: string
  onClose: () => void
}

export default function AddToPlaylistModal({
  songId,
  songTitle,
  onClose,
}: AddToPlaylistModalProps) {
  const activeProfileId = useAtomValue(activeProfileIdAtom)
  const allPlaylistsMap = useAtomValue(playlistsAtom)
  const playlists = allPlaylistsMap[activeProfileId] || []

  const [isCreating, setIsCreating] = useState(false)
  const [newTitle, setNewTitle] = useState('')

  const handleToggle = (playlistId: string, currentIn: boolean) => {
    if (currentIn) {
      removeSongFromPlaylist(playlistId, songId)
    } else {
      addSongToPlaylist(playlistId, songId)
    }
  }

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTitle.trim()) return
    const created = createPlaylist(newTitle.trim())
    addSongToPlaylist(created.id, songId)
    setNewTitle('')
    setIsCreating(false)
  }

  return (
    <div
      data-ui="add-to-playlist-modal"
      data-component="AddToPlaylistModal"
      className="p-6"
    >
      <div className="border-border mb-4 flex items-center justify-between border-b pb-3 pr-8">
        <div className="flex items-center gap-2.5">
          <ListPlus className="h-5 w-5 text-violet-400" />
          <h3 className="text-foreground text-base font-bold">Thêm Vào Playlist</h3>
        </div>
      </div>

      {songTitle && (
        <p className="text-muted-foreground mb-4 truncate text-xs font-medium">
          Bài hát: <span className="text-foreground font-semibold">{songTitle}</span>
        </p>
      )}

      <div className="max-h-[260px] space-y-1.5 overflow-y-auto pr-1">
        {playlists.length === 0 ? (
          <div className="border-border/60 text-muted-foreground rounded-xl border border-dashed py-6 text-center text-xs">
            Chưa có playlist nào. Hãy tạo mới bên dưới!
          </div>
        ) : (
          playlists.map((pl) => {
            const isSongIn = pl.songIds.includes(songId)
            return (
              <div
                key={pl.id}
                data-element-id={`add-playlist-toggle-${pl.id}`}
                data-ui="add-to-playlist-modal"
                onClick={() => handleToggle(pl.id, isSongIn)}
                className={`flex cursor-pointer items-center justify-between rounded-xl p-3 text-xs font-medium transition-all ${
                  isSongIn
                    ? 'border border-violet-500/40 bg-violet-500/15 text-violet-300 shadow-sm'
                    : 'border-border/60 hover:bg-foreground/5 text-foreground/80 border'
                }`}
              >
                <span className="truncate">{pl.name}</span>
                <div
                  className={`flex h-5 w-5 items-center justify-center rounded-md border ${
                    isSongIn
                      ? 'border-violet-500 bg-violet-600 text-white'
                      : 'border-border bg-background'
                  }`}
                >
                  {isSongIn && <Check className="h-3.5 w-3.5" />}
                </div>
              </div>
            )
          })
        )}
      </div>

      <div className="border-border mt-4 border-t pt-3">
        {isCreating ? (
          <form onSubmit={handleCreate} className="flex gap-2">
            <input
              type="text"
              placeholder="Tên playlist mới..."
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="border-border bg-background text-foreground placeholder:text-muted-foreground flex-1 rounded-xl border px-3 py-1.5 text-xs focus:ring-1 focus:ring-violet-500 focus:outline-none"
              autoFocus
            />
            <Button type="submit" variant="primary" size="sm" className="text-xs">
              Tạo
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setIsCreating(false)}
              className="text-xs"
            >
              Hủy
            </Button>
          </form>
        ) : (
          <Button
            variant="outline"
            size="sm"
            elementId="add-playlist-modal-new-btn"
            data-ui="add-to-playlist-modal"
            onClick={() => setIsCreating(true)}
            className="w-full border-violet-500/30 text-xs text-violet-400 hover:bg-violet-500/10"
          >
            <Plus className="mr-1.5 h-3.5 w-3.5" />
            Tạo Playlist mới
          </Button>
        )}
      </div>
    </div>
  )
}
