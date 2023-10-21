import type { Meta, StoryObj } from '@storybook/react'

import { Input } from './input'

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    type: {
      options: ['text', 'password', 'search'],
      control: { type: 'radio' },
    },
    error: {
      options: [undefined, 'Error!', 'Error message'],
      control: { type: 'radio' },
    },
    label: {
      options: ['Input'],
      control: { type: 'text' },
    },
    value: {
      options: ['Input'],
      control: { type: 'text' },
    },
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const DefaultInput: Story = {
  args: {
    type: 'text',
  },
}

export const Password: Story = {
  args: {
    type: 'password',
  },
}
export const Search: Story = {
  args: {
    type: 'search',
  },
}
