import { Volume2 } from 'lucide-react'
import React, { useState } from 'react'

// Root Notes (MIDI 60 = C4)
const ROOT_NOTES = [
  { name: 'C', pitch: 60 },
  { name: 'C# / D♭', pitch: 61 },
  { name: 'D', pitch: 62 },
  { name: 'D# / E♭', pitch: 63 },
  { name: 'E', pitch: 64 },
  { name: 'F', pitch: 65 },
  { name: 'F# / G♭', pitch: 66 },
  { name: 'G', pitch: 67 },
  { name: 'G# / A♭', pitch: 68 },
  { name: 'A', pitch: 69 },
  { name: 'A# / B♭', pitch: 70 },
  { name: 'B', pitch: 71 },
]

// Chord Definitions (intervals from root, fingering RH & LH)
interface ChordDef {
  id: string
  name: string
  fullName: string
  intervals: number[]
  symbol: string
  rhFingering: number[]
  lhFingering: number[]
  formula: string
  desc: string
}

const CHORDS: ChordDef[] = [
  {
    id: 'major',
    name: 'Major (Trưởng)',
    fullName: 'Hợp âm Trưởng',
    intervals: [0, 4, 7],
    symbol: '',
    rhFingering: [1, 3, 5],
    lhFingering: [5, 3, 1],
    formula: '1 - 3 - 5',
    desc: 'Hợp âm tươi sáng, vui tươi, là nền tảng của âm nhạc cổ điển & hiện đại.',
  },
  {
    id: 'minor',
    name: 'Minor (Thứ)',
    fullName: 'Hợp âm Thứ',
    intervals: [0, 3, 7],
    symbol: 'm',
    rhFingering: [1, 3, 5],
    lhFingering: [5, 3, 1],
    formula: '1 - ♭3 - 5',
    desc: 'Hợp âm u trầm, u buồn, chứa quãng 3 thứ mượt mà.',
  },
  {
    id: 'dom7',
    name: 'Dominant 7th (Ám 7)',
    fullName: 'Hợp âm Bảy Ám',
    intervals: [0, 4, 7, 10],
    symbol: '7',
    rhFingering: [1, 2, 3, 5],
    lhFingering: [5, 3, 2, 1],
    formula: '1 - 3 - 5 - ♭7',
    desc: 'Tạo cảm giác căng thẳng thúc giục giải quyết về hợp âm chủ, rất phổ biến trong Blues & Jazz.',
  },
  {
    id: 'maj7',
    name: 'Major 7th (Trưởng 7)',
    fullName: 'Hợp âm Trưởng 7',
    intervals: [0, 4, 7, 11],
    symbol: 'Maj7',
    rhFingering: [1, 2, 3, 5],
    lhFingering: [5, 3, 2, 1],
    formula: '1 - 3 - 5 - 7',
    desc: 'Âm thanh sang trọng, mộng mơ, êm dịu thường thấy trong Pop & Ballad hiện đại.',
  },
  {
    id: 'min7',
    name: 'Minor 7th (Thứ 7)',
    fullName: 'Hợp âm Thứ 7',
    intervals: [0, 3, 7, 10],
    symbol: 'm7',
    rhFingering: [1, 2, 3, 5],
    lhFingering: [5, 3, 2, 1],
    formula: '1 - ♭3 - 5 - ♭7',
    desc: 'Âm sắc ấm áp, thư thái, hoàn hảo cho giai điệu R&B và Chillout.',
  },
  {
    id: 'dim',
    name: 'Diminished (Giảm)',
    fullName: 'Hợp âm Giảm (Dim)',
    intervals: [0, 3, 6],
    symbol: 'dim',
    rhFingering: [1, 3, 5],
    lhFingering: [5, 3, 1],
    formula: '1 - ♭3 - ♭5',
    desc: 'Tạo sự huyền bí, hồi hộp kịch tính cao độ.',
  },
  {
    id: 'aug',
    name: 'Augmented (Tăng)',
    fullName: 'Hợp âm Tăng (Aug)',
    intervals: [0, 4, 8],
    symbol: 'aug',
    rhFingering: [1, 3, 5],
    lhFingering: [5, 3, 1],
    formula: '1 - 3 - ♯5',
    desc: 'Hợp âm kỳ lạ, lơ lửng, tạo sự bối rối tò mò.',
  },
  {
    id: 'sus4',
    name: 'Suspended 4 (Sus4)',
    fullName: 'Hợp âm Treo Sus4',
    intervals: [0, 5, 7],
    symbol: 'sus4',
    rhFingering: [1, 3, 5],
    lhFingering: [5, 3, 1],
    formula: '1 - 4 - 5',
    desc: 'Thay bậc 3 bằng bậc 4, tạo sự chờ đợi bay bổng trước khi chuyển về hợp âm Trưởng.',
  },
]

