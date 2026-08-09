import { PreviewableImage } from '@/components'
import { Award, Crown, Globe, Play, Shield, Star } from 'lucide-react'
import React from 'react'
import { useTranslation } from 'react-i18next'

export function PianoBrandsSection() {
  const { t } = useTranslation()

  const brands = [
    {
      id: 'steinway',
      name: t('theory.brands.steinway.name', 'Steinway & Sons'),
      country: t('theory.brands.steinway.country', 'Mỹ / Đức (Từ 1853)'),
      tag: 'Concert Standard',
      image: `${import.meta.env.BASE_URL}images/theory/brand_steinway.png`,
      models: 'Model D-274, Model B-211, Spirio R',
      desc: t(
        'theory.brands.steinway.desc',
        'Chuẩn mực vàng của các đại nhạc hội thế giới. Hơn 95% nghệ sĩ độc tấu Concert Grand lựa chọn Steinway nhờ âm thanh uy lực, ấm áp và độ phản hồi phím tuyệt vời.',
      ),
    },
    {
      id: 'bosendorfer',
      name: t('theory.brands.bosendorfer.name', 'Bösendorfer'),
      country: t('theory.brands.bosendorfer.country', 'Áo (Từ 1828)'),
      tag: 'Viennese Sound',
      image: `${import.meta.env.BASE_URL}images/theory/brand_bosendorfer.png`,
      models: 'Imperial 290 (97 phím), 280VC, 214VC',
      desc: t(
        'theory.brands.bosendorfer.desc',
        'Nổi tiếng với âm thanh mượt mà, sâu lắng đặc trưng Vienna. Dòng Imperial 290 huyền thoại sở hữu tới 97 phím đàn (thêm 9 phím trầm màu đen độc quyền).',
      ),
    },
    {
      id: 'bechstein',
      name: t('theory.brands.bechstein.name', 'C. Bechstein'),
      country: t('theory.brands.bechstein.country', 'Đức (Từ 1853)'),
      tag: 'European Noble',
      image: `${import.meta.env.BASE_URL}images/theory/brand_bechstein.png`,
      models: 'Concert D 282, Academy A 190, Concert L 167',
      desc: t(
        'theory.brands.bechstein.desc',
        'Thương hiệu yêu thích của Franz Liszt và Claude Debussy. Âm thanh trong trẻo, sắc nét và quý tộc chuẩn mực châu Âu.',
      ),
    },
    {
      id: 'fazioli',
      name: t('theory.brands.fazioli.name', 'Fazioli'),
      country: t('theory.brands.fazioli.country', 'Ý (Từ 1981)'),
      tag: 'Modern Perfection',
      image: `${import.meta.env.BASE_URL}images/theory/brand_fazioli.png`,
      models: 'F308 (Đại dương cầm 3.08m), F278, F228',
      desc: t(
        'theory.brands.fazioli.desc',
        'Đỉnh cao chế tác thủ công hiện đại. Dòng F308 là cây Concert Grand dài nhất thế giới tích hợp 4 bàn đạp pedal với chất âm ngân vang như pha lê.',
      ),
    },
    {
      id: 'yamaha',
      name: t('theory.brands.yamaha.name', 'Yamaha'),
      country: t('theory.brands.yamaha.country', 'Nhật Bản (Từ 1887)'),
      tag: 'Precision & Power',
      image: `${import.meta.env.BASE_URL}images/theory/brand_yamaha.png`,
      models: 'Concert Grand CFX, SX Series, Upright U3, Clavinova',
      desc: t(
        'theory.brands.yamaha.desc',
        'Biểu tượng của sự chính xác tuyệt đối, độ bền cơ học vượt thời gian và âm thanh sáng rực rỡ xuất hiện tại mọi cuộc thi âm nhạc lớn nhất thế giới.',
      ),
    },
    {
      id: 'kawai',
      name: t('theory.brands.kawai.name', 'Kawai'),
      country: t('theory.brands.kawai.country', 'Nhật Bản (Từ 1927)'),
      tag: 'Master Craftsmanship',
      image: `${import.meta.env.BASE_URL}images/theory/brand_kawai.png`,
      models: 'Shigeru Kawai SK-EX, K-500, Hybrid Novus NV10S',
      desc: t(
        'theory.brands.kawai.desc',
        'Tiên phong ứng dụng chất liệu ABS-Carbon trong bộ cơ Millennium III, mang lại độ nhạy phím cực cao, sự ổn định vượt trội và âm thanh ấm áp quyến rũ.',
      ),
    },
  ]

  return (
    <section className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="bg-primary/10 text-primary border-primary/20 rounded-2xl border p-3 shadow-md">
          <Crown className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-foreground text-2xl font-bold tracking-tight md:text-3xl">
            {t('theory.brands.title', 'Những Thương Hiệu Piano Huyền Thoại Thế Giới')}
          </h2>
          <p className="text-muted-foreground text-xs md:text-sm">
            {t(
              'theory.brands.subtitle',
              'Biểu tượng của di sản âm nhạc, chất lượng chuẩn mực và đẳng cấp nghệ thuật',
            )}
          </p>
        </div>
      </div>

      {/* Hero Banner Artwork */}
      <div className="glass-card relative overflow-hidden rounded-3xl border border-white/10 shadow-xl">
        <PreviewableImage
          src={`${import.meta.env.BASE_URL}images/theory/piano_brands.png`}
          alt="World Famous Piano Brands"
          title="Thánh Đường Của Những Cây Đại Dương Cầm Huyền Thoại"
          className="h-64 w-full overflow-hidden md:h-80"
        >
          <div className="from-card/95 via-card/60 pointer-events-none absolute inset-0 bg-gradient-to-t to-transparent" />
          <div className="pointer-events-none absolute right-6 bottom-6 left-6 z-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <span className="mb-2 inline-block rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-300 backdrop-blur-md">
                🏆 Di Sản & Đẳng Cấp Nghệ Thuật
              </span>
              <h3 className="text-foreground text-xl font-extrabold md:text-2xl">
                Thánh Đường Của Những Cây Đại Dương Cầm Huyền Thoại
              </h3>
            </div>
          </div>
        </PreviewableImage>
      </div>

      {/* 6 Balanced Brand Cards Grid (2 rows x 3 columns) */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {brands.map((b) => (
          <div
            key={b.id}
            className="glass-card group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div>
              {/* Brand Artwork Image */}
              <PreviewableImage
                src={b.image}
                alt={b.name}
                title={`${b.name} - ${b.country}`}
                className="h-48 overflow-hidden"
              >
                <div className="from-card pointer-events-none absolute inset-0 bg-gradient-to-t via-transparent to-transparent opacity-90" />
                <span className="pointer-events-none absolute top-3 left-3 z-10 inline-flex items-center gap-1 rounded-lg border border-amber-500/30 bg-black/60 px-2.5 py-1 text-xs font-bold text-amber-300 backdrop-blur-md">
                  <Star className="h-3 w-3 fill-amber-300 text-amber-300" />
                  <span>{b.tag}</span>
                </span>
                <span className="pointer-events-none absolute top-3 right-3 z-10 inline-flex items-center gap-1 rounded-lg border border-white/20 bg-black/60 px-2.5 py-1 text-[11px] font-medium text-white/90 backdrop-blur-md">
                  <Globe className="h-3 w-3" />
                  <span>{b.country}</span>
                </span>
              </PreviewableImage>

              <div className="space-y-3 p-6">
                <h3 className="text-foreground group-hover:text-primary text-xl font-bold transition-colors">
                  {b.name}
                </h3>

                {/* Famous Model Series Badge */}
                <div className="inline-flex items-center gap-1.5 rounded-md border border-amber-500/20 bg-amber-500/10 px-2.5 py-1 text-[11px] font-semibold text-amber-400">
                  <Award className="h-3.5 w-3.5" />
                  <span>
                    Dòng đàn danh tiếng: <strong>{b.models}</strong>
                  </span>
                </div>

                <p className="text-muted-foreground text-xs leading-relaxed md:text-sm">{b.desc}</p>
              </div>
            </div>

            <div className="border-border text-foreground/70 flex items-center justify-between border-t px-6 pt-2 pb-5 text-[11px] font-medium">
              <span className="flex items-center gap-1 text-amber-400">
                <Shield className="h-3.5 w-3.5" />
                <span>Di Sản Chế Tác Thủ Công</span>
              </span>
              <span className="text-muted-foreground font-mono text-[10px] uppercase">
                Phân Khúc Cao Cấp
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Special Landmark Showcase: The Crystal Piano (3.22 Million USD) */}
      <div className="glass-card via-card relative space-y-6 overflow-hidden rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-cyan-950/40 to-amber-950/20 p-6 shadow-2xl md:p-8">
        <div className="flex flex-col items-start justify-between gap-4 border-b border-white/10 pb-4 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <span className="animate-pulse text-3xl">💎</span>
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-500/10 px-3 py-1 text-xs font-bold text-cyan-300">
                ✨ Kỷ Lục Đấu Giá Đắt Nhất Thế Giới: $3.22M USD (~80 Tỷ VNĐ)
              </div>
              <h3 className="text-foreground mt-1 text-2xl font-extrabold">
                "The Crystal Piano" – Tuyệt Tác Piano Pha Lê Trong Suốt
              </h3>
            </div>
          </div>

          {/* YouTube Video Link Button */}
          <a
            href="https://www.youtube.com/results?search_query=Lang+Lang+Crystal+Piano+2008+Beijing+Olympics"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg transition-transform duration-200 hover:scale-105 hover:bg-red-500 active:scale-95"
          >
            <Play className="h-4 w-4 fill-white" />
            <span>Xem Trình Diễn Trên YouTube (Lang Lang)</span>
          </a>
        </div>

        <div className="grid items-center gap-6 md:grid-cols-12">
          <div className="h-60 overflow-hidden rounded-2xl border border-cyan-400/40 shadow-2xl md:col-span-5">
            <PreviewableImage
              src={`${import.meta.env.BASE_URL}images/theory/crystal_piano_real.jpg`}
              alt="The Crystal Piano"
              title="The Crystal Piano - Kawai (Olympic Bắc Kinh 2008)"
              className="h-full w-full"
            >
              {/* Shimmering Glass Reflection Accent Overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-cyan-900/80 via-transparent to-white/20" />
              <div className="pointer-events-none absolute top-3 left-3 z-10 rounded-lg border border-cyan-300/40 bg-black/70 px-2.5 py-1 text-[11px] font-bold text-cyan-300 backdrop-blur-md">
                🔮 Acrylic Crystal Body 100%
              </div>
              <div className="pointer-events-none absolute right-3 bottom-3 left-3 z-10 flex items-center justify-between">
                <span className="rounded-md bg-black/70 px-2.5 py-1 text-[11px] font-semibold text-cyan-100 backdrop-blur-md">
                  ✨ Trình diễn bởi Lang Lang tại Olympic Bắc Kinh 2008
                </span>
              </div>
            </PreviewableImage>
          </div>

          <div className="text-muted-foreground space-y-3 text-xs leading-relaxed md:col-span-7 md:text-sm">
            <p>
              <strong className="text-foreground">Cây đàn Piano Pha Lê đắt nhất lịch sử</strong>{' '}
              được hãng <strong className="font-bold text-amber-300">Kawai (Nhật Bản)</strong> chế
              tác đặc biệt hoàn toàn bằng chất liệu Acrylic trong suốt tinh khiết phục vụ cho Lễ
              khai mạc Thế vận hội Olympic Bắc Kinh 2008.
            </p>
            <p>
              Cây đàn được đấu giá thành công với mức giá kỷ lục{' '}
              <strong className="font-bold text-cyan-300">3.22 triệu USD (~80 tỷ VNĐ)</strong> sau
              khi được nghệ sĩ độc tấu huyền thoại{' '}
              <strong className="font-bold text-amber-300">Lang Lang (Lãng Lãng)</strong> trình diễn
              trước hơn 1 tỷ khán giả trên toàn thế giới.
            </p>
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-3 text-xs">
              <div className="flex flex-wrap gap-2">
                <span className="bg-foreground/5 border-border text-foreground rounded-lg border px-3 py-1.5 font-medium">
                  🎹 <strong>Chế tác:</strong> Kawai (Nhật) & Blüthner Lucid (Đức)
                </span>
                <span className="bg-foreground/5 border-border text-foreground rounded-lg border px-3 py-1.5 font-medium">
                  🔮 <strong>Thiết kế:</strong> Thùng đàn Acrylic Xuyên Thấu 100%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
