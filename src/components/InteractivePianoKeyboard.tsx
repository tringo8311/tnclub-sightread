import { getNoteName, isBlack } from '@/features/theory'
import React from 'react'

export interface PianoKeyInfo {
  pitch: number
  name: string
  octave: number
  isBlack: boolean
  labelVi: string
  solfegeEn: string
  clef: 'treble' | 'bass'
  freq: number
}

const SOLFEGE_VI_MAP: Record<number, string> = {
  0: 'Đô',
  1: 'Đô# / Rê♭',
  2: 'Rê',
  3: 'Rê# / Mi♭',
  4: 'Mi',
  5: 'Fa',
  6: 'Fa# / Sol♭',
  7: 'Sol',
  8: 'Sol# / La♭',
  9: 'La',
  10: 'La# / Si♭',
  11: 'Si',
}

const SOLFEGE_EN_MAP: Record<number, string> = {
  0: 'Do',
  1: 'Do# / Reb',
  2: 'Re',
  3: 'Re# / Mib',
  4: 'Mi',
  5: 'Fa',
  6: 'Fa# / Solb',
  7: 'Sol',
  8: 'Sol# / Lab',
  9: 'La',
  10: 'La# / Tib',
  11: 'Ti',
}

export function getPianoKeyInfo(pitch: number): PianoKeyInfo {
  const octave = Math.floor(pitch / 12) - 1
  const noteIndex = pitch % 12
  const name = getNoteName(pitch)
  const isB = isBlack(pitch)
  const freq = 440 * Math.pow(2, (pitch - 69) / 12)
  const clef: 'treble' | 'bass' = pitch < 60 ? 'bass' : 'treble'
  const labelVi = `${SOLFEGE_VI_MAP[noteIndex]} ${octave}`
  const solfegeEn = `${SOLFEGE_EN_MAP[noteIndex]} ${octave}`

  return {
    pitch,
    name,
    octave,
    isBlack: isB,
    labelVi,
    solfegeEn,
    clef,
    freq,
  }
}

export interface InteractivePianoKeyboardProps {
  /** Start MIDI pitch, default 48 (C3) */
  startPitch?: number
  /** End MIDI pitch, default 72 (C5) or 96 (C7) */
  endPitch?: number
  /** Currently selected single key pitch */
  selectedPitch?: number
  /** List of actively highlighted/pressed pitches (e.g. in chords/scales) */
  activePitches?: number[]
  /** Callback when any key is clicked */
  onKeyClick?: (key: PianoKeyInfo) => void
  /** Filtering highlight mode */
  highlightMode?: 'all' | 'middle_c' | 'treble' | 'bass' | 'black_keys'
  /** Right hand fingering numbers map (pitch -> 1..5) */
  rhFingeringMap?: Record<number, number>
  /** Left hand fingering numbers map (pitch -> 1..5) */
  lhFingeringMap?: Record<number, number>
  /** Which hand fingerings to show */
  handView?: 'rh' | 'lh' | 'both'
  /** Width in pixels for white keys, default 40 */
  whiteKeyWidth?: number
  /** Height class for keyboard, default 'h-40' */
  heightClass?: string
  /** Container custom classes */
  className?: string
}

