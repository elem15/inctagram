import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

import { clsx } from 'clsx'

import s from './typography.module.scss'

export const options = [
  'large',
  'h1',
  'h2',
  'h3',
  'regular_text_16',
  'bold_text_16',
  'regular_text_14',
  'medium_text_14',
  'bold_text_14',
  'small_text',
  'semi-bold_small_text',
  'regular_link',
  'small_link',
] as const

type Options = (typeof options)[number]

export type TypographyProps<T extends ElementType> = {
  as?: T
  variant?: Options

  children?: ReactNode
  className?: string
} & ComponentPropsWithoutRef<T>

export const Typography = <T extends ElementType>({
  as,
  variant = 'regular_text_14',
  children,
  className,
  ...restProps
}: TypographyProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof TypographyProps<T>>) => {
  const classNames = clsx(s[variant], className)
  const Component = as || 'p'

  return (
    <Component className={classNames} {...restProps}>
      {children}
    </Component>
  )
}
