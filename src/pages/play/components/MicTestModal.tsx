import { Modal } from '@/components'
import { detectedMicNoteAtom, micVolumeAtom, micFrequencyAtom, micStreamAtom } from '@/features/audio/useMicrophonePitch'
import { getNoteName } from '@/features/theory'
import { Mic, MicOff, AlertCircle, Play, Square, Loader2 } from 'lucide-react'
import { useAtomValue } from 'jotai'
import { useState, useRef } from 'react'

interface MicTestModalProps {
  isOpen: boolean
  onClose: () => void
  isMicActive: boolean
  onToggleMic: () => void
}

export function MicTestModal(props: MicTestModalProps) {
  const { isOpen, onClose, isMicActive, onToggleMic } = props
  const detectedMidi = useAtomValue(detectedMicNoteAtom)
  const micVolume = useAtomValue(micVolumeAtom)
  const micFrequency = useAtomValue(micFrequencyAtom)
  const stream = useAtomValue(micStreamAtom)

  const [isRecording, setIsRecording] = useState(false)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const handleRecord = () => {
    if (!stream) return
    setIsRecording(true)
    setAudioUrl(null)
    const recorder = new MediaRecorder(stream)
    const chunks: Blob[] = []
    recorder.ondataavailable = e => chunks.push(e.data)
    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: 'audio/webm' })
      setAudioUrl(URL.createObjectURL(blob))
      setIsRecording(false)
    }
    recorder.start()
    setTimeout(() => recorder.stop(), 3000)
  }

  // Volume bar is usually from 0 to 1, but typical voice/instrument is much lower
  // Let's amplify it slightly for visual feedback. Max visual is clamped at 1.
  const visualVolume = Math.min(100, Math.round(micVolume * 400))

  return (
    <Modal
      show={isOpen}
      onClose={onClose}
      className="w-[min(90vw,600px)] rounded-2xl bg-[#231e29] text-white/90 shadow-[0_24px_80px_rgba(0,0,0,0.55)] [&>button]:hidden text-center mx-auto"
      modalClassName="max-w-none bg-transparent border-none shadow-none flex items-center justify-center"
      overlayClassName="bg-black/45 backdrop-blur-[2px]"
    >
      <div className="relative flex flex-col text-base">
        <div className="flex items-center justify-between border-b border-white/5 px-6 py-5">
          <h1 className="text-xl font-semibold text-white">Microphone Test</h1>
        </div>
        
        <div className="flex flex-col gap-6 px-6 pt-5 pb-6">
          <div className="flex flex-col items-center gap-4 rounded-xl border border-white/5 bg-white/[0.04] p-6 text-center">
            
            {/* Note Display */}
            <div className="flex flex-col items-center justify-center size-24 rounded-full bg-[#18151c] border border-[#3a3444] shadow-inner mb-2">
              {isMicActive ? (
                <>
                  <span className="text-4xl font-bold text-violet-400">
                    {detectedMidi !== null ? getNoteName(detectedMidi) : '--'}
                  </span>
                  <span className="text-[10px] text-gray-500 font-mono mt-1">
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
                <span>Volume</span>
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
              {isMicActive ? 'Turn Off Microphone' : 'Turn On Microphone'}
            </button>
            
            {/* Debug Recording Section */}
            {isMicActive && (
              <div className="w-full mt-4 pt-4 border-t border-white/5 space-y-3">
                <button
                  onClick={handleRecord}
                  disabled={isRecording}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-black/30 py-2 text-xs font-semibold text-gray-300 transition hover:bg-black/50 disabled:opacity-50"
                >
                  {isRecording ? (
                    <>
                      <Loader2 className="size-3.5 animate-spin text-red-400" />
                      <span className="text-red-400">Recording 3s...</span>
                    </>
                  ) : (
                    <>
                      <Square className="size-3.5" />
                      Debug: Record & Listen
                    </>
                  )}
                </button>
                {audioUrl && (
                  <audio 
                    ref={audioRef}
                    src={audioUrl} 
                    controls 
                    autoPlay
                    className="h-8 w-full outline-none [&::-webkit-media-controls-panel]:bg-white/10 [&::-webkit-media-controls-current-time-display]:text-white [&::-webkit-media-controls-time-remaining-display]:text-white" 
                  />
                )}
              </div>
            )}
            
          </div>
          
          <div className="flex items-start gap-3 rounded-xl bg-amber-500/10 border border-amber-500/20 p-3.5 text-xs text-amber-200/90 shadow-sm">
            <AlertCircle className="mt-0.5 size-4 shrink-0 text-amber-400" />
            <div className="space-y-1">
              <p className="font-semibold text-amber-300">
                💡 Khuyên dùng cho Người mới bắt đầu (Beginner)
              </p>
              <p className="leading-relaxed">
                Nhận diện Microphone chỉ là giải pháp tạm thời dành cho Đàn Piano cơ (Acoustic) hoặc khi chưa có dây nối. Để đạt độ chính xác 100% không độ trễ, hãy kết nối đàn qua <strong>USB MIDI</strong> hoặc <strong>Bluetooth MIDI</strong>!
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
              Close
            </button>
          </div>
        </div>
      </div>
    </Modal>
  )
}
