import { MapPin, Tiktok, Youtube } from '@/icons'
import { cn } from '@/utils'
import React, { PropsWithChildren } from 'react'
import { Link } from 'react-router'
import Sizer from './Sizer'

function MaxWidthWrapper(props: PropsWithChildren<{ as?: any; className?: string }>) {
  const className = (props.className ?? '') + ' max-w-(--breakpoint-lg) mx-auto px-8'
  const Component = props.as ?? 'div'
  return <Component className={className}>{props.children}</Component>
}

export function MarketingFooter() {
  return (
    <footer
      className="bg-foreground/[0.02] dark:bg-foreground/[0.01] w-full border-t border-gray-200 dark:border-gray-800"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <MaxWidthWrapper className="mx-auto w-full py-4">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <span>Powered by Sightread Studio</span>
            <span className="hidden sm:inline text-gray-400/50">•</span>
            <Link to="/piano-history" className="hover:text-amber-400 transition-colors font-bold text-foreground">
              🎹 Lịch Sử & Bách Khoa Piano
            </Link>
            <span className="hidden sm:inline text-gray-400/50">•</span>
            <Link to="/freeplay" className="hover:text-amber-400 transition-colors font-bold text-foreground">
              🎹 Chơi Tự Do
            </Link>
          </div>

          <div className="flex items-center gap-5">
            <div className="flex cursor-default items-center gap-1.5 transition-colors hover:text-foreground">
              <MapPin size={16} />
              <span>Ho Chi Minh City, Vietnam</span>
            </div>
            <div className="flex items-center gap-3">
              <Link
                to="https://www.youtube.com/channel/UCGf2AlCRD3ZCc8ahkqBMtqA"
                target="_blank"
                aria-label="YouTube"
                className="transition-colors hover:text-violet-400"
              >
                <Youtube size={18} />
              </Link>
              <Link
                to="#"
                target="_blank"
                aria-label="TikTok"
                className="transition-colors hover:text-violet-400"
              >
                <Tiktok width={16} height={16} />
              </Link>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </footer>
  )
}
