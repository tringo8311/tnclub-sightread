import { AppBar, MarketingFooter } from '@/components'
import { BookOpen, ChevronRight, Layers, Music, Sparkles, Zap } from 'lucide-react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'
import { FeaturedSongsPreview } from './FeaturedSongsPreview'

function FeatureCard({
  icon: Icon,
  title,
  description,
  className,
}: {
  icon: any
  title: string
  description: string
  className?: string
}) {
  return (
    <div className={`glass-card group relative overflow-hidden rounded-2xl p-6 ${className || ''}`}>
      <div className="via-foreground/5 absolute -inset-full top-0 z-0 block h-full w-1/2 -skew-x-12 transform bg-gradient-to-r from-transparent to-transparent opacity-0 transition-all duration-700 group-hover:left-full group-hover:opacity-100" />
      <div className="relative z-10">
        <div className="bg-foreground/5 mb-4 inline-flex items-center justify-center rounded-xl p-3 text-[var(--color-cyan-neon)] ring-1 ring-[var(--color-cyan-neon)]/30 transition-colors group-hover:bg-[var(--color-cyan-neon)]/10 group-hover:text-[var(--color-cyan-neon)]">
          <Icon size={24} />
        </div>
        <h3 className="text-foreground/90 text-xl font-semibold">{title}</h3>
        <p className="text-foreground/60 mt-2 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  )
}

export default function Home() {
  const { t, i18n } = useTranslation()
  const isVi = i18n.language?.startsWith('vi')

  return (
    <div className="bg-background text-foreground selection:bg-primary/30 relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <div className="relative z-10 flex flex-1 flex-col">
        <AppBar />

        {/* HERO SECTION */}
        <div className="border-foreground/5 relative overflow-hidden border-b">
          <div className="relative z-10 mx-auto w-full max-w-(--breakpoint-lg) px-6 py-20 lg:py-32">
            <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="animate-in fade-in slide-in-from-bottom-8 fill-mode-both flex flex-col gap-6 text-center duration-1000 lg:text-left">
                <div className="glow-text-cyan mb-2 inline-flex items-center justify-center gap-2 text-sm font-medium tracking-wider text-[var(--color-cyan-neon)] uppercase lg:justify-start">
                  <Sparkles size={16} className="animate-pulse" />
                  <span>{isVi ? 'Tiêu Chuẩn Mới' : 'The New Standard'}</span>
                </div>
                <h1 className="from-foreground via-foreground to-foreground/40 bg-gradient-to-br bg-clip-text text-5xl leading-[1.1] font-extrabold tracking-tight text-transparent lg:text-7xl">
                  {t('home.hero.title')}
                </h1>
                <h3 className="text-foreground/60 mx-auto max-w-2xl text-lg font-light lg:mx-0 lg:text-xl">
                  {t('home.hero.subtitle')}
                </h3>
                <div className="mt-4 flex flex-col flex-wrap justify-center gap-4 sm:flex-row lg:justify-start">
                  <Link
                    to={'/songs'}
                    className="group bg-foreground/10 text-foreground neon-glow-cyan relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl border border-[var(--color-cyan-neon)]/30 px-8 py-4 font-semibold transition-all hover:bg-[var(--color-cyan-neon)]/20 active:scale-95"
                  >
                    <span className="glow-text-cyan relative z-10">{t('home.learn_song')}</span>
                    <Music size={18} className="relative z-10 text-[var(--color-cyan-neon)]" />
                  </Link>
                  <Link
                    to={'/freeplay'}
                    className="group border-foreground/10 text-foreground hover:bg-foreground/5 hover:border-foreground/20 inline-flex items-center justify-center gap-2 rounded-xl border bg-transparent px-8 py-4 font-semibold backdrop-blur-sm transition-all active:scale-95"
                  >
                    {t('home.free_play')}
                    <ChevronRight
                      size={18}
                      className="opacity-70 transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                </div>
              </div>
              <div className="animate-in fade-in slide-in-from-bottom-12 fill-mode-both relative flex justify-center delay-300 duration-1000 lg:justify-end">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[var(--color-cyan-neon)] to-[var(--color-pink-neon)] opacity-20 blur-3xl" />
                <div className="glass-card relative w-full max-w-lg overflow-hidden">
                  <FeaturedSongsPreview className="w-full" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FEATURES SECTION */}
        <div className="relative py-24">
          <div className="relative z-10 mx-auto w-full max-w-(--breakpoint-lg) px-6">
            <div className="animate-in fade-in slide-in-from-bottom-8 fill-mode-both mx-auto mb-16 max-w-3xl text-center duration-1000">
              <h2 className="from-foreground to-foreground/60 bg-gradient-to-r bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
                {t('home.why.title')}
              </h2>
              <p className="text-foreground/60 mt-4">{t('home.why.subtitle')}</p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <FeatureCard
                icon={Zap}
                title={t('home.why.feature1_title')}
                description={t('home.why.feature1_desc')}
                className="animate-in fade-in slide-in-from-bottom-8 fill-mode-both delay-100 duration-1000"
              />
              <FeatureCard
                icon={Layers}
                title={t('home.why.feature2_title')}
                description={t('home.why.feature2_desc')}
                className="animate-in fade-in slide-in-from-bottom-8 fill-mode-both delay-300 duration-1000"
              />
              <FeatureCard
                icon={Music}
                title={t('home.why.feature3_title')}
                description={t('home.why.feature3_desc')}
                className="animate-in fade-in slide-in-from-bottom-8 fill-mode-both delay-500 duration-1000"
              />
            </div>
          </div>
        </div>

        {/* NEW THEORY SECTION */}
        <div className="border-foreground/5 bg-foreground/[0.02] relative border-y py-24">
          <div className="relative z-10 mx-auto w-full max-w-(--breakpoint-lg) px-6">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div className="glass-card group relative order-2 p-8 lg:order-1">
                {/* Decorative elements */}
                <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-[var(--color-cyan-neon)] opacity-10 blur-3xl transition-opacity duration-700 group-hover:opacity-20" />
                <div className="relative z-10 flex flex-col gap-6">
                  <div className="flex gap-4">
                    <div className="bg-foreground/5 border-foreground/10 animate-float flex h-16 w-16 -rotate-6 items-center justify-center rounded-2xl border shadow-lg transition-transform duration-500">
                      <span className="glow-text-cyan text-2xl font-bold text-[var(--color-cyan-neon)]">
                        C
                      </span>
                    </div>
                    <div className="bg-foreground/5 border-foreground/10 animate-float-delayed flex h-16 w-16 items-center justify-center rounded-2xl border shadow-lg transition-transform duration-500">
                      <span className="glow-text-pink text-2xl font-bold text-[var(--color-pink-neon)]">
                        D
                      </span>
                    </div>
                    <div className="bg-foreground/5 border-foreground/10 animate-float-slow flex h-16 w-16 rotate-6 items-center justify-center rounded-2xl border shadow-lg transition-transform duration-500">
                      <span className="text-2xl font-bold text-[var(--color-green-neon)]">E</span>
                    </div>
                  </div>
                  <div className="h-2 w-full rounded-full bg-gradient-to-r from-[var(--color-cyan-neon)] via-[var(--color-pink-neon)] to-transparent opacity-30" />
                  <p className="text-foreground/40 font-mono text-sm">
                    import {`{ Note }`} from 'music-theory'
                  </p>
                </div>
              </div>
              <div className="animate-in fade-in slide-in-from-bottom-8 fill-mode-both order-1 flex flex-col gap-6 text-center duration-1000 lg:order-2 lg:text-left">
                <h2 className="text-3xl font-bold md:text-4xl">
                  {isVi ? 'Khám Phá Nhạc Lý' : 'Master Music Theory'}
                </h2>
                <p className="text-foreground/60 text-lg leading-relaxed">
                  {isVi
                    ? 'Tìm hiểu sâu về nhạc lý thông qua các bài học tương tác được thiết kế tuyệt đẹp. Tìm hiểu về khuông nhạc, khóa nhạc, nốt nhạc và bàn phím đàn piano qua các minh họa 3D sống động.'
                    : 'Dive into our beautifully designed interactive lessons. Learn about staves, clefs, notes, and the piano keyboard through stunning 3D glassmorphism illustrations.'}
                </p>
                <div>
                  <Link
                    to={'/theory'}
                    className="inline-flex items-center gap-2 font-medium text-[var(--color-cyan-neon)] transition-opacity hover:opacity-80"
                  >
                    <BookOpen size={20} />
                    <span>{isVi ? 'Vào Trang Nhạc Lý' : 'Explore Theory Section'}</span>
                    <ChevronRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA SECTION */}
        <div className="relative overflow-hidden py-32">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--color-cyan-neon)]/10" />
          <div className="animate-in fade-in zoom-in-95 fill-mode-both relative z-10 mx-auto flex w-full max-w-(--breakpoint-lg) flex-col items-center px-6 text-center duration-1000">
            <h2 className="mb-6 text-4xl font-bold md:text-5xl">
              {isVi ? 'Sẵn sàng để chơi nhạc?' : 'Ready to play?'}
            </h2>
            <p className="text-foreground/60 mb-10 max-w-2xl text-xl">
              {isVi
                ? 'Gia nhập cùng hàng ngàn nhạc sĩ đang cải thiện kỹ năng thị tấu mỗi ngày. Kết nối bàn phím MIDI của bạn và bắt đầu chơi ngay lập tức.'
                : 'Join thousands of musicians improving their sight-reading skills every day. Connect your MIDI keyboard and start instantly.'}
            </p>
            <Link
              to={'/freeplay'}
              className="group bg-foreground/10 neon-glow-cyan relative inline-flex items-center justify-center rounded-xl border border-[var(--color-cyan-neon)]/50 px-8 py-4 font-bold text-[var(--color-cyan-neon)] transition-all hover:bg-[var(--color-cyan-neon)]/20 active:scale-95"
            >
              {isVi ? 'Bắt Đầu Tự Do' : 'Start Free Play'}
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-background relative z-10 mt-auto">
        <MarketingFooter />
      </div>
    </div>
  )
}
