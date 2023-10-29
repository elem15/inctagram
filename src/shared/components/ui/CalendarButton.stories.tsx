import type { Meta, StoryObj } from '@storybook/react'

/*import { EyeOn } from '@/assets'*/
import { CalendarButton } from '.'
/*
import { Button } from '@/components/ui/button/button.tsx'*/

const meta = {
  title: 'Components/CalendarButton',
  component: CalendarButton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      variant: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof CalendarButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    variant: 'default',
    children: 'Primary Button',
    disabled: false,
  },
}

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Destructive Button',
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

export const LinkButton: Story = {
  args: {
    variant: 'link',
    children: 'Link Button',
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
