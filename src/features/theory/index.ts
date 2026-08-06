export * from './key-signature'
export { default as glyphs } from './glyphs'

const blackIndices = new Set([1, 3, 6, 8, 10])
export function isBlack(note: number) {
  return blackIndices.has(note % 12)
}

export function isWhite(note: number) {
  return !isBlack(note)
}

const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
export function getNoteName(midi: number) {
  const octave = Math.floor(midi / 12) - 1
  const name = NOTE_NAMES[midi % 12]
  return `${name}${octave}`
}
