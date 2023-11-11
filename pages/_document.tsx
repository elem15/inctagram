import { Html, Head, Main, NextScript } from 'next/document'

import { NotificationContainer } from '@/shared/components/alert/notificationContainer'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
        <NotificationContainer />
      </body>
    </Html>
  )
}
