import { Sizer } from '@/components'
import { LucideGithub as GitHub, Logo, Menu, Youtube } from '@/icons'
import clsx from 'clsx'
import { BookOpen, Info, Music, Piano, Store } from 'lucide-react'
import React, { PropsWithChildren } from 'react'
import { Button, MenuItem, MenuTrigger, Menu as RacMenu, Separator } from 'react-aria-components'
import { useTranslation } from 'react-i18next'
import { Link, useLocation, useNavigate } from 'react-router'
import { LanguageSwitcher } from './LanguageSwitcher'
import { Popover } from './Popover'
import { ProfileSwitcher } from './ProfileSwitcher'

type NavItemDef = {
  route: string
  labelKey: string
  icon: React.ComponentType<{ size?: number; className?: string }>
}

const leftNavItems: NavItemDef[] = [
  { route: '/theory', labelKey: 'home.nav_theory', icon: BookOpen },
  { route: '/songs', labelKey: 'home.learn_song', icon: Music },
]

const rightNavItems: NavItemDef[] = [{ route: '/market', labelKey: 'MIDI Market', icon: Store }]

export default function AppBar() {
  const { t } = useTranslation()
  const currentRoute = useLocation().pathname

  return (
    <header
      data-ui="app-header"
      data-component="AppBar"
      className="border-primary/20 bg-primary/90 text-primary-foreground relative sticky top-0 z-40 flex h-[60px] min-h-[60px] flex-col justify-center overflow-visible border-b shadow-md backdrop-blur-md transition-all duration-300"
      style={{
        paddingLeft: 'calc(100vw - 100%)',
      }}
    >
      {/* Subtle Diamond Pattern Background Overlay */}
      <div
        className="pointer-events-none absolute inset-0 rounded-b-none opacity-15 transition-opacity duration-300"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='24' height='40' viewBox='0 0 24 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 0L24 20L12 40L0 20Z' fill='none' stroke='currentColor' stroke-width='1' stroke-opacity='0.4'/%3E%3Cpath d='M12 8L20 20L12 32L4 20Z' fill='none' stroke='currentColor' stroke-width='0.5' stroke-opacity='0.25'/%3E%3C/svg%3E")`,
          backgroundSize: '24px 40px',
        }}
      />

      <div className="relative z-10 mx-auto flex w-full items-center justify-between px-4 md:max-w-(--breakpoint-lg) md:px-6">
        {/* LEFT NAV: Theory & Songs */}
        <div className="hidden flex-1 items-center justify-start gap-3 md:flex">
          {leftNavItems.map((nav) => {
            const isActive = currentRoute === nav.route
            const Icon = nav.icon
            const navId = nav.route.replace('/', '')
            return (
              <Link
                to={nav.route}
                key={nav.route}
                data-element-id={`nav-link-${navId}`}
                className={clsx(
                  'group relative flex items-center gap-2 px-3.5 py-2 text-xs transition-all duration-200 outline-none md:text-sm',
                  isActive
                    ? 'font-black text-white'
                    : 'text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground rounded-xl font-medium',
                )}
              >
                <Icon
                  size={17}
                  className={clsx(
                    'relative z-10 transition-all duration-200',
                    isActive
                      ? 'scale-110 text-amber-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.9)]'
                      : 'opacity-80 group-hover:scale-110 group-hover:opacity-100',
                  )}
                />
                <span className="relative z-10">{t(nav.labelKey)}</span>
                {isActive && (
                  <span className="animate-in fade-in zoom-in-95 absolute right-0 -bottom-[9px] left-0 h-[3.5px] rounded-full bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-400 shadow-[0_0_12px_#fbbf24] duration-200" />
                )}
              </Link>
            )
          })}
        </div>

        {/* CENTER: Luxury Brand Name (Top) + Overlapping Emblem Logo (50% Menu, 50% Body) */}
        <div className="flex flex-1 items-center justify-center md:flex-initial">
          <Link
            to="/"
            data-element-id="nav-logo"
            className="group relative flex flex-col items-center justify-center text-center transition-all duration-300 hover:scale-105 active:scale-95"
          >
            {/* Luxury Metallic Gold & Platinum Brand Text Pill */}
            <div className="mb-6.5 inline-flex items-center gap-1.5 rounded-full border border-amber-400/50 bg-slate-950/70 px-3.5 py-0.5 shadow-[0_0_15px_rgba(245,158,11,0.3)] backdrop-blur-md transition-all duration-300 group-hover:border-amber-300 group-hover:bg-slate-950/85 group-hover:shadow-[0_0_22px_rgba(245,158,11,0.55)]">
              <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 bg-clip-text text-[11px] font-black tracking-[0.22em] text-transparent drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] md:text-xs">
                TNCLUB
              </span>
              <span className="text-[9px] text-amber-400/70">•</span>
              <span className="text-[10px] font-light tracking-[0.28em] text-zinc-100 uppercase drop-shadow-sm md:text-[11px]">
                SIGHTREAD
              </span>
            </div>

            {/* Overlapping Badge: 50% in main menu, 50% overlapping body below */}
            <div className="absolute top-[20px] z-50 flex h-14 w-14 items-center justify-center rounded-full border-2 border-amber-400/80 bg-slate-950/90 text-amber-400 shadow-[0_8px_25px_rgba(0,0,0,0.6),0_0_18px_rgba(245,158,11,0.45)] backdrop-blur-xl transition-all duration-300 group-hover:scale-110 group-hover:border-amber-300 group-hover:shadow-[0_12px_32px_rgba(245,158,11,0.7)]">
              <Logo width={32} height={32} className="transition-transform duration-300" />
            </div>
          </Link>
        </div>

        {/* RIGHT NAV: Market & Profile */}
        <div className="hidden flex-1 items-center justify-end gap-3 md:flex">
          {rightNavItems.map((nav) => {
            const isActive = currentRoute === nav.route
            const Icon = nav.icon
            const navId = nav.route.replace('/', '')
            return (
              <Link
                to={nav.route}
                key={nav.route}
                data-element-id={`nav-link-${navId}`}
                className={clsx(
                  'group relative flex items-center gap-2 px-3.5 py-2 text-xs transition-all duration-200 outline-none md:text-sm',
                  isActive
                    ? 'font-black text-white'
                    : 'text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground rounded-xl font-medium',
                )}
              >
                <Icon
                  size={17}
                  className={clsx(
                    'relative z-10 transition-all duration-200',
                    isActive
                      ? 'scale-110 text-amber-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.9)]'
                      : 'opacity-80 group-hover:scale-110 group-hover:opacity-100',
                  )}
                />
                <span className="relative z-10">{t(nav.labelKey)}</span>
                {isActive && (
                  <span className="animate-in fade-in zoom-in-95 absolute right-0 -bottom-[9px] left-0 h-[3.5px] rounded-full bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-400 shadow-[0_0_12px_#fbbf24] duration-200" />
                )}
              </Link>
            )
          })}
          <ProfileSwitcher />
        </div>

        {/* Mobile Navigation button */}
        <div className="flex items-center gap-2 md:hidden">
          <ProfileSwitcher />
          <SmallWindowNav />
        </div>
      </div>
    </header>
  )
}

