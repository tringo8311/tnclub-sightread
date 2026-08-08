import {
  drawCurlyBrace,
  drawFClef,
  drawGClef,
  drawKeySignature,
  drawPlayNotesLine,
  drawStaffConnectingLine,
  drawStaffLines,
  drawTimeSignature,
  STAFF_SPACE,
} from '@/features/drawing'
import { Clef, SongMeasure, SongNote } from '@/types'
import { pickHex } from '@/utils'
import {
  drawLedgerLines,
  drawMusicNote,
  drawSymbol,
  getNoteY,
  PLAY_NOTES_WIDTH,
} from '../drawing/sheet'
import midiState from '../midi'
import { isHitNote, isMissedNote } from '../player'
import {
  getFixedDoNoteFromKey,
  getKey,
  getKeyDetails,
  getNote,
  glyphs,
  transposeMidi,
} from '../theory'
import { GivenState } from './canvas-renderer'
import { CanvasItem, getItemsInView, Viewport } from './utils'

const TEXT_FONT = 'Arial'
const STAFF_START_X = 50
const STAFF_END_MARGIN = 50
const STAFF_FIVE_LINES_HEIGHT = 60 // Slightly smaller than horizontal sheet for more density
const SYSTEM_HEIGHT = 250 // Height of one full system (treble + bass + padding)
const PLAY_NOTES_LINE_OFFSET = STAFF_SPACE

function getPlayNotesLineX(state: State) {
  return getTimeSignatureX(state) + STAFF_SPACE * 3
}

function getLineWidthTime(state: State) {
  const availableWidth = state.windowWidth - getPlayNotesLineX(state) - STAFF_END_MARGIN
  return availableWidth / state.pps
}

function getLineIndex(time: number, state: State) {
  const lineWidthTime = getLineWidthTime(state)
  return Math.floor(time / lineWidthTime)
}

// Since the notes are static, the viewport is the whole height of the song,
// but we optimize by only drawing systems that intersect the camera view.
const DEFAULT_SYSTEM_HEIGHT = 250
const SINGLE_SYSTEM_HEIGHT = 150

type State = GivenState & {
  lineWidthTime: number
  activeLineIndex: number
  scrollY: number
  systemHeight: number
  showTreble: boolean
  showBass: boolean
}

export let manualScrollY: number | null = null
export let isAutoScrolling = true
export let currentAutoScrollY = 0

export function handleManualScroll(deltaY: number) {
  if (isAutoScrolling) {
    isAutoScrolling = false
    manualScrollY = currentAutoScrollY
  }
  manualScrollY = Math.max(0, (manualScrollY || 0) + deltaY)
}

function deriveState(state: GivenState): State {
  const lineWidthTime = getLineWidthTime(state as State)
  const activeLineIndex = Math.floor(state.time / lineWidthTime)

  const showTreble = state.hand === 'both' || state.hand === 'right' || state.hand === 'none'
  const showBass = state.hand === 'both' || state.hand === 'left' || state.hand === 'none'
  const systemHeight = showTreble && showBass ? DEFAULT_SYSTEM_HEIGHT : SINGLE_SYSTEM_HEIGHT

  currentAutoScrollY = Math.max(
    0,
    activeLineIndex * systemHeight - state.height / 2 + systemHeight / 2,
  )

  if (state.player.isPlaying() || state.player.isCountingDown()) {
    isAutoScrolling = true
  }

  const scrollY = isAutoScrolling ? currentAutoScrollY : (manualScrollY ?? currentAutoScrollY)

  return { ...state, lineWidthTime, activeLineIndex, scrollY, systemHeight, showTreble, showBass }
}

export function renderSheetA4Vis(givenState: GivenState): void {
  const state = deriveState(givenState)
  state.ctx.clearRect(0, 0, state.windowWidth, state.height)

  state.ctx.save()
  state.ctx.translate(0, -state.scrollY)

  const firstVisibleLine = Math.floor(state.scrollY / state.systemHeight)
  const lastVisibleLine = Math.floor((state.scrollY + state.height) / state.systemHeight)
  const visibleLines = []
  for (let i = firstVisibleLine - 1; i <= lastVisibleLine + 1; i++) {
    if (i >= 0) visibleLines.push(i)
  }

  for (const lineIndex of visibleLines) {
    drawStaticsForLine(state, lineIndex)
  }

  const items = state.items.filter((item) => {
    if (item.type === 'note' && state.hand !== 'both' && state.hand !== 'none') {
      const itemHand = state.hands?.[item.track]?.hand
      if (itemHand !== state.hand && itemHand !== 'none') return false
    }
    const lineIdx = getLineIndex(item.time, state)
    return lineIdx >= firstVisibleLine - 1 && lineIdx <= lastVisibleLine + 1
  })

  for (const item of items) {
    if (item.type === 'measure') continue
    renderLedgerLines(state, item)
  }
  for (const item of items) {
    if (item.type === 'measure') continue
    renderSheetNote(state, item)
  }

  drawActivePlayLine(state)

  state.ctx.restore()
  renderMidiPressedKeys(state, items)
}

