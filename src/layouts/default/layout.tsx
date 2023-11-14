'use client'

import MobileNavigation from '../mobile-navigation/mobile-navigation'

import { HeaderWidget } from '@/widgets/header'

export default function DefaultLayout({
  children,
  lang,
}: {
  children: React.ReactNode
  lang: string
}) {
  return (
    <div className="flex flex-col min-h-screen">
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
    </div>
  )
}
