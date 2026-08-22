import { Button } from '@/components'
import React from 'react'
import { useTranslation } from 'react-i18next'
import styles from '../market.module.css'

interface DirectUrlFormProps {
  urlInput: string
  setUrlInput: (val: string) => void
  urlLoading: boolean
  urlError: string | null
  onSubmit: (e: React.FormEvent) => void
}

export function DirectUrlForm({
  urlInput,
  setUrlInput,
  urlLoading,
  urlError,
  onSubmit,
}: DirectUrlFormProps) {
  const { t } = useTranslation()

  return (
    <div className="mx-auto mt-6 max-w-2xl" data-ui="market-direct-url-form">
      <form onSubmit={onSubmit} className="relative flex items-center">
        <input
          type="url"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          placeholder={t(
            'market.directUrl.placeholder',
            'Paste a public .mid / .midi link from the internet...',
          )}
          className={styles.directInput}
          aria-label={t('market.directUrl.ariaLabel', 'Direct MIDI URL input')}
          data-element-id="market-direct-url-input"
          data-action="input-midi-url"
          data-ui="market-direct-url-form"
        />
        <Button
          type="submit"
          isLoading={urlLoading}
          className="absolute right-2"
          size="sm"
          elementId="market-direct-url-submit"
          data-ui="market-direct-url-form"
          action="lookup-midi-url"
          description={t(
            'market.directUrl.submitDescription',
            'Download and preview MIDI file from URL',
          )}
        >
          {t('market.directUrl.submit', 'Lookup & Preview')}
        </Button>
      </form>
      {urlError && <p className="mt-2 text-left text-xs text-red-400">{urlError}</p>}
    </div>
  )
}
