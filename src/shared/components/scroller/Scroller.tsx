import { ReactNode, useRef, useState } from 'react'

import * as ScrollArea from '@radix-ui/react-scroll-area'

import s from './Scroller.module.scss'

export type ScrollerOrientation = 'vertical' | 'horizontal'

export type ScrollerProps = Readonly<{
  orientation?: ScrollerOrientation
  children: ReactNode
  customHeight?: string
  customWidth?: string
  scrollSize?: string
}>

export const Scroller = (props: ScrollerProps) => {
  return (
    <ScrollArea.Root
      scrollHideDelay={100_000}
      className={s.ScrollAreaRoot}
      style={{
        height: props.customHeight,
        width: props.customWidth,
      }}
    >
      <ScrollArea.Viewport className={s.ScrollAreaViewport}>
        <div>{props.children}</div>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar className={s.ScrollAreaScrollbar} orientation="vertical">
        <ScrollArea.Thumb className={s.ScrollAreaThumb} />
      </ScrollArea.Scrollbar>
      <ScrollArea.Scrollbar className={s.ScrollAreaScrollbar} orientation="horizontal">
        <ScrollArea.Thumb className={s.ScrollAreaThumb} />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner className={s.ScrollAreaCorner} />
    </ScrollArea.Root>
  )
}
