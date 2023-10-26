import { Meta } from '@storybook/react'

import { Modal } from './Modal'

export default {
  title: 'Components/Modal',
  component: Modal,
  argsTypes: {
    variant: {
      control: { type: 'button' },
      options: [open],
    },
  },
} as Meta<typeof Modal>
export const Base = {
  args: {
    children: 'Do you want add photo?',
    title: 'write some title',
    size: 'xs',
  },
}
