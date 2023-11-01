import { FC, useState } from 'react'

import { BellIcon } from '@radix-ui/react-icons'
import { clsx } from 'clsx'

import { Typography } from '../typography'

import s from './NotificationBell.module.scss'

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
      <BellIcon className={toggle ? s.iconColor : s.icon} />
      {!toggle && (
        <Typography as="span" className={s.iconBadge}>
          2
        </Typography>
      )}
    </button>
  )
}
