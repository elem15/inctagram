import { ComponentProps, FC, ReactNode, useState } from 'react'

import s from './Alert.module.scss'

import { CloseIcons } from '@/shared/assets/icons/CloseIcons'

type Props = {
  children: ReactNode
  variant: 'error' | 'info'
} & ComponentProps<'div'>
export const Alert: FC<Props> = ({ children, variant, ...rest }) => {
  const [open, setOpen] = useState(true)

  if (open)
    return (
      <div className={s.box}>
        <div className={s[variant]} {...rest}>
          <div className={s.content}>
            <div className={s.text}>{children}</div>
          </div>
          <div className={s.icon} onClick={() => setOpen(false)}>
            <CloseIcons />
          </div>
        </div>
      </div>
    )
}
