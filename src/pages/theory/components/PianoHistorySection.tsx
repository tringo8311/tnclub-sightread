import { History, Sparkles } from 'lucide-react'
import React from 'react'
import { useTranslation } from 'react-i18next'

export function PianoHistorySection() {
  const { t } = useTranslation()

  const timelineItems = [
    {
      year: '1700',
      title: t('theory.history.cristofori_title', '1700 – Phát minh bởi Bartolomeo Cristofori'),
      desc: t(
        'theory.history.cristofori_desc',
        'Tại Florence (Ý), nghệ nhân Cristofori sáng chế ra cây đàn "Un cimbalo di cipresso di piano e forte" - cho phép người chơi tạo ra âm thanh êm dịu (piano) hay mạnh mẽ (forte) bằng lực nhấn của ngón tay.',
      ),
    },
    {
      year: '1780s',
      title: t('theory.history.fortepiano_title', 'Thế kỷ 18 – Thời đại Fortepiano cổ điển'),
      desc: t(
        'theory.history.fortepiano_desc',
        'Các thiên tài như Mozart, Haydn và Beethoven đã sáng tác những kiệt tác đỉnh cao cho Fortepiano, thúc đẩy việc mở rộng quãng âm và cải tiến bộ cơ nảy búa.',
      ),
    },
    {
      year: '1850s',
      title: t('theory.history.industrial_title', 'Thế kỷ 19 – Cuộc cách mạng đúc khung gang'),
      desc: t(
        'theory.history.industrial_desc',
        'Khung gang đúc liền khối (Iron Frame) và búa bọc dạ nén ra đời, giúp đàn chịu được lực căng cực lớn từ dây thép, tạo nên âm thanh uy lực vang dội trong các đại hòa nhạc.',
      ),
    },
    {
      year: 'Modern',
      title: t('theory.history.modern_title', 'Thế kỷ 20 - 21 – Thời đại Piano hiện đại & Kỹ thuật số'),
      desc: t(
        'theory.history.modern_desc',
        'Sự ra đời của các dòng Concert Grand đỉnh cao kết hợp cùng Piano điện (Digital) và Piano lai (Hybrid), đưa âm nhạc Piano tiếp cận hàng triệu người trên toàn thế giới.',
      ),
    },
  ]

  return (
    <section className="space-y-8">
      <div className="flex items-center gap-3">
        <div className="bg-primary/10 text-primary border-primary/20 rounded-2xl border p-3 shadow-md">
          <History className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-foreground text-2xl font-bold tracking-tight md:text-3xl">
            {t('theory.history.title', 'Lịch Sử Ra Đời & Phát Triển Của Piano')}
          </h2>
          <p className="text-muted-foreground text-xs md:text-sm">
            {t('theory.history.subtitle', 'Từ nhạc cụ gảy dây cổ điển đến Vua của các loại nhạc cụ')}
          </p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
        {/* History Illustration */}
        <div className="overflow-hidden rounded-2xl border border-white/10 lg:col-span-5 shadow-2xl">
          <div className="relative aspect-4/3 overflow-hidden">
            <img
              src={`${import.meta.env.BASE_URL}images/theory/history.png`}
              alt="Vintage Fortepiano History"
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="from-background pointer-events-none absolute inset-0 bg-gradient-to-t via-transparent to-transparent opacity-60" />
            <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-white/10 bg-black/60 p-3 backdrop-blur-md">
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-300">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Fortepiano thế kỷ 18 (Florence, Italia)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Items */}
        <div className="space-y-4 lg:col-span-7">
          {timelineItems.map((item, idx) => (
            <div
              key={idx}
              className="glass-card group relative flex gap-4 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="bg-primary/10 text-primary border-primary/20 flex h-10 w-12 shrink-0 items-center justify-center rounded-xl border text-xs font-bold shadow-sm">
                {item.year}
              </div>
              <div className="space-y-1">
                <h3 className="text-foreground group-hover:text-primary text-base font-bold transition-colors">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-xs leading-relaxed md:text-sm">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
