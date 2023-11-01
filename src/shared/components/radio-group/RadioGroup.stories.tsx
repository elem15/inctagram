import { useState } from 'react'

import { Meta } from '@storybook/react'

import { RadioGr } from './RadioGroup'

const options = [
  {
    label: 'Apple',
    value: 'apple',
  },
  {
    label: 'Banana',
    value: 'banana',
  },
  {
    label: 'Blueberry',
    value: 'blueberry',
  },
  {
    label: 'Grapes',
    value: 'grapes',
  },
  {
    label: 'Pineapple',
    value: 'pineapple',
  },
]

export default {
  component: RadioGr,
  title: 'Components/RadioGroup',
  tags: ['autodocs'],
} as Meta<typeof RadioGr>

export const Default = {
  args: {
    disabled: false,
    options,
  },

  render: (args: any) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState(options[0].value)
    const handleChangeRdCroup = (value: string) => {
      setValue(value)
    }

    return (
      <div>
        <RadioGr
          {...args}
          onValueChange={handleChangeRdCroup}
          value={value}
          options={options}
          defaultValue={options[0].value}
        />
        <div>Selected value: {value}</div>
      </div>
    )
  },
}
