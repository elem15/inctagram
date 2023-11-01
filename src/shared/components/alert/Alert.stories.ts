import { Meta } from '@storybook/react'

import { Alert } from './Alert'

export default {
  title: 'Components/Alert',
  component: Alert,
  argTypes: {
    variant: {
      control: { type: 'select' },
    },
  },
} as Meta<typeof Alert>

export const Error = {
  args: {
    children: 'Password must contain more than 8 characters',
    variant: 'error',
  },
}

export const Info = {
  args: {
    children: 'You have successfully registered',
    variant: 'info',
  },
}
