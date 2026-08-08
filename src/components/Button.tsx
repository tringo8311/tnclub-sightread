import { LoaderCircle } from 'lucide-react'
import React from 'react'
import { Button as RACButton, ButtonProps as RACButtonProps } from 'react-aria-components'
import { tv, VariantProps } from 'tailwind-variants'
import { composeTailwindRenderProps, focusRing } from './utils'

const buttonStyles = tv({
  extend: focusRing,
  base: 'inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 active:scale-95 disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none',
  variants: {
    variant: {
      primary:
        'bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm active:bg-primary/80',
      secondary:
        'bg-secondary text-secondary-foreground hover:bg-secondary/80 active:bg-secondary/70',
      outline:
        'border border-border bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground',
      ghost: 'bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground',
      danger: 'bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm',
      icon: 'p-2 text-foreground hover:bg-accent rounded-xl',
    },
    size: {
      sm: 'h-8 px-3 text-xs',
      md: 'h-10 px-4 text-sm',
      lg: 'h-12 px-6 text-base',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
})

export interface ButtonProps extends RACButtonProps, VariantProps<typeof buttonStyles> {
  isLoading?: boolean
  description?: string
  action?: string
  title?: string
  elementId?: string
  'data-element-id'?: string
  'data-component'?: string
  'data-ui'?: string
  'data-testid'?: string
  'data-description'?: string
  'data-action'?: string
}

export function Button({
  children,
  variant,
  size,
  isLoading = false,
  isDisabled,
  description,
  action,
  elementId,
  'data-element-id': dataElementId,
  'data-component': dataComponent = 'Button',
  'data-ui': dataUi,
  'data-testid': dataTestId,
  'data-description': dataDescription,
  'data-action': dataAction,
  className,
  ...props
}: ButtonProps) {
  const resolvedDescription = description || dataDescription
  const resolvedAction = action || dataAction
  const resolvedElementId = elementId || dataElementId

  return (
    <RACButton
      {...props}
      isDisabled={isDisabled || isLoading}
      data-component={dataComponent}
      data-element-id={resolvedElementId}
      data-ui={dataUi}
      data-testid={dataTestId}
      data-description={resolvedDescription}
      data-action={resolvedAction}
      className={composeTailwindRenderProps(className, buttonStyles({ variant, size }))}
    >
      {(renderProps) => (
        <>
          {isLoading && <LoaderCircle className="h-4 w-4 animate-spin text-current" />}
          {typeof children === 'function' ? children(renderProps) : children}
        </>
      )}
    </RACButton>
  )
}

export default Button
