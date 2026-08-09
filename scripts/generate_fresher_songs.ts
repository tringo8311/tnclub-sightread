import fs from 'fs'
import path from 'path'
import toneMidi from '@tonejs/midi'

const { Midi } = toneMidi

interface NoteDef {
  midi: number
  time: number
  duration: number
}

interface SongPattern {
  id: string
  file: string
  title: string
  author: string
  level: string
  category: string
  generator: () => { notes: NoteDef[]; duration: number }
}

// Helpers to extend short patterns to >= 30 seconds by repeating with variations or structural musical forms (A-B-A-C, etc.)
function repeatPattern(
  notes: NoteDef[],
  repeats: number = 3,
  transposePerRepeat: number = 0,
): NoteDef[] {
  const result: NoteDef[] = []
  if (notes.length === 0) return result
  const maxTime = Math.max(...notes.map((n) => n.time + n.duration))
  for (let r = 0; r < repeats; r++) {
    const timeOffset = r * maxTime
    for (const note of notes) {
      result.push({
        midi: note.midi + r * transposePerRepeat,
        time: note.time + timeOffset,
        duration: note.duration,
      })
    }
  }
  return result
}

// Generate songs guaranteed to be >= 32 seconds
const songDefinitions: SongPattern[] = [
  {
    id: 'fresher-01-c-major-5-finger.mid',
    file: 'music/songs/fresher-01-c-major-5-finger.mid',
    title: '1. 5 Ngón Tay Cơ Bản (C Major 5-Finger)',
    author: 'TNClub Sightread',
    level: 'Fresher',
    category: 'Children',
    generator: () => {
      // 8 beats per phrase, tempo 90 bpm -> 1 beat = 0.666s. 5 sections = 40 beats = ~32s
      // Phase 1: Right Hand Ascent & Descent
      // Phase 2: Left Hand Support + Right Hand
      // Phase 3: Octave up (Higher Register)
      // Phase 4: Staccato / Fast & Slow Variation
      // Phase 5: Grand Finale chordal end
      const phrase1: NoteDef[] = [
        { midi: 60, time: 0, duration: 1 },
        { midi: 62, time: 1, duration: 1 },
        { midi: 64, time: 2, duration: 1 },
        { midi: 65, time: 3, duration: 1 },
        { midi: 67, time: 4, duration: 1 },
        { midi: 65, time: 5, duration: 1 },
        { midi: 64, time: 6, duration: 1 },
        { midi: 62, time: 7, duration: 1 },
      ]
      const phrase2: NoteDef[] = phrase1.map((n) => ({ ...n, time: n.time + 8 }))
      const leftHand2: NoteDef[] = [
        { midi: 48, time: 8, duration: 4 },
        { midi: 55, time: 12, duration: 4 },
      ]
      const phrase3: NoteDef[] = phrase1.map((n) => ({
        ...n,
        midi: n.midi + 12,
        time: n.time + 16,
      }))
      const phrase4: NoteDef[] = [
        { midi: 60, time: 24, duration: 0.8 },
        { midi: 64, time: 25, duration: 0.8 },
        { midi: 67, time: 26, duration: 0.8 },
        { midi: 65, time: 27, duration: 0.8 },
        { midi: 64, time: 28, duration: 1 },
        { midi: 62, time: 29, duration: 1 },
        { midi: 60, time: 30, duration: 2 },
      ]
      const leftHandFinale: NoteDef[] = [
        { midi: 48, time: 24, duration: 4 },
        { midi: 48, time: 28, duration: 4 },
        { midi: 52, time: 30, duration: 2 },
        { midi: 55, time: 30, duration: 2 },
      ]
      const allNotes = [
        ...phrase1,
        ...phrase2,
        ...leftHand2,
        ...phrase3,
        ...phrase4,
        ...leftHandFinale,
      ]
      return { notes: allNotes, duration: 32 }
    },
  },
  {
    id: 'fresher-02-do-re-mi-climb.mid',
    file: 'music/songs/fresher-02-do-re-mi-climb.mid',
    title: '2. Leo Núi Đồ Rê Mi (Mountain Climb)',
    author: 'TNClub Sightread',
    level: 'Fresher',
    category: 'Children',
    generator: () => {
      // 4 phrases of 8.5s = ~34s
      const baseTheme: NoteDef[] = [
        { midi: 60, time: 0, duration: 0.8 },
        { midi: 62, time: 1, duration: 0.8 },
        { midi: 64, time: 2, duration: 1.2 },
        { midi: 62, time: 3.5, duration: 0.8 },
        { midi: 64, time: 4.5, duration: 0.8 },
        { midi: 65, time: 5.5, duration: 1.2 },
        { midi: 64, time: 7, duration: 0.8 },
        { midi: 65, time: 8, duration: 0.8 },
      ]
      const sectionA = baseTheme
      const sectionB = baseTheme.map((n) => ({ ...n, midi: n.midi + 2, time: n.time + 9 })) // D Major climb
      const sectionC = baseTheme.map((n) => ({ ...n, midi: n.midi + 4, time: n.time + 18 })) // E climb
      const sectionOutro: NoteDef[] = [
        { midi: 67, time: 27, duration: 1 },
        { midi: 65, time: 28, duration: 1 },
        { midi: 64, time: 29, duration: 1 },
        { midi: 62, time: 30, duration: 1 },
        { midi: 60, time: 31, duration: 3 },
        { midi: 48, time: 31, duration: 3 },
        { midi: 52, time: 31, duration: 3 },
        { midi: 55, time: 31, duration: 3 },
      ]
      return { notes: [...sectionA, ...sectionB, ...sectionC, ...sectionOutro], duration: 34 }
    },
  },
  {
    id: 'fresher-03-stepping-stones.mid',
    file: 'music/songs/fresher-03-stepping-stones.mid',
    title: '3. Bước Đám Mây (Stepping Stones)',
    author: 'TNClub Sightread',
    level: 'Fresher',
    category: 'Children',
    generator: () => {
      // Arpeggiated stepping pattern repeated across octaves with bass support
      const pattern: NoteDef[] = [
        { midi: 60, time: 0, duration: 1 },
        { midi: 64, time: 1, duration: 1 },
        { midi: 67, time: 2, duration: 1 },
        { midi: 64, time: 3, duration: 1 },
        { midi: 60, time: 4, duration: 1 },
        { midi: 64, time: 5, duration: 1 },
        { midi: 67, time: 6, duration: 2 },
      ]
      // 4 iterations = 32s
      const notes: NoteDef[] = []
      for (let i = 0; i < 4; i++) {
        const offset = i * 8
        const midiShift = i === 1 ? 5 : i === 2 ? 7 : i === 3 ? 0 : 0 // C -> F -> G -> C
        pattern.forEach((n) => {
          notes.push({ midi: n.midi + midiShift, time: n.time + offset, duration: n.duration })
        })
        // Left hand bass note
        notes.push({ midi: 48 + midiShift, time: offset, duration: 4 })
        notes.push({ midi: 55 + midiShift, time: offset + 4, duration: 4 })
      }
      return { notes, duration: 32 }
    },
  },
  {
    id: 'fresher-04-jumping-frogs.mid',
    file: 'music/songs/fresher-04-jumping-frogs.mid',
    title: '4. Chú Ếch Nhảy Dù (Jumping Frogs)',
    author: 'TNClub Sightread',
    level: 'Fresher',
    category: 'Children',
    generator: () => {
      const theme: NoteDef[] = [
        { midi: 60, time: 0, duration: 0.5 },
        { midi: 67, time: 1, duration: 0.5 },
        { midi: 60, time: 2, duration: 0.5 },
        { midi: 67, time: 3, duration: 0.5 },
        { midi: 64, time: 4, duration: 1 },
        { midi: 67, time: 5, duration: 1 },
        { midi: 60, time: 6, duration: 2 },
      ]
      const notes: NoteDef[] = []
      // 4 rounds with variation = 33s
      for (let r = 0; r < 4; r++) {
        const tOffset = r * 8
        const pitchShift = r % 2 === 1 ? 2 : 0
        theme.forEach((n) => {
          notes.push({ midi: n.midi + pitchShift, time: n.time + tOffset, duration: n.duration })
        })
        notes.push({ midi: 48, time: tOffset, duration: 8 })
      }
      notes.push({ midi: 60, time: 32, duration: 2 })
      notes.push({ midi: 64, time: 32, duration: 2 })
      notes.push({ midi: 67, time: 32, duration: 2 })
      return { notes, duration: 34 }
    },
  },
  {
    id: 'fresher-05-little-waterfall.mid',
    file: 'music/songs/fresher-05-little-waterfall.mid',
    title: '5. Dòng Suối Nhỏ (Little Waterfall)',
    author: 'TNClub Sightread',
    level: 'Fresher',
    category: 'Children',
    generator: () => {
      const theme: NoteDef[] = [
        { midi: 67, time: 0, duration: 0.8 },
        { midi: 65, time: 1, duration: 0.8 },
        { midi: 64, time: 2, duration: 0.8 },
        { midi: 62, time: 3, duration: 0.8 },
        { midi: 60, time: 4, duration: 1.5 },
        { midi: 62, time: 6, duration: 0.8 },
        { midi: 64, time: 7, duration: 0.8 },
        { midi: 65, time: 8, duration: 0.8 },
        { midi: 67, time: 9, duration: 2 },
      ]
      // 3 extended themes + finale = 33s
      const notes: NoteDef[] = []
      for (let i = 0; i < 3; i++) {
        const tOffset = i * 10
        theme.forEach((n) => {
          notes.push({
            midi: n.midi + (i === 1 ? 5 : 0),
            time: n.time + tOffset,
            duration: n.duration,
          })
        })
      }
      notes.push({ midi: 60, time: 30, duration: 1 })
      notes.push({ midi: 64, time: 31, duration: 1 })
      notes.push({ midi: 67, time: 32, duration: 2 })
      return { notes, duration: 34 }
    },
  },
  {
    id: 'fresher-06-mirror-hands.mid',
    file: 'music/songs/fresher-06-mirror-hands.mid',
    title: '6. Hai Tay Soi Gương (Mirror Hands)',
    author: 'TNClub Sightread',
    level: 'Fresher',
    category: 'Children',
    generator: () => {
      // Hands together symmetrical movement
      const phrase: NoteDef[] = [
        { midi: 60, time: 0, duration: 1 },
        { midi: 48, time: 0, duration: 1 },
        { midi: 62, time: 1, duration: 1 },
        { midi: 50, time: 1, duration: 1 },
        { midi: 64, time: 2, duration: 1 },
        { midi: 52, time: 2, duration: 1 },
        { midi: 65, time: 3, duration: 1 },
        { midi: 53, time: 3, duration: 1 },
        { midi: 67, time: 4, duration: 2 },
        { midi: 55, time: 4, duration: 2 },
        // Return down
        { midi: 65, time: 6, duration: 1 },
        { midi: 53, time: 6, duration: 1 },
        { midi: 64, time: 7, duration: 1 },
        { midi: 52, time: 7, duration: 1 },
      ]
      const notes: NoteDef[] = []
      // 4 repeats with octave change = 32s
      for (let r = 0; r < 4; r++) {
        const tOffset = r * 8
        const oct = r === 2 ? 12 : 0
        phrase.forEach((n) => {
          notes.push({ midi: n.midi + oct, time: n.time + tOffset, duration: n.duration })
        })
      }
      return { notes, duration: 32 }
    },
  },
  {
    id: 'fresher-07-staccato-bouncing.mid',
    file: 'music/songs/fresher-07-staccato-bouncing.mid',
    title: '7. Bóng Nhảy Nốt Nẩy (Staccato Bouncing)',
    author: 'TNClub Sightread',
    level: 'Fresher',
    category: 'Children',
    generator: () => {
      const theme: NoteDef[] = [
        { midi: 60, time: 0, duration: 0.4 },
        { midi: 60, time: 0.8, duration: 0.4 },
        { midi: 64, time: 1.6, duration: 0.4 },
        { midi: 64, time: 2.4, duration: 0.4 },
        { midi: 67, time: 3.2, duration: 0.4 },
        { midi: 67, time: 4, duration: 0.4 },
        { midi: 60, time: 4.8, duration: 1.5 },
      ]
      const notes: NoteDef[] = []
      // 5 phrases = ~33s
      for (let i = 0; i < 5; i++) {
        const tOffset = i * 6.5
        const shift = (i % 3) * 2
        theme.forEach((n) => {
          notes.push({ midi: n.midi + shift, time: n.time + tOffset, duration: n.duration })
        })
        notes.push({ midi: 48 + shift, time: tOffset, duration: 3 })
      }
      return { notes, duration: 33 }
    },
  },
  {
    id: 'fresher-08-butterfly-dance.mid',
    file: 'music/songs/fresher-08-butterfly-dance.mid',
    title: '8. Điệu Múa Bướm Đêm (Butterfly Dance)',
    author: 'TNClub Sightread',
    level: 'Fresher',
    category: 'Children',
    generator: () => {
      const theme: NoteDef[] = [
        { midi: 60, time: 0, duration: 0.8 },
        { midi: 64, time: 1, duration: 0.8 },
        { midi: 62, time: 2, duration: 0.8 },
        { midi: 65, time: 3, duration: 0.8 },
        { midi: 64, time: 4, duration: 0.8 },
        { midi: 67, time: 5, duration: 0.8 },
        { midi: 62, time: 6, duration: 1 },
        { midi: 60, time: 7.5, duration: 1.5 },
      ]
      const notes: NoteDef[] = []
      // 4 iterations = 36s
      for (let i = 0; i < 4; i++) {
        const tOffset = i * 9
        const shift = i === 1 ? 2 : i === 2 ? 4 : 0
        theme.forEach((n) => {
          notes.push({ midi: n.midi + shift, time: n.time + tOffset, duration: n.duration })
        })
        notes.push({ midi: 48, time: tOffset, duration: 4.5 })
        notes.push({ midi: 52, time: tOffset + 4.5, duration: 4.5 })
      }
      return { notes, duration: 36 }
    },
  },
  {
    id: 'fresher-09-marching-ants.mid',
    file: 'music/songs/fresher-09-marching-ants.mid',
    title: '9. Đàn Kiến Bước Đều (Marching Ants)',
    author: 'TNClub Sightread',
    level: 'Fresher',
    category: 'Children',
    generator: () => {
      const theme: NoteDef[] = [
        { midi: 60, time: 0, duration: 0.8 },
        { midi: 60, time: 1, duration: 0.8 },
        { midi: 62, time: 2, duration: 0.8 },
        { midi: 62, time: 3, duration: 0.8 },
        { midi: 64, time: 4, duration: 0.8 },
        { midi: 64, time: 5, duration: 0.8 },
        { midi: 67, time: 6, duration: 0.8 },
        { midi: 67, time: 7, duration: 0.8 },
        { midi: 60, time: 8.5, duration: 1.5 },
      ]
      const notes: NoteDef[] = []
      // 3 rounds + coda = 32s
      for (let i = 0; i < 3; i++) {
        const tOffset = i * 10
        theme.forEach((n) => {
          notes.push({ midi: n.midi, time: n.time + tOffset, duration: n.duration })
        })
      }
      // Coda
      notes.push({ midi: 60, time: 30, duration: 0.5 })
      notes.push({ midi: 64, time: 30.5, duration: 0.5 })
      notes.push({ midi: 67, time: 31, duration: 1 })
      notes.push({ midi: 72, time: 32, duration: 2 })
      return { notes, duration: 34 }
    },
  },
  {
    id: 'fresher-10-sleeping-bear.mid',
    file: 'music/songs/fresher-10-sleeping-bear.mid',
    title: '10. Chú Gấu Trong Hang (Sleeping Bear - Tay Trái)',
    author: 'TNClub Sightread',
    level: 'Fresher',
    category: 'Children',
    generator: () => {
      // Deep bass melody for left hand
      const theme: NoteDef[] = [
        { midi: 48, time: 0, duration: 1.5 },
        { midi: 50, time: 2, duration: 1.5 },
        { midi: 52, time: 4, duration: 1.5 },
        { midi: 53, time: 6, duration: 1.5 },
        { midi: 55, time: 8, duration: 3.5 },
      ]
      const notes: NoteDef[] = []
      // 3 variations = 36s
      for (let i = 0; i < 3; i++) {
        const tOffset = i * 12
        theme.forEach((n) => {
          notes.push({
            midi: n.midi + (i === 1 ? -12 : 0),
            time: n.time + tOffset,
            duration: n.duration,
          })
        })
      }
      return { notes, duration: 36 }
    },
  },
  {
    id: 'fresher-11-cuckoo-clock.mid',
    file: 'music/songs/fresher-11-cuckoo-clock.mid',
    title: '11. Chuông Cúc Cu (Cuckoo Clock)',
    author: 'TNClub Sightread',
    level: 'Fresher',
    category: 'Children',
    generator: () => {
      const theme: NoteDef[] = [
        { midi: 67, time: 0, duration: 0.8 },
        { midi: 64, time: 1, duration: 1.2 },
        { midi: 67, time: 2.5, duration: 0.8 },
        { midi: 64, time: 3.5, duration: 1.2 },
        { midi: 67, time: 5, duration: 0.8 },
        { midi: 64, time: 6, duration: 0.8 },
        { midi: 60, time: 7, duration: 2 },
      ]
      const notes: NoteDef[] = []
      // 4 iterations = 36s
      for (let i = 0; i < 4; i++) {
        const tOffset = i * 9
        const oct = i % 2 === 1 ? 12 : 0
        theme.forEach((n) => {
          notes.push({ midi: n.midi + oct, time: n.time + tOffset, duration: n.duration })
        })
      }
      return { notes, duration: 36 }
    },
  },
  {
    id: 'fresher-12-rainbow-bridge.mid',
    file: 'music/songs/fresher-12-rainbow-bridge.mid',
    title: '12. Cầu Vồng Tươi Sáng (Rainbow Bridge)',
    author: 'TNClub Sightread',
    level: 'Fresher',
    category: 'Children',
    generator: () => {
      const theme: NoteDef[] = [
        { midi: 60, time: 0, duration: 0.8 },
        { midi: 64, time: 1, duration: 0.8 },
        { midi: 67, time: 2, duration: 0.8 },
        { midi: 72, time: 3, duration: 1.5 },
        { midi: 67, time: 5, duration: 0.8 },
        { midi: 64, time: 6, duration: 0.8 },
        { midi: 60, time: 7, duration: 2 },
      ]
      const notes: NoteDef[] = []
      // 4 rounds = 36s
      for (let i = 0; i < 4; i++) {
        const tOffset = i * 9
        theme.forEach((n) => {
          notes.push({ midi: n.midi, time: n.time + tOffset, duration: n.duration })
        })
      }
      return { notes, duration: 36 }
    },
  },
  {
    id: 'fresher-13-echo-valley.mid',
    file: 'music/songs/fresher-13-echo-valley.mid',
    title: '13. Thung Lũng Vọng Âm (Echo Valley)',
    author: 'TNClub Sightread',
    level: 'Fresher',
    category: 'Children',
    generator: () => {
      // Call and Echo (Loud and Soft)
      const call: NoteDef[] = [
        { midi: 60, time: 0, duration: 1 },
        { midi: 64, time: 1, duration: 1 },
        { midi: 67, time: 2, duration: 1.5 },
      ]
      const echo: NoteDef[] = call.map((n) => ({ ...n, midi: n.midi + 12, time: n.time + 4 }))
      const phrase = [...call, ...echo]
      const notes: NoteDef[] = []
      // 4 repetitions = 32s
      for (let i = 0; i < 4; i++) {
        const tOffset = i * 8
        phrase.forEach((n) => {
          notes.push({ midi: n.midi, time: n.time + tOffset, duration: n.duration })
        })
      }
      notes.push({ midi: 60, time: 32, duration: 2 })
      notes.push({ midi: 72, time: 32, duration: 2 })
      return { notes, duration: 34 }
    },
  },
  {
    id: 'fresher-14-rain-drops.mid',
    file: 'music/songs/fresher-14-rain-drops.mid',
    title: '14. Hạt Mưa Rơi Tí Tách (Rain Drops)',
    author: 'TNClub Sightread',
    level: 'Fresher',
    category: 'Children',
    generator: () => {
      const theme: NoteDef[] = [
        { midi: 67, time: 0, duration: 0.5 },
        { midi: 65, time: 0.7, duration: 0.5 },
        { midi: 64, time: 1.4, duration: 0.5 },
        { midi: 62, time: 2.1, duration: 0.5 },
        { midi: 60, time: 2.8, duration: 1 },
        { midi: 67, time: 4.2, duration: 0.5 },
        { midi: 60, time: 5, duration: 2 },
      ]
      const notes: NoteDef[] = []
      // 4 repetitions = 32s
      for (let i = 0; i < 4; i++) {
        const tOffset = i * 8
        theme.forEach((n) => {
          notes.push({ midi: n.midi, time: n.time + tOffset, duration: n.duration })
        })
      }
      notes.push({ midi: 60, time: 32, duration: 2 })
      return { notes, duration: 34 }
    },
  },
  {
    id: 'fresher-15-clock-tick-tock.mid',
    file: 'music/songs/fresher-15-clock-tick-tock.mid',
    title: '15. Đồng Hồ Tích Tắc (Tick-Tock Clock)',
    author: 'TNClub Sightread',
    level: 'Fresher',
    category: 'Children',
    generator: () => {
      const theme: NoteDef[] = [
        { midi: 60, time: 0, duration: 0.8 },
        { midi: 67, time: 1, duration: 0.8 },
        { midi: 60, time: 2, duration: 0.8 },
        { midi: 67, time: 3, duration: 0.8 },
        { midi: 60, time: 4, duration: 0.8 },
        { midi: 67, time: 5, duration: 0.8 },
        { midi: 60, time: 6.5, duration: 1.5 },
      ]
      const notes: NoteDef[] = []
      // 4 cycles = 32s
      for (let i = 0; i < 4; i++) {
        const tOffset = i * 8
        theme.forEach((n) => {
          notes.push({ midi: n.midi, time: n.time + tOffset, duration: n.duration })
        })
      }
      notes.push({ midi: 60, time: 32, duration: 2 })
      return { notes, duration: 34 }
    },
  },
  {
    id: 'fresher-16-rocking-horse.mid',
    file: 'music/songs/fresher-16-rocking-horse.mid',
    title: '16. Chú Ngựa Gỗ (Rocking Horse)',
    author: 'TNClub Sightread',
    level: 'Fresher',
    category: 'Children',
    generator: () => {
      const theme: NoteDef[] = [
        { midi: 60, time: 0, duration: 0.8 },
        { midi: 67, time: 1, duration: 0.8 },
        { midi: 64, time: 2, duration: 0.8 },
        { midi: 67, time: 3, duration: 0.8 },
        { midi: 60, time: 4, duration: 0.8 },
        { midi: 67, time: 5, duration: 0.8 },
        { midi: 64, time: 6, duration: 1 },
        { midi: 60, time: 7.5, duration: 1.5 },
      ]
      const notes: NoteDef[] = []
      // 4 repetitions = 36s
      for (let i = 0; i < 4; i++) {
        const tOffset = i * 9
        theme.forEach((n) => {
          notes.push({ midi: n.midi, time: n.time + tOffset, duration: n.duration })
        })
      }
      return { notes, duration: 36 }
    },
  },
  {
    id: 'fresher-17-little-pioneer.mid',
    file: 'music/songs/fresher-17-little-pioneer.mid',
    title: '17. Đội Viên Tí Hon (Little Pioneer March)',
    author: 'TNClub Sightread',
    level: 'Fresher',
    category: 'Children',
    generator: () => {
      const theme: NoteDef[] = [
        { midi: 60, time: 0, duration: 0.8 },
        { midi: 60, time: 1, duration: 0.8 },
        { midi: 67, time: 2, duration: 0.8 },
        { midi: 67, time: 3, duration: 0.8 },
        { midi: 69, time: 4, duration: 0.8 },
        { midi: 69, time: 5, duration: 0.8 },
        { midi: 67, time: 6, duration: 2 },
      ]
      const notes: NoteDef[] = []
      // 4 cycles = 32s
      for (let i = 0; i < 4; i++) {
        const tOffset = i * 8
        const shift = i === 2 ? 2 : 0
        theme.forEach((n) => {
          notes.push({ midi: n.midi + shift, time: n.time + tOffset, duration: n.duration })
        })
      }
      notes.push({ midi: 60, time: 32, duration: 2 })
      return { notes, duration: 34 }
    },
  },
  {
    id: 'fresher-18-starlight-lullaby.mid',
    file: 'music/songs/fresher-18-starlight-lullaby.mid',
    title: '18. Hát Ru Ánh Sao (Starlight Lullaby)',
    author: 'TNClub Sightread',
    level: 'Fresher',
    category: 'Children',
    generator: () => {
      const theme: NoteDef[] = [
        { midi: 60, time: 0, duration: 1.5 },
        { midi: 64, time: 2, duration: 1.5 },
        { midi: 67, time: 4, duration: 2 },
        { midi: 64, time: 6.5, duration: 1.5 },
        { midi: 60, time: 8.5, duration: 2.5 },
      ]
      const notes: NoteDef[] = []
      // 3 cycles = 33s
      for (let i = 0; i < 3; i++) {
        const tOffset = i * 11
        theme.forEach((n) => {
          notes.push({ midi: n.midi, time: n.time + tOffset, duration: n.duration })
        })
      }
      return { notes, duration: 33 }
    },
  },
  {
    id: 'fresher-19-ping-pong-game.mid',
    file: 'music/songs/fresher-19-ping-pong-game.mid',
    title: '19. Trận Bóng Bàn (Ping Pong Game)',
    author: 'TNClub Sightread',
    level: 'Fresher',
    category: 'Children',
    generator: () => {
      const theme: NoteDef[] = [
        { midi: 48, time: 0, duration: 0.4 },
        { midi: 60, time: 0.6, duration: 0.4 },
        { midi: 52, time: 1.2, duration: 0.4 },
        { midi: 64, time: 1.8, duration: 0.4 },
        { midi: 55, time: 2.4, duration: 0.4 },
        { midi: 67, time: 3, duration: 0.4 },
        { midi: 60, time: 3.8, duration: 2 },
      ]
      const notes: NoteDef[] = []
      // 5 iterations = 30s + coda
      for (let i = 0; i < 5; i++) {
        const tOffset = i * 6
        theme.forEach((n) => {
          notes.push({ midi: n.midi, time: n.time + tOffset, duration: n.duration })
        })
      }
      notes.push({ midi: 60, time: 30, duration: 2 })
      notes.push({ midi: 72, time: 30, duration: 2 })
      return { notes, duration: 32 }
    },
  },
  {
    id: 'fresher-20-victory-fanfare.mid',
    file: 'music/songs/fresher-20-victory-fanfare.mid',
    title: '20. Khúc Nhạc Chiến Thắng (Victory Fanfare)',
    author: 'TNClub Sightread',
    level: 'Fresher',
    category: 'Children',
    generator: () => {
      const theme: NoteDef[] = [
        { midi: 60, time: 0, duration: 0.5 },
        { midi: 64, time: 0.7, duration: 0.5 },
        { midi: 67, time: 1.4, duration: 0.5 },
        { midi: 72, time: 2.1, duration: 1.5 },
        { midi: 60, time: 4, duration: 0.5 },
        { midi: 64, time: 4.7, duration: 0.5 },
        { midi: 67, time: 5.4, duration: 0.5 },
        { midi: 72, time: 6.1, duration: 1.9 },
      ]
      const notes: NoteDef[] = []
      // 4 cycles = 32s
      for (let i = 0; i < 4; i++) {
        const tOffset = i * 8
        theme.forEach((n) => {
          notes.push({ midi: n.midi, time: n.time + tOffset, duration: n.duration })
        })
        notes.push({ midi: 48, time: tOffset, duration: 4 })
      }
      notes.push({ midi: 72, time: 32, duration: 2 })
      return { notes, duration: 34 }
    },
  },
]

