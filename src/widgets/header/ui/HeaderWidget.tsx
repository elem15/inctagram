import { FC } from 'react'

import Link from 'next/link'

import { NotificationBell } from '@/shared/components/notificatification-bell/NotificationBell'
import { LangSelectWidget } from '@/widgets/langSelect'

export const HeaderWidget: FC = () => {
  return (
    <div className="h-16 max-sm:px-6 sm:px-16 py-3 border-b border-dark-300 flex justify-between items-center">
      <Link href="/" className="text-light-100 text-[26px] font-semibold">
        Inctagram
      </Link>
      <div className="flex justify-center items-center">
        <NotificationBell />
        <LangSelectWidget />
      </div>
    </div>
  )
}
