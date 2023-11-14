import { FC, ReactElement, ReactNode } from 'react'

import MobileNavigation from '@/layouts/mobile-navigation/mobile-navigation'
import Container from '@/shared/components/container/container'
import { HeaderWidget } from '@/widgets/header'

type Props = {
  children: ReactNode
}

export const HeaderWithSidebarLayout: FC<Props> = ({ children }) => {
  return (
    <Container className="flex flex-col min-h-screen">
      <HeaderWidget />
      <main
        className="relative flex-grow"
        style={{
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {children}
      </main>
      <MobileNavigation />
    </Container>
  )
}

export const getHeaderWithSidebarLayout = (page: ReactElement) => {
  return <HeaderWithSidebarLayout>{page}</HeaderWithSidebarLayout>
}
