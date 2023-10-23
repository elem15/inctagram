import type { Meta, StoryObj } from '@storybook/react'

import { SuperCheckbox } from './checkbox'

const meta = {
  title: 'Components/Checkbox',
  component: SuperCheckbox,
  tags: ['autodocs'],
  argTypes: {
    onChange: { action: 'checked changes' },
  },
} satisfies Meta<typeof SuperCheckbox>

export default meta
type Story = StoryObj<typeof meta>

export const Checkbox: Story = {
  args: {
    checked: true,
  },
}

export const CheckboxWithText: Story = {
  args: {
    checked: false,
    label: 'Test',
  },
}
