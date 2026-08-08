import { Hammer, ShieldCheck, Sparkles, SlidersHorizontal } from 'lucide-react'
import React from 'react'
import { useTranslation } from 'react-i18next'

export function PianoCraftsmanshipSection() {
  const { t } = useTranslation()

  return (
    <section className="space-y-8">
      <div className="flex items-center gap-3">
        <div className="bg-primary/10 text-primary border-primary/20 rounded-2xl border p-3 shadow-md">
          <Hammer className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-foreground text-2xl font-bold tracking-tight md:text-3xl">
            {t('theory.craftsmanship.title', 'Cấu Tạo & Kỳ Tích Chế Tác Thủ Công')}
          </h2>
          <p className="text-muted-foreground text-xs md:text-sm">
            {t(
              'theory.craftsmanship.subtitle',
              'Hơn 8,000 chi tiết cơ khí chính xác hòa quyện tạo nên kiệt tác âm thanh',
            )}
          </p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
        {/* Anatomy Cards */}
        <div className="space-y-4 lg:col-span-7">
          <div className="glass-card rounded-2xl p-5 space-y-2 border-l-4 border-l-amber-500">
            <div className="flex items-center gap-2 font-bold text-foreground">
              <ShieldCheck className="h-4 w-4 text-amber-400" />
              <span>{t('theory.craftsmanship.frame_title', 'Khung Gang Đúc (Cast-Iron Plate)')}</span>
            </div>
            <p className="text-muted-foreground text-xs leading-relaxed md:text-sm">
              {t(
                'theory.craftsmanship.frame_desc',
                'Khung gang chịu lực đúc nguyên khối có khả năng chịu được tổng lực kéo lên tới 20 tấn từ hơn 230 sợi dây thép đan chéo.',
              )}
            </p>
          </div>

          <div className="glass-card rounded-2xl p-5 space-y-2 border-l-4 border-l-emerald-500">
            <div className="flex items-center gap-2 font-bold text-foreground">
              <Sparkles className="h-4 w-4 text-emerald-400" />
              <span>{t('theory.craftsmanship.soundboard_title', 'Bảng Cộng Hưởng (Sitka Spruce Soundboard)')}</span>
            </div>
            <p className="text-muted-foreground text-xs leading-relaxed md:text-sm">
              {t(
                'theory.craftsmanship.soundboard_desc',
                'Được chế tác từ gỗ Vân Mộc tuyển chọn hàng trăm năm tuổi, đóng vai trò như trái tim khuếch đại độ ngân rung của dây đàn.',
              )}
            </p>
          </div>

          <div className="glass-card rounded-2xl p-5 space-y-2 border-l-4 border-l-cyan-500">
            <div className="flex items-center gap-2 font-bold text-foreground">
              <Hammer className="h-4 w-4 text-cyan-400" />
              <span>{t('theory.craftsmanship.action_title', 'Bộ Cơ Búa Đàn (Action Mechanism)')}</span>
            </div>
            <p className="text-muted-foreground text-xs leading-relaxed md:text-sm">
              {t(
                'theory.craftsmanship.action_desc',
                'Hệ thống hơn 8,000 chi tiết gỗ, dạ nén và da thuộc được căn chỉnh thủ công với độ chính xác từng phần mười milimét.',
              )}
            </p>
          </div>
        </div>

        {/* Action Illustration Image */}
        <div className="overflow-hidden rounded-2xl border border-white/10 lg:col-span-5 shadow-2xl">
          <div className="relative aspect-4/3 overflow-hidden">
            <img
              src="/images/theory/craftsmanship.png"
              alt="Piano Action Craftsmanship"
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="from-background pointer-events-none absolute inset-0 bg-gradient-to-t via-transparent to-transparent opacity-50" />
          </div>
        </div>
      </div>

      {/* 3-Pedal System Card */}
      <div className="glass-card rounded-2xl p-6">
        <div className="mb-4 flex items-center gap-3">
          <SlidersHorizontal className="h-5 w-5 text-amber-400" />
          <h3 className="text-foreground text-xl font-bold">
            {t('theory.craftsmanship.pedals_title', 'Hệ Thống 3 Ba-đan (Pedals)')}
          </h3>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="border-border bg-foreground/5 rounded-xl border p-4 space-y-1">
            <span className="text-xs font-semibold text-amber-400">1. Sustain Pedal (Phải)</span>
            <p className="text-muted-foreground text-xs leading-relaxed">
              {t(
                'theory.craftsmanship.pedal_sustain',
                'Nâng toàn bộ bộ chặn tiếng (dampers), giúp âm thanh ngân vang ngân dài.',
              )}
            </p>
          </div>

          <div className="border-border bg-foreground/5 rounded-xl border p-4 space-y-1">
            <span className="text-xs font-semibold text-cyan-400">2. Sostenuto Pedal (Giữa)</span>
            <p className="text-muted-foreground text-xs leading-relaxed">
              {t(
                'theory.craftsmanship.pedal_sostenuto',
                'Chỉ giữ ngân vang riêng các nốt được nhấn tại thời điểm đạp pedal.',
              )}
            </p>
          </div>

          <div className="border-border bg-foreground/5 rounded-xl border p-4 space-y-1">
            <span className="text-xs font-semibold text-emerald-400">3. Una Corda / Soft (Trái)</span>
            <p className="text-muted-foreground text-xs leading-relaxed">
              {t(
                'theory.craftsmanship.pedal_soft',
                'Dịch chuyển bộ cơ để búa gõ ít dây hơn, tạo âm thanh dịu nhẹ.',
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
