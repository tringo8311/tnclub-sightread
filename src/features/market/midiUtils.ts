export const DEFAULT_MIDI_STORAGE_URL =
  'https://oczfmoquiugfdksddwuf.supabase.co/storage/v1/object/public/midi'

export interface TrackRecord {
  /** Định danh duy nhất (UUID) */
  id: string
  /** Tên bài hát */
  title: string
  /** Tên nghệ sĩ / tác giả */
  artist: string
  /** Đường dẫn tương đối của file MIDI trong Bucket */
  file_path: string
}

export interface MasterIndexEntry {
  shard: string
  start_artist: string
  end_artist: string
  record_count: number
  size?: number
}

/**
 * Sinh URL CDN hoàn chỉnh đến file MIDI
 * @param filePath Đường dẫn tương đối (e.g. "\"Weird Al\" Yankovic/Eat It.mid")
 * @param baseUrl (Tùy chọn) Override CDN base URL
 */
export function getMidiUrl(filePath: string, baseUrl: string = DEFAULT_MIDI_STORAGE_URL): string {
  if (!filePath) return ''

  // Sanitize any accidental absolute prefix or redundant clean_midi/ folder and invalid quotes
  const cleanPath = filePath
    .replace(/^.*\/clean_midi\//, '')
    .replace(/^clean_midi\//, '')
    .replace(/\\/g, '/')
    .replace(/"/g, '')
    .replace(/^\/+/, '')

  // Encode từng thành phần đường dẫn để không làm hỏng cấu trúc dấu '/'
  const encodedPath = cleanPath
    .split('/')
    .map((segment) => encodeURIComponent(segment))
    .join('/')

  const cleanBaseUrl = baseUrl.replace(/\/+$/, '')
  return `${cleanBaseUrl}/${encodedPath}`
}

/**
 * Tải ArrayBuffer của file MIDI từ CDN để phát nhạc (Soundfont / Web Audio API)
 */
export async function fetchMidiBuffer(filePath: string, baseUrl?: string): Promise<ArrayBuffer> {
  const url = getMidiUrl(filePath, baseUrl)
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Failed to load MIDI file: HTTP ${response.status} (${url})`)
  }
  return await response.arrayBuffer()
}
