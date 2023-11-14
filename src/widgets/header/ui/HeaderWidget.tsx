import React, { FC, useEffect, useRef, useState } from 'react'

import { clsx } from 'clsx'
import { router } from 'next/client'
import Link from 'next/link'

import s from './HeaderWidget.module.scss'

import { BookMarkIcon, FavoritesIcon, LogOutIcon, StatisticsIcon } from '@/shared/assets'
import { ProfileSettings } from '@/shared/assets/icons/ProfileSettings'
import { CustomDropdown, CustomDropdownItem, Typography } from '@/shared/components'
import { NotificationBell } from '@/shared/components/notificatification-bell'
import { useTranslation } from '@/shared/lib'
import { DropDownNotification } from '@/widgets/dropDownNotification'
import { LangSelectWidget } from '@/widgets/langSelect'

export const HeaderWidget: FC = () => {
  const [toggle, setToggle] = useState(false)

  const menuRef = useRef<HTMLDivElement | null>(null)
  const { t } = useTranslation()

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
    <>
      <header
        className={'header-three sticky-header w-full h-16 lg:h-20 sticky lg:relative top-0 z-20'}
      >
        <div className="flex justify-between items-center h-16 max-sm:px-6 sm:px-16 py-3 border-b border-dark-300">
          <Link href="/" className="text-light-100 text-[26px] font-semibold">
            Inctagram
          </Link>
          <div className="flex justify-center items-center space-x-6">
            <div className="hidden lg:flex relative" ref={menuRef}>
              <NotificationBell toggle={toggle} setToggle={setToggle} />
              <DropDownNotification toggle={toggle} />
            </div>
            <LangSelectWidget />
            <div className="hidden sm:max-lg:flex">
              <CustomDropdown
                trigger={
                  <div>
                    <Typography variant="h1" className={s.content}>
                      ...
                    </Typography>
                  </div>
                }
                align={'end'}
              >
                <CustomDropdownItem>
                  <Link
                    href={'#'}
                    className={
                      router.pathname === '/my-profile' ? clsx(s.activeLink, s.content) : s.content
                    }
                  >
                    <ProfileSettings /> {t.sidebar.settings}
                  </Link>
                </CustomDropdownItem>
                <CustomDropdownItem>
                  <Link
                    href={'#'}
                    className={
                      router.pathname === '/statistics' ? clsx(s.activeLink, s.content) : s.content
                    }
                  >
                    <StatisticsIcon /> {t.sidebar.statistics}
                  </Link>
                </CustomDropdownItem>
                <CustomDropdownItem>
                  <Link href={'#'} className={clsx(s.content, s.largeMargin)}>
                    {router.pathname === '/favorite' ? <BookMarkIcon /> : <FavoritesIcon />}
                    <span className={router.pathname === '/favorite' ? s.activeLink : ''}>
                      {t.sidebar.favorites}
                    </span>
                  </Link>
                </CustomDropdownItem>
                <CustomDropdownItem>
                  <Link href={'signin'} className={s.content}>
                    <LogOutIcon /> {t.sidebar.log_out}
                  </Link>
                </CustomDropdownItem>
              </CustomDropdown>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
