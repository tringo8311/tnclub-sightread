import { Eye } from 'lucide-react'
import React, { useState } from 'react'
import { ImageLightboxModal } from './ImageLightboxModal'

export interface PreviewableImageProps {
  src: string
  alt?: string
  title?: string
  className?: string
  imgClassName?: string
  children?: React.ReactNode
  overlayBadge?: React.ReactNode
  showEyeText?: boolean
}

export function PreviewableImage({
  src,
  alt = '',
  title,
  className = '',
  imgClassName = '',
  children,
  overlayBadge,
  showEyeText = true,
}: PreviewableImageProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div
        className={`group/preview relative cursor-pointer overflow-hidden ${className}`}
        onClick={() => setIsOpen(true)}
        role="button"
        tabIndex={0}
        aria-label={`Xem phóng to ${title || alt || 'hình ảnh'}`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            setIsOpen(true)
          }
        }}
      >
        <img
          src={src}
          alt={alt}
          className={`h-full w-full object-cover transition-transform duration-700 group-hover/preview:scale-105 ${imgClassName}`}
        />

        {/* Existing child elements (gradients, custom inner overlays, etc.) */}
        {children}

        {/* Eye Overlay on Hover */}
        <div className="absolute inset-0 flex items-center justify-center bg-slate-950/40 opacity-0 backdrop-blur-[1.5px] transition-all duration-300 group-hover/preview:opacity-100">
          <div className="flex transform items-center gap-2 rounded-full border border-amber-400/60 bg-amber-950/80 px-3.5 py-2 text-xs font-bold text-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.5)] backdrop-blur-md transition-transform duration-300 group-hover/preview:scale-110">
            <Eye className="h-4 w-4 animate-pulse text-amber-400" />
            {showEyeText && <span>Xem phóng to</span>}
          </div>
        </div>

        {/* Optional top/bottom badges */}
        {overlayBadge}
      </div>

      <ImageLightboxModal
        src={src}
        alt={alt}
        title={title || alt}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  )
}
