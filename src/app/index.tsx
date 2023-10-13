import '@/styles/globals.css'

import type { ReactElement, ReactNode } from 'react'

import type { NextPage } from 'next'
import { AppProps } from 'next/app'

import { Providers } from './Providers'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}
function App({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? (page => page)

  return getLayout(
    <Providers>
      <Component {...pageProps} />
    </Providers>
  )
}

export default App
