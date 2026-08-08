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
      image: `${import.meta.env.BASE_URL}images/theory/brand_yamaha_kawai.png`,
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
      image: `${import.meta.env.BASE_URL}images/theory/grand_piano.png`,
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
        <div className="relative h-64 md:h-80 w-full overflow-hidden">
          <img
            src={`${import.meta.env.BASE_URL}images/theory/piano_brands.png`}
            alt="World Famous Piano Brands"
            className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
          />
          <div className="from-card/95 via-card/60 pointer-events-none absolute inset-0 bg-gradient-to-t to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="inline-block rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-300 backdrop-blur-md mb-2">
                🏆 Di Sản & Đẳng Cấp Nghệ Thuật
              </span>
              <h3 className="text-foreground text-xl md:text-2xl font-extrabold">
                Thánh Đường Của Những Cây Đại Dương Cầm Huyền Thoại
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* 6 Balanced Brand Cards Grid (2 rows x 3 columns) */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {brands.map((b) => (
          <div
            key={b.id}
            className="glass-card group relative flex flex-col justify-between overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border border-white/10"
          >
            <div>
              {/* Brand Artwork Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={b.image}
                  alt={b.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="from-card pointer-events-none absolute inset-0 bg-gradient-to-t via-transparent to-transparent opacity-90" />
                <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-lg border border-amber-500/30 bg-black/60 px-2.5 py-1 text-xs font-bold text-amber-300 backdrop-blur-md">
                  <Star className="h-3 w-3 fill-amber-300 text-amber-300" />
                  <span>{b.tag}</span>
                </span>
                <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-lg border border-white/20 bg-black/60 px-2.5 py-1 text-[11px] font-medium text-white/90 backdrop-blur-md">
                  <Globe className="h-3 w-3" />
                  <span>{b.country}</span>
                </span>
              </div>

              <div className="p-6 space-y-3">
                <h3 className="text-foreground group-hover:text-primary text-xl font-bold transition-colors">
                  {b.name}
                </h3>

                {/* Famous Model Series Badge */}
                <div className="inline-flex items-center gap-1.5 rounded-md border border-amber-500/20 bg-amber-500/10 px-2.5 py-1 text-[11px] font-semibold text-amber-400">
                  <Award className="h-3.5 w-3.5" />
                  <span>Dòng đàn danh tiếng: <strong>{b.models}</strong></span>
                </div>

                <p className="text-muted-foreground text-xs leading-relaxed md:text-sm">{b.desc}</p>
              </div>
            </div>

            <div className="px-6 pb-5 pt-2 border-t border-border flex items-center justify-between text-[11px] font-medium text-foreground/70">
              <span className="flex items-center gap-1 text-amber-400">
                <Shield className="h-3.5 w-3.5" />
                <span>Handcrafted Heritage</span>
              </span>
              <span className="text-muted-foreground font-mono text-[10px] uppercase">
                Premium Grade
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Special Landmark Showcase: The Crystal Piano (3.22 Million USD) */}
      <div className="glass-card relative overflow-hidden rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-cyan-950/40 via-card to-amber-950/20 p-6 md:p-8 shadow-2xl space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl animate-pulse">💎</span>
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-500/10 px-3 py-1 text-xs font-bold text-cyan-300">
                ✨ Kỷ Lục Đấu Giá Đắt Nhất Thế Giới: $3.22M USD (~80 Tỷ VNĐ)
              </div>
              <h3 className="text-foreground text-2xl font-extrabold mt-1">
                "The Crystal Piano" – Tuyệt Tác Piano Pha Lê Trong Suốt
              </h3>
            </div>
          </div>

          {/* YouTube Video Link Button */}
          <a
            href="https://www.youtube.com/results?search_query=Lang+Lang+Crystal+Piano+2008+Beijing+Olympics"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold px-4 py-2.5 text-xs shadow-lg transition-transform duration-200 hover:scale-105 active:scale-95 shrink-0"
          >
            <Play className="h-4 w-4 fill-white" />
            <span>Xem Trình Diễn Trên YouTube (Lang Lang)</span>
          </a>
        </div>

        <div className="grid gap-6 md:grid-cols-12 items-center">
          <div className="relative md:col-span-5 h-60 overflow-hidden rounded-2xl border border-cyan-400/40 shadow-2xl group">
            <img
              src={`${import.meta.env.BASE_URL}images/theory/crystal_piano_real.jpg`}
              alt="The Crystal Piano"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Shimmering Glass Reflection Accent Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-900/80 via-transparent to-white/20 pointer-events-none" />
            <div className="absolute top-3 left-3 rounded-lg border border-cyan-300/40 bg-black/70 px-2.5 py-1 text-[11px] font-bold text-cyan-300 backdrop-blur-md">
              🔮 Acrylic Crystal Body 100%
            </div>
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-cyan-100 bg-black/70 px-2.5 py-1 rounded-md backdrop-blur-md">
                ✨ Trình diễn bởi Lang Lang tại Olympic Bắc Kinh 2008
              </span>
            </div>
          </div>

          <div className="md:col-span-7 space-y-3 text-xs md:text-sm leading-relaxed text-muted-foreground">
            <p>
              <strong className="text-foreground">Cây đàn Piano Pha Lê đắt nhất lịch sử</strong> được hãng <strong className="text-amber-300 font-bold">Kawai (Nhật Bản)</strong> chế tác đặc biệt hoàn toàn bằng chất liệu Acrylic trong suốt tinh khiết phục vụ cho Lễ khai mạc Thế vận hội Olympic Bắc Kinh 2008.
            </p>
            <p>
              Cây đàn được đấu giá thành công với mức giá kỷ lục <strong className="text-cyan-300 font-bold">3.22 triệu USD (~80 tỷ VNĐ)</strong> sau khi được nghệ sĩ độc tấu huyền thoại <strong className="text-amber-300 font-bold">Lang Lang (Lãng Lãng)</strong> trình diễn trước hơn 1 tỷ khán giả trên toàn thế giới.
            </p>
            <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex flex-wrap gap-2">
                <span className="rounded-lg bg-foreground/5 border border-border px-3 py-1.5 font-medium text-foreground">
                  🎹 <strong>Chế tác:</strong> Kawai (Nhật) & Blüthner Lucid (Đức)
                </span>
                <span className="rounded-lg bg-foreground/5 border border-border px-3 py-1.5 font-medium text-foreground">
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
