import type { Meta, StoryObj } from '@storybook/react'

import { Typography } from './typography'

const meta = {
  title: 'Components/Typography',
  component: Typography,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: [
        'large',
        'h1',
        'h2',
        'h3',
        'regular_text_16',
        'bold_text_16',
        'regular_text_14',
        'medium_text_14',
        'bold_text_14',
        'small_text',
        'semi-bold_small_text',
        'regular_link',
        'small_link',
      ],
    },
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
export const Body1: Story = {
  args: {
    children: 'Test Text',
    variant: 'body1',
  },
}
export const Subtitle1: Story = {
  args: {
    children: 'Test Text',
    variant: 'subtitle1',
  },
}
export const Body2: Story = {
  args: {
    children: 'Test Text',
    variant: 'body2',
  },
}
export const Subtitle2: Story = {
  args: {
    children: 'Test Text',
    variant: 'subtitle2',
  },
}
export const Caption: Story = {
  args: {
    children: 'Test Text',
    variant: 'caption',
  },
}
export const Overline: Story = {
  args: {
    children: 'Test Text',
    variant: 'overline',
  },
}
export const Link1: Story = {
  args: {
    children: 'Test Text',
    variant: 'link1',
  },
}
export const Link2: Story = {
  args: {
    children: 'Test Text',
    variant: 'link2',
  },
}
