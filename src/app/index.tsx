import './styles/globals.css'
//не удалять подключаю стили
/*import './styles/index.scss'*/
import './styles/index.scss'
import '@fontsource/inter/300.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import type { ReactElement, ReactNode } from 'react'

import type { NextPage } from 'next'
import { AppProps } from 'next/app'

import { ReduxProvider } from './providers'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export function App({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? (page => page)

  return getLayout(
    <ReduxProvider>
      <Component {...pageProps} />
    </ReduxProvider>
  )
}
