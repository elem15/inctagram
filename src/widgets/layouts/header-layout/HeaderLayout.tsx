import { FC, ReactElement, ReactNode } from 'react'

import { HeaderWidget } from '../../header'

type Props = {
  children: ReactNode
}

export const HeaderLayout: FC<Props> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-dark-700">
      <HeaderWidget />
      <div className="w-full flex  justify-center items-center ">{children}</div>
    </div>
  )
}

export const getHeaderLayout = (page: ReactElement) => {
  return <HeaderLayout>{page}</HeaderLayout>
}
