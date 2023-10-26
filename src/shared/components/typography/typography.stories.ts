import type { Meta, StoryObj } from '@storybook/react'

import { Typography, options } from './typography'

const meta = {
  title: 'Components/Typography',
  component: Typography,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options,
    },
    as: { type: 'string' },
  },
} satisfies Meta<typeof Typography>

export default meta
type Story = StoryObj<typeof meta>

export const Large: Story = {
  args: {
    children: 'Test Text',
    variant: 'large',
  },
}
export const H1: Story = {
  args: {
    children: 'Test Text',
    variant: 'h1',
  },
}
export const H2: Story = {
  args: {
    children: 'Test Text',
    variant: 'h2',
  },
}
export const H3: Story = {
  args: {
    children: 'Test Text',
    variant: 'h3',
  },
}
export const RegularText16: Story = {
  args: {
    children: 'Test Text',
    variant: 'regular_text_16',
  },
}
export const BoldText16: Story = {
  args: {
    children: 'Test Text',
    variant: 'bold_text_16',
  },
}
export const RegularText14: Story = {
  args: {
    children: 'Test Text',
    variant: 'regular_text_14',
  },
}
export const MediumText14: Story = {
  args: {
    children: 'Test Text',
    variant: 'medium_text_14',
  },
}
export const BoldText14: Story = {
  args: {
    children: 'Test Text',
    variant: 'bold_text_14',
  },
}
export const SmallText: Story = {
  args: {
    children: 'Test Text',
    variant: 'small_text',
  },
}
export const SemiBoldSmallText: Story = {
  args: {
    children: 'Test Text',
    variant: 'semi-bold_small_text',
  },
}
export const RegularLink: Story = {
  args: {
    children: 'Test Text',
    variant: 'regular_link',
  },
}
export const SmallLink: Story = {
  args: {
    children: 'Test Text',
    variant: 'small_link',
  },
}
