import { Check, Copy, Mail } from 'lucide-react'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Article } from './Article'

export function FeedbackSection() {
  const { t } = useTranslation()
  const [copied, setCopied] = useState(false)
  const email = 'tnclubmanagement@gmail.com'

  const mailtoSubject = encodeURIComponent('[TNClub Sightread] Feedback & Suggestions')
  const mailtoBody = encodeURIComponent(
    'Hi TNClub Sightread Studio,\n\nI would like to share feedback / feature suggestions for TNClub Sightread:\n\n- Feedback / Bug description:\n- Device / Browser:\n\nThank you!',
  )
  const mailtoUrl = `mailto:${email}?subject=${mailtoSubject}&body=${mailtoBody}`

  const handleCopy = () => {
    navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Article header={t('about.sections.feedback', 'Feedback & Community')}>
      <div className="space-y-4">
        <p className="text-muted-foreground leading-relaxed">
          {t(
            'about.feedback.text',
            'Found a bug or have a feature suggestion? Contributions and community feedback are welcome!',
          )}
        </p>

        <div className="border-border bg-foreground/5 space-y-3 rounded-2xl border p-4 sm:p-5">
          <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-amber-400 uppercase">
            <Mail className="h-4 w-4 text-amber-400" />
            <span>{t('about.feedback.emailContact', 'Direct contact email address:')}</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="border-border bg-card text-foreground flex items-center gap-2 rounded-xl border px-4 py-2.5 font-mono text-sm font-semibold shadow-sm">
              <span className="select-all">{email}</span>
              <button
                type="button"
                onClick={handleCopy}
                title={t('about.feedback.copyEmail', 'Copy Email')}
                aria-label={t('about.feedback.copyEmail', 'Copy Email')}
                className="text-muted-foreground hover:bg-foreground/10 hover:text-foreground ml-2 cursor-pointer rounded-lg p-1 transition"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-emerald-400" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            </div>

            <a
              href={mailtoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-amber-500 px-4 py-2.5 text-xs font-bold text-slate-950 shadow-md transition hover:bg-amber-400"
            >
              <Mail className="h-4 w-4" />
              <span>{t('about.feedback.sendEmail', 'Send Feedback Email')}</span>
            </a>
          </div>
        </div>
      </div>
    </Article>
  )
}