const songsDir = path.join(process.cwd(), 'public/music/songs')
if (!fs.existsSync(songsDir)) {
  fs.mkdirSync(songsDir, { recursive: true })
}

const updatedFresherEntries: any[] = []

songDefinitions.forEach((song) => {
  const { notes, duration } = song.generator()
  const midi = new Midi()
  const track = midi.addTrack()
  track.name = song.title

  notes.forEach((n) => {
    track.addNote({
      midi: n.midi,
      time: n.time,
      duration: n.duration,
      velocity: 0.8,
    })
  })

  const filePath = path.join(process.cwd(), 'public', song.file)
  fs.writeFileSync(filePath, Buffer.from(midi.toArray()))
  console.log(`Generated: ${filePath} (Duration: ${duration}s, Notes: ${notes.length})`)

  updatedFresherEntries.push({
    file: song.file,
    title: song.title,
    source: 'builtin',
    id: song.id,
    duration: Math.round(duration),
    url: 'https://sightread.dev',
    license: 'https://creativecommons.org/publicdomain/mark/1.0/',
    level: song.level,
    category: song.category,
    author: song.author,
  })
})

// Update manifest.json
const manifestPath = path.join(process.cwd(), 'src/manifest.json')
const currentManifest: any[] = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))

// Replace existing fresher items with updated duration items
const nonFresherManifest = currentManifest.filter(
  (item) => !updatedFresherEntries.some((f) => f.id === item.id),
)
const finalManifest = [...nonFresherManifest, ...updatedFresherEntries]

fs.writeFileSync(manifestPath, JSON.stringify(finalManifest, null, 2))
console.log('Manifest updated successfully with extended song durations!')
