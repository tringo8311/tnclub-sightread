import { DialogProps, Dialog as RACDialog } from 'react-aria-components'
import { twMerge } from 'tailwind-merge'

export interface CustomDialogProps extends DialogProps {
  description?: string
  action?: string
  'data-description'?: string
  'data-action'?: string
}

export function Dialog({
  description,
  action,
  'data-description': dataDescription,
  'data-action': dataAction,
  ...props
}: CustomDialogProps) {
  const resolvedDescription = description || dataDescription
  const resolvedAction = action || dataAction

  return (
    <RACDialog
      {...props}
      data-description={resolvedDescription}
      data-action={resolvedAction}
      className={twMerge(
        'relative max-h-[inherit] overflow-auto p-6 outline-0 [[data-placement]>&]:p-4',
        props.className,
      )}
    />
  )
}
