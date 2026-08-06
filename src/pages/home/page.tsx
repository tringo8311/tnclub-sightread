import { AppBar, MarketingFooter } from '@/components'
import React from 'react'
import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'
import { FeaturedSongsPreview } from './FeaturedSongsPreview'
import { Music, Zap, Layers, ChevronRight, BookOpen, Sparkles } from 'lucide-react'

function FeatureCard({ icon: Icon, title, description }: { icon: any, title: string, description: string }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:shadow-[0_8px_30px_rgba(139,92,246,0.2)] hover:-translate-y-1">
      <div className="absolute -inset-full top-0 z-0 block h-full w-1/2 -skew-x-12 transform bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 transition-all duration-700 group-hover:left-full group-hover:opacity-100" />
      <div className="relative z-10">
        <div className="mb-4 inline-flex items-center justify-center rounded-xl bg-violet-500/20 p-3 text-violet-300 ring-1 ring-violet-500/30 group-hover:bg-violet-500/30 group-hover:text-violet-200 transition-colors">
          <Icon size={24} />
        </div>
        <h3 className="text-xl font-semibold text-white/90">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-white/60">{description}</p>
      </div>
    </div>
  )
}

export default function Home() {
  const { t, i18n } = useTranslation()
  const isVi = i18n.language?.startsWith('vi')

  return (
    <div className="bg-[#0B0A10] relative flex min-h-screen w-full flex-col text-white selection:bg-violet-500/30 overflow-x-hidden">
      {/* Background glow effects */}
      <div className="pointer-events-none absolute left-0 top-0 w-full h-screen overflow-hidden z-0">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-violet-600/20 blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[60%] rounded-full bg-fuchsia-600/10 blur-[150px]" />
      </div>

      <div className="relative z-10 flex flex-col flex-1">
        <AppBar />
        
        {/* HERO SECTION */}
        <div className="relative border-b border-white/5 overflow-hidden">
          <div className="mx-auto w-full max-w-(--breakpoint-lg) px-6 py-20 lg:py-32 relative z-10">
            <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="flex flex-col gap-6 text-center lg:text-left">
                <div className="inline-flex items-center justify-center lg:justify-start gap-2 text-violet-300 font-medium tracking-wider text-sm uppercase mb-2">
                  <Sparkles size={16} className="animate-pulse" />
                  <span>{isVi ? 'Tiêu Chuẩn Mới' : 'The New Standard'}</span>
                </div>
                <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight bg-gradient-to-br from-white via-white to-white/40 bg-clip-text text-transparent leading-[1.1]">
                  {t('home.hero.title')}
                </h1>
                <h3 className="text-lg lg:text-xl text-white/60 font-light max-w-2xl mx-auto lg:mx-0">
                  {t('home.hero.subtitle')}
                </h3>
                <div className="mt-4 flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-4">
                  <Link to={'/songs'} className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-violet-600 px-8 py-4 font-semibold text-white transition-all hover:bg-violet-500 hover:shadow-[0_0_40px_rgba(139,92,246,0.4)] active:scale-95">
                    <span className="relative z-10">{t('home.learn_song')}</span>
                    <Music size={18} className="relative z-10" />
                  </Link>
                  <Link to={'/freeplay'} className="group inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-8 py-4 font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/30 active:scale-95">
                    {t('home.free_play')}
                    <ChevronRight size={18} className="opacity-70 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
              <div className="flex justify-center lg:justify-end relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-violet-600/20 to-fuchsia-600/20 blur-3xl rounded-full" />
                <div className="w-full max-w-lg rounded-2xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden backdrop-blur-xl">
                  <FeaturedSongsPreview className="w-full" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FEATURES SECTION */}
        <div className="relative py-24">
          <div className="mx-auto w-full max-w-(--breakpoint-lg) px-6 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">{t('home.why.title')}</h2>
              <p className="mt-4 text-white/60">{t('home.why.subtitle')}</p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-3">
              <FeatureCard 
                icon={Zap} 
                title={t('home.why.feature1_title')} 
                description={t('home.why.feature1_desc')} 
              />
              <FeatureCard 
                icon={Layers} 
                title={t('home.why.feature2_title')} 
                description={t('home.why.feature2_desc')} 
              />
              <FeatureCard 
                icon={Music} 
                title={t('home.why.feature3_title')} 
                description={t('home.why.feature3_desc')} 
              />
            </div>
          </div>
        </div>

        {/* NEW THEORY SECTION */}
        <div className="relative py-24 border-y border-white/5 bg-white/[0.02]">
          <div className="mx-auto w-full max-w-(--breakpoint-lg) px-6 relative z-10">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div className="order-2 lg:order-1 relative rounded-2xl border border-white/10 bg-black/40 p-8 overflow-hidden group">
                 {/* Decorative elements */}
                 <div className="absolute -right-20 -top-20 w-64 h-64 bg-violet-600/20 blur-3xl rounded-full group-hover:bg-violet-500/30 transition-colors duration-700" />
                 <div className="relative z-10 flex flex-col gap-6">
                    <div className="flex gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-lg transform -rotate-6 group-hover:rotate-0 transition-transform duration-500">
                        <span className="text-2xl font-bold text-violet-300">C</span>
                      </div>
                      <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                        <span className="text-2xl font-bold text-fuchsia-300">D</span>
                      </div>
                      <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-lg transform rotate-6 group-hover:rotate-0 transition-transform duration-500 delay-150">
                        <span className="text-2xl font-bold text-blue-300">E</span>
                      </div>
                    </div>
                    <div className="h-2 w-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-transparent rounded-full opacity-50" />
                    <p className="font-mono text-sm text-white/40">import {`{ Note }`} from 'music-theory'</p>
                 </div>
              </div>
              <div className="order-1 lg:order-2 flex flex-col gap-6 text-center lg:text-left">
                <h2 className="text-3xl md:text-4xl font-bold">{isVi ? 'Khám Phá Nhạc Lý' : 'Master Music Theory'}</h2>
                <p className="text-white/60 leading-relaxed text-lg">
                  {isVi 
                    ? 'Tìm hiểu sâu về nhạc lý thông qua các bài học tương tác được thiết kế tuyệt đẹp. Tìm hiểu về khuông nhạc, khóa nhạc, nốt nhạc và bàn phím đàn piano qua các minh họa 3D sống động.' 
                    : 'Dive into our beautifully designed interactive lessons. Learn about staves, clefs, notes, and the piano keyboard through stunning 3D glassmorphism illustrations.'}
                </p>
                <div>
                  <Link to={'/theory'} className="inline-flex items-center gap-2 text-violet-400 font-medium hover:text-violet-300 transition-colors">
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
        <div className="relative py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-violet-900/20" />
          <div className="mx-auto w-full max-w-(--breakpoint-lg) px-6 relative z-10 text-center flex flex-col items-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">{isVi ? 'Sẵn sàng để chơi nhạc?' : 'Ready to play?'}</h2>
            <p className="text-xl text-white/60 mb-10 max-w-2xl">
              {isVi 
                ? 'Gia nhập cùng hàng ngàn nhạc sĩ đang cải thiện kỹ năng thị tấu mỗi ngày. Kết nối bàn phím MIDI của bạn và bắt đầu chơi ngay lập tức.' 
                : 'Join thousands of musicians improving their sight-reading skills every day. Connect your MIDI keyboard and start instantly.'}
            </p>
            <Link to={'/freeplay'} className="relative group inline-flex items-center justify-center px-8 py-4 font-bold text-white rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 shadow-[0_0_40px_rgba(139,92,246,0.3)] hover:shadow-[0_0_60px_rgba(139,92,246,0.5)] transition-all active:scale-95">
              {isVi ? 'Bắt Đầu Tự Do' : 'Start Free Play'}
            </Link>
          </div>
        </div>

      </div>

      <div className="mt-auto relative z-10 bg-[#0B0A10]">
        <MarketingFooter />
      </div>
    </div>
  )
}
