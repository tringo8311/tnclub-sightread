import { Sizer } from '@/components'
import { LucideGithub as GitHub, Logo, Menu, Youtube } from '@/icons'
import clsx from 'clsx'
import { BookOpen, Info, Music, Piano, Store } from 'lucide-react'
import React, { PropsWithChildren, useState } from 'react'
import { Button, MenuItem, MenuTrigger, Menu as RacMenu, Separator } from 'react-aria-components'
import { useTranslation } from 'react-i18next'
import { Link, useLocation, useNavigate } from 'react-router'
import styles from './AppBar.module.css'
import { WingIconLeft, WingIconRight } from './AppBarWings'
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
              <WingIconLeft className={styles.wingIconLeft} />

              <span className={styles.brandTextLeft}>
                TNCLUB
              </span>
              <span className={styles.brandDot}>•</span>
              <span className={styles.brandTextRight}>
                SIGHTREAD
              </span>

              <WingIconRight className={styles.wingIconRight} />
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

        {/* Mobile Header Elements: Profile (Left) and Navigation Menu (Right) */}
        <div className={styles.mobileLeftProfile}>
          <ProfileSwitcher isCompact />
        </div>

        <div className={styles.mobileNav}>
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
  const [isOpen, setIsOpen] = useState(false)
  const allNavItems = [...leftNavItems, ...rightNavItems]

  return (
    <MenuTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
      <Button aria-label="Open menu" className={styles.mobileTriggerBtn}>
        <Menu height={22} width={22} className={styles.mobileMenuIcon} />
      </Button>
      <Popover className={styles.mobilePopover}>
        <RacMenu className={styles.mobileMenu}>
          {allNavItems.map((nav) => {
            const Icon = nav.icon
            const isActive = currentRoute === nav.route
            return (
              <MenuItem
                key={nav.route}
                onAction={() => navigate(nav.route)}
                className={clsx(styles.mobileMenuItem, isActive && styles.mobileMenuItemActive)}
              >
                <Icon size={18} className={styles.mobileItemIcon} />
                <span>{t(nav.labelKey)}</span>
              </MenuItem>
            )
          })}
          <Separator className={styles.mobileSeparator} />
          <MenuItem
            href="https://github.com/sightread/sightread"
            target="_blank"
            className={styles.mobileMenuSubItem}
            aria-label="GitHub"
          >
            <GitHub size={18} />
            <span>GitHub</span>
          </MenuItem>
          <MenuItem
            href="https://www.youtube.com/channel/UCGf2AlCRD3ZCc8ahkqBMtqA"
            target="_blank"
            className={styles.mobileMenuSubItem}
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
