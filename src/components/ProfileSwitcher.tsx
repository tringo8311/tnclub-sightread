import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { profilesAtom, activeProfileIdAtom, themeAtom } from '@/features/persist/persistence'
import { useTranslation } from 'react-i18next'
import { User, Plus, Globe } from 'lucide-react'
import { MenuTrigger, Button, Menu, MenuItem, Separator, Section, Header } from 'react-aria-components'
import { Popover } from './Popover'
import clsx from 'clsx'

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
        className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 outline-none data-[focused]:ring-2 data-[focused]:ring-white/50 cursor-pointer"
      >
        <User size={18} />
      </Button>
      <Popover placement="bottom end" className="w-56 rounded-xl border border-border bg-popover p-1.5 shadow-xl backdrop-blur-md">
        <Menu className="outline-none">
          {profiles.map((profile) => (
            <MenuItem
              key={profile.id}
              onAction={() => setActiveProfileId(profile.id)}
              className={clsx(
                'flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition outline-none cursor-pointer',
                activeProfileId === profile.id ? 'bg-primary/20 text-popover-foreground' : 'text-popover-foreground/70 hover:text-popover-foreground',
                'data-[focused]:bg-foreground/10'
              )}
            >
              <span className="truncate pr-2">{profile.name}</span>
              {activeProfileId === profile.id && <div className="h-2 w-2 rounded-full bg-green-400 shrink-0" />}
            </MenuItem>
          ))}
          <Separator className="mx-2 my-1.5 border-t border-border" />
          <MenuItem
            onAction={() => {
              const name = prompt(t('settings.profile_name_prompt'))
              if (name) {
                const id = crypto.randomUUID()
                setProfiles([...profiles, { id, name }])
                setActiveProfileId(id)
              }
            }}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-popover-foreground/80 transition outline-none cursor-pointer data-[focused]:bg-foreground/10 hover:text-popover-foreground"
          >
            <Plus size={16} />
            {t('settings.add_new_profile')}
          </MenuItem>
          
          <Separator className="mx-2 my-1.5 border-t border-border" />
          <MenuItem
            onAction={() => {
              const isVi = i18n.language?.startsWith('vi')
              i18n.changeLanguage(isVi ? 'en' : 'vi')
            }}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-popover-foreground/80 transition outline-none cursor-pointer data-[focused]:bg-foreground/10 hover:text-popover-foreground"
          >
            <Globe size={16} />
            {i18n.language?.startsWith('vi') ? 'Ngôn ngữ: Tiếng Việt' : 'Language: English'}
          </MenuItem>

          <Separator className="mx-2 my-1.5 border-t border-border" />
          <Section>
            <Header className="px-3 py-1 text-xs font-semibold text-popover-foreground/50 uppercase tracking-wider">
              {i18n.language?.startsWith('vi') ? 'Giao diện' : 'Theme'}
            </Header>
            {(['dark', 'light', 'read', 'modern'] as const).map((tOpt) => (
              <MenuItem
                id={`theme-${tOpt}`}
                key={tOpt}
                onAction={() => setTheme(tOpt)}
                className={clsx(
                  'flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition outline-none cursor-pointer',
                  theme === tOpt ? 'bg-primary/20 text-popover-foreground' : 'text-popover-foreground/70 hover:text-popover-foreground',
                  'data-[focused]:bg-foreground/10'
                )}
              >
                <span className="capitalize">{tOpt}</span>
                {theme === tOpt && <div className="h-2 w-2 rounded-full bg-primary shrink-0" />}
              </MenuItem>
            ))}
          </Section>
        </Menu>
      </Popover>
    </MenuTrigger>
  )
}
