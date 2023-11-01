import React, { FC, forwardRef } from 'react'

import clsx from 'clsx'

import s from './DropDownNotification.module.scss'

import { Typography } from '@/shared/components'
import { NotificationItem } from '@/shared/components/notification-item/NotificationItem'
import { Scroller } from '@/shared/components/scroller/Scroller'

export const DropDownNotification = ({ toggle }: { toggle: boolean }) => {
  const classNames = clsx(s.dropDownNotification, toggle ? s.active : s.inactive)

  return (
    <div className={classNames}>
      <Typography className={s.header} variant="regular_text_16">
        Notification
      </Typography>
      <Scroller>
        {Array.from({ length: 10 }, (_, i) => (
          <NotificationItem key={i} />
        ))}
      </Scroller>
    </div>
  )
}
