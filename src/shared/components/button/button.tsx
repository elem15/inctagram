import { ComponentPropsWithoutRef, ElementType } from 'react'

import s from './button.module.scss'

export type ButtonProps<T extends ElementType = 'button'> = {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'link'
  fullWidth?: boolean
  as?: T
  onClick?: () => void
} & ComponentPropsWithoutRef<T>

export const Button = <T extends ElementType = 'button'>(props: ButtonProps<T>) => {
  const {
    variant = 'primary',
    fullWidth,
    className,
    onClick,
    as: Component = 'button',
    ...rest
  } = props

  return (
    <Component
      onClick={onClick}
      className={`${s.button} ${s[variant]} ${fullWidth ? s.fullWidth : ''} ${className} ${
        Component === 'a' ? s.asLink : ''
      }`}
      {...rest}
    >
      <span className={s.valueBox}>{rest.children}</span>
    </Component>
  )
}
