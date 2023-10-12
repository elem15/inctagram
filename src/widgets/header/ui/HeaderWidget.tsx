import { FC } from 'react'

import Link from 'next/link'

import { LangSelectWidget } from '@/widgets/langSelect'

export const HeaderWidget: FC = () => {
  return (
    <div className="h-16 max-sm:px-6 sm:px-16 py-3 border-b border-dark-300 mb-8 flex justify-between">
      <Link href="/" className="text-light-100 text-[26px] font-semibold">
        Inctagram
      </Link>
      <LangSelectWidget />
    </div>
  )
}