// Scale Definitions
interface ScaleDef {
  id: string
  name: string
  fullName: string
  intervals: number[]
  rhFingering: number[]
  lhFingering: number[]
  formula: string
  desc: string
}

const SCALES: ScaleDef[] = [
  {
    id: 'major_scale',
    name: 'Major Scale (Trưởng)',
    fullName: 'Âm Giai Trưởng Tự Nhiên',
    intervals: [0, 2, 4, 5, 7, 9, 11, 12],
    rhFingering: [1, 2, 3, 1, 2, 3, 4, 5],
    lhFingering: [5, 4, 3, 2, 1, 3, 2, 1],
    formula: 'C - D - E - F - G - A - B - C',
    desc: 'Âm giai tươi sáng, cơ bản nhất của mọi lý thuyết âm nhạc tây phương.',
  },
  {
    id: 'natural_minor',
    name: 'Natural Minor (Thứ Tự Nhiên)',
    fullName: 'Âm Giai Thứ Tự Nhiên',
    intervals: [0, 2, 3, 5, 7, 8, 10, 12],
    rhFingering: [1, 2, 3, 1, 2, 3, 4, 5],
    lhFingering: [5, 4, 3, 2, 1, 3, 2, 1],
    formula: '1 - 2 - ♭3 - 4 - 5 - ♭6 - ♭7 - 8',
    desc: 'Âm giai thứ cơ bản mang màu sắc u buồn, cổ điển.',
  },
  {
    id: 'harmonic_minor',
    name: 'Harmonic Minor (Thứ Hòa Âm)',
    fullName: 'Âm Giai Thứ Hòa Âm',
    intervals: [0, 2, 3, 5, 7, 8, 11, 12],
    rhFingering: [1, 2, 3, 1, 2, 3, 4, 5],
    lhFingering: [5, 4, 3, 2, 1, 3, 2, 1],
    formula: '1 - 2 - ♭3 - 4 - 5 - ♭6 - 7 - 8',
    desc: 'Tăng bậc 7 lên nửa cung, mang màu sắc Ả Rập & nhạc Kịch tính Trung Đông.',
  },
  {
    id: 'melodic_minor',
    name: 'Melodic Minor (Thứ Giai Điệu)',
    fullName: 'Âm Giai Thứ Giai Điệu',
    intervals: [0, 2, 3, 5, 7, 9, 11, 12],
    rhFingering: [1, 2, 3, 1, 2, 3, 4, 5],
    lhFingering: [5, 4, 3, 2, 1, 3, 2, 1],
    formula: '1 - 2 - ♭3 - 4 - 5 - 6 - 7 - 8',
    desc: 'Biến tấu nâng cả bậc 6 & 7 lên khi đi lên, rất được yêu thích trong nhạc Jazz.',
  },
  {
    id: 'major_pentatonic',
    name: 'Major Pentatonic (Ngũ Âm Trưởng)',
    fullName: 'Âm Giai Ngũ Âm Trưởng (5 Nốt)',
    intervals: [0, 2, 4, 7, 9, 12],
    rhFingering: [1, 2, 3, 1, 2, 3],
    lhFingering: [5, 4, 3, 2, 1, 1],
    formula: '1 - 2 - 3 - 5 - 6 - 8',
    desc: 'Ngũ âm dân gian truyền thống Á Đông, ngọt ngào và rất dễ ứng tấu ngẫu hứng.',
  },
  {
    id: 'minor_pentatonic',
    name: 'Minor Pentatonic (Ngũ Âm Thứ)',
    fullName: 'Âm Giai Ngũ Âm Thứ (5 Nốt)',
    intervals: [0, 3, 5, 7, 10, 12],
    rhFingering: [1, 2, 3, 1, 2, 3],
    lhFingering: [5, 4, 3, 2, 1, 1],
    formula: '1 - ♭3 - 4 - 5 - ♭7 - 8',
    desc: 'Nền tảng của nhạc Rock, Blues, Solo Guitar & Piano Jazz.',
  },
]

