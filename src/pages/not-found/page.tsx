import { AppBar, MarketingFooter, Sizer } from '@/components'
import { BookOpen, Home, Music, Piano, Search } from 'lucide-react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'

export default function NotFoundPage() {
  const { t } = useTranslation()

  return (
    <div className="bg-background text-foreground flex min-h-screen w-full flex-col">
      <title>404 - Trang Không Tồn Tại | TNClub Sightread</title>
      <AppBar />

      <main className="flex w-full flex-1 flex-col items-center justify-center px-6 py-16 text-center">
        {/* Glowing Ambient Background Backdrop */}
        <div className="relative mx-auto max-w-2xl space-y-6">
          <div className="absolute -top-20 left-1/2 -z-10 h-64 w-64 -translate-x-1/2 rounded-full bg-amber-500/20 blur-3xl" />
          <div className="absolute -bottom-20 left-1/2 -z-10 h-64 w-64 -translate-x-1/2 rounded-full bg-violet-500/20 blur-3xl" />

          {/* Glowing 404 Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-950/70 px-5 py-2 text-xs font-bold text-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.3)] backdrop-blur-md">
            <Piano className="h-4 w-4 text-amber-400" />
            <span>Lỗi 404 - Trang Không Tồn Tại</span>
          </div>

          {/* Huge 404 Heading */}
          <h1 className="from-amber-400 via-amber-200 to-white bg-gradient-to-r bg-clip-text text-7xl font-black tracking-tight text-transparent sm:text-9xl drop-shadow-2xl">
            404
          </h1>

          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Rất tiếc! Giai Điệu Này Không Tồn Tại
          </h2>

          <p className="mx-auto max-w-md text-sm leading-relaxed text-muted-foreground font-medium">
            Đường dẫn bạn truy cập có thể đã bị thay đổi, xóa bỏ hoặc không đúng chính tả. Hãy khám phá các trang học piano hấp dẫn bên dưới!
          </p>

          {/* Quick Action Navigation Grid */}
          <div className="grid gap-3 sm:grid-cols-2 pt-4">
            <Link
              to="/"
              className="flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-5 py-3 text-xs font-bold text-slate-950 shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all hover:bg-amber-400 hover:scale-105"
            >
              <Home className="h-4 w-4" />
              <span>Về Trang Chủ</span>
            </Link>

            <Link
              to="/songs"
              className="flex items-center justify-center gap-2 rounded-xl border border-border bg-foreground/5 px-5 py-3 text-xs font-bold text-foreground transition-all hover:bg-foreground/15 hover:border-amber-400/50"
            >
              <Music className="h-4 w-4 text-amber-400" />
              <span>Thư Viện Bài Hát</span>
            </Link>

            <Link
              to="/theory"
              className="flex items-center justify-center gap-2 rounded-xl border border-border bg-foreground/5 px-5 py-3 text-xs font-bold text-foreground transition-all hover:bg-foreground/15 hover:border-amber-400/50"
            >
              <BookOpen className="h-4 w-4 text-cyan-400" />
              <span>Căn Bản Nhạc Lý & Hợp Âm</span>
            </Link>

            <Link
              to="/piano-history"
              className="flex items-center justify-center gap-2 rounded-xl border border-border bg-foreground/5 px-5 py-3 text-xs font-bold text-foreground transition-all hover:bg-foreground/15 hover:border-amber-400/50"
            >
              <Piano className="h-4 w-4 text-fuchsia-400" />
              <span>Lịch Sử & Bách Khoa Piano</span>
            </Link>
          </div>
        </div>
      </main>

      <Sizer height={40} />
      <MarketingFooter />
    </div>
  )
}
