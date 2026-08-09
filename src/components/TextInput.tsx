import clsx from 'clsx'
import React, { useId } from 'react'
import styles from './TextInput.module.css'

type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: boolean
  elementId?: string
  'data-element-id'?: string
  'data-component'?: string
  'data-ui'?: string
  'data-testid'?: string
}

export function TextInput({
  id,
  className,
  error,
  elementId,
  'data-element-id': dataElementId,
  'data-component': dataComponent = 'TextInput',
  'data-ui': dataUi,
  'data-testid': dataTestId,
  ...rest
}: TextInputProps) {
  const generatedId = useId()
  const resolvedElementId = elementId || dataElementId
  const inputId = id || resolvedElementId || generatedId

  return (
    <input
      id={inputId}
      {...rest}
      data-component={dataComponent}
      data-element-id={resolvedElementId}
      data-ui={dataUi}
      data-testid={dataTestId}
      className={clsx(
        styles.input,
        error && styles.error,
        className,
      )}
    />
  )
}
