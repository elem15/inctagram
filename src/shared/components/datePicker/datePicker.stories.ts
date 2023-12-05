import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react'
import { DateRange } from 'react-day-picker'

import { DatePicker } from './datePicker'

const meta = {
  title: 'Components/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
} satisfies Meta<typeof DatePicker>

export default meta
type Story = StoryObj<typeof meta>

export const DatePickerRange: Story = {
  args: {
    mode: 'range',
    errorMessage: '',
  },
}

export const DatePickerSingle: Story = {
  args: {
    mode: 'single',
    errorMessage: '',
  },
}
