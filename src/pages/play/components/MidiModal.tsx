import { Modal, Switch } from '@/components'
import {
  disableInputMidiDevice,
  disableOutputMidiDevice,
  enabledInputIdsAtom,
  enabledOutputIdsAtom,
  enableInputMidiDevice,
  enableOutputMidiDevice,
} from '@/features/midi'
import {
  audioContextEnabledAtom,
  disableAudioContext,
  enableAudioContext,
} from '@/features/synth/utils'
import { useMidiInputs, useMidiOutputs } from '@/hooks'
import { KeyboardMusic, RefreshCw, Speaker } from '@/icons'
import clsx from 'clsx'
import { useAtomValue } from 'jotai'
import { useState, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './MidiModal.module.css'

interface MidiModalProps {
  isOpen: boolean
  onClose: () => void
}

export function MidiModal(props: MidiModalProps) {
  const { isOpen, onClose } = props
  const { t } = useTranslation()
  const { inputs, refreshInput } = useMidiInputs()
  const { outputs, refreshOutput } = useMidiOutputs()
  const [refreshing, setRefreshing] = useState(false)

  const refreshMidiDevices = () => {
    refreshInput()
    refreshOutput()
  }

  const audioContextEnabled = useAtomValue(audioContextEnabledAtom)
  const enabledInputIds = useAtomValue(enabledInputIdsAtom)
  const enabledOutputIds = useAtomValue(enabledOutputIdsAtom)

  return (
    <Modal
      show={isOpen}
      onClose={onClose}
      className={styles.modalContainer}
      modalClassName="max-w-none bg-transparent border-none shadow-none"
      overlayClassName={styles.modalOverlay}
    >
      <div className="relative flex flex-col text-base">
        <MidiModalHeader
          refreshing={refreshing}
          onRefresh={() => {
            refreshMidiDevices()
            setRefreshing(true)
          }}
          onRefreshEnd={() => {
            setRefreshing(false)
          }}
        />
        <div className={styles.body}>
          <MidiSection
            label={t('play.midi.inputs')}
            icon={<KeyboardMusic className="h-4 w-4 text-white/40" />}
          >
            <DeviceList
              emptyState={{
                icon: <KeyboardMusic className="h-5 w-5 text-white/45" />,
                title: t('play.midi.no_inputs_title'),
                body: t('play.midi.no_inputs_body'),
              }}
              devices={
                inputs
                  ? Array.from(inputs.values()).map((device: MIDIInput) => ({
                      id: device.id,
                      name: device.name ?? t('play.midi.unknown_device'),
                      sublabel: device.manufacturer
                        ? device.manufacturer
                        : t('play.midi.usb_connection'),
                      enabled: enabledInputIds.has(device.id),
                      onToggle: async () => {
                        if (enabledInputIds.has(device.id)) {
                          disableInputMidiDevice(device)
                        } else {
                          enableInputMidiDevice(device)
                        }
                      },
                    }))
                  : []
              }
            />
          </MidiSection>
          <MidiSection
            label={t('play.midi.outputs')}
            icon={<Speaker className="h-4 w-4 text-white/40" />}
          >
            <DeviceList
              emptyState={{
                icon: <Speaker className="h-5 w-5 text-white/45" />,
                title: t('play.midi.no_outputs_title'),
                body: t('play.midi.no_outputs_body'),
              }}
              devices={
                outputs
                  ? [
                      {
                        id: 'local',
                        name: t('play.midi.this_device'),
                        sublabel: t('play.midi.internal_synth'),
                        enabled: audioContextEnabled,
                        onToggle: async () => {
                          if (audioContextEnabled) {
                            disableAudioContext()
                          } else {
                            enableAudioContext()
                          }
                        },
                      },
                      ...Array.from(outputs.values()).map((device) => ({
                        id: device.id,
                        name: device.name ?? t('play.midi.unknown_device'),
                        sublabel: device.manufacturer
                          ? device.manufacturer
                          : t('play.midi.hardware_port'),
                        enabled: enabledOutputIds.has(device.id),
                        onToggle: async () => {
                          if (enabledOutputIds.has(device.id)) {
                            disableOutputMidiDevice(device as any)
                          } else {
                            enableOutputMidiDevice(device as any)
                          }
                        },
                      })),
                    ]
                  : []
              }
            />
          </MidiSection>
        </div>
        <ModalFooter onClose={onClose} />
      </div>
    </Modal>
  )
}

function MidiModalHeader({
  refreshing,
  onRefresh,
  onRefreshEnd,
}: {
  refreshing: boolean
  onRefresh: () => void
  onRefreshEnd: () => void
}) {
  const { t } = useTranslation()
  return (
    <div className={styles.header}>
      <h1 className={styles.title}>{t('play.midi.title')}</h1>
      <button className={styles.refreshButton} onClick={onRefresh}>
        <RefreshCw
          style={{ animationIterationCount: 0.5 }}
          onAnimationEnd={onRefreshEnd}
          className={clsx('h-4 w-4 text-white/80', refreshing && 'animate-spin')}
        />
        <span>{t('play.midi.refresh')}</span>
      </button>
    </div>
  )
}

function MidiSection({
  label,
  icon,
  children,
}: {
  label: string
  icon: ReactNode
  children: ReactNode
}) {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <span className="flex h-4 w-4 items-center justify-center">{icon}</span>
        {label}
      </div>
      {children}
    </section>
  )
}

type DeviceItem = {
  id: string
  name: string
  sublabel: string
  enabled: boolean
  onToggle: () => void
}

function DeviceList({
  devices,
  emptyState,
}: {
  devices: DeviceItem[]
  emptyState: { icon: ReactNode; title: string; body: string }
}) {
  if (!devices.length) {
    return <NoDeviceFound icon={emptyState.icon} title={emptyState.title} body={emptyState.body} />
  }

  return (
    <div className={styles.deviceList}>
      {devices.map((device) => (
        <DeviceRow key={device.id} device={device} />
      ))}
    </div>
  )
}

function DeviceRow({ device }: { device: DeviceItem }) {
  return (
    <div className={styles.deviceRow}>
      <div className={styles.deviceInfo}>
        <span className={styles.deviceName}>{device.name}</span>
        <span className={styles.deviceSublabel}>{device.sublabel}</span>
      </div>
      <div className="flex min-h-[40px] shrink-0 items-center">
        <Switch
          isSelected={device.enabled}
          onChange={() => {
            device.onToggle()
          }}
          size="lg"
          className="cursor-pointer text-white/60"
        >
          <span className="sr-only">Toggle {device.name}</span>
        </Switch>
      </div>
    </div>
  )
}

function NoDeviceFound({ icon, title, body }: { icon: ReactNode; title: string; body: string }) {
  return (
    <div className={styles.noDevice}>
      <div className={styles.noDeviceIcon}>{icon}</div>
      <p className={styles.noDeviceTitle}>{title}</p>
      <p className={styles.noDeviceBody}>{body}</p>
    </div>
  )
}

function ModalFooter({ onClose }: { onClose: () => void }) {
  const { t } = useTranslation()
  return (
    <div className={styles.footer}>
      <button onClick={onClose} className={styles.closeButton}>
        {t('play.midi.close')}
      </button>
    </div>
  )
}
