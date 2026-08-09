import { Eye, Maximize, Maximize2, Minimize2, Minus, Plus, RotateCcw, X } from 'lucide-react'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

export interface ImageLightboxModalProps {
  src: string
  alt?: string
  title?: string
  isOpen: boolean
  onClose: () => void
}

export function ImageLightboxModal({
  src,
  alt = 'Piano Image Preview',
  title,
  isOpen,
  onClose,
}: ImageLightboxModalProps) {
  const [zoom, setZoom] = useState<number>(1)
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false)
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  // Reset zoom & position whenever modal opens or image src changes
  useEffect(() => {
    if (isOpen) {
      setZoom(1)
      setPosition({ x: 0, y: 0 })
    }
  }, [isOpen, src])

  // Track browser native fullscreen state
  useEffect(() => {
    const handleFSChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', handleFSChange)
    return () => document.removeEventListener('fullscreenchange', handleFSChange)
  }, [])

  const toggleNativeFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {})
      setIsFullscreen(true)
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {})
      }
      setIsFullscreen(false)
    }
  }, [])

  const handleClose = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {})
    }
    onClose()
  }, [onClose])

  const handleZoomIn = useCallback(() => {
    setZoom((prev) => Math.min(prev + 0.5, 5))
  }, [])

  const handleZoomOut = useCallback(() => {
    setZoom((prev) => {
      const next = Math.max(prev - 0.5, 1)
      if (next === 1) {
        setPosition({ x: 0, y: 0 })
      }
      return next
    })
  }, [])

  const handleResetZoom = useCallback(() => {
    setZoom(1)
    setPosition({ x: 0, y: 0 })
  }, [])

  const toggleDoubleTapZoom = useCallback(() => {
    if (zoom > 1) {
      handleResetZoom()
    } else {
      setZoom(2)
    }
  }, [zoom, handleResetZoom])

  // Mouse wheel zoom
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (e.deltaY < 0) {
      handleZoomIn()
    } else {
      handleZoomOut()
    }
  }

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose()
      } else if (e.key === '+' || e.key === '=') {
        handleZoomIn()
      } else if (e.key === '-') {
        handleZoomOut()
      } else if (e.key === '0' || e.key.toLowerCase() === 'r') {
        handleResetZoom()
      } else if (e.key.toLowerCase() === 'f') {
        toggleNativeFullscreen()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, handleClose, handleZoomIn, handleZoomOut, handleResetZoom, toggleNativeFullscreen])

  // Mouse dragging for panning when zoomed in
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (zoom <= 1) return
    setIsDragging(true)
    dragStartRef.current = { x: e.clientX - position.x, y: e.clientY - position.y }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || zoom <= 1) return
    setPosition({
      x: e.clientX - dragStartRef.current.x,
      y: e.clientY - dragStartRef.current.y,
    })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // Touch support for drag panning
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (zoom <= 1 || e.touches.length !== 1) return
    const touch = e.touches[0]
    setIsDragging(true)
    dragStartRef.current = { x: touch.clientX - position.x, y: touch.clientY - position.y }
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging || zoom <= 1 || e.touches.length !== 1) return
    const touch = e.touches[0]
    setPosition({
      x: touch.clientX - dragStartRef.current.x,
      y: touch.clientY - dragStartRef.current.y,
    })
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  if (!isOpen || typeof document === 'undefined') return null

  return createPortal(
    <div
      className="animate-in fade-in fixed inset-0 z-[99999] flex h-screen w-screen flex-col items-center justify-between bg-slate-950/95 p-3 backdrop-blur-xl duration-200 md:p-5"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label={title || alt || 'Xem ảnh chi tiết'}
    >
      {/* Top Floating Controls Header */}
      <div
        className="z-20 flex w-full max-w-7xl items-center justify-between gap-4 rounded-2xl border border-amber-500/20 bg-slate-900/90 px-4 py-3 text-white shadow-2xl backdrop-blur-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2.5 truncate pr-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-amber-500/30 bg-amber-500/10 text-amber-400">
            <Eye className="h-4 w-4" />
          </div>
          <span className="truncate text-sm font-bold tracking-wide text-zinc-100 md:text-base">
            {title || alt}
          </span>
        </div>

        {/* Control Action Buttons */}
        <div className="flex shrink-0 items-center gap-2">
          <div className="flex items-center gap-1 rounded-xl border border-slate-700/80 bg-slate-950/80 p-1 text-xs shadow-inner">
            <button
              onClick={handleZoomOut}
              disabled={zoom <= 1}
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-zinc-300 transition-colors hover:bg-slate-800 hover:text-amber-400 disabled:cursor-not-allowed disabled:opacity-30"
              title="Thu nhỏ (-)"
              aria-label="Thu nhỏ"
            >
              <Minus className="h-4 w-4" />
            </button>

            <span className="min-w-14 text-center font-mono text-xs font-extrabold text-amber-300">
              {Math.round(zoom * 100)}%
            </span>

            <button
              onClick={handleZoomIn}
              disabled={zoom >= 5}
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-zinc-300 transition-colors hover:bg-slate-800 hover:text-amber-400 disabled:cursor-not-allowed disabled:opacity-30"
              title="Phóng to (+)"
              aria-label="Phóng to"
            >
              <Plus className="h-4 w-4" />
            </button>

            <button
              onClick={handleResetZoom}
              disabled={zoom === 1 && position.x === 0 && position.y === 0}
              className="ml-0.5 flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border-l border-slate-800 pl-1 text-zinc-300 transition-colors hover:bg-slate-800 hover:text-amber-400 disabled:cursor-not-allowed disabled:opacity-30"
              title="Kích thước ban đầu (0/R)"
              aria-label="Đặt lại kích thước"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Toggle Fullscreen button */}
          <button
            onClick={toggleNativeFullscreen}
            className="flex h-9 cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-cyan-500/30 bg-cyan-950/50 px-3 text-xs font-bold text-cyan-300 shadow-md transition-all hover:bg-cyan-600 hover:text-white"
            title={isFullscreen ? 'Thoát toàn màn hình (F)' : 'Toàn màn hình (F)'}
            aria-label="Toàn màn hình"
          >
            {isFullscreen ? (
              <>
                <Minimize2 className="h-4 w-4" />
                <span className="hidden sm:inline">Thu nhỏ</span>
              </>
            ) : (
              <>
                <Maximize className="h-4 w-4" />
                <span className="hidden sm:inline">Toàn màn hình</span>
              </>
            )}
          </button>

          {/* Close button */}
          <button
            onClick={handleClose}
            className="ml-1 flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl border border-red-500/30 bg-red-950/70 text-red-300 shadow-md transition-all hover:bg-red-600 hover:text-white"
            title="Đóng (ESC)"
            aria-label="Đóng ảnh"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Main Fullscreen Image Viewport Container */}
      <div
        ref={containerRef}
        className={`relative my-2 flex w-full flex-1 items-center justify-center overflow-hidden select-none ${
          zoom > 1 ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-default'
        }`}
        onClick={(e) => e.stopPropagation()}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onDoubleClick={toggleDoubleTapZoom}
      >
        <img
          src={src}
          alt={alt}
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
            transition: isDragging ? 'none' : 'transform 0.2s cubic-bezier(0.25, 1, 0.5, 1)',
          }}
          className="pointer-events-auto h-auto max-h-[88vh] w-auto max-w-[96vw] rounded-xl border border-white/10 object-contain shadow-[0_0_50px_rgba(0,0,0,0.8)] transition-shadow"
          draggable={false}
        />
      </div>

      {/* Bottom Hint Footer */}
      <div
        className="z-20 flex items-center justify-center gap-3 rounded-full border border-white/10 bg-slate-900/80 px-5 py-2 text-xs font-medium text-zinc-300 shadow-lg backdrop-blur-md"
        onClick={(e) => e.stopPropagation()}
      >
        <Maximize2 className="h-3.5 w-3.5 shrink-0 text-amber-400" />
        <span className="text-center">
          Cuộn chuột hoặc phím <strong>+ / -</strong> để phóng to/thu nhỏ | Kéo chuột để di chuyển |
          Phím <strong>F</strong> để bật Toàn màn hình | <strong>ESC</strong> để đóng
        </span>
      </div>
    </div>,
    document.body,
  )
}
