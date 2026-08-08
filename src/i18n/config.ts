import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import { homeLocales } from '@/pages/home'
import en from './locales/en.json'
import vi from './locales/vi.json'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        ...en,
        translation: {
          ...en.translation,
          home: homeLocales.en,
        },
      },
      vi: {
        ...vi,
        translation: {
          ...vi.translation,
          home: homeLocales.vi,
        },
      },
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
