import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

import s from './typography.module.scss'

export type TypographyProps<T extends ElementType> = {
  as?: T
  variant?:
    | 'large'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'regular_text_16'
    | 'bold_text_16'
    | 'regular_text_14'
    | 'medium_text_14'
    | 'bold_text_14'
    | 'small_text'
    | 'semi-bold_small_text'
    | 'regular_link'
    | 'small_link'

  children?: ReactNode
  className?: string
} & ComponentPropsWithoutRef<T>
export const Typography = <T extends ElementType>({
  as,
  variant = 'regular_text 14',
  children,
  className,
  ...restProps
}: TypographyProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof TypographyProps<T>>) => {
  const classNames = `${s[variant]} ${className}`
  const Component = as || 'p'

  return (
    <Component className={classNames} {...restProps}>
      {children}
    </Component>
  )
}