function drawActivePlayLine(state: State) {
  const { ctx, showTreble, showBass } = state
  const localTime = state.time % state.lineWidthTime
  const x = getPlayNotesLineX(state) + localTime * state.pps

  const topY = showTreble
    ? getTrebleStaffTopY(state, state.activeLineIndex)
    : getBassStaffTopY(state, state.activeLineIndex)
  const bottomY = showBass
    ? getBassStaffTopY(state, state.activeLineIndex)
    : getTrebleStaffTopY(state, state.activeLineIndex)

  const playLineTop = topY - PLAY_NOTES_LINE_OFFSET * 2
  const playLineBottom = bottomY + STAFF_FIVE_LINES_HEIGHT + PLAY_NOTES_LINE_OFFSET * 2

  ctx.fillStyle = 'rgba(139, 92, 246, 0.4)'
  ctx.fillRect(x - 2, playLineTop, 4, playLineBottom - playLineTop)
  ctx.fillStyle = 'rgba(139, 92, 246, 0.8)'
  ctx.fillRect(x - 1, playLineTop, 2, playLineBottom - playLineTop)
}

function drawStaticsForLine(state: State, lineIndex: number) {
  const { ctx, displayKeySignature, showTreble, showBass } = state

  ctx.fillStyle = 'rgba(0,0,0, 0.5)'
  ctx.strokeStyle = 'rgba(0,0,0, 0.5)'

  const rightEdge = state.windowWidth - STAFF_END_MARGIN
  const staffHeight = STAFF_FIVE_LINES_HEIGHT

  if (showTreble && showBass) {
    const trebleTopY = getTrebleStaffTopY(state, lineIndex)
    const bassTopY = getBassStaffTopY(state, lineIndex)
    const curlyBraceSize = staffHeight * 2 + 60
    const curlyBraceY = trebleTopY + curlyBraceSize / 2

    drawCurlyBrace(state.ctx, STAFF_START_X - 25, curlyBraceY, curlyBraceSize)
    drawStaffLines(state.ctx, STAFF_START_X, trebleTopY, rightEdge)
    drawStaffLines(state.ctx, STAFF_START_X, bassTopY, rightEdge)
    drawStaffConnectingLine(state.ctx, STAFF_START_X, trebleTopY - 1, bassTopY + staffHeight + 1)
    drawStaffConnectingLine(state.ctx, rightEdge, trebleTopY - 1, bassTopY + staffHeight + 1)

    drawGClef(ctx, getClefX(), trebleTopY)
    drawFClef(ctx, getClefX(), bassTopY)

    if (displayKeySignature) {
      drawKeySignature(ctx, getKeySignatureX(), trebleTopY, displayKeySignature, 'treble')
      drawKeySignature(ctx, getKeySignatureX(), bassTopY, displayKeySignature, 'bass')
    }
    if (state.timeSignature && lineIndex === 0) {
      const x = getTimeSignatureX(state)
      drawTimeSignature(ctx, x, trebleTopY, state.timeSignature)
      drawTimeSignature(ctx, x, bassTopY, state.timeSignature)
    }
  } else if (showTreble) {
    const trebleTopY = getTrebleStaffTopY(state, lineIndex)
    drawStaffLines(state.ctx, STAFF_START_X, trebleTopY, rightEdge)
    drawStaffConnectingLine(state.ctx, STAFF_START_X, trebleTopY - 1, trebleTopY + staffHeight + 1)
    drawStaffConnectingLine(state.ctx, rightEdge, trebleTopY - 1, trebleTopY + staffHeight + 1)

    drawGClef(ctx, getClefX(), trebleTopY)
    if (displayKeySignature) {
      drawKeySignature(ctx, getKeySignatureX(), trebleTopY, displayKeySignature, 'treble')
    }
    if (state.timeSignature && lineIndex === 0) {
      drawTimeSignature(ctx, getTimeSignatureX(state), trebleTopY, state.timeSignature)
    }
  } else if (showBass) {
    const bassTopY = getBassStaffTopY(state, lineIndex)
    drawStaffLines(state.ctx, STAFF_START_X, bassTopY, rightEdge)
    drawStaffConnectingLine(state.ctx, STAFF_START_X, bassTopY - 1, bassTopY + staffHeight + 1)
    drawStaffConnectingLine(state.ctx, rightEdge, bassTopY - 1, bassTopY + staffHeight + 1)

    drawFClef(ctx, getClefX(), bassTopY)
    if (displayKeySignature) {
      drawKeySignature(ctx, getKeySignatureX(), bassTopY, displayKeySignature, 'bass')
    }
    if (state.timeSignature && lineIndex === 0) {
      drawTimeSignature(ctx, getTimeSignatureX(state), bassTopY, state.timeSignature)
    }
  }
}

