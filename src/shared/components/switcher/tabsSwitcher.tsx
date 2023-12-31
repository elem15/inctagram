import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import * as Tabs from '@radix-ui/react-tabs'
import { clsx } from 'clsx'
import { useRouter } from 'next/router'

import s from './tabsSwitcher.module.scss'

//Добавил типы для options, так как нужен объект для Slice и key нежелательно чтобы совпадал c value, поэтому нужен id
export type SwitcherOptions = {
  label: string
  value: string
  disabled?: boolean
  href?: string
}

//Тут изменил onChange на onValueChange так как ругался TS когда передавал в onChange свою функцию
type TabsProps = {
  tabs: SwitcherOptions[]
  disabled?: boolean
  className?: string
} & ComponentPropsWithoutRef<typeof Tabs.Root>

export const TabsSwitcher = forwardRef<ElementRef<typeof Tabs.Root>, TabsProps>(
  ({ tabs, disabled = false, onValueChange, className, defaultValue, ...restProps }, ref) => {
    const { pathname, push } = useRouter()

    const mappedTabs = tabs.map(t => {
      return (
        <Tabs.Trigger
          key={t.label}
          value={t.value}
          className={clsx(s.default, className, pathname.endsWith(t.href as string) && s.active)}
          disabled={disabled || t.disabled}
          onClick={() => push(t.href || '#')}
        >
          {t.label}
        </Tabs.Trigger>
      )
    })

    return (
      <Tabs.Root defaultValue={defaultValue} ref={ref} {...restProps} onValueChange={onValueChange}>
        <Tabs.List className={s.tabList}>{mappedTabs}</Tabs.List>
      </Tabs.Root>
    )
  }
)