function SmallWindowNav() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const currentRoute = useLocation().pathname
  const allNavItems = [...leftNavItems, ...rightNavItems]

  return (
    <MenuTrigger>
      <Button
        aria-label="Open menu"
        className="bg-primary-foreground/10 hover:bg-primary-foreground/20 inline-flex cursor-pointer rounded-xl p-2 transition-all active:scale-95"
      >
        <Menu height={22} width={22} className="text-primary-foreground block" />
      </Button>
      <Popover className="border-border bg-popover text-popover-foreground w-[min(90vw,360px)] rounded-2xl border p-2 shadow-xl backdrop-blur">
        <RacMenu className="outline-none">
          {allNavItems.map((nav) => {
            const Icon = nav.icon
            const isActive = currentRoute === nav.route
            return (
              <MenuItem
                key={nav.route}
                onAction={() => navigate(nav.route)}
                className={clsx(
                  'text-popover-foreground/90 flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-base font-medium transition outline-none',
                  'data-[focused]:bg-foreground/10 data-[pressed]:bg-foreground/5',
                  isActive && 'bg-foreground/10 text-foreground font-semibold',
                )}
              >
                <Icon size={18} className="text-foreground/70" />
                <span>{t(nav.labelKey)}</span>
              </MenuItem>
            )
          })}
          <Separator className="border-border mx-2 my-1 border-t" />
          <MenuItem
            href="https://github.com/sightread/sightread"
            target="_blank"
            className="text-popover-foreground/80 data-[focused]:bg-foreground/10 data-[pressed]:bg-foreground/5 flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition outline-none"
            aria-label="GitHub"
          >
            <GitHub size={18} />
            <span>GitHub</span>
          </MenuItem>
          <MenuItem
            href="https://www.youtube.com/channel/UCGf2AlCRD3ZCc8ahkqBMtqA"
            target="_blank"
            className="text-popover-foreground/80 data-[focused]:bg-foreground/10 data-[pressed]:bg-foreground/5 flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition outline-none"
            aria-label="YouTube"
          >
            <Youtube size={18} />
            <span>YouTube</span>
          </MenuItem>
        </RacMenu>
      </Popover>
    </MenuTrigger>
  )
}
