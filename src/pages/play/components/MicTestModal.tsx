import { Modal } from '@/components'
import {
  detectedMicNoteAtom,
  micFrequencyAtom,
  micStreamAtom,
  micVolumeAtom,
} from '@/features/audio/useMicrophonePitch'
import { getNoteName } from '@/features/theory'
import { useAtomValue } from 'jotai'
import { AlertCircle, Loader2, Mic, MicOff, Square } from 'lucide-react'
import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

interface MicTestModalProps {
  isOpen: boolean
  onClose: () => void
  isMicActive: boolean
  onToggleMic: () => void
}

export function MicTestModal(props: MicTestModalProps) {
  const { t } = useTranslation()
  const { isOpen, onClose, isMicActive, onToggleMic } = props
  const detectedMidi = useAtomValue(detectedMicNoteAtom)
  const micVolume = useAtomValue(micVolumeAtom)
  const micFrequency = useAtomValue(micFrequencyAtom)
  const stream = useAtomValue(micStreamAtom)

  const [isRecording, setIsRecording] = useState(false)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const handleRecord = () => {
    if (!stream) return
    setIsRecording(true)
    audioChunksRef.current = []

    const mediaRecorder = new MediaRecorder(stream)
    mediaRecorderRef.current = mediaRecorder

    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        audioChunksRef.current.push(e.data)
      }
    }

    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' })
      const url = URL.createObjectURL(audioBlob)
      setAudioUrl(url)
      setIsRecording(false)
    }

    mediaRecorder.start()

    setTimeout(() => {
      if (mediaRecorder.state === 'recording') {
        mediaRecorder.stop()
      }
    }, 3000)
  }

  const visualVolume = Math.min(100, Math.round(micVolume * 100))

  return (
    <Modal
      show={isOpen}
      onClose={onClose}
      className="mx-auto w-[min(90vw,600px)] rounded-2xl bg-[#231e29] text-center text-white/90 shadow-[0_24px_80px_rgba(0,0,0,0.55)] [&>button]:hidden"
      modalClassName="max-w-none bg-transparent border-none shadow-none flex items-center justify-center"
      overlayClassName="bg-black/45 backdrop-blur-[2px]"
    >
      <div className="relative flex flex-col text-base">
        <div className="flex items-center justify-between border-b border-white/5 px-6 py-5">
          <h1 className="text-xl font-semibold text-white">
            {t('play.micTest.title', 'Microphone Pitch Test')}
          </h1>
        </div>

        <div className="flex flex-col gap-6 px-6 pt-5 pb-6">
          <div className="flex flex-col items-center gap-4 rounded-xl border border-white/5 bg-white/[0.04] p-6 text-center">
            {/* Note Display */}
            <div className="mb-2 flex size-24 flex-col items-center justify-center rounded-full border border-[#3a3444] bg-[#18151c] shadow-inner">
              {isMicActive ? (
                <>
                  <span className="text-4xl font-bold text-violet-400">
                    {detectedMidi !== null ? getNoteName(detectedMidi) : '--'}
                  </span>
                  <span className="mt-1 font-mono text-[10px] text-gray-500">
                    {micFrequency !== null ? `${Math.round(micFrequency)} Hz` : ''}
                  </span>
                </>
              ) : (
                <MicOff className="size-10 text-white/20" />
              )}
            </div>

            {/* Volume Meter */}
            <div className="w-full space-y-2">
              <div className="flex justify-between text-xs font-medium text-white/50 uppercase">
                <span>{t('play.micTest.volume', 'Volume')}</span>
                <span>{visualVolume}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-black/40">
                <div
                  className="h-full bg-violet-500 transition-all duration-75"
                  style={{ width: `${isMicActive ? visualVolume : 0}%` }}
                />
              </div>
            </div>

            {/* Toggle Button */}
            <button
              onClick={onToggleMic}
              className={`mt-4 flex w-full items-center justify-center gap-2 rounded-lg py-3 text-sm font-semibold transition-colors ${
                isMicActive
                  ? 'bg-white/10 text-white hover:bg-white/20'
                  : 'bg-violet-600 text-white hover:bg-violet-500'
              }`}
            >
              <Mic className="size-4" />
              {isMicActive
                ? t('play.micTest.turnOff', 'Turn Off Microphone')
                : t('play.micTest.turnOn', 'Turn On Microphone')}
            </button>

            {/* Debug Recording Section */}
            {isMicActive && (
              <div className="mt-4 w-full space-y-3 border-t border-white/5 pt-4">
                <button
                  onClick={handleRecord}
                  disabled={isRecording}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-black/30 py-2 text-xs font-semibold text-gray-300 transition hover:bg-black/50 disabled:opacity-50"
                >
                  {isRecording ? (
                    <>
                      <Loader2 className="size-3.5 animate-spin text-red-400" />
                      <span className="text-red-400">
                        {t('play.micTest.recording', 'Recording 3s...')}
                      </span>
                    </>
                  ) : (
                    <>
                      <Square className="size-3.5" />
                      {t('play.micTest.debug', 'Debug: Record & Listen')}
                    </>
                  )}
                </button>
                {audioUrl && (
                  <audio
                    ref={audioRef}
                    src={audioUrl}
                    controls
                    autoPlay
                    className="h-8 w-full outline-none [&::-webkit-media-controls-current-time-display]:text-white [&::-webkit-media-controls-panel]:bg-white/10 [&::-webkit-media-controls-time-remaining-display]:text-white"
                  />
                )}
              </div>
            )}
          </div>

          <div className="flex items-start gap-3 rounded-xl border border-amber-500/20 bg-amber-500/10 p-3.5 text-xs text-amber-200/90 shadow-sm">
            <AlertCircle className="mt-0.5 size-4 shrink-0 text-amber-400" />
            <div className="space-y-1">
              <p className="font-semibold text-amber-300">
                {t('play.micTest.tipTitle', '💡 Recommended for Beginners')}
              </p>
              <p className="leading-relaxed">
                {t(
                  'play.micTest.tipBody',
                  'Microphone pitch detection is an interim option for Acoustic Pianos or when cables are unavailable. For 100% latency-free accuracy, please connect your piano via USB MIDI or Bluetooth MIDI!',
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 px-6 py-4">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-white/80 transition hover:bg-white/20"
            >
              {t('play.micTest.close', 'Close')}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  )
}
