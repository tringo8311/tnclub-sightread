import { cn } from '@/utils'
import React, { PropsWithChildren } from 'react'
import Sizer from './Sizer'
import { Youtube, Tiktok, MapPin } from '@/icons'
import { Link } from 'react-router'

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
      <MaxWidthWrapper className="mx-auto w-full py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-muted-foreground text-center text-xs sm:text-left">
            © 2025 Sightread Studio, LLC. All rights reserved.
          </div>
          <div className="flex items-center gap-6 text-muted-foreground">
            <div className="flex items-center gap-1.5 text-xs hover:text-white transition-colors cursor-default">
              <MapPin size={16} />
              <span>Ho Chi Minh City, Vietnam</span>
            </div>
            <div className="flex items-center gap-4">
              <Link to="https://www.youtube.com/channel/UCGf2AlCRD3ZCc8ahkqBMtqA" target="_blank" aria-label="YouTube" className="hover:text-violet-400 transition-colors">
                <Youtube size={20} />
              </Link>
              <Link to="#" target="_blank" aria-label="TikTok" className="hover:text-violet-400 transition-colors">
                <Tiktok width={18} height={18} />
              </Link>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </footer>
  )
}
