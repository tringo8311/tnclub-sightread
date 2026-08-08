import { Sizer } from '@/components'
import { LucideGithub as GitHub, Logo, Menu, Youtube } from '@/icons'
import clsx from 'clsx'
import { PropsWithChildren } from 'react'
import { Button, MenuItem, MenuTrigger, Menu as RacMenu, Separator } from 'react-aria-components'
import { Link, useLocation, useNavigate } from 'react-router'
import { Popover } from './Popover'
import { useTranslation } from 'react-i18next'
import { LanguageSwitcher } from './LanguageSwitcher'
import { ProfileSwitcher } from './ProfileSwitcher'

import { Info, BookOpen, Music, Piano } from 'lucide-react'

type NavItem = { route: string; labelKey: string; icon: React.ComponentType<{ size?: number; className?: string }> }
const navItems: NavItem[] = [
  { route: '/about', labelKey: 'home.about', icon: Info },
  { route: '/theory', labelKey: 'home.theory', icon: BookOpen },
  { route: '/songs', labelKey: 'home.learn_song', icon: Music },
  { route: '/freeplay', labelKey: 'home.free_play', icon: Piano },
]

export default function AppBar() {
  const { t } = useTranslation()
  const currentRoute = useLocation().pathname

  return (
    <header
      className="sticky top-0 z-50 flex h-[60px] min-h-[60px] flex-col justify-center border-b border-primary/20 bg-primary/85 text-primary-foreground backdrop-blur-md shadow-md transition-all duration-300"
      style={{
        paddingLeft: 'calc(100vw - 100%)',
      }}
    >
      <div className="mx-auto flex w-full items-center justify-between px-6 md:max-w-(--breakpoint-lg)">
        <Link 
          to={'/'} 
          className="group flex items-center gap-2 text-primary-foreground transition-transform duration-300 hover:scale-105 active:scale-95"
        >
          <div className="p-1.5 rounded-xl bg-primary-foreground/10 transition-colors group-hover:bg-primary-foreground/20">
            <Logo height={24} width={24} className="relative transition-transform duration-300 group-hover:rotate-12" />
          </div>
          <span className="text-xl font-light tracking-wider bg-gradient-to-r from-primary-foreground via-primary-foreground to-primary-foreground/70 bg-clip-text text-transparent">
            TNCLUB SIGHTREAD
          </span>
        </Link>

        {/* Desktop Navigation & Actions aligned right */}
        <div className="hidden items-center gap-4 md:flex ml-auto">
          <nav className="flex items-center gap-1">
            {navItems.map((nav) => {
              const isActive = currentRoute === nav.route
              const Icon = nav.icon
              return (
                <Link
                  to={nav.route}
                  key={nav.route}
                  className={clsx(
                    'group relative flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-medium transition-all duration-300 ease-out',
                    isActive
                      ? 'text-primary-foreground font-semibold shadow-sm'
                      : 'text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/15'
                  )}
                >
                  {isActive && (
                    <span className="absolute inset-0 rounded-xl bg-primary-foreground/25 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)] animate-in fade-in zoom-in-95 duration-200" />
                  )}
                  <Icon size={16} className="relative z-10 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
                  <span className="relative z-10">{t(nav.labelKey)}</span>
                </Link>
              )
            })}
          </nav>
          <ProfileSwitcher />
        </div>

        {/* Mobile Navigation button */}
        <div className="md:hidden">
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
  return (
    <MenuTrigger>
      <Button aria-label="Open menu" className="inline-flex p-2 rounded-xl bg-primary-foreground/10 hover:bg-primary-foreground/20 active:scale-95 transition-all">
        <Menu height={24} width={24} className="block text-primary-foreground" />
      </Button>
      <Popover className="w-[min(90vw,360px)] rounded-2xl border border-border bg-popover text-popover-foreground p-2 shadow-xl backdrop-blur">
        <RacMenu className="outline-none">
          {navItems.map((nav) => {
            const Icon = nav.icon
            const isActive = currentRoute === nav.route
            return (
              <MenuItem
                key={nav.route}
                onAction={() => navigate(nav.route)}
                className={clsx(
                  'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-base font-medium text-popover-foreground/90 transition outline-none',
                  'data-[focused]:bg-foreground/10 data-[pressed]:bg-foreground/5',
                  isActive && 'bg-foreground/10 font-semibold text-foreground'
                )}
              >
                <Icon size={18} className="text-foreground/70" />
                <span>{t(nav.labelKey)}</span>
              </MenuItem>
            )
          })}
          <Separator className="mx-2 my-1 border-t border-border" />
          <MenuItem
            href="https://github.com/sightread/sightread"
            target="_blank"
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-popover-foreground/80 transition outline-none data-[focused]:bg-foreground/10 data-[pressed]:bg-foreground/5"
            aria-label="GitHub"
          >
            <GitHub size={18} />
            <span>GitHub</span>
          </MenuItem>
          <MenuItem
            href="https://www.youtube.com/channel/UCGf2AlCRD3ZCc8ahkqBMtqA"
            target="_blank"
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-popover-foreground/80 transition outline-none data-[focused]:bg-foreground/10 data-[pressed]:bg-foreground/5"
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

function NavItem(
  props: PropsWithChildren<{
    to: string
    className?: string
    label: string
    activeClassName?: string
  }>,
) {
  const currentRoute = useLocation().pathname
  return (
    <Link
      to={props.to}
      className={clsx(
        'inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium text-primary-foreground/90 transition-colors hover:bg-primary-foreground/10 active:bg-primary-foreground/20',
        props.className,
        currentRoute === props.to && (props.activeClassName || 'font-bold'),
      )}
    >
      {props.label}
    </Link>
  )
}

function NavIconButton(
  props: PropsWithChildren<{ to: string; label: string; title?: string; className?: string }>,
) {
  return (
    <Link
      to={props.to}
      aria-label={props.label}
      title={props.title ?? props.label}
      className={clsx(
        'hover:opacity-80 flex h-9 w-9 items-center justify-center rounded-md text-primary-foreground transition-colors hover:bg-primary-foreground/10 active:bg-primary-foreground/20',
        props.className,
      )}
    >
      {props.children}
      <span className="sr-only">{props.label}</span>
    </Link>
  )
}
