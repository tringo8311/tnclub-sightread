import { Sizer } from '@/components'
import { LucideGithub as GitHub, Logo, Menu, Youtube } from '@/icons'
import clsx from 'clsx'
import { BookOpen, Info, Music, Piano, Store } from 'lucide-react'
import { PropsWithChildren } from 'react'
import { Button, MenuItem, MenuTrigger, Menu as RacMenu, Separator } from 'react-aria-components'
import { useTranslation } from 'react-i18next'
import { Link, useLocation, useNavigate } from 'react-router'
import { LanguageSwitcher } from './LanguageSwitcher'
import { Popover } from './Popover'
import { ProfileSwitcher } from './ProfileSwitcher'

type NavItem = {
  route: string
  labelKey: string
  icon: React.ComponentType<{ size?: number; className?: string }>
}
const navItems: NavItem[] = [
  { route: '/about', labelKey: 'home.about', icon: Info },
  { route: '/theory', labelKey: 'home.nav_theory', icon: BookOpen },
  { route: '/songs', labelKey: 'home.learn_song', icon: Music },
  { route: '/market', labelKey: 'MIDI Market', icon: Store },
]

export default function AppBar() {
  const { t } = useTranslation()
  const currentRoute = useLocation().pathname

  return (
    <header
      data-ui="app-header"
      data-component="AppBar"
      className="border-primary/20 bg-primary/85 text-primary-foreground relative sticky top-0 z-50 flex h-[60px] min-h-[60px] flex-col justify-center overflow-hidden border-b shadow-md backdrop-blur-md transition-all duration-300"
      style={{
        paddingLeft: 'calc(100vw - 100%)',
      }}
    >
      {/* Subtle Diamond (Argyle/Rhombus) Pattern Background Overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-15 transition-opacity duration-300"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='24' height='40' viewBox='0 0 24 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 0L24 20L12 40L0 20Z' fill='none' stroke='currentColor' stroke-width='1' stroke-opacity='0.4'/%3E%3Cpath d='M12 8L20 20L12 32L4 20Z' fill='none' stroke='currentColor' stroke-width='0.5' stroke-opacity='0.25'/%3E%3C/svg%3E")`,
          backgroundSize: '24px 40px',
        }}
      />
      <div className="relative z-10 mx-auto flex w-full items-center justify-between px-6 md:max-w-(--breakpoint-lg)">
        <Link
          to={'/'}
          data-element-id="nav-logo"
          className="group text-primary-foreground flex items-center gap-2 transition-transform duration-300 hover:scale-105 active:scale-95"
        >
          <div className="bg-primary-foreground/10 group-hover:bg-primary-foreground/20 rounded-xl p-1.5 transition-colors">
            <Logo
              height={24}
              width={24}
              className="relative transition-transform duration-300 group-hover:rotate-12"
            />
          </div>
          <span className="from-primary-foreground via-primary-foreground to-primary-foreground/70 bg-gradient-to-r bg-clip-text text-xl font-light tracking-wider text-transparent">
            TNCLUB SIGHTREAD
          </span>
        </Link>

        {/* Desktop Navigation & Actions aligned right */}
        <div className="ml-auto hidden items-center gap-4 md:flex">
          <nav className="flex items-center gap-1" data-ui="desktop-nav">
            {navItems.map((nav) => {
              const isActive = currentRoute === nav.route
              const Icon = nav.icon
              const navId = nav.route.replace('/', '') || 'home'
              return (
                <Link
                  to={nav.route}
                  key={nav.route}
                  data-element-id={`nav-link-${navId}`}
                  className={clsx(
                    'group relative flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-medium transition-all duration-300 ease-out',
                    isActive
                      ? 'text-primary-foreground font-semibold shadow-sm'
                      : 'text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/15',
                  )}
                >
                  {isActive && (
                    <span className="bg-primary-foreground/25 animate-in fade-in zoom-in-95 absolute inset-0 rounded-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)] duration-200" />
                  )}
                  <Icon
                    size={16}
                    className="relative z-10 opacity-80 transition-all duration-300 group-hover:scale-110 group-hover:opacity-100"
                  />
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
      <Button
        aria-label="Open menu"
        className="bg-primary-foreground/10 hover:bg-primary-foreground/20 inline-flex rounded-xl p-2 transition-all active:scale-95"
      >
        <Menu height={24} width={24} className="text-primary-foreground block" />
      </Button>
      <Popover className="border-border bg-popover text-popover-foreground w-[min(90vw,360px)] rounded-2xl border p-2 shadow-xl backdrop-blur">
        <RacMenu className="outline-none">
          {navItems.map((nav) => {
            const Icon = nav.icon
            const isActive = currentRoute === nav.route
            return (
              <MenuItem
                key={nav.route}
                onAction={() => navigate(nav.route)}
                className={clsx(
                  'text-popover-foreground/90 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-base font-medium transition outline-none',
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
            className="text-popover-foreground/80 data-[focused]:bg-foreground/10 data-[pressed]:bg-foreground/5 flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition outline-none"
            aria-label="GitHub"
          >
            <GitHub size={18} />
            <span>GitHub</span>
          </MenuItem>
          <MenuItem
            href="https://www.youtube.com/channel/UCGf2AlCRD3ZCc8ahkqBMtqA"
            target="_blank"
            className="text-popover-foreground/80 data-[focused]:bg-foreground/10 data-[pressed]:bg-foreground/5 flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition outline-none"
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
        'text-primary-foreground/90 hover:bg-primary-foreground/10 active:bg-primary-foreground/20 inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
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
        'text-primary-foreground hover:bg-primary-foreground/10 active:bg-primary-foreground/20 flex h-9 w-9 items-center justify-center rounded-md transition-colors hover:opacity-80',
        props.className,
      )}
    >
      {props.children}
      <span className="sr-only">{props.label}</span>
    </Link>
  )
}
