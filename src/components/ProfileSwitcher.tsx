import {
  activeProfileIdAtom,
  fontSizeAtom,
  profilesAtom,
  themeAtom,
} from '@/features/persist'
import clsx from 'clsx'
import { useAtom } from 'jotai'
import { Globe, Minus, Plus, User } from 'lucide-react'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useTranslation } from 'react-i18next'

export function ProfileSwitcher() {
  const { t, i18n } = useTranslation()
  const [profiles, setProfiles] = useAtom(profilesAtom)
  const [activeProfileId, setActiveProfileId] = useAtom(activeProfileIdAtom)
  const [theme, setTheme] = useAtom(themeAtom)
  const [fontSize, setFontSize] = useAtom(fontSizeAtom)
  const [isOpen, setIsOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const popupRef = useRef<HTMLDivElement>(null)
  const [coords, setCoords] = useState<{ top: number; right: number }>({ top: 0, right: 0 })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const updateCoords = useCallback(() => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      setCoords({
        top: rect.bottom + 8,
        right: Math.max(16, window.innerWidth - rect.right),
      })
    }
  }, [])

  useEffect(() => {
    if (!isOpen) return
    updateCoords()
    window.addEventListener('resize', updateCoords)
    window.addEventListener('scroll', updateCoords, true)
    return () => {
      window.removeEventListener('resize', updateCoords)
      window.removeEventListener('scroll', updateCoords, true)
    }
  }, [isOpen, updateCoords])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node
      if (
        buttonRef.current &&
        !buttonRef.current.contains(target) &&
        popupRef.current &&
        !popupRef.current.contains(target)
      ) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  return (
    <div className="relative inline-block">
      <button
        ref={buttonRef}
        type="button"
        aria-label="Profile & Settings"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors outline-none hover:bg-white/20 focus:ring-2 focus:ring-white/50"
      >
        <User size={18} />
      </button>

      {isOpen &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            ref={popupRef}
            style={{
              top: `${coords.top}px`,
              right: `${coords.right}px`,
            }}
            className="fixed z-[9999] w-64 max-h-[85vh] overflow-y-auto custom-scrollbar border-border bg-popover text-popover-foreground rounded-xl border p-1.5 shadow-2xl backdrop-blur-md animate-in fade-in zoom-in-95 duration-100"
          >
            {/* PROFILES SECTION */}
            <div className="px-3 py-1 text-xs font-semibold tracking-wider text-popover-foreground/50 uppercase">
              {t('settings.profiles')}
            </div>
            <div className="space-y-0.5">
              {profiles.map((profile) => (
                <button
                  key={profile.id}
                  type="button"
                  onClick={() => {
                    setActiveProfileId(profile.id)
                  }}
                  className={clsx(
                    'flex w-full cursor-pointer items-center justify-between rounded-lg px-3 py-1.5 text-sm font-medium transition outline-none',
                    activeProfileId === profile.id
                      ? 'bg-primary/20 text-popover-foreground font-bold'
                      : 'text-popover-foreground/70 hover:bg-foreground/10 hover:text-popover-foreground',
                  )}
                >
                  <span className="truncate pr-2">{profile.name}</span>
                  {activeProfileId === profile.id && (
                    <div className="h-2 w-2 shrink-0 rounded-full bg-green-400" />
                  )}
                </button>
              ))}
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
                className="text-popover-foreground/80 hover:bg-foreground/10 hover:text-popover-foreground flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium transition outline-none mt-1"
              >
                <Plus size={14} />
                {t('settings.add_new_profile')}
              </button>
            </div>

            <div className="border-border mx-2 my-1.5 border-t" />

            {/* FONT SIZE SETTING */}
            <div>
              <div className="flex items-center justify-between px-3 py-1 text-xs font-semibold tracking-wider text-popover-foreground/50 uppercase">
                <span>{t('settings.font_size')}</span>
                <span className="text-primary font-mono font-bold normal-case">
                  {(fontSize / 16).toFixed(3).replace(/\.?0+$/, '')}rem
                </span>
              </div>
              <div className="px-3 py-1.5 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => setFontSize((prev) => Math.max(12, prev - 1))}
                  disabled={fontSize <= 12}
                  className="flex h-7 w-7 items-center justify-center rounded-md border border-border bg-foreground/5 text-popover-foreground hover:bg-foreground/15 disabled:opacity-30 cursor-pointer"
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
                        'px-2 py-0.5 text-xs font-medium rounded transition cursor-pointer',
                        fontSize === sizeVal
                          ? 'bg-primary text-primary-foreground font-bold'
                          : 'bg-foreground/5 text-popover-foreground/70 hover:bg-foreground/10',
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
                  className="flex h-7 w-7 items-center justify-center rounded-md border border-border bg-foreground/5 text-popover-foreground hover:bg-foreground/15 disabled:opacity-30 cursor-pointer"
                  title="Increase font size"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            <div className="border-border mx-2 my-1.5 border-t" />

            {/* LANGUAGE SWITCHER */}
            <button
              type="button"
              onClick={() => {
                const isVi = i18n.language?.startsWith('vi')
                i18n.changeLanguage(isVi ? 'en' : 'vi')
              }}
              className="text-popover-foreground/80 hover:bg-foreground/10 hover:text-popover-foreground flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium transition outline-none"
            >
              <Globe size={15} />
              {i18n.language?.startsWith('vi') ? 'Ngôn ngữ: Tiếng Việt' : 'Language: English'}
            </button>

            <div className="border-border mx-2 my-1.5 border-t" />

            {/* THEME SETTING */}
            <div>
              <div className="px-3 py-1 text-xs font-semibold tracking-wider text-popover-foreground/50 uppercase">
                {t('settings.theme')}
              </div>
              <div className="space-y-0.5">
                {(['dark', 'light', 'read', 'modern'] as const).map((tOpt) => (
                  <button
                    key={tOpt}
                    type="button"
                    onClick={() => setTheme(tOpt)}
                    className={clsx(
                      'flex w-full cursor-pointer items-center justify-between rounded-lg px-3 py-1.5 text-xs font-medium transition outline-none',
                      theme === tOpt
                        ? 'bg-primary/20 text-popover-foreground font-bold'
                        : 'text-popover-foreground/70 hover:bg-foreground/10 hover:text-popover-foreground',
                    )}
                  >
                    <span className="capitalize">{tOpt}</span>
                    {theme === tOpt && <div className="bg-primary h-2 w-2 shrink-0 rounded-full" />}
                  </button>
                ))}
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  )
}
