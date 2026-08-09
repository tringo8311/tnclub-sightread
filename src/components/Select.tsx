import clsx from 'clsx'
import { Check, ChevronDown, LoaderCircle } from 'lucide-react'
import React from 'react'
import {
  Select as AriaSelect,
  SelectProps as AriaSelectProps,
  Button,
  ListBox,
  ListBoxItem as AriaListBoxItem,
  ListBoxItemProps,
  SelectValue,
  ValidationResult,
} from 'react-aria-components'
import { Description, FieldError, Label } from './Field'
import { DropdownSection, DropdownSectionProps } from './ListBox'
import { Popover } from './Popover'
import styles from './Select.module.css'
import { Expand } from './utils'

export interface SelectProps_<T extends object> extends Omit<AriaSelectProps<T>, 'children'> {
  label?: string
  description?: string
  action?: string
  elementId?: string
  'data-element-id'?: string
  'data-component'?: string
  'data-ui'?: string
  'data-testid'?: string
  'data-description'?: string
  'data-action'?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
  isLoading?: boolean
  size?: 'sm' | 'md' | 'lg'
  items?: Iterable<T>
  children: React.ReactNode | ((item: T) => React.ReactNode)
}
type SelectProps<T extends object> = Expand<SelectProps_<T>>

export function Select<T extends object>({
  label,
  description,
  action,
  elementId,
  'data-element-id': dataElementId,
  'data-component': dataComponent = 'Select',
  'data-ui': dataUi,
  'data-testid': dataTestId,
  'data-description': dataDescription,
  'data-action': dataAction,
  errorMessage,
  children,
  items,
  isLoading = false,
  size = 'md',
  ...props
}: SelectProps<T>) {
  const resolvedDescription = description || dataDescription
  const resolvedAction = action || dataAction
  const resolvedElementId = elementId || dataElementId

  return (
    <AriaSelect
      {...props}
      data-component={dataComponent}
      data-element-id={resolvedElementId}
      data-ui={dataUi}
      data-testid={dataTestId}
      data-description={resolvedDescription}
      data-action={resolvedAction}
      className={clsx(styles.selectContainer, props.className)}
      isDisabled={props.isDisabled || isLoading}
    >
      {label && <Label>{label}</Label>}
      <Button
        className={clsx(
          styles.trigger,
          size === 'sm' && styles.sizeSm,
          size === 'md' && styles.sizeMd,
          size === 'lg' && styles.sizeLg,
        )}
        data-action={resolvedAction}
        data-element-id={resolvedElementId ? `${resolvedElementId}-trigger` : undefined}
        data-component={`${dataComponent}Trigger`}
        data-ui={dataUi}
      >
        <SelectValue className={styles.value} />
        {isLoading ? (
          <LoaderCircle className={clsx(styles.icon, 'animate-spin')} size={16} />
        ) : (
          <ChevronDown aria-hidden className={styles.icon} size={16} />
        )}
      </Button>
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
      <Popover className={styles.popover}>
        <ListBox items={items} className={styles.listBox}>
          {children}
        </ListBox>
      </Popover>
    </AriaSelect>
  )
}

export function SelectItem(props: ListBoxItemProps) {
  let textValue =
    props.textValue || (typeof props.children === 'string' ? props.children : undefined)
  return (
    <AriaListBoxItem {...props} textValue={textValue} className={styles.item}>
      {(renderProps) => (
        <>
          <span className="truncate">
            {typeof props.children === 'function' ? props.children(renderProps) : props.children}
          </span>
          {renderProps.isSelected && <Check className={styles.checkIcon} />}
        </>
      )}
    </AriaListBoxItem>
  )
}

export function SelectSection<T extends object>(props: DropdownSectionProps<T>) {
  return <DropdownSection {...props} />
}
