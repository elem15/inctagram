import { Meta } from '@storybook/react'

import { NotificationBell } from './NotificationBell'

export default {
  title: 'Components/NotificationBell',
  component: NotificationBell,
  tags: ['autodocs'],

  argTypes: {
    toggle: {
      options: [true, false],
      control: { type: 'radio' },
    },
  },
} as Meta<typeof NotificationBell>

export const NotificationIcon = {
  args: {},
}
