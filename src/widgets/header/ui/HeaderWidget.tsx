import { FC, useEffect, useRef, useState } from 'react'

import Link from 'next/link'

import { NotificationBell } from '@/shared/components/notificatification-bell'
import { DropDownNotification } from '@/widgets/dropDownNotification'
import { LangSelectWidget } from '@/widgets/langSelect'

export const HeaderWidget: FC = () => {
  const [toggle, setToggle] = useState(false)

  const menuRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handler = (e: MouseEvent): void => {
      !menuRef.current?.contains(e.target as Node) && setToggle(false)
    }

    document.addEventListener('mousedown', handler)

    return () => {
      document.removeEventListener('mousedown', handler)
    }
  }, [])

  return (
    <div className="h-16 max-sm:px-6 sm:px-16 py-3 border-b border-dark-300 flex justify-between items-center">
      <Link href="/" className="text-light-100 text-[26px] font-semibold">
        Inctagram
      </Link>
      <div className="flex justify-center items-center space-x-6">
        <div className="relative" ref={menuRef}>
          <NotificationBell toggle={toggle} setToggle={setToggle} />
          <DropDownNotification toggle={toggle} />
        </div>
        <LangSelectWidget />
      </div>
    </div>
  )
}
