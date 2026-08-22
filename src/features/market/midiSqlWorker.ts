import type { WorkerHttpvfs } from 'sql.js-httpvfs'
import { TrackRecord } from './midiUtils'

export type { WorkerHttpvfs }

export interface MidiWorkerConfig {
  /** Base URL chứa thư mục /db và /sql.js-httpvfs */
  basePath?: string
  /** Tên file database (Mặc định: "tracks.sqlite") */
  dbFileName?: string
}

/**
 * Khởi tạo SQLite Web Worker kết nối tới file tracks.sqlite
 */
export async function createMidiWorker(
  config: MidiWorkerConfig = {},
): Promise<WorkerHttpvfs | null> {
  if (typeof window === 'undefined') return null

  const sqlPkg: any = await import('sql.js-httpvfs')
  const createDbWorker = sqlPkg.createDbWorker || sqlPkg.default?.createDbWorker

  if (!createDbWorker) {
    throw new Error('createDbWorker not found in sql.js-httpvfs module')
  }

  const base =
    config.basePath !== undefined ? config.basePath : import.meta.env.BASE_URL.replace(/\/+$/, '')
  const dbFileName = config.dbFileName || 'tracks.sqlite'

  const workerUrl = new URL(
    `${base}/sql.js-httpvfs/sqlite.worker.js`.replace(/^\/\//, '/'),
    window.location.origin,
  ).toString()
  const wasmUrl = new URL(
    `${base}/sql.js-httpvfs/sql-wasm.wasm`.replace(/^\/\//, '/'),
    window.location.origin,
  ).toString()
  const dbUrl = new URL(
    `${base}/db/${dbFileName}`.replace(/^\/\//, '/'),
    window.location.origin,
  ).toString()

  // Tải metadata kích thước file từ master_index.json để tránh lỗi "Length of the file not known" do GitHub Pages bật Content-Encoding: gzip
  let fileLength = 4681728
  try {
    const metaUrl = new URL(
      `${base}/db/master_index.json`.replace(/^\/\//, '/'),
      window.location.origin,
    ).toString()
    const res = await fetch(metaUrl)
    if (res.ok) {
      const data = await res.json()
      if (data[0]?.size) fileLength = data[0].size
    }
  } catch (err) {
    console.warn('Could not fetch master_index.json, using default size', err)
  }

  const worker = await createDbWorker(
    [
      {
        from: 'inline',
        config: {
          serverMode: 'full',
          url: dbUrl,
          requestChunkSize: 4096,
          fileLength,
        },
      },
    ],
    workerUrl,
    wasmUrl,
  )

  return worker
}

/**
 * Tìm kiếm bài hát toàn văn (Full-Text Search) bằng câu lệnh SQL
 *
 * @param worker Đối tượng WorkerHttpvfs đã khởi tạo
 * @param query Từ khóa tìm kiếm (theo tên bài hát hoặc ca sĩ)
 * @param limit Số lượng kết quả tối đa cần lấy
 * @returns Danh sách bài hát khớp với từ khóa
 */
export async function searchTracks(
  worker: WorkerHttpvfs,
  query: string = '',
  limit: number = 60,
): Promise<TrackRecord[]> {
  let sql = 'SELECT id, title, artist, file_path FROM tracks'
  const trimmed = query.trim()

  if (trimmed.length > 0) {
    const safeQuery = trimmed.replace(/'/g, "''")
    sql += ` WHERE title LIKE '%${safeQuery}%' OR artist LIKE '%${safeQuery}%'`
  }

  sql += ` ORDER BY artist ASC, title ASC LIMIT ${limit};`

  const result = await worker.db.query(sql)
  return result as unknown as TrackRecord[]
}
