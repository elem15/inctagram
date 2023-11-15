import { FC, ReactElement, ReactNode } from 'react'

import s from './TabsLayout.module.scss'

import { TabsSwitcher } from '@/shared/components'
import { useTranslation } from '@/shared/lib'

type Props = { children: ReactNode }

export const TabsLayout: FC<Props> = ({ children }) => {
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

      {children}
    </div>
  )
}

export const getTabsLayout = (page: ReactElement) => {
  return <TabsLayout>{page}</TabsLayout>
}
