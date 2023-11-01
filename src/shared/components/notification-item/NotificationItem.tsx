import React, { FC } from 'react'

import { Typography } from '..'

import s from './NotificationItem.module.scss'

export const NotificationItem: FC = () => {
  return (
    <div className={s.wrapper}>
      <div>
        <Typography as="span" variant="bold_text_16">
          Новое уведомление!
        </Typography>
        <Typography as="span" variant="medium_text_14" className={s.textSm}>
          Новое
        </Typography>
      </div>
      <Typography as="span" variant="bold_text_14">
        Следующий платеж у вас спишется через 1 день
      </Typography>
      <Typography variant="medium_text_14" className={s.textSb}>
        1 день назад
      </Typography>
    </div>
  )
}
