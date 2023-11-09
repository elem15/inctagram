import { FC } from 'react'

import s from './ProfileSettings.module.scss'

import { TabsSwitcher } from '@/shared/components'
import { GeneralInformation } from '@/widgets/profileSettings/generalInformation/GeneralInformation'

type Props = {}
export const ProfileSettings: FC<Props> = () => {
  const tabsArgs = {
    tabs: [
      { label: 'General Information', value: '1' },
      { label: 'Devices', value: '2', disabled: true },
      { label: 'Account Managenment', value: '3', disabled: true },
      { label: 'My Payments', value: '4', disabled: true },
    ],
  }

  return (
    <div className={s.container}>
      <div className={s.tabsContainer}>
        <TabsSwitcher tabs={tabsArgs.tabs} />
      </div>

      <GeneralInformation />
    </div>
  )
}
