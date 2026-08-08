import { activeProfileIdAtom, profilesAtom, themeAtom } from '@/features/persist/persistence'
import clsx from 'clsx'
import { useAtom } from 'jotai'
import { Globe, Plus, User } from 'lucide-react'
import { useEffect } from 'react'
import {
  Button,
  Header,
  Menu,
  MenuItem,
  MenuTrigger,
  Section,
  Separator,
} from 'react-aria-components'
import { useTranslation } from 'react-i18next'
import { Popover } from './Popover'

export function ProfileSwitcher() {
  const { t, i18n } = useTranslation()
  const [profiles, setProfiles] = useAtom(profilesAtom)
  const [activeProfileId, setActiveProfileId] = useAtom(activeProfileIdAtom)
  const [theme, setTheme] = useAtom(themeAtom)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <MenuTrigger>
      <Button
        aria-label="Profile"
        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors outline-none hover:bg-white/20 data-[focused]:ring-2 data-[focused]:ring-white/50"
      >
        <User size={18} />
      </Button>
      <Popover
        placement="bottom end"
        className="border-border bg-popover w-56 rounded-xl border p-1.5 shadow-xl backdrop-blur-md"
      >
        <Menu className="outline-none">
          {profiles.map((profile) => (
            <MenuItem
              key={profile.id}
              onAction={() => setActiveProfileId(profile.id)}
              className={clsx(
                'flex w-full cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition outline-none',
                activeProfileId === profile.id
                  ? 'bg-primary/20 text-popover-foreground'
                  : 'text-popover-foreground/70 hover:text-popover-foreground',
                'data-[focused]:bg-foreground/10',
              )}
            >
              <span className="truncate pr-2">{profile.name}</span>
              {activeProfileId === profile.id && (
                <div className="h-2 w-2 shrink-0 rounded-full bg-green-400" />
              )}
            </MenuItem>
          ))}
          <Separator className="border-border mx-2 my-1.5 border-t" />
          <MenuItem
            onAction={() => {
              const name = prompt(t('settings.profile_name_prompt'))
              if (name) {
                const id = crypto.randomUUID()
                setProfiles([...profiles, { id, name }])
                setActiveProfileId(id)
              }
            }}
            className="text-popover-foreground/80 data-[focused]:bg-foreground/10 hover:text-popover-foreground flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition outline-none"
          >
            <Plus size={16} />
            {t('settings.add_new_profile')}
          </MenuItem>

          <Separator className="border-border mx-2 my-1.5 border-t" />
          <MenuItem
            onAction={() => {
              const isVi = i18n.language?.startsWith('vi')
              i18n.changeLanguage(isVi ? 'en' : 'vi')
            }}
            className="text-popover-foreground/80 data-[focused]:bg-foreground/10 hover:text-popover-foreground flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition outline-none"
          >
            <Globe size={16} />
            {i18n.language?.startsWith('vi') ? 'Ngôn ngữ: Tiếng Việt' : 'Language: English'}
          </MenuItem>

          <Separator className="border-border mx-2 my-1.5 border-t" />
          <Section>
            <Header className="text-popover-foreground/50 px-3 py-1 text-xs font-semibold tracking-wider uppercase">
              {i18n.language?.startsWith('vi') ? 'Giao diện' : 'Theme'}
            </Header>
            {(['dark', 'light', 'read', 'modern'] as const).map((tOpt) => (
              <MenuItem
                id={`theme-${tOpt}`}
                key={tOpt}
                onAction={() => setTheme(tOpt)}
                className={clsx(
                  'flex w-full cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition outline-none',
                  theme === tOpt
                    ? 'bg-primary/20 text-popover-foreground'
                    : 'text-popover-foreground/70 hover:text-popover-foreground',
                  'data-[focused]:bg-foreground/10',
                )}
              >
                <span className="capitalize">{tOpt}</span>
                {theme === tOpt && <div className="bg-primary h-2 w-2 shrink-0 rounded-full" />}
              </MenuItem>
            ))}
          </Section>
        </Menu>
      </Popover>
    </MenuTrigger>
  )
}
