import { usePersistedState } from '@/features/persist'
import { activeProfileIdAtom } from '@/features/persist/persistence'
import { getDefaultSongSettings } from '@/features/SongVisualization/utils'
import { SongConfig } from '@/types'
import { useAtomValue } from 'jotai'

export default function useSongSettings(file: string) {
  const activeProfileId = useAtomValue(activeProfileIdAtom)
  return usePersistedState<SongConfig>(
    `${activeProfileId}/${file}/settings`,
    getDefaultSongSettings(),
  )
}
