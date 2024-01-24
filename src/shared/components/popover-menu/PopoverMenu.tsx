import { ComponentPropsWithoutRef, CSSProperties, ElementRef, forwardRef, ReactNode } from 'react'

import * as Popover from '@radix-ui/react-popover'
import { clsx } from 'clsx'

import s from './PopoverMenu.module.scss'
type Props = {
  children: ReactNode
  trigger: ReactNode
  className?: string
  style?: CSSProperties
  align?: 'start' | 'center' | 'end'
  side?: 'top' | 'right' | 'bottom' | 'left'
  sideOffset?: number
} & ComponentPropsWithoutRef<typeof Popover.Root>
export const PopoverMenu = forwardRef<ElementRef<typeof Popover.Trigger>, Props>(
  ({ children, trigger, className, style, align, side, sideOffset }: Props, ref) => {
    return (
      <Popover.Root>
        <Popover.Trigger asChild ref={ref}>
          {trigger}
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content
            className={clsx(className, s.popoverContent)}
            sideOffset={sideOffset}
            style={style}
            asChild
            side={side}
            align={align}
          >
            <div className={s.wrap}>{children}</div>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    )
  }
)
