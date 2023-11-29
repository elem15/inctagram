import {
  ComponentPropsWithoutRef,
  CSSProperties,
  ElementRef,
  forwardRef,
  ReactNode,
  useState,
} from 'react'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { clsx } from 'clsx'

import { Typography } from '../typography'

import s from './dropdown.module.scss'

type DropdownProps = {
  trigger?: ReactNode
  children?: ReactNode
  className?: string
  style?: CSSProperties
  align?: 'start' | 'center' | 'end'
} & ComponentPropsWithoutRef<typeof DropdownMenu.Root>

export const CustomDropdown = forwardRef<ElementRef<typeof DropdownMenu.Trigger>, DropdownProps>(
  ({ trigger, children, className, style, align }: DropdownProps, ref) => {
    const [open, setOpen] = useState(false)

    const classNames = {
      content: clsx(s.dropdownMenuContent, className),
      itemsWrap: clsx(s.itemsWrap),
      arrowWrap: clsx(s.arrowWrap),
      arrow: clsx(s.arrow),
    }

    return (
      <DropdownMenu.Root open={open} onOpenChange={setOpen}>
        <DropdownMenu.Trigger asChild className={s.trigger} ref={ref}>
          {trigger}
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className={classNames.content}
            sideOffset={8}
            style={style}
            onClick={event => event.stopPropagation()}
            align={align}
          >
            <div className={classNames.itemsWrap}>{children}</div>
            <DropdownMenu.Arrow className={classNames.arrowWrap} />
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    )
  }
)

type DropdownItemProps = {
  children?: ReactNode
  style?: CSSProperties
  disabled?: boolean
  className?: string
} & ComponentPropsWithoutRef<typeof DropdownMenu.Item>
export const CustomDropdownItem = ({
  children,
  style,
  onSelect,
  disabled,
  className,
  ...restProps
}: DropdownItemProps) => {
  const classNames = {
    item: clsx(s.dropdownMenuItem, className),
  }

  return (
    <DropdownMenu.Item
      onSelect={onSelect}
      style={style}
      disabled={disabled}
      className={classNames.item}
      {...restProps}
    >
      {children}
    </DropdownMenu.Item>
  )
}

type DropdownItemWithIconProps = Omit<DropdownItemProps, 'children'> & {
  title: string
  icon?: ReactNode
} & ComponentPropsWithoutRef<typeof DropdownMenu.Item>

export const CustomDropdownItemWithIcon = ({
  title,
  icon,
  onSelect,
  disabled,
  className,
  style,
  ...rest
}: DropdownItemWithIconProps) => {
  const classNames = {
    item: clsx(s.dropdownMenuItem, className),
    icon: clsx(s.itemIcon),
  }

  return (
    <DropdownMenu.Item
      onSelect={onSelect}
      onClick={event => event.stopPropagation()}
      className={classNames.item}
      disabled={disabled}
      style={style}
      {...rest}
    >
      <div className={classNames.icon}>{icon}</div>
      <Typography variant={'large'}>{title}</Typography>
    </DropdownMenu.Item>
  )
}
