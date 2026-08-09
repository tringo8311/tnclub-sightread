import { Button, Modal } from '@/components'
import {
  drawCurlyBrace,
  drawFClef,
  drawGClef,
  drawLedgerLines,
  drawMusicNote,
  drawStaffConnectingLine,
  drawStaffLines,
  drawTimeSignature,
  getNoteY,
  STAFF_FIVE_LINES_HEIGHT,
  STAFF_SPACE,
} from '@/features/drawing/sheet'
import { getNote } from '@/features/theory'
import { Song, SongMetadata } from '@/types'
import { Download, Printer, X } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'

type SheetMusicPrintModalProps = {
  show: boolean
  onClose: () => void
  songMeta?: SongMetadata
  song?: Song | null
}

export function SheetMusicPrintModal({ show, onClose, songMeta, song }: SheetMusicPrintModalProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [dataUrl, setDataUrl] = useState<string>('')

  useEffect(() => {
    if (!show || !song) return

    const renderSheet = () => {
      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      // Standard A4 Canvas Dimensions at 150 DPI (1240 x 1754 px)
      const PAGE_WIDTH = 1240
      const PAGE_HEIGHT = 1754
      canvas.width = PAGE_WIDTH
      canvas.height = PAGE_HEIGHT

      // Soft theme colors (softer slate grays for print aesthetic)
      const COLOR_HEADER = '#1e293b' // slate-800
      const COLOR_SUBTEXT = '#64748b' // slate-500
      const COLOR_STAFF = '#475569' // slate-600 (softer than harsh black)
      const COLOR_NOTE = '#334155' // slate-700

      // 1. Fill White Background
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, PAGE_WIDTH, PAGE_HEIGHT)

      // 2. Render Header (Artistic & Grand Classical Title)
      ctx.save()
      ctx.fillStyle = COLOR_HEADER
      ctx.font = 'bold 42px "Playfair Display", "Georgia", "Times New Roman", serif'
      ctx.textAlign = 'center'
      ctx.fillText(songMeta?.title || 'Sheet Nhạc Piano', PAGE_WIDTH / 2, 85)

      ctx.font = 'italic 500 16px "Georgia", "Times New Roman", serif'
      ctx.textAlign = 'right'
      ctx.fillText(songMeta?.author || 'TNClub Sightread Studio', PAGE_WIDTH - 80, 128)

      ctx.font = '500 13px sans-serif'
      ctx.fillStyle = COLOR_SUBTEXT
      ctx.textAlign = 'left'
      ctx.fillText('BẢN PHỔ NHẠC PIANO (A4 FORMAT)', 80, 128)

      // Decorative double divider line
      ctx.strokeStyle = '#94a3b8' // slate-400
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.moveTo(80, 150)
      ctx.lineTo(PAGE_WIDTH - 80, 150)
      ctx.stroke()

      ctx.strokeStyle = '#cbd5e1' // slate-300
      ctx.lineWidth = 0.5
      ctx.beginPath()
      ctx.moveTo(80, 154)
      ctx.lineTo(PAGE_WIDTH - 80, 154)
      ctx.stroke()

      ctx.restore()

      // Determine if song has bass notes (or if treble-only is enough)
      const notes = song.notes || []
      const c4Note = getNote('C4')
      const hasBassNotes = notes.some((n) => n.midiNote < c4Note)
      const isSingleStaff = !hasBassNotes

      // 3. Render Staff Systems
      const MARGIN_LEFT = 90
      const MARGIN_RIGHT = 80
      const SYSTEM_WIDTH = PAGE_WIDTH - MARGIN_LEFT - MARGIN_RIGHT
      const SYSTEM_GAP = isSingleStaff ? 160 : 230
      let currentSystemY = 230

      const totalDuration = song.duration || 60
      const timeSig = { numerator: 4, denominator: 4 }
      const measureDuration = (60 / 100) * timeSig.numerator // Approx measure time in sec

      const totalMeasures = Math.max(8, Math.ceil(totalDuration / measureDuration))
      const measuresPerSystem = 4
      const totalSystems = Math.ceil(totalMeasures / measuresPerSystem)
      const maxSystemsOnPage = isSingleStaff ? 8 : 6

      for (let sysIdx = 0; sysIdx < Math.min(maxSystemsOnPage, totalSystems); sysIdx++) {
        const trebleTopY = currentSystemY
        const bassTopY = currentSystemY + 90

        ctx.save()
        ctx.strokeStyle = COLOR_STAFF
        ctx.fillStyle = COLOR_STAFF

        // System Measure Number (Thin font)
        ctx.font = '300 11px sans-serif'
        ctx.fillStyle = COLOR_SUBTEXT
        ctx.fillText(`[Nhịp ${sysIdx * measuresPerSystem + 1}]`, MARGIN_LEFT - 35, trebleTopY - 8)

        // Soft color for Leland font time signature to avoid harsh black appearance
        const COLOR_TIMESIG = '#475569' // slate-600

        // Draw Treble Staff Lines
        drawStaffLines(ctx, MARGIN_LEFT, trebleTopY, MARGIN_LEFT + SYSTEM_WIDTH)
        drawGClef(ctx, MARGIN_LEFT + 15, trebleTopY)
        drawTimeSignature(ctx, MARGIN_LEFT + 55, trebleTopY, timeSig, COLOR_TIMESIG)

        if (isSingleStaff) {
          // Single Staff connecting line at start
          drawStaffConnectingLine(
            ctx,
            MARGIN_LEFT,
            trebleTopY,
            trebleTopY + STAFF_FIVE_LINES_HEIGHT,
          )
        } else {
          // Grand Staff (Treble + Bass + Brace)
          drawStaffLines(ctx, MARGIN_LEFT, bassTopY, MARGIN_LEFT + SYSTEM_WIDTH)
          drawFClef(ctx, MARGIN_LEFT + 15, bassTopY)
          drawTimeSignature(ctx, MARGIN_LEFT + 55, bassTopY, timeSig, COLOR_TIMESIG)

          // Connecting Bar Line on left
          drawStaffConnectingLine(ctx, MARGIN_LEFT, trebleTopY, bassTopY + STAFF_FIVE_LINES_HEIGHT)
          // Curly Brace
          drawCurlyBrace(ctx, MARGIN_LEFT - 25, trebleTopY + 30, 130)
        }

        // Draw Measure Dividers (Bar Lines)
        const systemStartMeas = sysIdx * measuresPerSystem
        const measWidth = (SYSTEM_WIDTH - 90) / measuresPerSystem
        const bottomY = isSingleStaff
          ? trebleTopY + STAFF_FIVE_LINES_HEIGHT
          : bassTopY + STAFF_FIVE_LINES_HEIGHT

        for (let m = 1; m <= measuresPerSystem; m++) {
          const barX = MARGIN_LEFT + 90 + m * measWidth
          drawStaffConnectingLine(ctx, barX, trebleTopY, bottomY)
        }

        // Draw Notes in this system
        const systemStartTime = systemStartMeas * measureDuration
        const systemEndTime = (systemStartMeas + measuresPerSystem) * measureDuration
        const systemNotes = notes.filter((n) => n.time >= systemStartTime && n.time < systemEndTime)

        systemNotes.forEach((n) => {
          const localTime = n.time - systemStartTime
          const noteX =
            MARGIN_LEFT +
            95 +
            (localTime / (measuresPerSystem * measureDuration)) * (SYSTEM_WIDTH - 100)

          const isTreble = isSingleStaff || n.midiNote >= c4Note
          const staff = isTreble ? 'treble' : 'bass'
          const staffTopY = isTreble ? trebleTopY : bassTopY

          const noteY = getNoteY(n.midiNote, staff, staffTopY)

          // Draw Ledger Lines if out of staff
          drawLedgerLines(ctx, noteX - 5, 22, staffTopY, n.midiNote, staff)

          // Draw Music Notehead
          drawMusicNote(ctx, noteX, noteY, COLOR_NOTE, n.duration)
        })

        ctx.restore()
        currentSystemY += SYSTEM_GAP
      }

      // 4. Render Footer Page Info
      ctx.save()
      ctx.fillStyle = COLOR_SUBTEXT
      ctx.font = '12px sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText(
        '© TNClub Sightread Studio — Trang 1 / 1 (A4 Format)',
        PAGE_WIDTH / 2,
        PAGE_HEIGHT - 40,
      )
      ctx.restore()
    }

    renderSheet()

    if (document.fonts) {
      document.fonts.ready.then(renderSheet)
    }
  }, [show, song, songMeta])

  if (!show) return null

  const handleDownloadImage = () => {
    if (!dataUrl) return
    const a = document.createElement('a')
    a.href = dataUrl
    a.download = `${songMeta?.title || 'Sheet_Nhac'}_A4.png`
    a.click()
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <Modal
      show={show}
      onClose={onClose}
      className="overflow-hidden rounded-2xl border border-amber-500/30 bg-slate-900 p-0 text-slate-100 shadow-2xl"
      modalClassName="max-w-[900px] w-[min(95vw,900px)]"
    >
      <div className="flex h-[90vh] max-h-[850px] w-full flex-col">
        {/* Header Toolbar */}
        <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950 px-6 py-4">
          <div>
            <h3 className="flex items-center gap-2 text-lg font-bold text-amber-400">
              <Printer className="h-5 w-5 text-amber-400" />
              <span>Phổ Nhạc Chuẩn A4 (Sheet Music Grand Staff)</span>
            </h3>
            <p className="mt-0.5 text-xs text-zinc-400">
              {songMeta?.title} — {songMeta?.author || 'TNClub Sightread'}
            </p>
          </div>

          <div className="mr-10 flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onPress={handleDownloadImage}
              className="flex items-center gap-1.5 border-slate-700 bg-slate-800 text-xs font-semibold text-zinc-200 hover:bg-slate-700"
            >
              <Download className="h-4 w-4 text-cyan-400" />
              <span>Tải File PNG (A4)</span>
            </Button>
            <Button
              variant="primary"
              size="sm"
              onPress={handlePrint}
              className="flex items-center gap-1.5 bg-amber-500 text-xs font-bold text-slate-950 shadow-md hover:bg-amber-400"
            >
              <Printer className="h-4 w-4" />
              <span>In Ngay (A4 PDF)</span>
            </Button>
          </div>
        </div>

        {/* Scrollable Printable A4 Sheet Paper Viewport */}
        <div className="custom-scrollbar flex flex-1 justify-center overflow-y-auto bg-slate-950/80 p-6">
          {/* Printable Document (Styled A4 Paper) */}
          <div
            id="printable-sheet-paper"
            className="relative flex min-h-[960px] w-[680px] items-start justify-center rounded-sm border border-slate-200 bg-white p-4 text-slate-950 shadow-2xl transition-all select-none"
          >
            <canvas ref={canvasRef} className="block h-auto w-full rounded-sm" />
          </div>
        </div>

        {/* Print-Only CSS Styles */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
            @media print {
              body * {
                visibility: hidden !important;
              }
              #printable-sheet-paper, #printable-sheet-paper * {
                visibility: visible !important;
              }
              #printable-sheet-paper {
                position: absolute !important;
                left: 0 !important;
                top: 0 !important;
                width: 100% !important;
                height: auto !important;
                margin: 0 !important;
                padding: 0 !important;
                box-shadow: none !important;
                border: none !important;
              }
            }
          `,
          }}
        />
      </div>
    </Modal>
  )
}
