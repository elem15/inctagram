import { FC, ReactElement, ReactNode } from 'react'

import { HeaderWidget } from '../../header'

import s from './HeaderWithSidebarLayout.module.scss'

import { Sidebar } from '@/shared/components/sidebar'
type Props = {
  children: ReactNode
}

export const HeaderWithSidebarLayout: FC<Props> = ({ children }) => {
  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <HeaderWidget />
      </div>

      <div className={s.sidebar}>
        <Sidebar />
      </div>

      <div className={s.wrapperContent}>{children}</div>
    </div>
  )
}

export const getHeaderWithSidebarLayout = (page: ReactElement) => {
  return <HeaderWithSidebarLayout>{page}</HeaderWithSidebarLayout>
}
