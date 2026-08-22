import { InteractivePianoKeyboard, type PianoKeyInfo } from '@/components'
import { getPianoKeyInfo } from '@/components/InteractivePianoKeyboard'
import { BookOpen, Clock, Music, Sliders, Sparkles, Volume2 } from 'lucide-react'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

function playPianoTone(freq: number) {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext
    if (!AudioCtx) return
    const ctx = new AudioCtx()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'triangle'
    osc.frequency.setValueAtTime(freq, ctx.currentTime)

    gain.gain.setValueAtTime(0.35, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start()
    osc.stop(ctx.currentTime + 1.2)
  } catch (e) {
    console.error(e)
  }
}

export function MusicFundamentalsSection() {
  const { t } = useTranslation()
  const [selectedKey, setSelectedKey] = useState<PianoKeyInfo>(() => getPianoKeyInfo(60)) // Default C4 (Middle C)
  const [highlightMode, setHighlightMode] = useState<string>('all')

  const handleKeyClick = (key: PianoKeyInfo) => {
    setSelectedKey(key)
    playPianoTone(key.freq)
  }

  return (
    <section className="mx-auto max-w-5xl space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="bg-primary/10 text-primary border-primary/20 rounded-2xl border p-3 shadow-md">
          <BookOpen className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-foreground text-2xl font-semibold tracking-tight md:text-3xl">
            {t('theory.fundamentals.title', 'Music Theory Fundamentals & Keyboard')}
          </h2>
          <p className="text-muted-foreground text-xs md:text-sm">
            {t(
              'theory.fundamentals.subtitle',
              'Essential building blocks for reading sheet music and mastering the keyboard',
            )}
          </p>
        </div>
      </div>

      {/* Main Glassmorphic Piano Keyboard Showcase */}
      <div className="glass-card space-y-6 overflow-hidden rounded-3xl border border-white/10 p-6 shadow-xl md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1.5 text-xs font-medium text-amber-400">
              <Volume2 className="h-4 w-4" />
              <span>
                {t(
                  'theory.fundamentals.interactive_keyboard_title',
                  'Interactive Sound-Playing Piano Keyboard',
                )}
              </span>
            </div>
            <p className="text-muted-foreground mt-1 text-xs md:text-sm">
              {t(
                'theory.fundamentals.interactive_keyboard_subtitle',
                'Click on keys below to listen to pitch sounds, view Hz frequencies, and see note placement on the musical staff.',
              )}
            </p>
          </div>

          {/* Mode Selector Chips */}
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'all', label: t('theory.fundamentals.modes.all', 'All Keys') },
              {
                id: 'middle_c',
                label: t('theory.fundamentals.modes.middle_c', 'Middle C (C4)'),
              },
              {
                id: 'treble',
                label: t('theory.fundamentals.modes.treble', 'Treble Clef (Right Hand)'),
              },
              {
                id: 'bass',
                label: t('theory.fundamentals.modes.bass', 'Bass Clef (Left Hand)'),
              },
              {
                id: 'black_keys',
                label: t('theory.fundamentals.modes.black_keys', 'Black Key Clusters (2 & 3)'),
              },
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => setHighlightMode(m.id)}
                className={`cursor-pointer rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                  highlightMode === m.id
                    ? 'bg-amber-400 text-black shadow-md'
                    : 'bg-foreground/5 text-foreground/70 hover:bg-foreground/10 hover:text-foreground'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* 2-Octave Glassmorphic Piano Keyboard */}
        <InteractivePianoKeyboard
          startPitch={48}
          endPitch={72}
          selectedPitch={selectedKey.pitch}
          onKeyClick={handleKeyClick}
          highlightMode={highlightMode as any}
          whiteKeyWidth={44}
          heightClass="h-44"
          className="mx-auto max-w-4xl shadow-2xl"
        />

        {/* Dynamic Note Analysis HUD Grid */}
        <div className="grid gap-4 md:grid-cols-12">
          {/* Key Details Card */}
          <div className="border-border bg-card/40 flex flex-col justify-between space-y-3 rounded-2xl border p-5 shadow-sm md:col-span-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-500/20 text-lg font-semibold text-amber-400 shadow-sm">
                  {selectedKey.name}
                </span>
                <div>
                  <h4 className="text-foreground font-semibold">
                    {selectedKey.name} -{' '}
                    {t(
                      `theory.fundamentals.solfege.${selectedKey.pitch % 12}`,
                      selectedKey.solfegeEn,
                    )}
                  </h4>
                  <span className="text-muted-foreground font-mono text-xs">
                    MIDI Note: {selectedKey.pitch} | {selectedKey.freq.toFixed(1)} Hz
                  </span>
                </div>
              </div>

              <button
                onClick={() => playPianoTone(selectedKey.freq)}
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl bg-amber-500 font-medium text-black shadow-md transition hover:scale-105 active:scale-95"
                title={t('theory.fundamentals.replay_sound', 'Play sound for this note')}
              >
                <Volume2 className="h-5 w-5" />
              </button>
            </div>

            <div className="text-foreground/80 border-border/50 border-t pt-2 text-xs leading-relaxed">
              {selectedKey.name === 'C4' && (
                <p className="font-medium text-amber-300">
                  🌟 <strong>{t('theory.fundamentals.middle_c_title', 'Middle C (C4)')}:</strong>{' '}
                  {t(
                    'theory.fundamentals.middle_c_desc',
                    'Key benchmark dividing Treble and Bass clefs.',
                  )}
                </p>
              )}
              {selectedKey.clef === 'treble' && selectedKey.name !== 'C4' && (
                <p>
                  🎼{' '}
                  <strong>{t('theory.fundamentals.clefs_treble', 'Treble Clef (Treble):')}</strong>{' '}
                  {t(
                    'theory.fundamentals.clefs_treble_desc',
                    'Higher pitch range, played with the right hand.',
                  )}
                </p>
              )}
              {selectedKey.clef === 'bass' && (
                <p>
                  🎶 <strong>{t('theory.fundamentals.clefs_bass', 'Bass Clef (Bass):')}</strong>{' '}
                  {t(
                    'theory.fundamentals.clefs_bass_desc',
                    'Lower pitch range, played with the left hand.',
                  )}
                </p>
              )}
            </div>
          </div>

          {/* Interactive Staff SVG */}
          <div className="border-border bg-card/40 flex flex-col items-center justify-center rounded-2xl border p-4 shadow-sm md:col-span-7">
            <div className="text-muted-foreground mb-1 flex items-center gap-1.5 text-xs font-medium">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              <span>
                {t('theory.fundamentals.staff_visual_title', 'Visual Note Position on Staff:')}{' '}
                <strong className="font-semibold text-amber-400">{selectedKey.name}</strong>
              </span>
            </div>
            <InteractiveStaffSvg keyData={selectedKey} />
          </div>
        </div>
      </div>

      {/* Grid of Theory Fundamentals Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Clefs Explanation */}
        <div className="glass-card group relative flex flex-col justify-between rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="bg-foreground/5 border-border rounded-xl border p-2">
                <Music className="text-primary h-5 w-5" />
              </div>
              <h3 className="text-foreground text-lg font-semibold">
                {t('theory.fundamentals.clefs_title', 'Treble & Bass Clefs')}
              </h3>
            </div>
            <p className="text-muted-foreground text-xs leading-relaxed md:text-sm">
              Clefs indicate the pitch of written notes:
            </p>
            <div className="space-y-2 pt-2">
              <div className="border-border bg-foreground/5 rounded-xl border p-3">
                <span className="text-xs font-semibold text-amber-400">
                  🎼 Treble Clef (G Clef)
                </span>
                <p className="text-muted-foreground mt-1 text-xs">
                  {t(
                    'theory.fundamentals.clefs_treble',
                    'Used for higher notes, played with the right hand.',
                  )}
                </p>
              </div>
              <div className="border-border bg-foreground/5 rounded-xl border p-3">
                <span className="text-xs font-semibold text-cyan-400">🎶 Bass Clef (F Clef)</span>
                <p className="text-muted-foreground mt-1 text-xs">
                  {t(
                    'theory.fundamentals.clefs_bass',
                    'Used for lower notes, played with the left hand.',
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Accidentals & Semitones */}
        <div className="glass-card group relative flex flex-col justify-between rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="bg-foreground/5 border-border rounded-xl border p-2">
                <Sliders className="text-primary h-5 w-5" />
              </div>
              <h3 className="text-foreground text-lg font-semibold">
                {t('theory.fundamentals.accidentals_title', 'Accidentals & Semitones')}
              </h3>
            </div>

            <div className="text-muted-foreground space-y-2.5 text-xs">
              <div className="border-border bg-foreground/5 rounded-xl border p-3">
                <span className="text-xs font-semibold text-amber-400">♯ Sharp</span>
                <p className="mt-0.5">
                  {t(
                    'theory.fundamentals.sharp',
                    'Raises pitch by a semitone (half-step to adjacent right key).',
                  )}
                </p>
              </div>
              <div className="border-border bg-foreground/5 rounded-xl border p-3">
                <span className="text-xs font-semibold text-cyan-400">♭ Flat</span>
                <p className="mt-0.5">
                  {t(
                    'theory.fundamentals.flat',
                    'Lowers pitch by a semitone (half-step to adjacent left key).',
                  )}
                </p>
              </div>
              <div className="border-border bg-foreground/5 rounded-xl border p-3">
                <span className="text-xs font-semibold text-emerald-400">♮ Natural</span>
                <p className="mt-0.5">
                  {t(
                    'theory.fundamentals.natural',
                    'Cancels a sharp or flat, returning to natural pitch.',
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Note Durations Card */}
        <div className="glass-card group relative flex flex-col justify-between rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl md:col-span-2">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="bg-foreground/5 border-border rounded-xl border p-2">
                <Clock className="text-primary h-5 w-5" />
              </div>
              <h3 className="text-foreground text-lg font-semibold">
                {t('theory.fundamentals.durations_title', 'Note Values & Durations')}
              </h3>
            </div>

            <div className="grid gap-4 pt-2 sm:grid-cols-2 lg:grid-cols-4">
              <div className="border-border bg-foreground/5 flex flex-col items-center justify-center rounded-xl border p-4 text-center">
                <div className="mb-2.5 flex h-11 w-11 items-center justify-center rounded-full border border-amber-400/40 bg-amber-400/10">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-6 w-6 fill-none stroke-current stroke-[2.5] text-amber-400"
                  >
                    <ellipse cx="12" cy="12" rx="6.5" ry="4" transform="rotate(-20 12 12)" />
                  </svg>
                </div>
                <span className="text-foreground text-xs font-medium">Nốt Tròn (Whole Note)</span>
                <span className="mt-1 text-xs font-semibold text-amber-400">4 Nhịp (Beats)</span>
                <span className="text-muted-foreground mt-1 text-[11px]">
                  Đầu rỗng, không có đuôi
                </span>
              </div>

              <div className="border-border bg-foreground/5 flex flex-col items-center justify-center rounded-xl border p-4 text-center">
                <div className="mb-2.5 flex h-11 w-11 items-center justify-center rounded-full border border-cyan-400/40 bg-cyan-400/10">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-6 w-6 fill-none stroke-current stroke-[2] text-cyan-400"
                  >
                    <ellipse cx="9" cy="15" rx="4.5" ry="3" transform="rotate(-20 9 15)" />
                    <path d="M13 15 V4" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <span className="text-foreground text-xs font-medium">Nốt Trắng (Half Note)</span>
                <span className="mt-1 text-xs font-semibold text-cyan-400">2 Nhịp (Beats)</span>
                <span className="text-muted-foreground mt-1 text-[11px]">
                  Đầu rỗng, có đuôi thẳng
                </span>
              </div>

              <div className="border-border bg-foreground/5 flex flex-col items-center justify-center rounded-xl border p-4 text-center">
                <div className="mb-2.5 flex h-11 w-11 items-center justify-center rounded-full border border-emerald-400/40 bg-emerald-400/10">
                  <svg viewBox="0 0 24 24" className="h-6 w-6 text-emerald-400">
                    <ellipse
                      cx="9"
                      cy="15"
                      rx="4.5"
                      ry="3"
                      transform="rotate(-20 9 15)"
                      className="fill-current"
                    />
                    <path
                      d="M13 15 V4"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <span className="text-foreground text-xs font-medium">Nốt Đen (Quarter Note)</span>
                <span className="mt-1 text-xs font-semibold text-emerald-400">1 Nhịp (Beat)</span>
                <span className="text-muted-foreground mt-1 text-[11px]">
                  Đầu đặc, có đuôi thẳng
                </span>
              </div>

              <div className="border-border bg-foreground/5 flex flex-col items-center justify-center rounded-xl border p-4 text-center">
                <div className="mb-2.5 flex h-11 w-11 items-center justify-center rounded-full border border-fuchsia-400/40 bg-fuchsia-400/10">
                  <svg viewBox="0 0 24 24" className="h-6 w-6 text-fuchsia-400">
                    <ellipse
                      cx="8.5"
                      cy="15"
                      rx="4.2"
                      ry="3"
                      transform="rotate(-20 8.5 15)"
                      className="fill-current"
                    />
                    <path
                      d="M12.5 15 V4"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M12.5 4 Q 17 6 17 10"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </svg>
                </div>
                <span className="text-foreground text-xs font-medium">Nốt Móc Đơn (Eighth)</span>
                <span className="mt-1 text-xs font-semibold text-fuchsia-400">1/2 Nhịp (Beat)</span>
                <span className="text-muted-foreground mt-1 text-[11px]">
                  Đầu đặc, có đuôi & 1 lá móc
                </span>
              </div>
            </div>

            {/* TIME SIGNATURES SECTION (GIẢI THÍCH CHỈ SỐ NHỊP) */}
            <div
              id="time-signatures"
              className="border-border bg-foreground/5 mt-8 space-y-6 rounded-2xl border p-6"
            >
              <div className="border-border/60 flex items-center gap-3 border-b pb-3">
                <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-2 text-amber-400">
                  <span className="block font-mono text-xl leading-none font-bold">4/4</span>
                </div>
                <div>
                  <h3 className="text-foreground text-lg font-semibold">
                    Giải Thích Dễ Hiểu Về Chỉ Số Nhịp (Time Signatures)
                  </h3>
                  <p className="text-muted-foreground text-xs font-normal">
                    Ý nghĩa của 2 con số đứng đầu khuông nhạc (2/4, 3/4, 4/4, 6/8) và cách đếm phách
                    chuẩn.
                  </p>
                </div>
              </div>

              {/* Anatomy of Time Signature */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="border-border bg-card/60 flex items-center gap-4 rounded-xl border p-4">
                  <div className="flex h-16 w-14 flex-col items-center justify-center rounded-xl border border-amber-400 bg-amber-500/20 font-mono text-2xl font-bold text-amber-300 shadow-md">
                    <span>4</span>
                    <div className="my-0.5 h-0.5 w-8 bg-amber-400/60" />
                    <span>4</span>
                  </div>
                  <div className="space-y-1.5 text-xs">
                    <p>
                      <strong className="font-semibold text-amber-400">Số Trên (Tử Số = 4):</strong>{' '}
                      Số lượng phách nằm trong mỗi ô nhịp.
                    </p>
                    <p>
                      <strong className="font-semibold text-cyan-400">Số Dưới (Mẫu Số = 4):</strong>{' '}
                      Giá trị độ dài của 1 phách (Số 4 = Nốt Đen).
                    </p>
                  </div>
                </div>

                <div className="border-border bg-card/60 space-y-2 rounded-xl border p-4 text-xs">
                  <span className="block font-semibold tracking-wider text-amber-400 uppercase">
                    💡 Quy tắc nhớ nhanh:
                  </span>
                  <p className="text-muted-foreground leading-relaxed">
                    Mẫu số là <strong className="text-foreground font-semibold">4</strong> nghĩa là
                    mỗi phách được tính bằng 1 nốt đen. Mẫu số là{' '}
                    <strong className="text-foreground font-semibold">8</strong> nghĩa là mỗi phách
                    tính bằng 1 nốt móc đơn.
                  </p>
                </div>
              </div>

              {/* Common Time Signatures Cards */}
              <div className="grid gap-4 pt-2 sm:grid-cols-2 lg:grid-cols-4">
                {/* 4/4 */}
                <div className="border-border bg-card flex flex-col justify-between space-y-3 rounded-xl border p-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-2xl font-bold text-amber-400">4 / 4</span>
                      <span className="rounded-full border border-amber-500/20 bg-amber-500/10 px-2 py-0.5 text-[10px] font-medium text-amber-400">
                        Phổ Biến Nhất
                      </span>
                    </div>
                    <span className="text-foreground mt-1 block text-xs font-semibold">
                      Nhịp 4 Phách (Common)
                    </span>
                    <p className="text-muted-foreground mt-1 text-[11px]">
                      Đếm: <strong className="font-semibold text-amber-400">1</strong> - 2 -{' '}
                      <strong className="font-semibold text-amber-200">3</strong> - 4. (Phách 1
                      MẠNH, phách 3 Nhẹ-Vừa).
                    </p>
                  </div>
                  <p className="text-foreground/70 bg-foreground/5 rounded-lg p-2 text-[10px] italic">
                    Thường gặp: Nhạc Pop, Ballad, Rock, Disco.
                  </p>
                </div>

                {/* 3/4 */}
                <div className="border-border bg-card flex flex-col justify-between space-y-3 rounded-xl border p-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-2xl font-bold text-cyan-400">3 / 4</span>
                      <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-2 py-0.5 text-[10px] font-medium text-cyan-400">
                        Nhạc Waltz
                      </span>
                    </div>
                    <span className="text-foreground mt-1 block text-xs font-semibold">
                      Nhịp 3 Phách (Valse)
                    </span>
                    <p className="text-muted-foreground mt-1 text-[11px]">
                      Đếm: <strong className="font-semibold text-cyan-400">1</strong> - 2 - 3. "Bùm
                      - chát - chát" (Phách 1 MẠNH, 2 & 3 Nhẹ).
                    </p>
                  </div>
                  <p className="text-foreground/70 bg-foreground/5 rounded-lg p-2 text-[10px] italic">
                    Thường gặp: Điệu Waltz, Dòng nhạc khiêu vũ cổ điển.
                  </p>
                </div>

                {/* 2/4 */}
                <div className="border-border bg-card flex flex-col justify-between space-y-3 rounded-xl border p-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-2xl font-bold text-emerald-400">2 / 4</span>
                      <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
                        Hành Khúc
                      </span>
                    </div>
                    <span className="text-foreground mt-1 block text-xs font-semibold">
                      Nhịp 2 Phách (March)
                    </span>
                    <p className="text-muted-foreground mt-1 text-[11px]">
                      Đếm: <strong className="font-semibold text-emerald-400">1</strong> - 2. "Một -
                      hai, Một - hai" (Phách 1 MẠNH, phách 2 Nhẹ).
                    </p>
                  </div>
                  <p className="text-foreground/70 bg-foreground/5 rounded-lg p-2 text-[10px] italic">
                    Thường gặp: Nhạc Diễu Hành, Nhạc Thiếu Nhi.
                  </p>
                </div>

                {/* 6/8 */}
                <div className="border-border bg-card flex flex-col justify-between space-y-3 rounded-xl border p-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-2xl font-bold text-fuchsia-400">6 / 8</span>
                      <span className="rounded-full border border-fuchsia-500/20 bg-fuchsia-500/10 px-2 py-0.5 text-[10px] font-medium text-fuchsia-400">
                        Trữ Tình
                      </span>
                    </div>
                    <span className="text-foreground mt-1 block text-xs font-semibold">
                      Nhịp Kép (Compound)
                    </span>
                    <p className="text-muted-foreground mt-1 text-[11px]">
                      Đếm: <strong className="font-semibold text-fuchsia-400">1</strong>-2-3 -{' '}
                      <strong className="font-semibold text-fuchsia-200">4</strong>-5-6 (Phách 1 & 4
                      MẠNH).
                    </p>
                  </div>
                  <p className="text-foreground/70 bg-foreground/5 rounded-lg p-2 text-[10px] italic">
                    Thường gặp: Slow Rock, Nhạc trữ tình bồng bềnh.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Helper to calculate exact diatonic step (C=0, D=1, E=2, F=3, G=4, A=5, B=6)
function getDiatonicIndex(name: string, octave: number): number {
  const step = name.charAt(0).toUpperCase()
  const stepMap: Record<string, number> = {
    C: 0,
    D: 1,
    E: 2,
    F: 3,
    G: 4,
    A: 5,
    B: 6,
  }
  const stepIndex = stepMap[step] ?? 0
  return octave * 7 + stepIndex
}

// Interactive SVG Musical Staff showing exact note position on staff
function InteractiveStaffSvg({ keyData }: { keyData: PianoKeyInfo }) {
  const { t } = useTranslation()
  const isTreble = keyData.clef === 'treble'
  const diatonic = getDiatonicIndex(keyData.name, keyData.octave)

  // Reference lines (5 lines at y = [20, 32, 44, 56, 68]):
  // Treble Clef: Line 1 (bottom line, y=68) is E4 (diatonic 30)
  // Bass Clef: Line 1 (bottom line, y=68) is G2 (diatonic 18)
  const refIndex = isTreble ? 30 : 18
  const noteY = 68 - (diatonic - refIndex) * 6

  // Dynamic ledger lines needed for notes outside the 5 staff lines
  const ledgerLines: number[] = []
  if (noteY >= 80) {
    // Below staff (e.g. C4 at y=80 on Treble, or A3 at y=92)
    for (let ly = 80; ly <= noteY + 1; ly += 12) {
      ledgerLines.push(ly)
    }
  } else if (noteY <= 8) {
    // Above staff (e.g. C4 at y=8 on Bass, or A5 at y=8 on Treble)
    for (let ly = 8; ly >= noteY - 1; ly -= 12) {
      ledgerLines.push(ly)
    }
  }

  // Standard notation stem direction:
  // Notes below middle line (Line 3 at y=44) have stems pointing UP on the right side.
  // Notes on or above middle line have stems pointing DOWN on the left side.
  const stemUp = noteY > 44

  return (
    <svg className="h-32 w-full max-w-[360px]" viewBox="0 0 340 108">
      {/* Background container */}
      <rect x="6" y="4" width="328" height="100" rx="12" fill="none" />

      {/* 5 Staff lines (E4, G4, B4, D5, F5 for Treble; G2, B2, D3, F3, A3 for Bass) */}
      {[20, 32, 44, 56, 68].map((y) => (
        <line
          key={y}
          x1="18"
          y1={y}
          x2="220"
          y2={y}
          stroke="currentColor"
          strokeWidth="1.2"
          opacity="0.4"
        />
      ))}

      {/* Clef Symbol */}
      <text
        x="24"
        y={isTreble ? 66 : 48}
        fill="currentColor"
        fontSize={isTreble ? '46' : '38'}
        fontWeight="bold"
        opacity="0.9"
        className="select-none"
      >
        {isTreble ? '𝄞' : '𝄢'}
      </text>

      {/* Dynamic Ledger Lines */}
      {ledgerLines.map((ly) => (
        <line
          key={ly}
          x1="108"
          y1={ly}
          x2="152"
          y2={ly}
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.85"
        />
      ))}

      {/* Accidental Sharp ♯ symbol if black key */}
      {keyData.isBlack && (
        <text
          x="108"
          y={noteY + 6}
          fill="#f59e0b"
          fontSize="18"
          fontWeight="bold"
          className="select-none"
        >
          ♯
        </text>
      )}

      {/* Active Note Head */}
      <ellipse
        cx="130"
        cy={noteY}
        rx="7.5"
        ry="5.2"
        transform={`rotate(-20 130 ${noteY})`}
        fill="#f59e0b"
        className="transition-all duration-200"
      />

      {/* Note Stem */}
      <line
        x1={stemUp ? 136.5 : 123.5}
        y1={noteY}
        x2={stemUp ? 136.5 : 123.5}
        y2={stemUp ? noteY - 28 : noteY + 28}
        stroke="#f59e0b"
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      {/* Note Pitch & Solfège Label Badge */}
      <g transform={`translate(160, ${Math.max(16, Math.min(88, noteY + 4))})`}>
        <rect
          x="0"
          y="-13"
          width="165"
          height="26"
          rx="8"
          fill="rgba(245, 158, 11, 0.15)"
          stroke="rgba(245, 158, 11, 0.5)"
          strokeWidth="1"
        />
        <text x="8" y="4" fill="#f59e0b" fontSize="11" fontWeight="bold">
          {keyData.name} -{' '}
          {t(`theory.fundamentals.solfege.${keyData.pitch % 12}`, keyData.solfegeEn)}
        </text>
      </g>
    </svg>
  )
}
