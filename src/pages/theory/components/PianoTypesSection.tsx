import { CheckCircle2, Music, Piano, Zap } from 'lucide-react'
import React from 'react'
import { useTranslation } from 'react-i18next'

export function PianoTypesSection() {
  const { t } = useTranslation()

  const types = [
    {
      id: 'grand',
      name: t('theory.types.grand.name', 'Grand Piano (Piano Đại / Nằm Ngang)'),
      badge: t('theory.types.grand.badge', 'Âm thanh Concert đỉnh phong'),
      image: '/images/theory/grand_piano.png',
      desc: t(
        'theory.types.grand.desc',
        'Dây đàn và bảng cộng hưởng nằm ngang. Cơ chế búa nảy hoạt động dựa vào trọng lực tự nhiên, cho phép lặp nốt cực nhanh và sắc thái biểu cảm đỉnh cao nhất.',
      ),
      features: [
        t('theory.types.grand.feature1', 'Chiều dài: 1.5m (Baby Grand) đến 2.7m+ (Concert Grand).'),
        t('theory.types.grand.feature2', 'Nắp đàn mở tối ưu hóa độ vang âm học không gian lớn.'),
      ],
    },
    {
      id: 'upright',
      name: t('theory.types.upright.name', 'Upright Piano (Piano Đứng / Dựng Đứng)'),
      badge: t('theory.types.upright.badge', 'Lựa chọn tiêu chuẩn gia đình'),
      image: '/images/theory/upright_piano.png',
      desc: t(
        'theory.types.upright.desc',
        'Dây đàn và bảng cộng hưởng dựng đứng vuông góc với sàn nhà. Thiết kế nhỏ gọn, sang trọng, là lựa chọn hoàn hảo cho không gian gia đình và lớp học nhạc.',
      ),
      features: [
        t('theory.types.upright.feature1', 'Cơ chế lò xo phản hồi búa nảy linh hoạt.'),
        t('theory.types.upright.feature2', 'Tiết kiệm diện tích mà vẫn giữ nguyên âm thanh cơ học.'),
      ],
    },
    {
      id: 'digital',
      name: t('theory.types.digital.name', 'Digital Piano (Piano Điện)'),
      badge: t('theory.types.digital.badge', 'Hiện đại & Đa năng'),
      image: '/images/theory/digital_piano.png',
      desc: t(
        'theory.types.digital.desc',
        'Sử dụng công nghệ lấy mẫu âm thanh (Sampling) hoặc mô phỏng vật lý (Physical Modeling) từ các cây Concert Grand danh tiếng. Tích hợp tai nghe, USB MIDI và kết nối máy tính.',
      ),
      features: [
        t('theory.types.digital.feature1', 'Phím nặng mô phỏng (Weighted Action) cảm giác thật.'),
        t('theory.types.digital.feature2', 'Không cần lên dây định kỳ, dễ dàng thu âm và luyện tập ban đêm.'),
      ],
    },
    {
      id: 'hybrid',
      name: t('theory.types.hybrid.name', 'Hybrid Piano (Piano Lai Cơ - Điện)'),
      badge: t('theory.types.hybrid.badge', 'Đỉnh cao công nghệ'),
      image: '/images/theory/hybrid_piano.png',
      desc: t(
        'theory.types.hybrid.desc',
        'Sự kết hợp hoàn hảo giữa bộ cơ gỗ thật 100% của Piano cơ acoustic và cảm biến quang học điện tử cao cấp.',
      ),
      features: [
        t('theory.types.hybrid.feature1', 'Cảm giác phím cơ thật 100% không sự khác biệt.'),
        t('theory.types.hybrid.feature2', 'Tùy chỉnh âm lượng hoặc chơi im lặng qua tai nghe.'),
      ],
    },
  ]

  return (
    <section className="space-y-8">
      <div className="flex items-center gap-3">
        <div className="bg-primary/10 text-primary border-primary/20 rounded-2xl border p-3 shadow-md">
          <Piano className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-foreground text-2xl font-bold tracking-tight md:text-3xl">
            {t('theory.types.title', 'Các Dòng Đàn Piano & Đặc Điểm')}
          </h2>
          <p className="text-muted-foreground text-xs md:text-sm">
            {t('theory.types.subtitle', 'Khám phá sự đa dạng trong thiết kế và cơ chế tạo âm thanh')}
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {types.map((item) => (
          <div
            key={item.id}
            className="glass-card group relative flex flex-col justify-between overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div>
              {item.image && (
                <div className="relative -mx-6 -mt-6 mb-6 h-52 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="from-card pointer-events-none absolute inset-0 bg-gradient-to-t via-transparent to-transparent opacity-90" />
                  <span className="absolute top-4 left-4 inline-block rounded-lg border border-amber-500/30 bg-black/60 px-3 py-1 text-xs font-semibold text-amber-300 backdrop-blur-md">
                    {item.badge}
                  </span>
                </div>
              )}

              {!item.image && (
                <div className="mb-4 flex items-center justify-between">
                  <span className="inline-block rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-400">
                    {item.badge}
                  </span>
                  {item.id === 'digital' ? (
                    <Zap className="h-5 w-5 text-cyan-400" />
                  ) : (
                    <Music className="h-5 w-5 text-amber-400" />
                  )}
                </div>
              )}

              <h3 className="text-foreground group-hover:text-primary text-xl font-bold transition-colors">
                {item.name}
              </h3>

              <p className="text-muted-foreground mt-2 text-xs leading-relaxed md:text-sm">
                {item.desc}
              </p>
            </div>

            <div className="border-border mt-6 border-t pt-4 space-y-2">
              {item.features.map((feat, fIdx) => (
                <div key={fIdx} className="flex items-start gap-2 text-xs text-foreground/80">
                  <CheckCircle2 className="text-primary mt-0.5 h-3.5 w-3.5 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