export function InteractivePianoKeyboard({
  startPitch = 48,
  endPitch = 84,
  selectedPitch,
  activePitches = [],
  onKeyClick,
  highlightMode = 'all',
  rhFingeringMap = {},
  lhFingeringMap = {},
  handView = 'both',
  whiteKeyWidth = 40,
  heightClass = 'h-40',
  className = '',
}: InteractivePianoKeyboardProps) {
  // Generate all keys in range
  const allKeys: PianoKeyInfo[] = []
  for (let p = startPitch; p <= endPitch; p++) {
    allKeys.push(getPianoKeyInfo(p))
  }

  const whiteKeys = allKeys.filter((k) => !k.isBlack)
  const blackKeys = allKeys.filter((k) => k.isBlack)

  const isHighlighted = (key: PianoKeyInfo) => {
    if (highlightMode === 'middle_c') return key.pitch === 60
    if (highlightMode === 'treble') return key.pitch >= 60
    if (highlightMode === 'bass') return key.pitch < 60
    if (highlightMode === 'black_keys') return key.isBlack
    return true
  }

  const blackKeyWidth = Math.round(whiteKeyWidth * 0.6)

  return (
    <div
      className={`border-border custom-scrollbar flex justify-center overflow-x-auto rounded-2xl border bg-slate-950 p-4 shadow-inner select-none ${className}`}
    >
      <div className={`relative flex ${heightClass} w-max`}>
        {/* 1. Render White Keys */}
        {whiteKeys.map((wKey) => {
          const isSelected = selectedPitch === wKey.pitch
          const isActive = activePitches.includes(wKey.pitch)
          const highlighted = isHighlighted(wKey)
          const isMiddleC = wKey.pitch === 60
          const rhFingerNum = rhFingeringMap[wKey.pitch]
          const lhFingerNum = lhFingeringMap[wKey.pitch]

          return (
            <div
              key={wKey.pitch}
              style={{ width: `${whiteKeyWidth}px` }}
              onClick={() => onKeyClick?.(wKey)}
              className={`relative flex cursor-pointer flex-col items-center justify-end rounded-b-md border-r border-slate-300 pb-2 transition-all duration-150 last:border-0 ${
                isSelected || isActive
                  ? 'bg-amber-300 shadow-[inset_0_-10px_20px_rgba(245,158,11,0.6)]'
                  : isMiddleC
                    ? 'bg-amber-100/90 hover:bg-amber-200'
                    : highlighted
                      ? 'bg-white hover:bg-slate-100'
                      : 'bg-slate-300 opacity-60'
              }`}
            >
              {/* Fingering Badges */}
              {(isActive || isSelected) && (
                <div className="absolute top-2.5 flex flex-col items-center gap-1">
                  {(handView === 'rh' || handView === 'both') && rhFingerNum && (
                    <div
                      title="Right Hand (RH)"
                      className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-slate-950 shadow-md ring-1 ring-amber-300"
                    >
                      {rhFingerNum}
                    </div>
                  )}
                  {(handView === 'lh' || handView === 'both') && lhFingerNum && (
                    <div
                      title="Left Hand (LH)"
                      className="flex h-5 w-5 items-center justify-center rounded-full bg-cyan-500 text-[10px] font-bold text-slate-950 shadow-md ring-1 ring-cyan-300"
                    >
                      {lhFingerNum}
                    </div>
                  )}
                </div>
              )}

              {/* Note Name Label */}
              <span
                className={`text-[10px] font-semibold ${
                  isActive || isSelected
                    ? 'font-bold text-amber-950'
                    : isMiddleC
                      ? 'font-bold text-amber-800'
                      : 'text-slate-600'
                }`}
              >
                {wKey.name}
              </span>
            </div>
          )
        })}

        {/* 2. Render Black Keys (positioned directly on dividing boundary between white keys) */}
        {blackKeys.map((bKey) => {
          const isSelected = selectedPitch === bKey.pitch
          const isActive = activePitches.includes(bKey.pitch)
          const highlighted = isHighlighted(bKey)
          const rhFingerNum = rhFingeringMap[bKey.pitch]
          const lhFingerNum = lhFingeringMap[bKey.pitch]

          // Number of white keys before this black key
          const whiteKeysBefore = whiteKeys.filter((w) => w.pitch < bKey.pitch).length
          const leftPos = whiteKeysBefore * whiteKeyWidth - blackKeyWidth / 2

          return (
            <div
              key={bKey.pitch}
              style={{
                left: `${leftPos}px`,
                width: `${blackKeyWidth}px`,
              }}
              onClick={(e) => {
                e.stopPropagation()
                onKeyClick?.(bKey)
              }}
              className={`absolute top-0 z-20 flex h-[65%] cursor-pointer flex-col items-center justify-end rounded-b-md pb-1.5 shadow-xl transition-all duration-150 ${
                isSelected || isActive
                  ? 'border border-amber-300 bg-amber-500 shadow-[0_0_14px_rgba(245,158,11,0.9)]'
                  : highlighted
                    ? 'border border-slate-700 bg-gradient-to-b from-slate-800 to-slate-950 hover:from-slate-700'
                    : 'bg-slate-800 opacity-50'
              }`}
            >
              {/* Fingering Badges */}
              {(isActive || isSelected) && (
                <div className="absolute top-2 flex flex-col items-center gap-1">
                  {(handView === 'rh' || handView === 'both') && rhFingerNum && (
                    <div
                      title="Right Hand (RH)"
                      className="flex h-4 w-4 items-center justify-center rounded-full bg-amber-300 text-[9px] font-bold text-slate-950 shadow ring-1 ring-amber-500"
                    >
                      {rhFingerNum}
                    </div>
                  )}
                  {(handView === 'lh' || handView === 'both') && lhFingerNum && (
                    <div
                      title="Left Hand (LH)"
                      className="flex h-4 w-4 items-center justify-center rounded-full bg-cyan-300 text-[9px] font-bold text-slate-950 shadow ring-1 ring-cyan-500"
                    >
                      {lhFingerNum}
                    </div>
                  )}
                </div>
              )}

              {/* Note Name Label */}
              <span
                className={`text-[9px] font-semibold ${
                  isActive || isSelected ? 'font-bold text-slate-950' : 'text-slate-300'
                }`}
              >
                {bKey.name.split('/')[0]}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
