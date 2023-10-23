import type { Meta, StoryObj } from '@storybook/react'

import { SelectCustom } from './select'

const meta = {
  title: 'Components/Select',
  component: SelectCustom,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof SelectCustom>

export default meta
type Story = StoryObj<typeof meta>

export const DefaultSelect: Story = {
  args: {
    options: [
      { value: 'first', label: 'apple' },
      { value: 'second', label: 'banana' },
      { value: 'third', label: 'orange' },
    ],
    placeHolder: 'choose options...',
    label: 'Select with Label',
  },
}
