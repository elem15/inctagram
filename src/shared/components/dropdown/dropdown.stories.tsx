import { DropdownMenu } from '@radix-ui/react-dropdown-menu'
import type { Meta, StoryObj } from '@storybook/react'

import { CustomDropdown, CustomDropdownItem, CustomDropdownItemWithIcon } from './dropdown'

import { HomesIcon, LogOutIcon, ProfileSettings } from '@/shared/assets'

const meta = {
  title: 'Components/Dropdown',
  component: CustomDropdown,
  tags: ['autodocs'],
} satisfies Meta<typeof CustomDropdown>

export default meta
type Story = StoryObj<typeof meta>

export const DropdownDefault: Story = {
  args: {
    trigger: <DropdownMenu />,
    children: (
      <>
        <CustomDropdownItemWithIcon title={'Learn'} icon={<LogOutIcon />} />
        <CustomDropdownItemWithIcon disabled title={'Edit'} icon={<HomesIcon />} />
        <CustomDropdownItemWithIcon title={'Delete'} icon={<ProfileSettings />} />
      </>
    ),
  },
}

export const DropdownWithAvatar: Story = {
  args: {
    trigger: <div>Trigger</div>,
    children: (
      <>
        <CustomDropdownItem
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        ></CustomDropdownItem>
        <CustomDropdownItemWithIcon title={'My Profile'} icon={<HomesIcon />} />
        <CustomDropdownItemWithIcon title={'Sign Out'} icon={<ProfileSettings />} />
      </>
    ),
  },
}
