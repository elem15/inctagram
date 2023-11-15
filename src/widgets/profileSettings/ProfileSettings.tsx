import { FC } from 'react'

import s from './ProfileSettings.module.scss'

import { TabsSwitcher } from '@/shared/components'
import { useTranslation } from '@/shared/lib'
import { GeneralInformation } from '@/widgets/profileSettings/generalInformation/GeneralInformation'

type Props = {}
export const ProfileSettings: FC<Props> = () => {
  const { t } = useTranslation()
  const tabsArgs = {
    tabs: [
      { label: t.profile.general_information, value: '1', href: '/my-profile/general-information' },
      { label: t.profile.devices, value: '2', href: '/my-profile/devices' },
      { label: t.profile.account_management, value: '3', href: '/my-profile/account-management' },
      { label: t.profile.my_payments, value: '4', href: '/my-profile/my-payments' },
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
