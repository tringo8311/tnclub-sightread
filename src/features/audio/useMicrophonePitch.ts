import { useEffect, useRef } from 'react'
import { Macleod } from 'pitchfinder'
import midiState from '@/features/midi'


import { atom, getDefaultStore } from 'jotai'
import type { ProbabalisticPitchDetector } from 'pitchfinder/lib/detectors/types'

export const detectedMicNoteAtom = atom<number | null>(null)
export const micVolumeAtom = atom<number>(0)
export const micFrequencyAtom = atom<number | null>(null)
export const micStreamAtom = atom<MediaStream | null>(null)
const store = getDefaultStore()

export function useMicrophonePitch(isActive: boolean) {
  const activeNoteRef = useRef<number | null>(null)

  useEffect(() => {
    if (!isActive) {
      if (activeNoteRef.current !== null) {
        midiState.release(activeNoteRef.current)
        activeNoteRef.current = null
        store.set(detectedMicNoteAtom, null)
      }
      store.set(micVolumeAtom, 0)
      store.set(micFrequencyAtom, null)
      store.set(micStreamAtom, null)
      return
    }

    let audioContext: AudioContext | null = null
    let analyser: AnalyserNode | null = null
    let microphone: MediaStreamAudioSourceNode | null = null
    let stream: MediaStream | null = null
    let animationFrameId: number
    let detectPitch: ProbabalisticPitchDetector | null = null

    async function initAudio() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: false,
            autoGainControl: false,
            noiseSuppression: false,
            channelCount: 1, // Optimize for mono detection
          }
        })
        store.set(micStreamAtom, stream)

        const AudioContextConstructor = window.AudioContext || (window as any).webkitAudioContext
        audioContext = new AudioContextConstructor()

        analyser = audioContext.createAnalyser()
        analyser.fftSize = 4096 // 4096 is better for detecting lower piano notes

        microphone = audioContext.createMediaStreamSource(stream)
        microphone.connect(analyser)

        // Macleod is better for polyphonic/complex instruments like piano.
        detectPitch = Macleod({ sampleRate: audioContext.sampleRate, bufferSize: analyser.fftSize, cutoff: 0.9 }) as ProbabalisticPitchDetector

        const dataArray = new Float32Array(analyser.fftSize)

        let stableFrames = 0
        let lastDetectedMidi: number | null = null
        let nullFrames = 0
        let frameCount = 0

        const analyze = () => {
          if (!analyser || !detectPitch) return
          frameCount++

          analyser.getFloatTimeDomainData(dataArray)

          let sumSquares = 0
          for (let i = 0; i < dataArray.length; i++) {
            sumSquares += dataArray[i] * dataArray[i]
          }
          const rms = Math.sqrt(sumSquares / dataArray.length)

          // Throttle UI updates to 10fps
          if (frameCount % 6 === 0) {
            store.set(micVolumeAtom, rms)
          }

          let currentMidi: number | null = null
          let currentFreq: number | null = null

          // Lowered threshold to 0.002 for quiet mics
          if (rms > 0.002) {
            const result = detectPitch(dataArray)
            if (result && result.probability > 0.8 && result.freq > 20 && result.freq < 5000) {
              currentFreq = result.freq
              currentMidi = Math.round(69 + 12 * Math.log2(result.freq / 440))
            }
          }

          if (frameCount % 6 === 0) {
            store.set(micFrequencyAtom, currentFreq)
          }

          if (currentMidi !== null) {
            nullFrames = 0
            if (currentMidi === lastDetectedMidi) {
              stableFrames++
            } else {
              // Allow slight fluctuations (1 frame of wrong detection)
              if (stableFrames > 0) {
                stableFrames--
              } else {
                stableFrames = 1
                lastDetectedMidi = currentMidi
              }
            }
          } else {
            nullFrames++
            // Tolerate up to ~150ms of missing detection (about 9 frames at 60fps)
            if (nullFrames > 9) {
              stableFrames = 0
              lastDetectedMidi = null
            }
          }

          // Require the pitch to be stable for at least 1 frame (instant response)
          if (stableFrames >= 1 && lastDetectedMidi !== null) {
            if (activeNoteRef.current !== lastDetectedMidi) {
              if (activeNoteRef.current !== null) {
                midiState.release(activeNoteRef.current)
              }
              activeNoteRef.current = lastDetectedMidi
              store.set(detectedMicNoteAtom, lastDetectedMidi)
              midiState.press(activeNoteRef.current, 80)
            }
          } else if (lastDetectedMidi === null && stableFrames === 0) {
            if (activeNoteRef.current !== null) {
              midiState.release(activeNoteRef.current)
              activeNoteRef.current = null
              store.set(detectedMicNoteAtom, null)
            }
          }

          animationFrameId = requestAnimationFrame(analyze)
        }

        analyze()
      } catch (err) {
        console.error('Error initializing microphone:', err)
      }
    }

    initAudio()

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
      if (activeNoteRef.current !== null) {
        midiState.release(activeNoteRef.current)
        activeNoteRef.current = null
        store.set(detectedMicNoteAtom, null)
      }
      if (microphone) {
        microphone.disconnect()
      }
      if (analyser) {
        analyser.disconnect()
      }
      if (audioContext) {
        audioContext.close().catch(console.error)
      }
      if (stream) {
        stream.getTracks().forEach(track => track.stop())
      }
    }
  }, [isActive])
}