function getTrebleStaffTopY(state: State, lineIndex: number) {
  if (!state.showBass) {
    return lineIndex * state.systemHeight + state.systemHeight / 2 - STAFF_FIVE_LINES_HEIGHT / 2
  }
  return lineIndex * state.systemHeight + state.systemHeight / 2 - 40 - STAFF_FIVE_LINES_HEIGHT
}

function getBassStaffTopY(state: State, lineIndex: number) {
  if (!state.showTreble) {
    return lineIndex * state.systemHeight + state.systemHeight / 2 - STAFF_FIVE_LINES_HEIGHT / 2
  }
  return lineIndex * state.systemHeight + state.systemHeight / 2 + 20
}

function getClefX() {
  return STAFF_START_X + STAFF_SPACE
}

function getKeySignatureX() {
  return getClefX() + 3 * STAFF_SPACE
}

function getTimeSignatureX(state: State) {
  const fifths = state.displayKeySignature
    ? getKeyDetails(state.displayKeySignature).notes.length
    : 0
  return getKeySignatureX() + fifths * STAFF_SPACE + STAFF_SPACE
}

const colorMap = {
  primary: '0,243,255',
  hover: '255,0,187',
  disabled: '50,50,65',
  black: '100,100,110', // Darker for paper
}

const coloredNotesMap: { [step: string]: string } = {
  A: '255,0,187',
  B: '168,85,247',
  C: '255,50,100',
  D: '255,150,0',
  E: '255,230,0',
  F: '0,255,119',
  G: '0,243,255',
}

function getGameColorPrefix(
  state: State,
  note: SongNote,
  isPast: boolean,
  coloredNotes: boolean,
  step: string,
) {
  if (
    isHitNote(state.player, note) &&
    midiState.getPressedNotes().has(getTransposedMidi(state, note))
  ) {
    return coloredNotes ? getNoteColor(true, step) : colorMap.hover
  } else if (isMissedNote(state.player, note)) {
    return colorMap.disabled
  } else if (isPast) {
    return coloredNotes ? getNoteColor(true, step) : colorMap.primary
  }
  return coloredNotes ? getNoteColor(true, step) : '0,0,0' // pure black for unplayed on paper
}

function getLearnSongColorPrefix(
  state: State,
  note: SongNote,
  isPast: boolean,
  coloredNotes: boolean,
  step: string,
) {
  if (isPast) {
    return coloredNotes ? getNoteColor(true, step) : colorMap.primary
  }
  return getNoteColor(coloredNotes, step)
}

function renderLedgerLines(state: State, note: SongNote): void {
  const { ctx } = state
  const lineIndex = getLineIndex(note.time, state)
  const localTime = note.time % state.lineWidthTime
  const canvasX = getPlayNotesLineX(state) + localTime * state.pps + PLAY_NOTES_WIDTH / 2

  const staff = state.hands?.[note.track].hand === 'right' ? 'treble' : 'bass'
  const staffTopY =
    staff === 'treble' ? getTrebleStaffTopY(state, lineIndex) : getBassStaffTopY(state, lineIndex)
  const transposed = getTransposedMidi(state, note)

  ctx.fillStyle = 'rgba(0,0,0,0.8)'
  ctx.strokeStyle = 'rgba(0,0,0,0.8)'

  drawLedgerLines(
    ctx,
    canvasX - STAFF_SPACE,
    STAFF_SPACE * 2,
    staffTopY,
    transposed,
    staff,
    state.keySignature,
  )
}

