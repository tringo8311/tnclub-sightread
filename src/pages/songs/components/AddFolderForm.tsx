import { Sizer } from '@/components'
import {
  addFolder,
  isFileSystemAccessSupported,
  isScanningAtom,
  localDirsAtom,
  localSongsAtom,
  removeFolder,
  requiresPermissionAtom,
  scanFolders,
} from '@/features/persist/persistence'
import { useAtomValue } from 'jotai'
import { AlertCircle, Folder, Music, Plus, RefreshCw, Trash2 } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function ManageFoldersForm({ onClose }: { onClose: () => void }) {
  const { t } = useTranslation()
  const isScanning = useAtomValue<boolean | Promise<void>>(isScanningAtom)
  const folders = useAtomValue(localDirsAtom)
  const localSongs = useAtomValue(localSongsAtom)
  const needsPermission = useAtomValue(requiresPermissionAtom)
  const isScanningActive = isScanning !== false
  const [showSpinner, setShowSpinner] = useState(false)
  const spinnerStartRef = useRef<number | null>(null)

  useEffect(() => {
    let isCancelled = false
    const syncSpinner = async () => {
      if (isScanningActive) {
        if (!showSpinner) {
          spinnerStartRef.current = performance.now()
          setShowSpinner(true)
        }
        return
      }
      if (showSpinner) {
        const start = spinnerStartRef.current ?? performance.now()
        const elapsed = performance.now() - start
        const remaining = Math.max(0, 1000 - elapsed)
        if (remaining > 0) {
          await new Promise((resolve) => setTimeout(resolve, remaining))
        }
        if (!isCancelled) {
          setShowSpinner(false)
          spinnerStartRef.current = null
        }
      }
    }
    void syncSpinner()
    return () => {
      isCancelled = true
    }
  }, [isScanningActive, showSpinner])

  const handleScanFolders = async () => {
    if (isScanningActive) {
      return
    }
    spinnerStartRef.current = performance.now()
    setShowSpinner(true)
    await new Promise(requestAnimationFrame)
    await scanFolders()
  }

  if (!isFileSystemAccessSupported()) {
    return (
      <div className="relative flex flex-col gap-5 px-6 pt-6 pb-6 text-base">
        <h1 className="text-2xl font-semibold text-gray-900">
          {t('songs.folderModal.title', 'Folder Management')}
        </h1>
        <Sizer height={0} />

        <div className="flex items-center gap-3 rounded-md border border-red-300 bg-red-50 p-4 text-red-700">
          <AlertCircle size={20} />
          <div>
            <p className="font-medium">
              {t('songs.folderModal.unsupportedTitle', 'Browser Not Supported')}
            </p>
            <p className="text-sm">
              {t(
                'songs.folderModal.unsupportedDesc',
                'Syncing folders is only supported in Chromium-based browsers like Chrome and Edge due to lack of support for the File System Access API. Please switch to a supported browser.',
              )}
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full cursor-pointer rounded-md bg-violet-600 py-2 text-white transition hover:bg-violet-700"
        >
          {t('songs.folderModal.close', 'Close')}
        </button>
      </div>
    )
  }

  return (
    <div className="bg-card text-card-foreground border-border mx-auto rounded-xl border px-6 pt-6 pb-6 shadow-lg">
      <div className="border-border mb-6 border-b pb-4">
        <h2 className="text-foreground mb-1 text-xl font-semibold">
          {t('songs.folderModal.title', 'Folder Management')}
        </h2>
        <p className="text-muted-foreground text-sm">
          {t('songs.folderModal.subtitle', 'Organize your music collection')}
        </p>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="text-muted-foreground text-[11px] font-medium tracking-wider uppercase">
          {t('songs.folderModal.listTitle', {
            count: folders.length,
            defaultValue: `Folders (${folders.length})`,
          })}
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleScanFolders}
            disabled={isScanningActive}
            className="text-foreground/80 bg-foreground/5 hover:bg-foreground/10 active:bg-foreground/15 flex items-center justify-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${showSpinner ? 'animate-spin' : ''}`} />
            {t('songs.folderModal.scan', 'Scan Folders')}
          </button>
          <button
            onClick={addFolder}
            className="bg-primary text-primary-foreground flex cursor-pointer items-center justify-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium transition-colors hover:opacity-90"
          >
            <Plus className="h-4 w-4" />
            {t('songs.folderModal.add', 'Add Folder')}
          </button>
        </div>
      </div>

      <Sizer height={24} />

      {/* Folders List */}
      <div className="space-y-2">
        {needsPermission && (
          <p className="text-destructive text-xs">
            {t(
              'songs.folderModal.permissionWarning',
              'Please rescan folders to grant access to your music files.',
            )}
          </p>
        )}

        {folders.length === 0 ? (
          <div className="py-8 text-center">
            <Folder className="text-muted-foreground/40 mx-auto mb-3 h-12 w-12" />
            <p className="text-muted-foreground text-sm">
              {t('songs.folderModal.empty', 'No folders added yet')}
            </p>
            <p className="text-muted-foreground/70 mt-1 text-xs">
              {t('songs.folderModal.emptyDesc', 'Add a folder to get started')}
            </p>
          </div>
        ) : (
          <div className="space-y-1">
            {folders.map((folder, i) => {
              const songCount = localSongs.get(folder.id)?.length || 0
              return (
                <div
                  key={i}
                  className="group border-border hover:border-border/80 hover:bg-foreground/5 flex items-center justify-between rounded-md border p-3 transition-colors"
                >
                  <div className="flex min-w-0 flex-1 items-center gap-3">
                    <Folder className="text-muted-foreground h-4 w-4 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className={'text-foreground truncate text-sm font-medium'}>
                        {folder.handle.name}
                      </p>
                      <div className="mt-1 flex items-center gap-1">
                        <Music className="text-muted-foreground h-3 w-3" />
                        <span className="text-muted-foreground text-xs">
                          {t('songs.playlistModal.songsCount', {
                            count: songCount,
                            defaultValue: `${songCount} ${songCount === 1 ? 'song' : 'songs'}`,
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      removeFolder(folder.id)
                    }}
                    className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive rounded p-1.5 opacity-0 transition-colors group-hover:opacity-100"
                    title="Remove folder"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {folders.length > 0 && (
        <div className="border-border mt-6 border-t pt-4">
          <p className="text-muted-foreground text-center text-xs">
            {folders.reduce((sum, folder) => sum + (localSongs.get(folder.id)?.length ?? 0), 0)}{' '}
            {t('songs.playlistModal.songsCount', {
              count: folders.reduce(
                (sum, folder) => sum + (localSongs.get(folder.id)?.length ?? 0),
                0,
              ),
              defaultValue: 'songs',
            })}{' '}
            / {folders.length}{' '}
            {t('songs.folderModal.listTitle', {
              count: folders.length,
              defaultValue: 'folders',
            })}
          </p>
        </div>
      )}
    </div>
  )
}
