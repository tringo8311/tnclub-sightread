import { useTranslation } from 'react-i18next'

export function LanguageSwitcher() {
  const { i18n } = useTranslation()

  const toggleLanguage = () => {
    const isVi = i18n.language?.startsWith('vi')
    i18n.changeLanguage(isVi ? 'en' : 'vi')
  }

  const isVi = i18n.language?.startsWith('vi')

  return (
    <button
      onClick={toggleLanguage}
      className="flex h-8 items-center justify-center rounded-md border border-white/20 bg-white/10 px-3 text-sm font-medium text-white transition-colors hover:bg-white/20"
      title="Switch Language"
    >
      {isVi ? '🇻🇳 VN' : '🇬🇧 EN'}
    </button>
  )
}