function renderSheetNote(state: State, note: SongNote): void {
  const { ctx, pps, keySignature } = state
  ctx.save()

  const length = Math.round(pps * note.duration)
  const lineIndex = getLineIndex(note.time, state)
  const localTime = note.time % state.lineWidthTime
  const canvasX = getPlayNotesLineX(state) + localTime * state.pps + PLAY_NOTES_WIDTH / 2

  const isPast = state.time >= note.time
  const staff = state.hands?.[note.track].hand === 'right' ? 'treble' : 'bass'
  const staffTopY =
    staff === 'treble' ? getTrebleStaffTopY(state, lineIndex) : getBassStaffTopY(state, lineIndex)
  const transposed = getTransposedMidi(state, note)
  let canvasY = getNoteY(transposed, staff, staffTopY, keySignature)

  const key = getKey(transposed, state.keySignature)
  const prefix = state.game
    ? getGameColorPrefix(state, note, isPast, state.coloredNotes, key[0])
    : getLearnSongColorPrefix(state, note, isPast, state.coloredNotes, key[0])

  ctx.fillStyle = `rgba(${prefix}, 1)`
  ctx.strokeStyle = `rgba(${prefix}, 1)`

  // Draw tail (clamped to end of line if it spans across)
  const trailLength = Math.max(0, length - STAFF_SPACE)
  const rightEdge = state.windowWidth - STAFF_END_MARGIN
  const actualTrailLength = Math.min(trailLength, rightEdge - canvasX)

  if (actualTrailLength > 0) {
    const trailHeight = 8
    ctx.beginPath()
    ctx.roundRect(
      canvasX + STAFF_SPACE / 2,
      canvasY - trailHeight / 2,
      actualTrailLength,
      trailHeight,
      trailHeight / 2,
    )
    ctx.fill()
  }

  drawMusicNote(ctx, canvasX, canvasY, `rgba(${prefix}, 1)`)
  const accidental = key.length == 2 && key[1]
  if (accidental) {
    const symbol = accidental === '#' ? glyphs.accidentalSharp : glyphs.accidentalFlat
    const symbolX = canvasX - (STAFF_SPACE + 8)
    drawSymbol(ctx, symbol, symbolX, canvasY, STAFF_FIVE_LINES_HEIGHT * 0.8, `rgba(${prefix}, 1)`)
  }

  if (state.noteLabels !== 'none') {
    ctx.font = `bold 10px ${TEXT_FONT}`
    ctx.fillStyle = 'rgba(255,255,255,0.9)'
    const step = key[0]
    const noteText = state.noteLabels === 'alphabetical' ? step : getFixedDoNoteFromKey(step)
    const xOffset = state.noteLabels === 'alphabetical' ? 0 : 3
    ctx.fillText(noteText, canvasX - xOffset, canvasY + 3)
  }
  ctx.restore()
}

function renderMidiPressedKeys(state: State, inRange: CanvasItem[]): void {
  const { ctx } = state
  const pressed = midiState.getPressedNotes()

  // We need to render the pressed keys on the ACTIVE line
  const activeLineIndex = state.activeLineIndex

  for (let note of pressed.keys()) {
    let staff: Clef = note < getNote('C4') ? 'bass' : 'treble'
    const inRangeNote = inRange.find(
      (n) => n.type === 'note' && getTransposedMidi(state, n) === +note,
    ) as SongNote | undefined

    if (inRangeNote) {
      staff = state.hands?.[inRangeNote.track].hand === 'right' ? 'treble' : 'bass'
    }

    if (state.game && isHitNote(state.player, inRangeNote)) {
      continue
    }

    const staffTopY =
      staff === 'bass'
        ? getBassStaffTopY(state, activeLineIndex)
        : getTrebleStaffTopY(state, activeLineIndex)

    // Y must be adjusted by scrollY because we are outside the saved translation state
    const canvasY = getNoteY(note, staff, staffTopY, state.keySignature) - state.scrollY

    const localTime = state.time % state.lineWidthTime
    const canvasX = getPlayNotesLineX(state) + localTime * state.pps + PLAY_NOTES_WIDTH / 2

    const key = getKey(note, state.keySignature)
    drawMusicNote(
      ctx,
      canvasX,
      canvasY,
      state.coloredNotes ? `rgba(${getNoteColor(true, key[0])},1)` : 'rgba(239, 68, 68, 1)', // red for wrong note
    )

    if (key.length === 2) {
      const symbolColor = state.coloredNotes ? `rgba(${getNoteColor(true, key[0])},1)` : 'black'
      const accidental = key[1] === '#' ? glyphs.accidentalSharp : glyphs.accidentalFlat
      drawSymbol(ctx, accidental, canvasX - 24, canvasY, STAFF_FIVE_LINES_HEIGHT * 0.6, symbolColor)
    }
    if (state.noteLabels !== 'none') {
      ctx.font = `bold 10px ${TEXT_FONT}`
      ctx.fillStyle = 'white'
      const step = key[0]
      const noteText = state.noteLabels === 'alphabetical' ? step : getFixedDoNoteFromKey(step)
      ctx.fillText(noteText, canvasX - (state.noteLabels === 'alphabetical' ? 0 : 3), canvasY + 3)
    }
  }
}

function getTransposedMidi(state: State, note: SongNote) {
  return transposeMidi(note.midiNote, state.transpose)
}

function getNoteColor(coloredNotes: boolean, step: string): string {
  if (!coloredNotes) return '0,0,0' // black for paper mode
  return coloredNotesMap[step] || colorMap.black
}
