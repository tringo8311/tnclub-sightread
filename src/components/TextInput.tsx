import clsx from 'clsx'

type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: boolean
  elementId?: string
  'data-element-id'?: string
  'data-component'?: string
  'data-ui'?: string
  'data-testid'?: string
}

export function TextInput({
  className,
  error,
  elementId,
  'data-element-id': dataElementId,
  'data-component': dataComponent = 'TextInput',
  'data-ui': dataUi,
  'data-testid': dataTestId,
  ...rest
}: TextInputProps) {
  const resolvedElementId = elementId || dataElementId

  return (
    <input
      {...rest}
      data-component={dataComponent}
      data-element-id={resolvedElementId}
      data-ui={dataUi}
      data-testid={dataTestId}
      className={clsx(
        className,
        'rounded-md p-2 text-base shadow-[inset_0px_1px_4px_rgba(0,0,0,0.25)]',
        error && 'outline outline-red-600',
      )}
    />
  )
}
