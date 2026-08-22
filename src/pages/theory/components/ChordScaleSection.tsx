import { InteractivePianoKeyboard } from '@/components'
import { Volume2 } from 'lucide-react'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

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
    name: 'Major',
    fullName: 'Major Triad',
    intervals: [0, 4, 7],
    symbol: '',
    rhFingering: [1, 3, 5],
    lhFingering: [5, 3, 1],
    formula: '1 - 3 - 5',
    desc: 'Bright and uplifting triad chord, the foundation of classical and modern music.',
  },
  {
    id: 'minor',
    name: 'Minor',
    fullName: 'Minor Triad',
    intervals: [0, 3, 7],
    symbol: 'm',
    rhFingering: [1, 3, 5],
    lhFingering: [5, 3, 1],
    formula: '1 - ♭3 - 5',
    desc: 'Melancholic and smooth triad chord featuring a mellow minor third.',
  },
  {
    id: 'dom7',
    name: 'Dominant 7th',
    fullName: 'Dominant Seventh Chord',
    intervals: [0, 4, 7, 10],
    symbol: '7',
    rhFingering: [1, 2, 3, 5],
    lhFingering: [5, 3, 2, 1],
    formula: '1 - 3 - 5 - ♭7',
    desc: 'Tense bluesy seventh chord that resolves naturally to the tonic.',
  },
  {
    id: 'maj7',
    name: 'Major 7th',
    fullName: 'Major Seventh Chord',
    intervals: [0, 4, 7, 11],
    symbol: 'Maj7',
    rhFingering: [1, 2, 3, 5],
    lhFingering: [5, 3, 2, 1],
    formula: '1 - 3 - 5 - 7',
    desc: 'Lush and dreamy jazz harmony with an elegant major seventh interval.',
  },
  {
    id: 'min7',
    name: 'Minor 7th',
    fullName: 'Minor Seventh Chord',
    intervals: [0, 3, 7, 10],
    symbol: 'm7',
    rhFingering: [1, 2, 3, 5],
    lhFingering: [5, 3, 2, 1],
    formula: '1 - ♭3 - 5 - ♭7',
    desc: 'Warm, emotional, and versatile chord widely used in Jazz, R&B, and Pop.',
  },
  {
    id: 'dim',
    name: 'Diminished',
    fullName: 'Diminished Triad',
    intervals: [0, 3, 6],
    symbol: 'dim',
    rhFingering: [1, 3, 5],
    lhFingering: [5, 3, 1],
    formula: '1 - ♭3 - ♭5',
    desc: 'High tension and suspenseful diminished chord composed of minor thirds.',
  },
  {
    id: 'aug',
    name: 'Augmented',
    fullName: 'Augmented Triad',
    intervals: [0, 4, 8],
    symbol: 'aug',
    rhFingering: [1, 3, 5],
    lhFingering: [5, 3, 1],
    formula: '1 - 3 - ♯5',
    desc: 'Dreamlike, floating, and expansive augmented harmony.',
  },
  {
    id: 'sus4',
    name: 'Suspended 4th (Sus4)',
    fullName: 'Suspended Fourth Chord',
    intervals: [0, 5, 7],
    symbol: 'sus4',
    rhFingering: [1, 3, 5],
    lhFingering: [5, 3, 1],
    formula: '1 - 4 - 5',
    desc: 'Open and suspenseful harmony that replaces the third with a perfect fourth.',
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
    name: 'Major Scale',
    fullName: 'Natural Major Scale',
    intervals: [0, 2, 4, 5, 7, 9, 11, 12],
    rhFingering: [1, 2, 3, 1, 2, 3, 4, 5],
    lhFingering: [5, 4, 3, 2, 1, 3, 2, 1],
    formula: '1 - 2 - 3 - 4 - 5 - 6 - 7 - 8',
    desc: 'Bright, uplifting, and fundamental scale of Western music theory.',
  },
  {
    id: 'natural_minor',
    name: 'Natural Minor',
    fullName: 'Natural Minor Scale',
    intervals: [0, 2, 3, 5, 7, 8, 10, 12],
    rhFingering: [1, 2, 3, 1, 2, 3, 4, 5],
    lhFingering: [5, 4, 3, 2, 1, 3, 2, 1],
    formula: '1 - 2 - ♭3 - 4 - 5 - ♭6 - ♭7 - 8',
    desc: 'Classical minor scale with a somber, emotional tonal color.',
  },
  {
    id: 'harmonic_minor',
    name: 'Harmonic Minor',
    fullName: 'Harmonic Minor Scale',
    intervals: [0, 2, 3, 5, 7, 8, 11, 12],
    rhFingering: [1, 2, 3, 1, 2, 3, 4, 5],
    lhFingering: [5, 4, 3, 2, 1, 3, 2, 1],
    formula: '1 - 2 - ♭3 - 4 - 5 - ♭6 - 7 - 8',
    desc: 'Raised 7th degree creating an exotic, dramatic Middle Eastern flavor.',
  },
  {
    id: 'melodic_minor',
    name: 'Melodic Minor',
    fullName: 'Melodic Minor Scale',
    intervals: [0, 2, 3, 5, 7, 9, 11, 12],
    rhFingering: [1, 2, 3, 1, 2, 3, 4, 5],
    lhFingering: [5, 4, 3, 2, 1, 3, 2, 1],
    formula: '1 - 2 - ♭3 - 4 - 5 - 6 - 7 - 8',
    desc: 'Raised 6th and 7th degrees ascending, widely used in Jazz improvisation.',
  },
  {
    id: 'major_pentatonic',
    name: 'Major Pentatonic',
    fullName: 'Major Pentatonic Scale (5 Notes)',
    intervals: [0, 2, 4, 7, 9, 12],
    rhFingering: [1, 2, 3, 1, 2, 3],
    lhFingering: [5, 4, 3, 2, 1, 1],
    formula: '1 - 2 - 3 - 5 - 6 - 8',
    desc: 'Traditional Asian folk scale, sweet and very easy to improvise.',
  },
  {
    id: 'minor_pentatonic',
    name: 'Minor Pentatonic',
    fullName: 'Minor Pentatonic Scale (5 Notes)',
    intervals: [0, 3, 5, 7, 10, 12],
    rhFingering: [1, 2, 3, 1, 2, 3],
    lhFingering: [5, 4, 3, 2, 1, 1],
    formula: '1 - ♭3 - 4 - 5 - ♭7 - 8',
    desc: 'The quintessential foundation for Rock, Blues, and Jazz solos.',
  },
]

