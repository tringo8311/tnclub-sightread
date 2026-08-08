import { AppBar, MarketingFooter } from '@/components'
import { BookOpen, Clock, Hash, Layers, Music, Piano } from 'lucide-react'
import React from 'react'

export default function TheoryPage() {
  return (
    <div className="bg-background text-foreground selection:bg-primary/30 relative flex min-h-screen w-full flex-col">
      <AppBar />

      <main className="relative w-full flex-1">
        {/* Background Gradients for aesthetic */}
        <div className="from-primary/10 pointer-events-none absolute top-0 left-0 -z-10 h-[500px] w-full bg-gradient-to-b to-transparent" />
        <div className="bg-primary/10 pointer-events-none absolute top-1/4 right-0 -z-10 h-96 w-96 rounded-full blur-[100px]" />
        <div className="bg-primary/5 pointer-events-none absolute bottom-1/4 left-0 -z-10 h-96 w-96 rounded-full blur-[100px]" />

        <div className="mx-auto w-full max-w-(--breakpoint-lg) px-6 py-12 md:py-20">
          <div className="mb-16 space-y-4 text-center">
            <h1 className="from-foreground via-foreground to-foreground/60 bg-gradient-to-r bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
              Khám Phá Âm Nhạc
            </h1>
            <p className="text-foreground/70 mx-auto max-w-2xl text-lg">
              Nắm vững nền tảng nhạc lý và làm quen với đàn Piano để bắt đầu hành trình âm nhạc của
              bạn một cách tự tin nhất.
            </p>
          </div>

          <div className="space-y-16">
            {/* Section 1: Căn Bản Nhạc Lý */}
            <section>
              <div className="mb-8 flex items-center gap-3">
                <div className="bg-primary/10 text-primary border-primary/20 rounded-xl border p-3 shadow-[0_0_15px_hsl(var(--primary)/0.2)]">
                  <BookOpen size={28} />
                </div>
                <h2 className="text-foreground text-3xl font-semibold tracking-tight">
                  Căn Bản Nhạc Lý
                </h2>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <GlassCard
                  image="/images/theory_staff.png"
                  icon={<Layers className="text-primary" />}
                  title="Khuông Nhạc (Staff)"
                >
                  Khuông nhạc gồm 5 dòng kẻ song song và 4 khe nằm giữa các dòng kẻ. Các nốt nhạc
                  được đặt trên dòng kẻ hoặc trong khe để xác định cao độ. Nốt càng nằm cao trên
                  khuông nhạc thì âm thanh phát ra càng cao.
                </GlassCard>

                <GlassCard
                  image="/images/theory_clefs.png"
                  icon={<Music className="text-primary" />}
                  title="Khóa Sol & Khóa Fa"
                >
                  <ul className="text-foreground/80 list-inside list-disc space-y-2">
                    <li>
                      <strong className="text-foreground">Khóa Sol (Treble Clef):</strong> Thường
                      dùng cho các nốt cao, được chơi bằng tay phải. Nằm trên khuông nhạc phía trên.
                    </li>
                    <li>
                      <strong className="text-foreground">Khóa Fa (Bass Clef):</strong> Dùng cho các
                      nốt trầm, thường chơi bằng tay trái. Nằm trên khuông nhạc phía dưới.
                    </li>
                  </ul>
                </GlassCard>

                <GlassCard
                  customImage={<NoteNamesIllustration />}
                  icon={<Hash className="text-primary" />}
                  title="Tên Các Nốt Nhạc"
                >
                  Hệ thống nốt nhạc cơ bản gồm 7 nốt:
                  <div className="mt-3 flex flex-wrap gap-2">
                    {['Đô (C)', 'Rê (D)', 'Mi (E)', 'Fa (F)', 'Sol (G)', 'La (A)', 'Si (B)'].map(
                      (note) => (
                        <span
                          key={note}
                          className="bg-foreground/5 border-border text-foreground rounded-full border px-3 py-1 text-sm font-medium"
                        >
                          {note}
                        </span>
                      ),
                    )}
                  </div>
                  <p className="text-foreground/70 mt-3 text-sm">
                    Sau Si, chuỗi nốt lặp lại bắt đầu từ Đô ở quãng cao hơn.
                  </p>
                </GlassCard>

                <GlassCard
                  image="/images/theory_notes.png"
                  icon={<Clock className="text-primary" />}
                  title="Trường Độ Nốt Nhạc"
                >
                  Hình dáng của nốt nhạc cho biết bạn cần giữ nốt đó ngân vang trong bao lâu:
                  <ul className="text-foreground/80 mt-3 space-y-2 text-sm">
                    <li>
                      <strong className="text-foreground">Nốt tròn (Whole note):</strong> 4 nhịp
                    </li>
                    <li>
                      <strong className="text-foreground">Nốt trắng (Half note):</strong> 2 nhịp
                    </li>
                    <li>
                      <strong className="text-foreground">Nốt đen (Quarter note):</strong> 1 nhịp
                    </li>
                    <li>
                      <strong className="text-foreground">Nốt móc đơn (Eighth note):</strong> 1/2
                      nhịp
                    </li>
                  </ul>
                </GlassCard>
              </div>
            </section>

            {/* Section 2: Thông tin về đàn Piano */}
            <section>
              <div className="mb-8 flex items-center gap-3">
                <div className="bg-primary/10 text-primary border-primary/20 rounded-xl border p-3 shadow-[0_0_15px_hsl(var(--primary)/0.2)]">
                  <Piano size={28} />
                </div>
                <h2 className="text-foreground text-3xl font-semibold tracking-tight">
                  Thông Tin Về Đàn Piano
                </h2>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <GlassCard
                  customImage={<PianoKeyboardIllustration highlightC={false} />}
                  title="Bàn Phím Piano"
                >
                  Đàn Piano tiêu chuẩn có <strong>88 phím</strong> (52 phím trắng và 36 phím đen).
                  Các phím đen được xếp theo cụm 2 và cụm 3 xen kẽ nhau. Nhờ vào cụm phím đen, bạn
                  có thể dễ dàng xác định vị trí các phím trắng.
                </GlassCard>

                <GlassCard
                  customImage={<PianoKeyboardIllustration highlightC={true} />}
                  title="Nốt Đô (C) Nằm Ở Đâu?"
                >
                  Nốt Đô (C) luôn nằm <strong>ngay bên trái của cụm 2 phím đen</strong>. Dựa vào nốt
                  Đô, bạn có thể tịnh tiến lên để tìm các nốt Rê, Mi, Fa, Sol, La, Si theo chiều từ
                  trái sang phải.
                </GlassCard>

                <GlassCard
                  customImage={<PianoKeyboardIllustration highlightC={true} />}
                  title="Nốt Đô Giữa (Middle C)"
                >
                  Đây là nốt Đô nằm ở trung tâm của bàn phím đàn Piano (thường là C4). Nốt Đô giữa
                  đóng vai trò như một mốc tham chiếu quan trọng để chia ranh giới giữa Khóa Sol
                  (tay phải) và Khóa Fa (tay trái).
                </GlassCard>

                <div className="md:col-span-2 lg:col-span-3">
                  <GlassCard
                    customImage={<BlackWhiteKeysIllustration />}
                    title="Phím Trắng vs Phím Đen"
                  >
                    <div className="mt-2 grid gap-6 md:grid-cols-2">
                      <div>
                        <h4 className="text-foreground border-border mb-2 border-b pb-1 font-medium">
                          Phím Trắng (Nốt Tự Nhiên)
                        </h4>
                        <p className="text-foreground/75 text-sm leading-relaxed">
                          Chơi các nốt cơ bản (C, D, E, F, G, A, B). Không có dấu thăng hay dấu
                          giáng. Âm thanh mộc mạc và chuẩn xác.
                        </p>
                      </div>
                      <div>
                        <h4 className="text-foreground border-border mb-2 border-b pb-1 font-medium">
                          Phím Đen (Nốt Hóa)
                        </h4>
                        <p className="text-foreground/75 text-sm leading-relaxed">
                          Tạo ra âm thanh cao hơn hoặc thấp hơn phím trắng kề cạnh nửa cung. Gọi là
                          Thăng (#) khi nâng lên và Giáng (b) khi hạ xuống.
                        </p>
                      </div>
                    </div>
                  </GlassCard>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <MarketingFooter />
    </div>
  )
}

function GlassCard({
  icon,
  image,
  customImage,
  title,
  children,
}: {
  icon?: React.ReactNode
  image?: string
  customImage?: React.ReactNode
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="glass-card group relative flex h-full flex-col overflow-hidden rounded-2xl p-6">
      {/* Glint effect */}
      <div className="via-foreground/5 absolute -inset-full top-0 z-0 block h-full w-1/2 -skew-x-12 transform bg-gradient-to-r from-transparent to-transparent opacity-0 transition-all duration-700 group-hover:left-full group-hover:opacity-100" />

      {image && (
        <div className="relative -mx-6 -mt-6 mb-6 h-48 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="from-background via-background/20 pointer-events-none absolute inset-0 bg-gradient-to-t to-transparent" />
        </div>
      )}

      {customImage && (
        <div className="bg-foreground/5 border-border relative -mx-6 -mt-6 mb-6 flex h-48 items-center justify-center overflow-hidden border-b p-6">
          {customImage}
        </div>
      )}

      <div className="relative z-10 flex h-full flex-col">
        <div className="mb-4 flex items-center gap-3">
          {icon && (
            <div className="bg-foreground/5 border-border rounded-lg border p-2 transition-transform duration-300 group-hover:scale-110">
              {icon}
            </div>
          )}
          <h3 className="text-foreground text-xl font-medium">{title}</h3>
        </div>
        <div className="text-foreground/75 flex-1 leading-relaxed">{children}</div>
      </div>
    </div>
  )
}

function PianoKeyboardIllustration({ highlightC = false }) {
  const whiteKeys = ['C', 'D', 'E', 'F', 'G', 'A', 'B']
  const blackKeys = [
    { left: '14.28%', active: true },
    { left: '28.57%', active: true },
    { left: '42.85%', active: false },
    { left: '57.14%', active: true },
    { left: '71.42%', active: true },
    { left: '85.71%', active: true },
  ]

  return (
    <div className="relative h-32 w-full max-w-[280px] rounded-b-xl shadow-2xl select-none">
      {/* White keys */}
      <div className="flex h-full w-full overflow-hidden rounded-b-xl border border-white/20 bg-white">
        {whiteKeys.map((note, i) => {
          const isC = note === 'C'
          const isHighlighted = highlightC && isC
          return (
            <div
              key={i}
              className={`relative flex-1 border-r border-black/20 transition-colors duration-500 last:border-0 ${isHighlighted ? 'bg-fuchsia-300 shadow-[inset_0_0_30px_rgba(217,70,239,0.8)]' : 'bg-white'}`}
            >
              {isHighlighted && (
                <div className="absolute bottom-2 w-full text-center text-lg font-bold text-fuchsia-900 drop-shadow-md">
                  {note}
                </div>
              )}
            </div>
          )
        })}
      </div>
      {/* Black keys */}
      <div className="pointer-events-none absolute top-0 left-0 flex h-[65%] w-full">
        {blackKeys.map((bk, idx) =>
          bk.active ? (
            <div
              key={idx}
              style={{ left: bk.left, transform: 'translateX(-50%)' }}
              className="absolute top-0 z-10 h-full w-[9%] rounded-b-md border border-white/20 bg-gradient-to-b from-[#222] to-[#000] shadow-xl"
            >
              <div className="absolute bottom-2 h-8 w-full rounded-b-sm bg-gradient-to-b from-white/10 to-transparent" />
            </div>
          ) : null,
        )}
      </div>
    </div>
  )
}

function NoteNamesIllustration() {
  const notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B']
  return (
    <div className="flex items-center gap-2">
      {notes.map((n, i) => (
        <div
          key={n}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-lg font-bold"
          style={{
            background: `hsl(${i * 45}, 70%, 50%, 0.2)`,
            color: `hsl(${i * 45}, 80%, 70%)`,
            boxShadow: `0 0 15px hsl(${i * 45}, 70%, 50%, 0.3)`,
          }}
        >
          {n}
        </div>
      ))}
    </div>
  )
}

function BlackWhiteKeysIllustration() {
  return (
    <div className="flex h-full items-center gap-8">
      <div className="relative flex h-28 w-12 items-end justify-center rounded-b-xl border border-white/20 bg-white pb-2 shadow-[0_10px_20px_rgba(255,255,255,0.1)]">
        <span className="text-sm font-bold text-black/50">Trắng</span>
      </div>
      <div className="relative flex h-20 w-10 items-end justify-center rounded-b-lg border border-white/20 bg-gradient-to-b from-[#333] to-[#000] pb-2 shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
        <span className="text-xs font-bold text-white/50">Đen</span>
      </div>
    </div>
  )
}
