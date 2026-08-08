import builtinSongManifest from '@/manifest.json'
import { SongMetadata, SongSource } from '@/types'
import { getKey } from '@/utils'
import { atom, useAtomValue } from 'jotai'
import { getMarketDownloadedSongs } from '../market/marketStorage'
import { localSongsAtom } from '../persist'

const builtinMetadata: Array<[string, SongMetadata]> = Object.values(builtinSongManifest).map(
  (metadata) => {
    const key = getKey(metadata.id, metadata.source as SongSource)
    return [key, metadata as SongMetadata]
  },
)

const builtinMetadataAtom = atom(builtinMetadata)
export const marketSongsRefreshAtom = atom(0)
const marketMetadataAtom = atom<[string, SongMetadata][]>([])

const storageMetadataAtom = atom((get) => {
  const songs = Array.from(get(localSongsAtom).values()).flatMap((x) => x)
  return songs.map((x) => [getKey(x.id, x.source), x]) as [string, SongMetadata][]
})

export const songManifestAtom = atom<Map<string, SongMetadata>>((get) => {
  get(marketSongsRefreshAtom)
  const builtinMetadata = get(builtinMetadataAtom)
  const storageMetadata = get(storageMetadataAtom)
  const marketMetadata = get(marketMetadataAtom)
  return new Map([...builtinMetadata, ...storageMetadata, ...marketMetadata])
})

const songManifestAsListAtom = atom<Array<SongMetadata>>((get) => {
  const songManifest = get(songManifestAtom)
  return Array.from(songManifest.values())
})

export function useSongManifest(): SongMetadata[] {
  const songManifestAsList = useAtomValue(songManifestAsListAtom)
  return songManifestAsList
}

export function useSongMetadata(id: string, source: SongSource): SongMetadata | undefined {
  const key = getKey(id, source)
  const songManifest = useAtomValue(songManifestAtom)
  return songManifest.get(key)
}
