import { Crown, Globe, Shield, Star } from 'lucide-react'
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
      desc: t(
        'theory.brands.bosendorfer.desc',
        'Nổi tiếng với âm thanh mượt mà, sâu lắng đặc trưng Vienna. Các dòng Imperial 290 sở hữu tới 97 phím đàn (thêm 9 phím trầm màu đen).',
      ),
    },
    {
      id: 'bechstein',
      name: t('theory.brands.bechstein.name', 'C. Bechstein'),
      country: t('theory.brands.bechstein.country', 'Đức (Từ 1853)'),
      tag: 'European Noble',
      desc: t(
        'theory.brands.bechstein.desc',
        'Thương hiệu yêu thích của Liszt và Debussy. Âm thanh trong trẻo, sắc nét và quý tộc chuẩn mực châu Âu.',
      ),
    },
    {
      id: 'fazioli',
      name: t('theory.brands.fazioli.name', 'Fazioli'),
      country: t('theory.brands.fazioli.country', 'Ý (Từ 1981)'),
      tag: 'Modern Perfection',
      desc: t(
        'theory.brands.fazioli.desc',
        'Đỉnh cao chế tác thủ công hiện đại. Mỗi cây đàn Fazioli được sản xuất giới hạn với chất âm ngân vang trong như pha lê.',
      ),
    },
    {
      id: 'yamaha_kawai',
      name: t('theory.brands.yamaha_kawai.name', 'Yamaha & Kawai'),
      country: t('theory.brands.yamaha_kawai.country', 'Nhật Bản (Từ 1887 / 1927)'),
      tag: 'Precision & Education',
      desc: t(
        'theory.brands.yamaha_kawai.desc',
        'Biểu tượng của sự chính xác, độ bền vượt thời gian và đóng góp to lớn cho nền giáo dục âm nhạc toàn cầu.',
      ),
    },
  ]

  return (
    <section className="space-y-8">
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

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {brands.map((b) => (
          <div
            key={b.id}
            className="glass-card group relative flex flex-col justify-between rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-400">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  <span>{b.tag}</span>
                </span>
                <span className="text-muted-foreground inline-flex items-center gap-1 text-[11px]">
                  <Globe className="h-3 w-3" />
                  <span>{b.country}</span>
                </span>
              </div>

              <h3 className="text-foreground group-hover:text-primary text-xl font-bold transition-colors">
                {b.name}
              </h3>

              <p className="text-muted-foreground text-xs leading-relaxed md:text-sm">{b.desc}</p>
            </div>

            <div className="border-border mt-6 flex items-center gap-1 border-t pt-4 text-[11px] font-medium text-foreground/60">
              <Shield className="h-3.5 w-3.5 text-amber-400" />
              <span>Handcrafted Heritage</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
