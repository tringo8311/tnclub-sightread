import { Check, Copy, Mail } from 'lucide-react'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Article } from './Article'

export function FeedbackSection() {
  const { t } = useTranslation()
  const [copied, setCopied] = useState(false)
  const email = 'tnclubmanagement@gmail.com'

  const mailtoSubject = encodeURIComponent('[TNClub Sightread] Phản hồi & Đóng góp ý kiến')
  const mailtoBody = encodeURIComponent(
    'Xin chào TNClub Sightread Studio,\n\nTôi muốn gửi phản hồi / góp ý tính năng mới cho ứng dụng TNClub Sightread:\n\n- Nội dung góp ý / Báo lỗi:\n- Thiết bị / Trình duyệt đang dùng:\n\nXin cảm ơn!',
  )
  const mailtoUrl = `mailto:${email}?subject=${mailtoSubject}&body=${mailtoBody}`

  const handleCopy = () => {
    navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Article header={t('about.sections.feedback', 'Phản hồi & Đóng góp')}>
      <div className="space-y-4">
        <p className="text-muted-foreground leading-relaxed">
          {t(
            'about.feedback.text',
            'Bạn phát hiện lỗi hoặc có góp ý tính năng mới? Chúng tôi luôn sẵn sàng lắng nghe mọi đóng góp từ bạn để hoàn thiện TNClub Sightread tốt hơn.',
          )}
        </p>

        <div className="border-border bg-foreground/5 space-y-3 rounded-2xl border p-4 sm:p-5">
          <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-amber-400 uppercase">
            <Mail className="h-4 w-4 text-amber-400" />
            <span>Địa chỉ Email liên hệ trực tiếp:</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="border-border bg-card text-foreground flex items-center gap-2 rounded-xl border px-4 py-2.5 font-mono text-sm font-semibold shadow-sm">
              <span className="select-all">{email}</span>
              <button
                type="button"
                onClick={handleCopy}
                title="Sao chép Email"
                aria-label="Sao chép Email"
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
              <span>Gửi Email Phản Hồi</span>
            </a>
          </div>
        </div>
      </div>
    </Article>
  )
}
