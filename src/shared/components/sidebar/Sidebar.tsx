import { ComponentProps, FC, ReactNode } from 'react'

import s from './Sidebar.module.scss'
type Props = {
  children: ReactNode
} & ComponentProps<'div'>

export const Sidebar: FC<Props> = ({ children, ...rest }) => {
  return (
    <div className={s.box} {...rest}>
      <div className={s.contentBox}>
        <div className={s.content}>{children}</div>
      </div>
    </div>
  )
}
