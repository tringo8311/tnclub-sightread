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

// Curated Rich MIDI Items Collection
export const CURATED_MARKET_SONGS: MarketMidiItem[] = [
  {
    id: 'mkt-fur-elise',
    title: 'Für Elise (Complete)',
    author: 'Ludwig van Beethoven',
    category: 'Classical',
    level: 'Intermediate',
    duration: 148,
    midiUrl: '/music/songs/fur-elise.mid',
    description: 'Bản nhạc Piano kinh điển bất hủ quen thuộc nhất thế giới của Beethoven.',
    tags: ['Beethoven', 'Classical', 'Popular', 'Piano Solo'],
  },
  {
    id: 'mkt-clair-de-lune',
    title: 'Clair de Lune (Ánh Trăng)',
    author: 'Claude Debussy',
    category: 'Classical',
    level: 'Advanced',
    duration: 245,
    midiUrl: '/music/songs/clair-de-lune.mid',
    description: 'Tác phẩm Ánh trăng mộng mơ mang phong cách Ấn tượng lừng danh của Debussy.',
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
    tags: ['Pachelbel', 'Baroque', 'Wedding', 'Romantic'],
  },
  {
    id: 'mkt-moonlight-sonata',
    title: 'Moonlight Sonata (Chương 1)',
    author: 'Ludwig van Beethoven',
    category: 'Classical',
    level: 'Intermediate',
    duration: 310,
    midiUrl: '/music/songs/moonlight-sonata.mid',
    description: 'Chương 1 Sonata Ánh trăng với giai điệu u trầm da diết đi vào lòng người.',
    tags: ['Beethoven', 'Sonata', 'Classic'],
  },
  {
    id: 'mkt-old-doll',
    title: 'Old Doll (Piano Solo)',
    author: 'Nobuo Uematsu / Mad Father OST',
    category: 'Game OST',
    level: 'Intermediate',
    duration: 85,
    midiUrl: '/music/songs/old-doll.mid',
    description: 'Chủ đề bí ẩn và u buồn nổi tiếng từ tựa game kinh dị Mad Father.',
    tags: ['Mad Father', 'Horror', 'Solo Piano', 'Game OST'],
  },
  {
    id: 'mkt-rondo-alla-turca',
    title: 'Rondo alla Turca (Hành Khúc Thổ Nhĩ Kỳ)',
    author: 'Wolfgang Amadeus Mozart',
    category: 'Classical',
    level: 'Advanced',
    duration: 210,
    midiUrl: '/music/songs/rondo-alla-turca.mid',
    description: 'Hành khúc Thổ Nhĩ Kỳ tràn đầy năng lượng rộn rã tưng bừng của Mozart.',
    tags: ['Mozart', 'Fast', 'Technique', 'Classical'],
  },
  {
    id: 'mkt-arabesques',
    title: 'Arabesque No. 1 in E Major',
    author: 'Claude Debussy',
    category: 'Classical',
    level: 'Advanced',
    duration: 230,
    midiUrl: '/music/songs/arabesques.mid',
    description: 'Giai điệu lượn sóng trong veo như suối nguồn mang đậm phong cách Pháp.',
    tags: ['Debussy', 'Arabesque', 'Impressionism'],
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
    tags: ['Satie', 'Relaxing', 'Minimalist', 'Beginner'],
  },
  {
    id: 'mkt-swan-lake',
    title: 'Swan Lake Theme (Hồ Thiên Nga)',
    author: 'Pyotr Ilyich Tchaikovsky',
    category: 'Classical',
    level: 'Intermediate',
    duration: 165,
    midiUrl: '/music/songs/swan-lake.mid',
    description: 'Giai điệu Hồ Thiên Nga huyền thoại, ma mị và da diết của Tchaikovsky.',
    tags: ['Tchaikovsky', 'Ballet', 'Romantic'],
  },
  {
    id: 'mkt-greensleeves',
    title: 'Greensleeves (Dân Ca Anh)',
    author: 'Traditional Folk',
    category: 'Pop',
    level: 'Beginner',
    duration: 110,
    midiUrl: '/music/songs/greensleeves.mid',
    description: 'Bản dân ca cổ điển nước Anh lãng mạn nhẹ nhàng dễ tập luyện.',
    tags: ['Traditional', 'Folk', 'Easy'],
  },
  {
    id: 'mkt-in-hall-mountain-king',
    title: 'In the Hall of the Mountain King',
    author: 'Edvard Grieg',
    category: 'Classical',
    level: 'Intermediate',
    duration: 155,
    midiUrl: '/music/songs/in-the-hall-of-the-mountain-king.mid',
    description: 'Vũ điệu dồn dập kịch tính của Quỷ Vương núi sâu.',
    tags: ['Grieg', 'Peer Gynt', 'Dramatic'],
  },
  {
    id: 'mkt-march-in-d',
    title: 'March in D Major (BWV Anh. 122)',
    author: 'Johann Sebastian Bach',
    category: 'Classical',
    level: 'Beginner',
    duration: 95,
    midiUrl: '/music/songs/march-in-d-major.mid',
    description: 'Bài tập Hành khúc Rê trưởng tươi vui dành cho người mới bắt đầu.',
    tags: ['Bach', 'Baroque', 'Beginner'],
  },
  {
    id: 'mkt-minuet-in-g',
    title: 'Minuet in G Major (BWV Anh. 114)',
    author: 'Johann Sebastian Bach / Petzold',
    category: 'Classical',
    level: 'Beginner',
    duration: 105,
    midiUrl: '/music/songs/minuet-in-g-major.mid',
    description: 'Bản Minuet G trưởng kinh điển nhập môn Piano bắt buộc của Bach.',
    tags: ['Bach', 'Minuet', 'Beginner'],
  },
  {
    id: 'mkt-ode-to-joy',
    title: 'Ode to Joy (Khải Hoàn Ca)',
    author: 'Ludwig van Beethoven',
    category: 'Classical',
    level: 'Beginner',
    duration: 75,
    midiUrl: '/music/songs/ode-to-joy.mid',
    description: 'Trích đoạn Khải Hoàn Ca ngợi tình bạn và niềm vui sống bất hủ.',
    tags: ['Beethoven', 'Symphony 9', 'Beginner'],
  },
  {
    id: 'mkt-sonata-no-11',
    title: 'Piano Sonata No. 11 in A Major (K.331)',
    author: 'Wolfgang Amadeus Mozart',
    category: 'Classical',
    level: 'Intermediate',
    duration: 215,
    midiUrl: '/music/songs/sonata-no-11.mid',
    description: 'Bản Sonata La trưởng quý tộc thanh lịch đặc trưng Mozart.',
    tags: ['Mozart', 'Sonata', 'Classical'],
  },
  {
    id: 'mkt-the-entertainer',
    title: 'The Entertainer (Ragtime)',
    author: 'Scott Joplin',
    category: 'Jazz',
    level: 'Intermediate',
    duration: 160,
    midiUrl: '/music/songs/the-entertainer.mid',
    description: 'Bản Ragtime kinh điển sôi động vui tươi đầu thế kỷ 20.',
    tags: ['Ragtime', 'Jazz', 'Joplin'],
  },
  {
    id: 'mkt-twinkle-star',
    title: 'Twinkle, Twinkle, Little Star (Chủ Đề & Biến Tấu)',
    author: 'Wolfgang Amadeus Mozart',
    category: 'Classical',
    level: 'Beginner',
    duration: 65,
    midiUrl: '/music/songs/twinkle-twinkle-little-star.mid',
    description: 'Biến tấu Ngôi sao nhỏ lấp lánh rực rỡ vui nhộn.',
    tags: ['Mozart', 'Beginner', 'Kids'],
  },
  {
    id: 'mkt-la-cucaracha',
    title: 'La Cucaracha',
    author: 'Traditional Mexican Folk',
    category: 'Pop',
    level: 'Beginner',
    duration: 70,
    midiUrl: '/music/songs/la-cucaracha.mid',
    description: 'Vũ điệu dân ca Mexico sôi động tràn đầy nhịp điệu.',
    tags: ['Folk', 'Mexican', 'Rhythm'],
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
