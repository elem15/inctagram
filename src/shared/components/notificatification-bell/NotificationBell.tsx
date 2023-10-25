import { FC } from 'react'

import { BellIcon } from '@radix-ui/react-icons'
import { clsx } from 'clsx'

import { Typography } from '../typography'

import s from './NotificationBell.module.scss'

export type NotificationProps = {
  className?: string
}

export const NotificationBell: FC<NotificationProps> = ({ className }) => {
  const classNames = {
    notificationBlock: clsx(s.notificationBlock, className),
  }

  return (
    <div className={classNames.notificationBlock}>
      <BellIcon className={s.icon} />
      <Typography as="span" className={s.icon_badge}>
        2
      </Typography>
    </div>
  )
}
