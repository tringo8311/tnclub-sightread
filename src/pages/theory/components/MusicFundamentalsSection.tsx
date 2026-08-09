import { BookOpen, Clock, Music, Sliders, Sparkles, Volume2 } from 'lucide-react'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { KeyData, PIANO_STRUCTURE } from './pianoData'

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
  const [selectedKey, setSelectedKey] = useState<KeyData>(PIANO_STRUCTURE[7]) // Default C4 (Middle C)
  const [highlightMode, setHighlightMode] = useState<string>('all')

  const handleKeyClick = (key: KeyData) => {
    setSelectedKey(key)
    playPianoTone(key.freq)
  }

  // Filter keys based on highlight mode
  const isKeyHighlighted = (key: KeyData) => {
    if (highlightMode === 'middle_c') return key.name === 'C4'
    if (highlightMode === 'treble') return key.clef === 'treble'
    if (highlightMode === 'bass') return key.clef === 'bass'
    if (highlightMode === 'black_keys') return key.isBlack
    return true
  }

  return (
    <section className="mx-auto max-w-5xl space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="bg-primary/10 text-primary border-primary/20 rounded-2xl border p-3 shadow-md">
          <BookOpen className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-foreground text-2xl font-bold tracking-tight md:text-3xl">
            {t('theory.fundamentals.title', 'Căn Bản Nhạc Lý & Bàn Phím Piano')}
          </h2>
          <p className="text-muted-foreground text-xs md:text-sm">
            {t(
              'theory.fundamentals.subtitle',
              'Nền tảng giúp bạn tự tin đọc bản nhạc và làm chủ bàn phím',
            )}
          </p>
        </div>
      </div>

      {/* Main Glassmorphic Piano Keyboard Showcase */}
      <div className="glass-card space-y-6 overflow-hidden rounded-3xl border border-white/10 p-6 shadow-xl md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1.5 text-xs font-semibold text-amber-400">
              <Volume2 className="h-4 w-4" />
              <span>Bàn Phím Piano Tương Tác & Âm Thanh Thật</span>
            </div>
            <p className="text-muted-foreground mt-1 text-xs md:text-sm">
              Click phím đàn bên dưới để nghe cao độ thực tế và xem vị trí hiển thị trên khuông
              nhạc.
            </p>
          </div>

          {/* Mode Selector Chips */}
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'all', label: t('theory.fundamentals.modes.all', 'Tất cả phím') },
              {
                id: 'middle_c',
                label: t('theory.fundamentals.modes.middle_c', 'Nốt Đô Giữa (C4)'),
              },
              { id: 'treble', label: t('theory.fundamentals.modes.treble', 'Khóa Sol (Tay phải)') },
              { id: 'bass', label: t('theory.fundamentals.modes.bass', 'Khóa Fa (Tay trái)') },
              {
                id: 'black_keys',
                label: t('theory.fundamentals.modes.black_keys', 'Cụm Phím Đen (2 & 3)'),
              },
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => setHighlightMode(m.id)}
                className={`cursor-pointer rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
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
        <div className="custom-scrollbar overflow-x-auto py-2 select-none">
          <div className="relative mx-auto flex h-40 max-w-4xl min-w-[640px] justify-center rounded-2xl border border-white/10 bg-neutral-950 p-2.5 shadow-2xl">
            <Interactive2DPianoKeyboard
              selectedKey={selectedKey}
              onKeyClick={handleKeyClick}
              isKeyHighlighted={isKeyHighlighted}
            />
          </div>
        </div>

        {/* Dynamic Note Analysis HUD Grid */}
        <div className="grid gap-4 md:grid-cols-12">
          {/* Key Details Card */}
          <div className="border-border bg-card/40 flex flex-col justify-between space-y-3 rounded-2xl border p-5 shadow-sm md:col-span-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-500/20 text-lg font-extrabold text-amber-400 shadow-sm">
                  {selectedKey.name}
                </span>
                <div>
                  <h4 className="text-foreground font-bold">{selectedKey.labelVi}</h4>
                  <span className="text-muted-foreground font-mono text-xs">
                    MIDI Note: {selectedKey.midi} | {selectedKey.freq} Hz
                  </span>
                </div>
              </div>

              <button
                onClick={() => playPianoTone(selectedKey.freq)}
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl bg-amber-500 font-bold text-black shadow-md transition hover:scale-105 active:scale-95"
                title="Phát lại âm thanh nốt này"
              >
                <Volume2 className="h-5 w-5" />
              </button>
            </div>

            <div className="text-foreground/80 border-border/50 border-t pt-2 text-xs leading-relaxed">
              {selectedKey.name === 'C4' && (
                <p className="font-medium text-amber-300">
                  🌟 <strong>Nốt Đô Giữa (Middle C4):</strong> Mốc ranh giới quan trọng nằm giữa
                  Khóa Sol và Khóa Fa.
                </p>
              )}
              {selectedKey.clef === 'treble' && selectedKey.name !== 'C4' && (
                <p>
                  🎼 <strong>Khóa Sol (Treble Clef):</strong> Thuộc quãng nốt cao, trình diễn bằng
                  tay phải.
                </p>
              )}
              {selectedKey.clef === 'bass' && (
                <p>
                  🎶 <strong>Khóa Fa (Bass Clef):</strong> Thuộc quãng nốt trầm, trình diễn bằng tay
                  trái.
                </p>
              )}
            </div>
          </div>

          {/* Interactive Staff SVG */}
          <div className="border-border bg-card/40 flex flex-col items-center justify-center rounded-2xl border p-4 shadow-sm md:col-span-7">
            <div className="text-muted-foreground mb-1 flex items-center gap-1.5 text-xs font-semibold">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              <span>
                Vị Trí Nốt Trực Quan Trên Khuông Nhạc:{' '}
                <strong className="text-amber-400">{selectedKey.name}</strong>
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
              <h3 className="text-foreground text-xl font-bold">
                {t('theory.fundamentals.clefs_title', 'Khóa Sol & Khóa Fa')}
              </h3>
            </div>
            <p className="text-muted-foreground text-xs leading-relaxed md:text-sm">
              Khóa nhạc là ký hiệu đầu khuông nhạc để xác định cao độ cố định của các nốt:
            </p>
            <div className="space-y-2 pt-2">
              <div className="border-border bg-foreground/5 rounded-xl border p-3">
                <span className="text-xs font-bold text-amber-400">🎼 Khóa Sol (Treble Clef)</span>
                <p className="text-muted-foreground mt-1 text-xs">
                  {t('theory.fundamentals.clefs_treble', 'Dùng cho nốt cao, chơi bằng tay phải.')}{' '}
                  Dòng kẻ thứ 2 từ dưới lên chính là nốt Sol4.
                </p>
              </div>
              <div className="border-border bg-foreground/5 rounded-xl border p-3">
                <span className="text-xs font-bold text-cyan-400">🎶 Khóa Fa (Bass Clef)</span>
                <p className="text-muted-foreground mt-1 text-xs">
                  {t('theory.fundamentals.clefs_bass', 'Dùng cho nốt trầm, chơi bằng tay trái.')}{' '}
                  Dòng kẻ thứ 4 từ dưới lên chính là nốt Fa3.
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
              <h3 className="text-foreground text-xl font-bold">
                {t('theory.fundamentals.accidentals_title', 'Dấu Hóa & Cung - Nửa Cung')}
              </h3>
            </div>

            <div className="text-muted-foreground space-y-2.5 text-xs">
              <div className="border-border bg-foreground/5 rounded-xl border p-3">
                <span className="text-xs font-bold text-amber-400">♯ Dấu Thăng (Sharp)</span>
                <p className="mt-0.5">
                  {t('theory.fundamentals.sharp', 'Nâng cao độ lên 1/2 cung (phím kề bên phải).')}
                </p>
              </div>
              <div className="border-border bg-foreground/5 rounded-xl border p-3">
                <span className="text-xs font-bold text-cyan-400">♭ Dấu Giáng (Flat)</span>
                <p className="mt-0.5">
                  {t('theory.fundamentals.flat', 'Hạ cao độ xuống 1/2 cung (phím kề bên trái).')}
                </p>
              </div>
              <div className="border-border bg-foreground/5 rounded-xl border p-3">
                <span className="text-xs font-bold text-emerald-400">♮ Dấu Bình (Natural)</span>
                <p className="mt-0.5">
                  {t(
                    'theory.fundamentals.natural',
                    'Hủy bỏ hiệu lực của dấu thăng hoặc giáng, trở về nốt tự nhiên.',
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
              <h3 className="text-foreground text-xl font-bold">
                {t('theory.fundamentals.durations_title', 'Trường Độ Nốt Nhạc & Nhịp Điệu')}
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
                <span className="text-foreground text-xs font-bold">Nốt Tròn (Whole Note)</span>
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
                <span className="text-foreground text-xs font-bold">Nốt Trắng (Half Note)</span>
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
                <span className="text-foreground text-xs font-bold">Nốt Đen (Quarter Note)</span>
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
                <span className="text-foreground text-xs font-bold">Nốt Móc Đơn (Eighth)</span>
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
                  <span className="block font-mono text-xl leading-none font-black">4/4</span>
                </div>
                <div>
                  <h3 className="text-foreground text-xl font-bold">
                    Giải Thích Dễ Hiểu Về Chỉ Số Nhịp (Time Signatures)
                  </h3>
                  <p className="text-muted-foreground text-xs font-medium">
                    Ý nghĩa của 2 con số đứng đầu khuông nhạc (2/4, 3/4, 4/4, 6/8) và cách đếm phách
                    chuẩn.
                  </p>
                </div>
              </div>

              {/* Anatomy of Time Signature */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="border-border bg-card/60 flex items-center gap-4 rounded-xl border p-4">
                  <div className="flex h-16 w-14 flex-col items-center justify-center rounded-xl border border-amber-400 bg-amber-500/20 font-mono text-2xl font-black text-amber-300 shadow-md">
                    <span>4</span>
                    <div className="my-0.5 h-0.5 w-8 bg-amber-400/60" />
                    <span>4</span>
                  </div>
                  <div className="space-y-1.5 text-xs">
                    <p>
                      <strong className="text-amber-400">Số Trên (Tử Số = 4):</strong> Số lượng
                      phách nằm trong mỗi ô nhịp.
                    </p>
                    <p>
                      <strong className="text-cyan-400">Số Dưới (Mẫu Số = 4):</strong> Giá trị độ
                      dài của 1 phách (Số 4 = Nốt Đen).
                    </p>
                  </div>
                </div>

                <div className="border-border bg-card/60 space-y-2 rounded-xl border p-4 text-xs">
                  <span className="block font-bold tracking-wider text-amber-400 uppercase">
                    💡 Quy tắc nhớ nhanh:
                  </span>
                  <p className="text-muted-foreground leading-relaxed">
                    Mẫu số là <strong>4</strong> nghĩa là mỗi phách được tính bằng 1 nốt đen. Mẫu số
                    là <strong>8</strong> nghĩa là mỗi phách tính bằng 1 nốt móc đơn.
                  </p>
                </div>
              </div>

              {/* Common Time Signatures Cards */}
              <div className="grid gap-4 pt-2 sm:grid-cols-2 lg:grid-cols-4">
                {/* 4/4 */}
                <div className="border-border bg-card flex flex-col justify-between space-y-3 rounded-xl border p-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-2xl font-black text-amber-400">4 / 4</span>
                      <span className="rounded-full border border-amber-500/20 bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold text-amber-400">
                        Phổ Biến Nhất
                      </span>
                    </div>
                    <span className="text-foreground mt-1 block text-xs font-bold">
                      Nhịp 4 Phách (Common)
                    </span>
                    <p className="text-muted-foreground mt-1 text-[11px]">
                      Đếm: <strong className="text-amber-400">1</strong> - 2 -{' '}
                      <strong className="text-amber-200">3</strong> - 4. (Phách 1 MẠNH, phách 3
                      Nhẹ-Vừa).
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
                      <span className="font-mono text-2xl font-black text-cyan-400">3 / 4</span>
                      <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-2 py-0.5 text-[10px] font-bold text-cyan-400">
                        Nhạc Waltz
                      </span>
                    </div>
                    <span className="text-foreground mt-1 block text-xs font-bold">
                      Nhịp 3 Phách (Valse)
                    </span>
                    <p className="text-muted-foreground mt-1 text-[11px]">
                      Đếm: <strong className="text-cyan-400">1</strong> - 2 - 3. "Bùm - chát - chát"
                      (Phách 1 MẠNH, 2 & 3 Nhẹ).
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
                      <span className="font-mono text-2xl font-black text-emerald-400">2 / 4</span>
                      <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                        Hành Khúc
                      </span>
                    </div>
                    <span className="text-foreground mt-1 block text-xs font-bold">
                      Nhịp 2 Phách (March)
                    </span>
                    <p className="text-muted-foreground mt-1 text-[11px]">
                      Đếm: <strong className="text-emerald-400">1</strong> - 2. "Một - hai, Một -
                      hai" (Phách 1 MẠNH, phách 2 Nhẹ).
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
                      <span className="font-mono text-2xl font-black text-fuchsia-400">6 / 8</span>
                      <span className="rounded-full border border-fuchsia-500/20 bg-fuchsia-500/10 px-2 py-0.5 text-[10px] font-bold text-fuchsia-400">
                        Trữ Tình
                      </span>
                    </div>
                    <span className="text-foreground mt-1 block text-xs font-bold">
                      Nhịp Kép (Compound)
                    </span>
                    <p className="text-muted-foreground mt-1 text-[11px]">
                      Đếm: <strong className="text-fuchsia-400">1</strong>-2-3 -{' '}
                      <strong className="text-fuchsia-200">4</strong>-5-6 (Phách 1 & 4 MẠNH).
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

// 2-Octave Glassmorphic 2D Interactive Piano Keyboard
function Interactive2DPianoKeyboard({
  selectedKey,
  onKeyClick,
  isKeyHighlighted,
}: {
  selectedKey: KeyData
  onKeyClick: (key: KeyData) => void
  isKeyHighlighted: (key: KeyData) => boolean
}) {
  return (
    <div className="relative flex h-full w-full justify-center overflow-hidden rounded-xl border border-white/20 bg-white shadow-2xl select-none">
      {PIANO_STRUCTURE.map((wKey) => {
        const isSelected = selectedKey.name === wKey.name
        const highlighted = isKeyHighlighted(wKey)
        const isMiddleC = wKey.name === 'C4'
        const bk = wKey.blackKey

        return (
          <div
            key={wKey.name}
            className="relative h-full flex-1 border-r border-black/20 last:border-0"
          >
            {/* White Key Button */}
            <button
              onClick={() => onKeyClick(wKey)}
              className={`relative h-full w-full cursor-pointer rounded-b-sm transition-all duration-150 hover:bg-amber-100 ${
                isSelected
                  ? 'translate-y-0.5 bg-amber-400 shadow-[inset_0_0_20px_rgba(245,158,11,0.9)]'
                  : isMiddleC
                    ? 'bg-amber-200/90'
                    : highlighted
                      ? 'bg-white'
                      : 'bg-gray-200 opacity-60'
              }`}
            >
              <div className="pointer-events-none absolute right-0 bottom-2 left-0 text-center text-[10px] font-bold text-black/80">
                {wKey.name}
              </div>
            </button>

            {/* Attached Black Key (if present) */}
            {bk && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onKeyClick(bk)
                }}
                className={`absolute top-0 right-0 z-20 h-[64%] w-[60%] translate-x-1/2 cursor-pointer rounded-b-md border border-white/30 shadow-xl transition-all duration-150 active:scale-y-[0.96] ${
                  selectedKey.name === bk.name
                    ? 'translate-y-0.5 bg-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.9)]'
                    : isKeyHighlighted(bk)
                      ? 'bg-gradient-to-b from-[#2d2d2d] via-[#1a1a1a] to-[#0a0a0a] hover:from-[#3d3d3d]'
                      : 'bg-gray-800 opacity-50'
                }`}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

// Interactive SVG Musical Staff showing note position
function InteractiveStaffSvg({ keyData }: { keyData: KeyData }) {
  const isTreble = keyData.clef === 'treble'

  const getNoteY = (midi: number) => {
    if (midi >= 60) {
      const semitoneOffset = midi - 60
      return 80 - semitoneOffset * 4.5
    } else {
      const semitoneOffset = 60 - midi
      return 8 + semitoneOffset * 4.5
    }
  }

  const noteY = getNoteY(keyData.midi)

  return (
    <svg className="h-28 w-full max-w-[280px]" viewBox="0 0 280 100">
      {/* 5 Staff lines */}
      {[20, 32, 44, 56, 68].map((y) => (
        <line
          key={y}
          x1="20"
          y1={y}
          x2="260"
          y2={y}
          stroke="currentColor"
          strokeWidth="1.2"
          opacity="0.4"
        />
      ))}

      {/* Clef Label */}
      <text x="30" y="52" fill="currentColor" fontSize="24" fontWeight="bold" opacity="0.8">
        {isTreble ? '𝄞' : '𝄢'}
      </text>

      {/* Ledger Line for C4 (Middle C) */}
      {keyData.name === 'C4' && (
        <line x1="130" y1="80" x2="160" y2="80" stroke="currentColor" strokeWidth="1.5" />
      )}

      {/* Active Note Head */}
      <ellipse
        cx="145"
        cy={noteY}
        rx="7"
        ry="5"
        transform={`rotate(-20 145 ${noteY})`}
        fill="#f59e0b"
        className="animate-pulse"
      />

      {/* Note Stem */}
      <line x1="151" y1={noteY} x2="151" y2={noteY - 24} stroke="#f59e0b" strokeWidth="2" />

      {/* Accidental Sharp # symbol if black key */}
      {keyData.isBlack && (
        <text x="126" y={noteY + 5} fill="#f59e0b" fontSize="16" fontWeight="bold">
          ♯
        </text>
      )}

      {/* Pitch Label */}
      <text x="170" y={noteY + 4} fill="#f59e0b" fontSize="12" fontWeight="bold">
        {keyData.name}
      </text>
    </svg>
  )
}
