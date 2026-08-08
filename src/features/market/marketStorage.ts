import { SongMetadata } from '@/types'
import * as idb from 'idb-keyval'
import { parseMidi } from '../parsers'

export interface MarketMidiItem {
  id: string
  title: string
  author: string
  category: 'Classical' | 'Anime' | 'Game OST' | 'Pop' | 'Jazz' | 'Custom'
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  duration: number
  midiUrl: string
  provider?: string
  description?: string
  tags?: string[]
}

// Curated MIDI Items Collection
export const CURATED_MARKET_SONGS: MarketMidiItem[] = [
  {
    id: 'mkt-old-doll',
    title: 'Old Doll (Piano Solo)',
    author: 'Nobuo Uematsu / Mad Father OST',
    category: 'Game OST',
    level: 'Intermediate',
    duration: 85,
    midiUrl: '/music/songs/old-doll.mid',
    description:
      'Chủ đề bí ẩn và u buồn đầy nổi tiếng từ tựa game kinh dị Mad Father bản Piano Solo 2 tay.',
    tags: ['Mad Father', 'Horror', 'Solo Piano'],
  },
  {
    id: 'mkt-fur-elise',
    title: 'Für Elise (Complete)',
    author: 'Ludwig van Beethoven',
    category: 'Classical',
    level: 'Intermediate',
    duration: 148,
    midiUrl: '/music/songs/fur-elise.mid',
    description: 'Bản nhạc Piano kinh điển vô cùng quen thuộc của thiên tài Beethoven.',
    tags: ['Beethoven', 'Classical', 'Piano Roll'],
  },
  {
    id: 'mkt-clair-de-lune',
    title: 'Clair de Lune',
    author: 'Claude Debussy',
    category: 'Classical',
    level: 'Advanced',
    duration: 245,
    midiUrl: '/music/songs/clair-de-lune.mid',
    description:
      'Tác phẩm Ánh trăng mộng mơ mang phong cách Ấn tượng nổi tiếng thế giới của Debussy.',
    tags: ['Debussy', 'Impressionism', 'Moonlight'],
  },
  {
    id: 'mkt-canon-in-d',
    title: 'Canon in D Major',
    author: 'Johann Pachelbel',
    category: 'Classical',
    level: 'Intermediate',
    duration: 127,
    midiUrl: '/music/songs/canon-in-d.mid',
    description: 'Bản hòa tấu Canon bất hủ với giai điệu lãng mạn nhẹ nhàng.',
    tags: ['Pachelbel', 'Baroque', 'Wedding'],
  },
  {
    id: 'mkt-moonlight-sonata',
    title: 'Moonlight Sonata (1st Mov.)',
    author: 'Ludwig van Beethoven',
    category: 'Classical',
    level: 'Intermediate',
    duration: 310,
    midiUrl: '/music/songs/moonlight-sonata.mid',
    description: 'Chương 1 Sonata Ánh trăng với giai điệu u trầm da diết.',
    tags: ['Beethoven', 'Sonata', 'Classic'],
  },
  {
    id: 'mkt-gymnopedie-1',
    title: 'Gymnopédie No. 1',
    author: 'Erik Satie',
    category: 'Classical',
    level: 'Beginner',
    duration: 180,
    midiUrl: '/music/songs/gymnopedie-no1.mid',
    description: 'Bản nhạc mang giai điệu êm dịu, thư giãn được yêu thích nhất của Erik Satie.',
    tags: ['Satie', 'Relaxing', 'Minimalist'],
  },
  {
    id: 'mkt-rondo-alla-turca',
    title: 'Rondo alla Turca (Turkish March)',
    author: 'Wolfgang Amadeus Mozart',
    category: 'Classical',
    level: 'Advanced',
    duration: 210,
    midiUrl: '/music/songs/rondo-alla-turca.mid',
    description: 'Hành khúc Thổ Nhĩ Kỳ tràn đầy năng lượng rộn rã của Mozart.',
    tags: ['Mozart', 'Fast', 'Technique'],
  },
  {
    id: 'mkt-the-entertainer',
    title: 'The Entertainer',
    author: 'Scott Joplin',
    category: 'Jazz',
    level: 'Intermediate',
    duration: 160,
    midiUrl: '/music/songs/the-entertainer.mid',
    description: 'Bản Ragtime kinh điển sôi động đầu thế kỷ 20.',
    tags: ['Ragtime', 'Jazz', 'Joplin'],
  },
]

const STORE_KEY_MARKET_SONGS = 'sightread_market_saved_songs'

export async function requestPersistentStorage(): Promise<boolean> {
  if (typeof window !== 'undefined' && navigator.storage && navigator.storage.persist) {
    const isPersisted = await navigator.storage.persist()
    console.log(`[Storage] Persistent storage granted: ${isPersisted}`)
    return isPersisted
  }
  return false
}

export async function getMarketDownloadedSongs(): Promise<SongMetadata[]> {
  try {
    const saved = await idb.get<SongMetadata[]>(STORE_KEY_MARKET_SONGS)
    return saved ?? []
  } catch {
    return []
  }
}

export async function saveMarketSongToIndexedDB(
  songMeta: SongMetadata,
  arrayBuffer: ArrayBuffer,
): Promise<void> {
  await requestPersistentStorage()
  const savedSongs = await getMarketDownloadedSongs()

  // Save song blob to IndexedDB
  const blobKey = `midi_blob_${songMeta.id}`
  await idb.set(blobKey, arrayBuffer)

  // Save metadata
  const existingIdx = savedSongs.findIndex((s) => s.id === songMeta.id)
  if (existingIdx >= 0) {
    savedSongs[existingIdx] = songMeta
  } else {
    savedSongs.push(songMeta)
  }
  await idb.set(STORE_KEY_MARKET_SONGS, savedSongs)
}

export function downloadMidiFileToDisk(filename: string, arrayBuffer: ArrayBuffer) {
  const blob = new Blob([arrayBuffer], { type: 'audio/midi' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename.endsWith('.mid') ? filename : `${filename}.mid`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
