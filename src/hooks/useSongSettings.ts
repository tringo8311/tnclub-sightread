import { usePersistedState } from '@/features/persist'
import { getDefaultSongSettings } from '@/features/SongVisualization/utils'
import { SongConfig } from '@/types'
import { useAtomValue } from 'jotai'
import { activeProfileIdAtom } from '@/features/persist/persistence'

export default function useSongSettings(file: string) {
  const activeProfileId = useAtomValue(activeProfileIdAtom)
  return usePersistedState<SongConfig>(`${activeProfileId}/${file}/settings`, getDefaultSongSettings())
}
