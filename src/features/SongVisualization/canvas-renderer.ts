import { KEY_SIGNATURE, NOTE_LABELS } from '@/features/theory'
import { Hand, HandSettings } from '@/types'
import { Player } from '../player'
import { renderFallingVis } from './falling-notes'
import { renderSheetVis } from './sheet'
import { CanvasItem } from './utils'

export type GivenState = {
  time: number
  noteLabels: NOTE_LABELS
  coloredNotes: boolean
  visualization: 'falling-notes' | 'sheet' | 'sheet-a4'
  transpose: number
  windowWidth: number
  height: number
  pps: number // pixels per second
  hand: Hand
  hands: HandSettings
  ctx: CanvasRenderingContext2D
  items: CanvasItem[]
  constrictView?: boolean
  keySignature: KEY_SIGNATURE
  displayKeySignature?: KEY_SIGNATURE
  timeSignature?: { numerator: number; denominator: number }
  canvasRect: DOMRect
  // TODO: snap to measures
  selectedRange?: { start: number; end: number }
  game: boolean
  player: Player
}

import { renderSheetA4Vis } from './sheet-a4'

export function render(state: Readonly<GivenState>) {
  if (state.visualization === 'falling-notes') {
    renderFallingVis(state)
  } else if (state.visualization === 'sheet-a4') {
    renderSheetA4Vis(state)
  } else {
    renderSheetVis(state)
  }
}
