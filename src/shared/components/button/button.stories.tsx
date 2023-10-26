import type { Meta, StoryObj } from '@storybook/react'

/*import { EyeOn } from '@/assets'*/
import { Button } from './button'
/*
import { Button } from '@/components/ui/button/button.tsx'*/

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: ['primary', 'secondary', 'outline', 'link'],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
    disabled: false,
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
    disabled: false,
  },
}
export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline Button',
    disabled: false,
  },
}

export const TextButton: Story = {
  args: {
    variant: 'link',
    children: 'Tertiary Button',
    disabled: false,
  },
} /*
export const FullWidth: Story = {
  args: {
    variant: 'primary',
    children: 'Full Width Button',
    disabled: false,
    fullWidth: true,
  },
}
export const ButtonAsLink: Story = {
  args: {
    variant: 'primary',
    children: 'Link that looks like a button',
    as: 'a',
  },
}*/
/*
export const ButtonWithIcons: Story = {
  args: {
    variant: 'primary',
    children: (
      <>
        <EyeOn /> <Typography variant={'body1'}>With Icon</Typography>
      </>
    ),
  },
}
*/
