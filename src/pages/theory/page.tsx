import { AppBar, MarketingFooter } from '@/components'
import React from 'react'
import { Music, Piano, BookOpen, Clock, Layers, Hash } from 'lucide-react'

export default function TheoryPage() {
  return (
    <div className="bg-background relative flex min-h-screen w-full flex-col text-foreground selection:bg-primary/30">
      <AppBar />

      <main className="flex-1 w-full relative">
        {/* Background Gradients for aesthetic */}
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-primary/10 to-transparent pointer-events-none -z-10" />
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/10 blur-[100px] rounded-full pointer-events-none -z-10" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-primary/5 blur-[100px] rounded-full pointer-events-none -z-10" />

        <div className="mx-auto w-full max-w-(--breakpoint-lg) px-6 py-12 md:py-20">
          <div className="text-center mb-16 space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground to-foreground/60">
              Khám Phá Âm Nhạc
            </h1>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Nắm vững nền tảng nhạc lý và làm quen với đàn Piano để bắt đầu hành trình âm nhạc của bạn một cách tự tin nhất.
            </p>
          </div>

          <div className="space-y-16">
            {/* Section 1: Căn Bản Nhạc Lý */}
            <section>
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 rounded-xl bg-primary/10 text-primary border border-primary/20 shadow-[0_0_15px_hsl(var(--primary)/0.2)]">
                  <BookOpen size={28} />
                </div>
                <h2 className="text-3xl font-semibold text-foreground tracking-tight">Căn Bản Nhạc Lý</h2>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <GlassCard image="/images/theory_staff.png" icon={<Layers className="text-primary" />} title="Khuông Nhạc (Staff)">
                  Khuông nhạc gồm 5 dòng kẻ song song và 4 khe nằm giữa các dòng kẻ. Các nốt nhạc được đặt trên dòng kẻ hoặc trong khe để xác định cao độ. Nốt càng nằm cao trên khuông nhạc thì âm thanh phát ra càng cao.
                </GlassCard>

                <GlassCard image="/images/theory_clefs.png" icon={<Music className="text-primary" />} title="Khóa Sol & Khóa Fa">
                  <ul className="space-y-2 list-disc list-inside text-foreground/80">
                    <li><strong className="text-foreground">Khóa Sol (Treble Clef):</strong> Thường dùng cho các nốt cao, được chơi bằng tay phải. Nằm trên khuông nhạc phía trên.</li>
                    <li><strong className="text-foreground">Khóa Fa (Bass Clef):</strong> Dùng cho các nốt trầm, thường chơi bằng tay trái. Nằm trên khuông nhạc phía dưới.</li>
                  </ul>
                </GlassCard>

                <GlassCard customImage={<NoteNamesIllustration />} icon={<Hash className="text-primary" />} title="Tên Các Nốt Nhạc">
                  Hệ thống nốt nhạc cơ bản gồm 7 nốt: 
                  <div className="mt-3 flex flex-wrap gap-2">
                    {['Đô (C)', 'Rê (D)', 'Mi (E)', 'Fa (F)', 'Sol (G)', 'La (A)', 'Si (B)'].map(note => (
                      <span key={note} className="px-3 py-1 bg-foreground/5 rounded-full text-sm font-medium border border-border text-foreground">
                        {note}
                      </span>
                    ))}
                  </div>
                  <p className="mt-3 text-sm text-foreground/70">Sau Si, chuỗi nốt lặp lại bắt đầu từ Đô ở quãng cao hơn.</p>
                </GlassCard>

                <GlassCard image="/images/theory_notes.png" icon={<Clock className="text-primary" />} title="Trường Độ Nốt Nhạc">
                  Hình dáng của nốt nhạc cho biết bạn cần giữ nốt đó ngân vang trong bao lâu:
                  <ul className="mt-3 space-y-2 text-sm text-foreground/80">
                    <li><strong className="text-foreground">Nốt tròn (Whole note):</strong> 4 nhịp</li>
                    <li><strong className="text-foreground">Nốt trắng (Half note):</strong> 2 nhịp</li>
                    <li><strong className="text-foreground">Nốt đen (Quarter note):</strong> 1 nhịp</li>
                    <li><strong className="text-foreground">Nốt móc đơn (Eighth note):</strong> 1/2 nhịp</li>
                  </ul>
                </GlassCard>
              </div>
            </section>

            {/* Section 2: Thông tin về đàn Piano */}
            <section>
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 rounded-xl bg-primary/10 text-primary border border-primary/20 shadow-[0_0_15px_hsl(var(--primary)/0.2)]">
                  <Piano size={28} />
                </div>
                <h2 className="text-3xl font-semibold text-foreground tracking-tight">Thông Tin Về Đàn Piano</h2>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <GlassCard customImage={<PianoKeyboardIllustration highlightC={false} />} title="Bàn Phím Piano">
                  Đàn Piano tiêu chuẩn có <strong>88 phím</strong> (52 phím trắng và 36 phím đen). Các phím đen được xếp theo cụm 2 và cụm 3 xen kẽ nhau. Nhờ vào cụm phím đen, bạn có thể dễ dàng xác định vị trí các phím trắng.
                </GlassCard>

                <GlassCard customImage={<PianoKeyboardIllustration highlightC={true} />} title="Nốt Đô (C) Nằm Ở Đâu?">
                  Nốt Đô (C) luôn nằm <strong>ngay bên trái của cụm 2 phím đen</strong>. Dựa vào nốt Đô, bạn có thể tịnh tiến lên để tìm các nốt Rê, Mi, Fa, Sol, La, Si theo chiều từ trái sang phải.
                </GlassCard>

                <GlassCard customImage={<PianoKeyboardIllustration highlightC={true} />} title="Nốt Đô Giữa (Middle C)">
                  Đây là nốt Đô nằm ở trung tâm của bàn phím đàn Piano (thường là C4). Nốt Đô giữa đóng vai trò như một mốc tham chiếu quan trọng để chia ranh giới giữa Khóa Sol (tay phải) và Khóa Fa (tay trái).
                </GlassCard>

                <div className="md:col-span-2 lg:col-span-3">
                  <GlassCard customImage={<BlackWhiteKeysIllustration />} title="Phím Trắng vs Phím Đen">
                    <div className="grid md:grid-cols-2 gap-6 mt-2">
                      <div>
                        <h4 className="font-medium text-foreground mb-2 border-b border-border pb-1">Phím Trắng (Nốt Tự Nhiên)</h4>
                        <p className="text-foreground/75 text-sm leading-relaxed">
                          Chơi các nốt cơ bản (C, D, E, F, G, A, B). Không có dấu thăng hay dấu giáng. Âm thanh mộc mạc và chuẩn xác.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground mb-2 border-b border-border pb-1">Phím Đen (Nốt Hóa)</h4>
                        <p className="text-foreground/75 text-sm leading-relaxed">
                          Tạo ra âm thanh cao hơn hoặc thấp hơn phím trắng kề cạnh nửa cung. Gọi là Thăng (#) khi nâng lên và Giáng (b) khi hạ xuống.
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

function GlassCard({ icon, image, customImage, title, children }: { icon?: React.ReactNode, image?: string, customImage?: React.ReactNode, title: string, children: React.ReactNode }) {
  return (
    <div 
      className="glass-card group relative overflow-hidden rounded-2xl p-6 flex flex-col h-full"
    >
      {/* Glint effect */}
      <div className="absolute -inset-full top-0 z-0 block h-full w-1/2 -skew-x-12 transform bg-gradient-to-r from-transparent via-foreground/5 to-transparent opacity-0 transition-all duration-700 group-hover:left-full group-hover:opacity-100" />
      
      {image && (
        <div className="relative -mx-6 -mt-6 mb-6 h-48 overflow-hidden">
          <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent pointer-events-none" />
        </div>
      )}
      
      {customImage && (
        <div className="relative -mx-6 -mt-6 mb-6 h-48 overflow-hidden bg-foreground/5 flex items-center justify-center p-6 border-b border-border">
           {customImage}
        </div>
      )}

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center gap-3 mb-4">
          {icon && <div className="p-2 rounded-lg bg-foreground/5 border border-border group-hover:scale-110 transition-transform duration-300">{icon}</div>}
          <h3 className="text-xl font-medium text-foreground">{title}</h3>
        </div>
        <div className="text-foreground/75 leading-relaxed flex-1">
          {children}
        </div>
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
    <div className="relative w-full max-w-[280px] h-32 select-none shadow-2xl rounded-b-xl">
      {/* White keys */}
      <div className="flex h-full w-full bg-white rounded-b-xl overflow-hidden border border-white/20">
        {whiteKeys.map((note, i) => {
          const isC = note === 'C'
          const isHighlighted = highlightC && isC
          return (
            <div key={i} className={`flex-1 border-r border-black/20 last:border-0 relative transition-colors duration-500 ${isHighlighted ? 'bg-fuchsia-300 shadow-[inset_0_0_30px_rgba(217,70,239,0.8)]' : 'bg-white'}`}>
              {isHighlighted && <div className="absolute bottom-2 w-full text-center text-fuchsia-900 font-bold text-lg drop-shadow-md">{note}</div>}
            </div>
          )
        })}
      </div>
      {/* Black keys */}
      <div className="absolute top-0 left-0 w-full h-[65%] flex pointer-events-none">
        {blackKeys.map((bk, idx) => bk.active ? (
          <div key={idx} style={{ left: bk.left, transform: 'translateX(-50%)' }} className="absolute top-0 w-[9%] h-full bg-gradient-to-b from-[#222] to-[#000] rounded-b-md border border-white/20 shadow-xl z-10">
            <div className="absolute bottom-2 w-full h-8 bg-gradient-to-b from-white/10 to-transparent rounded-b-sm" />
          </div>
        ) : null)}
      </div>
    </div>
  )
}

function NoteNamesIllustration() {
  const notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B']
  return (
    <div className="flex gap-2 items-center">
      {notes.map((n, i) => (
        <div key={n} className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg border border-white/20"
             style={{
               background: `hsl(${i * 45}, 70%, 50%, 0.2)`,
               color: `hsl(${i * 45}, 80%, 70%)`,
               boxShadow: `0 0 15px hsl(${i * 45}, 70%, 50%, 0.3)`
             }}>
          {n}
        </div>
      ))}
    </div>
  )
}

function BlackWhiteKeysIllustration() {
  return (
    <div className="flex gap-8 items-center h-full">
      <div className="relative w-12 h-28 bg-white rounded-b-xl shadow-[0_10px_20px_rgba(255,255,255,0.1)] border border-white/20 flex items-end justify-center pb-2">
        <span className="text-black/50 font-bold text-sm">Trắng</span>
      </div>
      <div className="relative w-10 h-20 bg-gradient-to-b from-[#333] to-[#000] rounded-b-lg shadow-[0_10px_20px_rgba(0,0,0,0.5)] border border-white/20 flex items-end justify-center pb-2">
        <span className="text-white/50 font-bold text-xs">Đen</span>
      </div>
    </div>
  )
}