// Pitch to Note Name Helper
const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
function getNoteName(pitch: number): string {
  const name = NOTE_NAMES[pitch % 12]
  const octave = Math.floor(pitch / 12) - 1
  return `${name}${octave}`
}

export function ChordScaleSection() {
  const [mode, setMode] = useState<'chord' | 'scale'>('chord')
  const [selectedRootIndex, setSelectedRootIndex] = useState(0)
  const [selectedChordId, setSelectedChordId] = useState('major')
  const [selectedScaleId, setSelectedScaleId] = useState('major_scale')
  const [handView, setHandView] = useState<'rh' | 'lh'>('rh')

  const root = ROOT_NOTES[selectedRootIndex]
  const activeChord = CHORDS.find((c) => c.id === selectedChordId) || CHORDS[0]
  const activeScale = SCALES.find((s) => s.id === selectedScaleId) || SCALES[0]

  // Calculate active MIDI pitches
  const activeIntervals = mode === 'chord' ? activeChord.intervals : activeScale.intervals
  const activePitches = activeIntervals.map((interval) => root.pitch + interval)

  // Fingering map for active pitches
  const activeFingering = mode === 'chord'
    ? (handView === 'rh' ? activeChord.rhFingering : activeChord.lhFingering)
    : (handView === 'rh' ? activeScale.rhFingering : activeScale.lhFingering)

  const pitchFingeringMap: Record<number, number> = {}
  activePitches.forEach((pitch, idx) => {
    pitchFingeringMap[pitch] = activeFingering[idx % activeFingering.length]
  })

  // Web Audio Synthesis for playing notes
  const playSound = (pitches: number[], isArpeggio: boolean = false) => {
    try {
      const AC = window.AudioContext || (window as any).webkitAudioContext
      if (!AC) return
      const ctx = new AC()

      pitches.forEach((p, index) => {
        const freq = 440 * Math.pow(2, (p - 69) / 12)
        const delay = isArpeggio ? index * 0.18 : 0
        const startTime = ctx.currentTime + delay

        const osc = ctx.createOscillator()
        const gain = ctx.createGain()

        osc.type = 'triangle'
        osc.frequency.setValueAtTime(freq, startTime)

        gain.gain.setValueAtTime(0, startTime)
        gain.gain.linearRampToValueAtTime(0.3, startTime + 0.02)
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + (isArpeggio ? 0.8 : 1.2))

        osc.connect(gain)
        gain.connect(ctx.destination)

        osc.start(startTime)
        osc.stop(startTime + 1.5)
      })
    } catch (e) {
      console.error(e)
    }
  }

  // Generate 2-Octave Keyboard keys (C4 to B5 -> 60 to 83)
  const keys: { pitch: number; isBlack: boolean; name: string }[] = []
  for (let p = 60; p <= 83; p++) {
    const isBlack = [1, 3, 6, 8, 10].includes(p % 12)
    keys.push({ pitch: p, isBlack, name: getNoteName(p) })
  }

  return (
    <div className="border-border bg-card/60 rounded-2xl border p-6 shadow-xl backdrop-blur-md space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-4">
        <div>
          <h2 className="from-amber-400 via-amber-200 to-white bg-gradient-to-r bg-clip-text text-2xl font-black text-transparent">
            Tra Cứu Hợp Âm & Âm Giai Piano (Chord & Scale Explorer)
          </h2>
          <p className="text-muted-foreground text-xs font-medium mt-1">
            Xem vị trí nốt, cấu trúc quãng và thế bấm ngón tay chuẩn (Fingering 1-2-3-4-5) cho cả hai tay.
          </p>
        </div>

        {/* Mode Switcher: Chord vs Scale */}
        <div className="glass-card flex items-center gap-1 !rounded-xl !p-1">
          <button
            type="button"
            onClick={() => setMode('chord')}
            className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              mode === 'chord'
                ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold'
                : 'text-foreground/70 hover:text-foreground hover:bg-foreground/10'
            }`}
          >
            Hợp Âm (Chords)
          </button>
          <button
            type="button"
            onClick={() => setMode('scale')}
            className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              mode === 'scale'
                ? 'bg-cyan-500 text-slate-950 shadow-md font-extrabold'
                : 'text-foreground/70 hover:text-foreground hover:bg-foreground/10'
            }`}
          >
            Âm Giai (Scales)
          </button>
        </div>
      </div>

      {/* Root Note Picker */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">
          1. Chọn Nốt Gốc (Root Note):
        </label>
        <div className="flex flex-wrap items-center gap-1.5">
          {ROOT_NOTES.map((r, idx) => (
            <button
              key={r.name}
              type="button"
              onClick={() => setSelectedRootIndex(idx)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                selectedRootIndex === idx
                  ? 'bg-primary text-primary-foreground font-black ring-2 ring-primary/50 scale-105'
                  : 'bg-foreground/5 text-foreground/80 hover:bg-foreground/15 border border-border/50'
              }`}
            >
              {r.name.split(' / ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Type Selection (Chords or Scales) */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">
          2. Chọn Loại {mode === 'chord' ? 'Hợp Âm' : 'Âm Giai'}:
        </label>
        <div className="flex flex-wrap items-center gap-2">
          {mode === 'chord'
            ? CHORDS.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setSelectedChordId(c.id)}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                    selectedChordId === c.id
                      ? 'bg-amber-500/20 border-2 border-amber-400 text-amber-300 font-bold shadow-[0_0_12px_rgba(245,158,11,0.2)]'
                      : 'bg-foreground/5 border border-border/50 text-foreground/70 hover:bg-foreground/10 hover:text-foreground'
                  }`}
                >
                  {root.name.split(' / ')[0]}
                  {c.symbol} ({c.name})
                </button>
              ))
            : SCALES.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSelectedScaleId(s.id)}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                    selectedScaleId === s.id
                      ? 'bg-cyan-500/20 border-2 border-cyan-400 text-cyan-300 font-bold shadow-[0_0_12px_rgba(6,182,212,0.2)]'
                      : 'bg-foreground/5 border border-border/50 text-foreground/70 hover:bg-foreground/10 hover:text-foreground'
                  }`}
                >
                  {root.name.split(' / ')[0]} {s.name}
                </button>
              ))}
        </div>
      </div>

      {/* Selected Info Card */}
      <div className="border-border bg-foreground/5 rounded-2xl border p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-lg font-black text-amber-400">
              {root.name.split(' / ')[0]}
              {mode === 'chord' ? activeChord.symbol : ''}
            </span>
            <span className="text-sm font-bold text-foreground">
              - {mode === 'chord' ? activeChord.fullName : activeScale.fullName}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            Công thức phách: <strong className="text-foreground">{mode === 'chord' ? activeChord.formula : activeScale.formula}</strong>
          </p>
          <p className="text-xs text-foreground/80 font-medium">
            {mode === 'chord' ? activeChord.desc : activeScale.desc}
          </p>
        </div>

        {/* Audio Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => playSound(activePitches, false)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs shadow-md hover:bg-amber-400 transition cursor-pointer"
          >
            <Volume2 size={16} />
            <span>{mode === 'chord' ? 'Phát Hợp Âm' : 'Phát Tất Cả'}</span>
          </button>
          {mode === 'chord' && (
            <button
              type="button"
              onClick={() => playSound(activePitches, true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-foreground/10 border border-border text-foreground font-semibold text-xs hover:bg-foreground/20 transition cursor-pointer"
            >
              <span>Phát Rải (Arpeggio)</span>
            </button>
          )}
        </div>
      </div>

      {/* Hand Fingering View Switcher */}
      <div className="flex items-center justify-between pt-2">
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          3. Sơ Đồ Phím Đàn & Thế Bấm Ngón (Fingering):
        </label>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground font-medium">Xem thế bấm:</span>
          <button
            type="button"
            onClick={() => setHandView('rh')}
            className={`px-3 py-1 text-xs font-bold rounded-lg transition cursor-pointer ${
              handView === 'rh'
                ? 'bg-amber-500 text-slate-950 font-bold shadow'
                : 'bg-foreground/5 text-foreground/70 hover:bg-foreground/10'
            }`}
          >
            ✋ Tay Phải (RH)
          </button>
          <button
            type="button"
            onClick={() => setHandView('lh')}
            className={`px-3 py-1 text-xs font-bold rounded-lg transition cursor-pointer ${
              handView === 'lh'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow'
                : 'bg-foreground/5 text-foreground/70 hover:bg-foreground/10'
            }`}
          >
            🤚 Tay Trái (LH)
          </button>
        </div>
      </div>

      {/* Visual Interactive Piano Keyboard with Fingering Badges */}
      <div className="border-border bg-slate-950 rounded-2xl border p-4 shadow-inner overflow-x-auto custom-scrollbar">
        <div className="relative flex h-48 w-full min-w-[640px] justify-center select-none">
          {keys.map((k) => {
            const isActive = activePitches.includes(k.pitch)
            const fingerNum = pitchFingeringMap[k.pitch]

            if (!k.isBlack) {
              return (
                <div
                  key={k.pitch}
                  onClick={() => playSound([k.pitch], false)}
                  className={`relative flex flex-col justify-end items-center pb-2 w-10 border-r border-slate-300 rounded-b-md transition-colors cursor-pointer ${
                    isActive ? 'bg-amber-200 shadow-[inset_0_-8px_16px_rgba(245,158,11,0.5)]' : 'bg-white hover:bg-slate-100'
                  }`}
                >
                  {isActive && fingerNum && (
                    <div
                      className={`absolute top-4 flex h-7 w-7 items-center justify-center rounded-full text-xs font-black shadow-md ${
                        handView === 'rh'
                          ? 'bg-amber-500 text-slate-950 ring-2 ring-amber-300'
                          : 'bg-cyan-500 text-slate-950 ring-2 ring-cyan-300'
                      }`}
                    >
                      {fingerNum}
                    </div>
                  )}
                  <span className={`text-[10px] font-bold ${isActive ? 'text-amber-900 font-extrabold' : 'text-slate-500'}`}>
                    {k.name}
                  </span>
                </div>
              )
            }
            return null
          })}

          {/* Black Keys Layer */}
          <div className="absolute top-0 left-0 right-0 flex h-28 w-full min-w-[640px] justify-center pointer-events-none">
            {keys.map((k, i) => {
              if (k.isBlack) {
                const isActive = activePitches.includes(k.pitch)
                const fingerNum = pitchFingeringMap[k.pitch]
                // Offset index relative to white keys for alignment
                const whiteKeyOffset = keys.slice(0, i).filter((x) => !x.isBlack).length
                const leftPos = whiteKeyOffset * 40 - 13

                return (
                  <div
                    key={k.pitch}
                    onClick={(e) => {
                      e.stopPropagation()
                      playSound([k.pitch], false)
                    }}
                    style={{ left: `${leftPos}px` }}
                    className={`absolute z-20 flex flex-col justify-end items-center pb-2 w-6 h-28 rounded-b-md transition-colors cursor-pointer pointer-events-auto shadow-md ${
                      isActive ? 'bg-amber-500 border border-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.8)]' : 'bg-slate-900 hover:bg-slate-800 border border-slate-700'
                    }`}
                  >
                    {isActive && fingerNum && (
                      <div
                        className={`absolute top-3 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-black shadow ${
                          handView === 'rh'
                            ? 'bg-amber-300 text-slate-950 ring-1 ring-amber-500'
                            : 'bg-cyan-300 text-slate-950 ring-1 ring-cyan-500'
                        }`}
                      >
                        {fingerNum}
                      </div>
                    )}
                    <span className={`text-[9px] font-bold ${isActive ? 'text-slate-950' : 'text-slate-400'}`}>
                      {k.name.split('/')[0]}
                    </span>
                  </div>
                )
              }
              return null
            })}
          </div>
        </div>
      </div>

      {/* Fingering Reference Note */}
      <div className="border-border bg-foreground/5 rounded-xl border p-3 text-xs text-muted-foreground flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <span className="font-bold text-foreground">Ký hiệu ngón tay (Fingering):</span>
          <span>1: Ngón Cái (Thumb)</span>
          <span>2: Ngón Trỏ (Index)</span>
          <span>3: Ngón Giữa (Middle)</span>
          <span>4: Ngón Áp Út (Ring)</span>
          <span>5: Ngón Út (Pinky)</span>
        </div>
      </div>
    </div>
  )
}
