import clsx from 'clsx'

type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: boolean
}
export function TextInput({ className, error, ...rest }: TextInputProps) {
  return (
    <input
      {...rest}
      className={clsx(
        className,
        'rounded-md p-2 text-base shadow-[inset_0px_1px_4px_rgba(0,0,0,0.25)]',
        error && 'outline outline-red-600',
      )}
    />
  )
}
