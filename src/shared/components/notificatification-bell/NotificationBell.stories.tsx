import { Meta } from '@storybook/react'

import { NotificationBell } from './NotificationBell'
import s from './NotificationBell.module.scss'

export default {
  title: 'Components/NotificationBell',
  component: NotificationBell,
} as Meta<typeof NotificationBell>

export const Notification = {
  args: {
    value: 0,
  },
}
