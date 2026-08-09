import { aboutLocales } from '@/pages/about'
import { homeLocales } from '@/pages/home'
import { marketLocales } from '@/pages/market'
import { theoryLocales } from '@/pages/theory'
import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
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
          market: marketLocales.en,
          about: aboutLocales.en,
          theory: theoryLocales.en,
        },
      },
      vi: {
        ...vi,
        translation: {
          ...vi.translation,
          home: homeLocales.vi,
          market: marketLocales.vi,
          about: aboutLocales.vi,
          theory: theoryLocales.vi,
        },
      },
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
