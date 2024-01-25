import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <link rel="icon" href="/logo-light.png" />

      <Head>
        <meta name="darkreader-lock" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
