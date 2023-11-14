import type { Meta, StoryObj } from '@storybook/react'

import { Avatar } from '../avatar/avatar.tsx'
import { AvatarInfo } from '../avatar/avatarInfo/avatarInfo.tsx'

import { CustomDropdown, CustomDropdownItem, CustomDropdownItemWithIcon } from './dropdown.tsx'

import { Delete, DropdownMenu, Edit, Play, Profile, Logout } from '@/assets'

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
        <CustomDropdownItemWithIcon title={'Learn'} icon={<Play />} />
        <CustomDropdownItemWithIcon disabled title={'Edit'} icon={<Edit />} />
        <CustomDropdownItemWithIcon title={'Delete'} icon={<Delete />} />
      </>
    ),
  },
}

export const DropdownWithAvatar: Story = {
  args: {
    trigger: <Avatar src={'https://placehold.co/36'} />,
    children: (
      <>
        <CustomDropdownItem
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <Avatar src={'https://placehold.co/36'} />
          <AvatarInfo userName={'John'} email={'j&johnson@gmail.com'} />
        </CustomDropdownItem>
        <CustomDropdownItemWithIcon title={'My Profile'} icon={<Profile />} />
        <CustomDropdownItemWithIcon title={'Sign Out'} icon={<Logout />} />
      </>
    ),
  },
}