// Pitch to Note Name Helper
const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
const NOTE_SOLFEGE_EN = [
  'Do',
  'Do# / Reb',
  'Re',
  'Re# / Mib',
  'Mi',
  'Fa',
  'Fa# / Solb',
  'Sol',
  'Sol# / Lab',
  'La',
  'La# / Tib',
  'Ti',
]

function getNoteName(pitch: number): string {
  const name = NOTE_NAMES[pitch % 12]
  const octave = Math.floor(pitch / 12) - 1
  return `${name}${octave}`
}

export function ChordScaleSection() {
  const { t } = useTranslation()
  const [mode, setMode] = useState<'chord' | 'scale'>('chord')
  const [selectedRootIndex, setSelectedRootIndex] = useState(0)
  const [selectedChordId, setSelectedChordId] = useState('major')
  const [selectedScaleId, setSelectedScaleId] = useState('major_scale')
  const [handView, setHandView] = useState<'rh' | 'lh' | 'both'>('both')

  const root = ROOT_NOTES[selectedRootIndex]
  const activeChord = CHORDS.find((c) => c.id === selectedChordId) || CHORDS[0]
  const activeScale = SCALES.find((s) => s.id === selectedScaleId) || SCALES[0]

  // Calculate active MIDI pitches
  const activeIntervals = mode === 'chord' ? activeChord.intervals : activeScale.intervals
  const activePitches = activeIntervals.map((interval) => root.pitch + interval)

  // Fingering map for active pitches (RH & LH)
  const rhFingeringList = mode === 'chord' ? activeChord.rhFingering : activeScale.rhFingering
  const lhFingeringList = mode === 'chord' ? activeChord.lhFingering : activeScale.lhFingering

  const pitchRhFingeringMap: Record<number, number> = {}
  const pitchLhFingeringMap: Record<number, number> = {}

  activePitches.forEach((pitch, idx) => {
    pitchRhFingeringMap[pitch] = rhFingeringList[idx % rhFingeringList.length]
    pitchLhFingeringMap[pitch] = lhFingeringList[idx % lhFingeringList.length]
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

  return (
    <section className="mx-auto max-w-5xl space-y-8">
      <div className="border-border bg-card/60 space-y-6 rounded-2xl border p-6 shadow-xl backdrop-blur-md">
        <div className="border-border/60 flex flex-wrap items-center justify-between gap-4 border-b pb-4">
          <div>
            <h2 className="bg-gradient-to-r from-amber-400 via-amber-200 to-white bg-clip-text text-2xl font-bold text-transparent">
              {t('theory.chords_scales.title', 'Piano Chords & Scales Finder')}
            </h2>
            <p className="text-muted-foreground mt-1 text-xs font-medium">
              {t(
                'theory.chords_scales.subtitle',
                'Look up chord notes, intervals, finger numbers, and hear live audio playback',
              )}
            </p>
          </div>

          {/* Mode Switcher: Chord vs Scale */}
          <div className="glass-card flex items-center gap-1 !rounded-xl !p-1">
            <button
              type="button"
              onClick={() => setMode('chord')}
              className={`cursor-pointer rounded-lg px-4 py-1.5 text-xs font-semibold transition-all ${
                mode === 'chord'
                  ? 'bg-amber-500 font-bold text-slate-950 shadow-md'
                  : 'text-foreground/70 hover:text-foreground hover:bg-foreground/10'
              }`}
            >
              {t('theory.chords_scales.tab_chords', 'Chords')}
            </button>
            <button
              type="button"
              onClick={() => setMode('scale')}
              className={`cursor-pointer rounded-lg px-4 py-1.5 text-xs font-semibold transition-all ${
                mode === 'scale'
                  ? 'bg-cyan-500 font-bold text-slate-950 shadow-md'
                  : 'text-foreground/70 hover:text-foreground hover:bg-foreground/10'
              }`}
            >
              {t('theory.chords_scales.tab_scales', 'Scales')}
            </button>
          </div>
        </div>

        {/* Root Note Picker */}
        <div>
          <label className="text-muted-foreground mb-2 block text-xs font-semibold tracking-wider uppercase">
            {t('theory.chords_scales.root_select', '1. Select Root Note:')}
          </label>
          <div className="flex flex-wrap items-center gap-1.5">
            {ROOT_NOTES.map((r, idx) => (
              <button
                key={r.name}
                type="button"
                onClick={() => setSelectedRootIndex(idx)}
                className={`cursor-pointer rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                  selectedRootIndex === idx
                    ? 'bg-primary text-primary-foreground ring-primary/50 scale-105 font-bold ring-2'
                    : 'bg-foreground/5 text-foreground/80 hover:bg-foreground/15 border-border/50 border'
                }`}
              >
                {r.name.split(' / ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Type Selection (Chords or Scales) */}
        <div>
          <label className="text-muted-foreground mb-2 block text-xs font-semibold tracking-wider uppercase">
            {mode === 'chord'
              ? t('theory.chords_scales.chord_select', '2. Select Chord Type:')
              : t('theory.chords_scales.scale_select', '2. Select Scale Type:')}
          </label>
          <div className="flex flex-wrap items-center gap-2">
            {mode === 'chord'
              ? CHORDS.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setSelectedChordId(c.id)}
                    className={`cursor-pointer rounded-xl px-3.5 py-2 text-xs font-medium transition-all ${
                      selectedChordId === c.id
                        ? 'border-2 border-amber-400 bg-amber-500/20 font-semibold text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.2)]'
                        : 'bg-foreground/5 border-border/50 text-foreground/70 hover:bg-foreground/10 hover:text-foreground border'
                    }`}
                  >
                    {root.name.split(' / ')[0]}
                    {c.symbol} ({t(`theory.chords_scales.items.${c.id}.name`, c.name)})
                  </button>
                ))
              : SCALES.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSelectedScaleId(s.id)}
                    className={`cursor-pointer rounded-xl px-3.5 py-2 text-xs font-medium transition-all ${
                      selectedScaleId === s.id
                        ? 'border-2 border-cyan-400 bg-cyan-500/20 font-semibold text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.2)]'
                        : 'bg-foreground/5 border-border/50 text-foreground/70 hover:bg-foreground/10 hover:text-foreground border'
                    }`}
                  >
                    {root.name.split(' / ')[0]}{' '}
                    {t(`theory.chords_scales.items.${s.id}.name`, s.name)}
                  </button>
                ))}
          </div>
        </div>

        {/* Selected Info Card */}
        <div className="border-border bg-foreground/5 flex flex-wrap items-center justify-between gap-4 rounded-2xl border p-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-amber-400">
                {root.name.split(' / ')[0]}
                {mode === 'chord' ? activeChord.symbol : ''}
              </span>
              <span className="text-foreground text-sm font-semibold">
                -{' '}
                {mode === 'chord'
                  ? t(`theory.chords_scales.items.${activeChord.id}.fullName`, activeChord.fullName)
                  : t(
                      `theory.chords_scales.items.${activeScale.id}.fullName`,
                      activeScale.fullName,
                    )}
              </span>
            </div>
            <p className="text-muted-foreground text-xs">
              {t('theory.chords_scales.formula_label', 'Formula:')}{' '}
              <strong className="text-foreground">
                {mode === 'chord' ? activeChord.formula : activeScale.formula}
              </strong>
            </p>
            <p className="text-foreground/80 text-xs font-normal">
              {mode === 'chord'
                ? t(`theory.chords_scales.items.${activeChord.id}.desc`, activeChord.desc)
                : t(`theory.chords_scales.items.${activeScale.id}.desc`, activeScale.desc)}
            </p>

            {/* Spelled-out Notes in Chord / Scale */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="text-xs font-semibold text-amber-400">
                {t('theory.chords_scales.notes_in_chord', 'Notes:')}
              </span>
              <div className="flex flex-wrap items-center gap-1.5">
                {activePitches.map((p, idx) => (
                  <span
                    key={p}
                    className="inline-flex items-center gap-1 rounded-lg border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-xs font-medium text-amber-300 shadow-sm"
                  >
                    <span>
                      {NOTE_NAMES[p % 12]}
                      {Math.floor(p / 12) - 1}
                    </span>
                    <span className="text-muted-foreground text-[10px]">
                      ({t(`theory.fundamentals.solfege.${p % 12}`, NOTE_SOLFEGE_EN[p % 12])})
                    </span>
                    {idx < activePitches.length - 1 && (
                      <span className="text-muted-foreground/50 ml-0.5 text-[10px]">•</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Audio Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => playSound(activePitches, false)}
              className="flex cursor-pointer items-center gap-1.5 rounded-xl bg-amber-500 px-3.5 py-2 text-xs font-semibold text-slate-950 shadow-md transition hover:bg-amber-400"
            >
              <Volume2 size={16} />
              <span>
                {mode === 'chord'
                  ? t('theory.chords_scales.play_chord', 'Play Chord')
                  : t('theory.chords_scales.play_all', 'Play All')}
              </span>
            </button>
            {mode === 'chord' && (
              <button
                type="button"
                onClick={() => playSound(activePitches, true)}
                className="bg-foreground/10 border-border text-foreground hover:bg-foreground/20 flex cursor-pointer items-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-medium transition"
              >
                <span>{t('theory.chords_scales.play_arpeggio', 'Play Arpeggio')}</span>
              </button>
            )}
          </div>
        </div>

        {/* Hand Fingering View Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <label className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
            {t('theory.chords_scales.fingering_title', '3. Keyboard Diagram & Fingering:')}
          </label>
          <div className="bg-foreground/5 border-border/60 flex flex-wrap items-center gap-1.5 rounded-xl border p-1">
            <button
              type="button"
              onClick={() => setHandView('lh')}
              className={`flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                handView === 'lh'
                  ? 'bg-cyan-500 font-bold text-slate-950 shadow-md'
                  : 'text-foreground/70 hover:text-foreground hover:bg-foreground/10'
              }`}
            >
              <span>{t('theory.chords_scales.hand_lh', 'Left Hand (LH)')}</span>
            </button>
            <button
              type="button"
              onClick={() => setHandView('rh')}
              className={`flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                handView === 'rh'
                  ? 'bg-amber-500 font-bold text-slate-950 shadow-md'
                  : 'text-foreground/70 hover:text-foreground hover:bg-foreground/10'
              }`}
            >
              <span>{t('theory.chords_scales.hand_rh', 'Right Hand (RH)')}</span>
            </button>
            <button
              type="button"
              onClick={() => setHandView('both')}
              className={`flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                handView === 'both'
                  ? 'bg-emerald-500 font-bold text-slate-950 shadow-md'
                  : 'text-foreground/70 hover:text-foreground hover:bg-foreground/10'
              }`}
            >
              <span>{t('theory.chords_scales.hand_both', 'Both Hands (RH + LH)')}</span>
            </button>
          </div>
        </div>

        {/* Visual Interactive Piano Keyboard with Fingering Badges */}
        <InteractivePianoKeyboard
          startPitch={48}
          endPitch={96}
          activePitches={activePitches}
          rhFingeringMap={pitchRhFingeringMap}
          lhFingeringMap={pitchLhFingeringMap}
          handView={handView}
          onKeyClick={(key) => playSound([key.pitch], false)}
          whiteKeyWidth={40}
          heightClass="h-44"
          className="p-6"
        />

        {/* Fingering Reference Note */}
        <div className="border-border bg-foreground/5 text-muted-foreground flex flex-wrap items-center justify-between gap-2 rounded-xl border p-3 text-xs">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-foreground font-semibold">
              {t('theory.chords_scales.fingering_legend', 'Fingering notation:')}
            </span>
            <span>{t('theory.chords_scales.finger_thumb', '1: Thumb')}</span>
            <span>{t('theory.chords_scales.finger_index', '2: Index')}</span>
            <span>{t('theory.chords_scales.finger_middle', '3: Middle')}</span>
            <span>{t('theory.chords_scales.finger_ring', '4: Ring')}</span>
            <span>{t('theory.chords_scales.finger_pinky', '5: Pinky')}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
