import { Sizer } from '@/components'
import { LucideGithub as GitHub, Logo, Menu, Youtube } from '@/icons'
import clsx from 'clsx'
import { BookOpen, Info, Music, Piano, Store } from 'lucide-react'
import React, { PropsWithChildren } from 'react'
import { Button, MenuItem, MenuTrigger, Menu as RacMenu, Separator } from 'react-aria-components'
import { useTranslation } from 'react-i18next'
import { Link, useLocation, useNavigate } from 'react-router'
import styles from './AppBar.module.css'
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
      className={styles.header}
    >
      {/* Subtle Diamond Pattern Background Overlay */}
      <div className={styles.bgOverlay} />

      <div className={styles.container}>
        {/* LEFT NAV: Theory & Songs */}
        <div className={styles.leftNav}>
          {leftNavItems.map((nav) => {
            const isActive = currentRoute === nav.route
            const Icon = nav.icon
            const navId = nav.route.replace('/', '')
            return (
              <Link
                to={nav.route}
                key={nav.route}
                data-element-id={`nav-link-${navId}`}
                className={clsx(styles.navLink, isActive && styles.navLinkActive)}
              >
                <Icon
                  size={17}
                  className={clsx(styles.icon, isActive && styles.iconActive)}
                />
                <span className="relative z-10">{t(nav.labelKey)}</span>
                {isActive && <span className={styles.activeIndicator} />}
              </Link>
            )
          })}
        </div>

        {/* CENTER: Luxury Brand Name (Top) + Overlapping Emblem Logo (50% Menu, 50% Body) */}
        <div className={styles.centerBrand}>
          <Link
            to="/"
            data-element-id="nav-logo"
            className={styles.brandLink}
          >
            {/* Brand Pill with Stylized SVG Wings */}
            <div className={styles.brandPill}>
              {/* Left Wing SVG */}
              <svg className={styles.wingIconLeft} viewBox="0 0 80 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M80 20C55 20 30 14 15 4C28 10 50 14 80 14V20Z" fill="url(#wingGradLeft)" />
                <path d="M80 12C50 12 30 8 18 0C32 6 52 9 80 9V12Z" fill="url(#wingGradLeft)" opacity="0.75" />
                <path d="M80 24C45 24 20 17 0 8C22 14 48 18 80 18V24Z" fill="url(#wingGradLeft)" opacity="0.4" />
                <defs>
                  <linearGradient id="wingGradLeft" x1="0" y1="0" x2="80" y2="24" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#F59E0B" />
                    <stop offset="1" stopColor="#FBBF24" />
                  </linearGradient>
                </defs>
              </svg>

              <span className={styles.brandTextLeft}>
                TNCLUB
              </span>
              <span className={styles.brandDot}>•</span>
              <span className={styles.brandTextRight}>
                SIGHTREAD
              </span>

              {/* Right Wing SVG */}
              <svg className={styles.wingIconRight} viewBox="0 0 80 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 20C25 20 50 14 65 4C52 10 30 14 0 14V20Z" fill="url(#wingGradRight)" />
                <path d="M0 12C30 12 50 8 62 0C48 6 28 9 0 9V12Z" fill="url(#wingGradRight)" opacity="0.75" />
                <path d="M0 24C35 24 60 17 80 8C58 14 32 18 0 18V24Z" fill="url(#wingGradRight)" opacity="0.4" />
                <defs>
                  <linearGradient id="wingGradRight" x1="80" y1="0" x2="0" y2="24" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#F59E0B" />
                    <stop offset="1" stopColor="#FBBF24" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Overlapping Badge: 50% in main menu, 50% overlapping body below */}
            <div className={styles.badgeLogo}>
              <Logo width={32} height={32} className="transition-transform duration-300" />
            </div>
          </Link>
        </div>

        {/* RIGHT NAV: Market & Profile */}
        <div className={styles.rightNav}>
          {rightNavItems.map((nav) => {
            const isActive = currentRoute === nav.route
            const Icon = nav.icon
            const navId = nav.route.replace('/', '')
            return (
              <Link
                to={nav.route}
                key={nav.route}
                data-element-id={`nav-link-${navId}`}
                className={clsx(styles.navLink, isActive && styles.navLinkActive)}
              >
                <Icon
                  size={17}
                  className={clsx(styles.icon, isActive && styles.iconActive)}
                />
                <span className="relative z-10">{t(nav.labelKey)}</span>
                {isActive && <span className={styles.activeIndicator} />}
              </Link>
            )
          })}
          <ProfileSwitcher />
        </div>

        {/* Mobile Navigation button */}
        <div className={styles.mobileNav}>
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
