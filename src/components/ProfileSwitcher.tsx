import Modal from '@/components/Modal'
import { activeProfileIdAtom, fontSizeAtom, profilesAtom, themeAtom } from '@/features/persist'
import clsx from 'clsx'
import { useAtom } from 'jotai'
import { Globe, Minus, Plus, User } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

export interface ProfileSwitcherProps {
  onOpen?: () => void
  isCompact?: boolean
}

export function ProfileSwitcher({ onOpen, isCompact = false }: ProfileSwitcherProps = {}) {
  const { t, i18n } = useTranslation()
  const [profiles, setProfiles] = useAtom(profilesAtom)
  const [activeProfileId, setActiveProfileId] = useAtom(activeProfileIdAtom)
  const [theme, setTheme] = useAtom(themeAtom)
  const [fontSize, setFontSize] = useAtom(fontSizeAtom)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const activeProfile = profiles.find((p) => p.id === activeProfileId) || profiles[0]

  return (
    <div className="relative inline-block">
      <button
        type="button"
        data-element-id="profile-switcher-button"
        aria-label="Profile & Settings"
        onClick={() => {
          onOpen?.()
          setIsOpen(true)
        }}
        className={clsx(
          'group flex items-center justify-center cursor-pointer rounded-full text-xs font-semibold shadow-sm transition-all duration-300 outline-none',
          'border-border bg-card/80 text-foreground border backdrop-blur-md',
          'hover:border-primary/50 hover:bg-muted hover:shadow-[0_0_15px_hsl(var(--primary)/0.25)]',
          'focus:ring-primary/40 focus:ring-2',
          isOpen && 'border-primary ring-primary/40 shadow-md ring-2',
          isCompact ? 'h-9 w-9 p-0' : 'h-9 gap-2 px-3',
        )}
      >
        <div className="bg-primary text-primary-foreground flex h-6 w-6 items-center justify-center rounded-full font-bold shadow-xs">
          <User size={13} className="transition-transform group-hover:scale-110" />
        </div>
        {!isCompact && (
          <span className="text-foreground/90 group-hover:text-foreground max-w-[110px] truncate font-medium">
            {activeProfile?.name || 'Hồ sơ'}
          </span>
        )}
      </button>

      <Modal
        show={isOpen}
        onClose={() => setIsOpen(false)}
        modalClassName="max-w-sm"
      >
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-border pb-3">
            <User className="text-primary h-5 w-5" />
            <h3 className="text-lg font-bold text-foreground">
              {t('settings.profiles')}
            </h3>
          </div>

          {/* PROFILES SECTION */}
          <div className="border-border bg-muted/40 rounded-xl border p-3">
            <div className="text-muted-foreground flex items-center justify-between px-1 py-0.5 text-[11px] font-bold tracking-wider uppercase">
              <span className="text-foreground flex items-center gap-1.5">
                <User size={13} className="text-primary" />
                {t('settings.profiles')}
              </span>
              <span className="bg-primary/15 text-primary rounded-full px-2 py-0.5 text-[10px] font-bold">
                {profiles.length}
              </span>
            </div>
            <div className="mt-2 space-y-1">
              {profiles.map((profile) => {
                const isActive = activeProfileId === profile.id
                return (
                  <button
                    key={profile.id}
                    type="button"
                    onClick={() => setActiveProfileId(profile.id)}
                    className={clsx(
                      'group flex w-full cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-xs font-medium transition-all duration-200 outline-none',
                      isActive
                        ? 'bg-primary text-primary-foreground font-bold shadow-sm'
                        : 'text-foreground/80 hover:bg-foreground/10 hover:text-foreground',
                    )}
                  >
                    <div className="flex min-w-0 items-center gap-2 pr-2">
                      <div
                        className={clsx(
                          'flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold',
                          isActive
                            ? 'bg-primary-foreground/20 text-primary-foreground'
                            : 'bg-foreground/10 text-foreground/70 group-hover:bg-foreground/20 group-hover:text-foreground',
                        )}
                      >
                        {profile.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="truncate">{profile.name}</span>
                    </div>
                    {isActive && (
                      <span className="flex h-2 w-2 shrink-0 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
                    )}
                  </button>
                )
              })}
              <button
                type="button"
                onClick={() => {
                  const name = prompt(t('settings.profile_name_prompt'))
                  if (name) {
                    const id = crypto.randomUUID()
                    setProfiles([...profiles, { id, name }])
                    setActiveProfileId(id)
                  }
                }}
                className="border-primary/40 bg-primary/10 text-primary hover:border-primary hover:bg-primary/20 mt-2 flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-dashed px-3 py-1.5 text-xs font-semibold transition-all outline-none"
              >
                <Plus size={13} />
                {t('settings.add_new_profile')}
              </button>
            </div>
          </div>

          {/* FONT SIZE SETTING */}
          <div>
            <div className="text-muted-foreground flex items-center justify-between px-1 py-1 text-xs font-semibold tracking-wider uppercase">
              <span>{t('settings.font_size')}</span>
              <span className="text-primary font-mono font-bold normal-case">
                {(fontSize / 16).toFixed(3).replace(/\.?0+$/, '')}rem
              </span>
            </div>
            <div className="flex items-center justify-between gap-2 py-1.5">
              <button
                type="button"
                onClick={() => setFontSize((prev) => Math.max(12, prev - 1))}
                disabled={fontSize <= 12}
                className="border-border bg-foreground/5 text-foreground hover:bg-foreground/15 flex h-7 w-7 cursor-pointer items-center justify-center rounded-md border transition-colors disabled:opacity-30"
                title="Decrease font size"
              >
                <Minus size={14} />
              </button>
              <div className="flex flex-1 items-center justify-center gap-1">
                {[14, 16, 18, 20].map((sizeVal) => (
                  <button
                    key={sizeVal}
                    type="button"
                    onClick={() => setFontSize(sizeVal)}
                    className={clsx(
                      'cursor-pointer rounded px-2.5 py-1 text-xs font-medium transition',
                      fontSize === sizeVal
                        ? 'bg-primary text-primary-foreground font-bold'
                        : 'bg-foreground/5 text-foreground/70 hover:bg-foreground/10',
                    )}
                  >
                    {sizeVal === 14 ? 'S' : sizeVal === 16 ? 'M' : sizeVal === 18 ? 'L' : 'XL'}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setFontSize((prev) => Math.min(24, prev + 1))}
                disabled={fontSize >= 24}
                className="border-border bg-foreground/5 text-foreground hover:bg-foreground/15 flex h-7 w-7 cursor-pointer items-center justify-center rounded-md border transition-colors disabled:opacity-30"
                title="Increase font size"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>

          <div className="border-border border-t" />

          {/* LANGUAGE SWITCHER */}
          <button
            type="button"
            onClick={() => {
              const isVi = i18n.language?.startsWith('vi')
              i18n.changeLanguage(isVi ? 'en' : 'vi')
            }}
            className="text-foreground/80 hover:bg-foreground/10 hover:text-foreground flex w-full cursor-pointer items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-medium transition outline-none"
          >
            <Globe size={16} className="text-primary" />
            {i18n.language?.startsWith('vi') ? 'Ngôn ngữ: Tiếng Việt' : 'Language: English'}
          </button>

          <div className="border-border border-t" />

          {/* THEME SETTING */}
          <div>
            <div className="text-muted-foreground px-1 py-1 text-xs font-semibold tracking-wider uppercase">
              {t('settings.theme')}
            </div>
            <div className="mt-1 grid grid-cols-2 gap-1.5">
              {(['dark', 'light', 'read', 'modern'] as const).map((tOpt) => (
                <button
                  key={tOpt}
                  type="button"
                  onClick={() => setTheme(tOpt)}
                  className={clsx(
                    'flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-xs font-medium transition outline-none',
                    theme === tOpt
                      ? 'bg-primary/20 text-foreground border-primary/30 border font-bold'
                      : 'text-foreground/75 hover:bg-foreground/10 hover:text-foreground border border-transparent',
                  )}
                >
                  <span className="capitalize">{tOpt}</span>
                  {theme === tOpt && (
                    <div className="bg-primary h-2 w-2 shrink-0 rounded-full shadow-[0_0_8px_hsl(var(--primary))]" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}
