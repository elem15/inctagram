import { FC } from 'react'

import Link from 'next/link'

export const HeaderWidget: FC = () => {
  return (
    <div className="h-16 max-sm:px-6 sm:px-16 py-3 text-light-100 text-3xl border-b border-dark-300 mb-8">
      <Link href="/">Inctagram</Link>
    </div>
  )
}
