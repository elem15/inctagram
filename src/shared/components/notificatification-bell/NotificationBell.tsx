import { FC, useState } from 'react'

import { clsx } from 'clsx'

import { Typography } from '../typography'

import s from './NotificationBell.module.scss'

import { FillBellIcon } from '@/shared/assets/icons/FillBellIcon'
import { OutlineBellIcon } from '@/shared/assets/icons/OutlineBellIcon'

export type NotificationProps = {
  className?: string
  toggle: boolean
  setToggle: React.Dispatch<React.SetStateAction<boolean>>
}

export const NotificationBell: FC<NotificationProps> = ({ toggle, setToggle, className }) => {
  const classNames = {
    notificationBlock: clsx(s.notificationBlock, className),
  }

  return (
    <button onClick={() => setToggle(!toggle)} className={classNames.notificationBlock}>
      {toggle ? <FillBellIcon className={s.iconColor} /> : <OutlineBellIcon className={s.icon} />}
      {!toggle && (
        <Typography as="span" className={s.iconBadge}>
          2
        </Typography>
      )}
    </button>
  )
}
