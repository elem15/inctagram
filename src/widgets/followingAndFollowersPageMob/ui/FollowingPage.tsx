import { FC, useState } from 'react'

import { useRouter } from 'next/router'

import s from './FollowingPage.module.scss'

import { IconBack } from '@/shared/assets'
import { TabsSwitcher, Typography } from '@/shared/components'
import { DataOfFollowers } from '@/shared/components/followers-modal/dataOfFollowers/DataOfFollowers'
import { DataOfFollowing } from '@/shared/components/following-modal/dataOfFollowing/DataOfFollowing'
import { useTranslation } from '@/shared/lib'
import { useModal } from '@/shared/lib/hooks/open-or-close-hook'

export const FollowingAndFollowersPageMob = () => {
  const { t } = useTranslation()
  const [tabValue, setTabValue] = useState('1')
  const { isOpen, openModal, closeModal } = useModal()
  const { push } = useRouter()
  const ArrayOfActionMenu = [
    { label: t.following_modal.title, value: '1' },
    { label: t.followers_modal.title, value: '2' },
  ]
  const handleBack = () => {
    push('/my-profile')
  }
  const handleChangeTab = (value: string) => {
    setTabValue(value)
  }

  return (
    <div className={s.box}>
      <div className={s.button_title}>
        <Typography onClick={handleBack} style={{ cursor: 'pointer' }}>
          <IconBack />
        </Typography>
        <div className={s.title}>
          <Typography variant={'h2'}>URLProfile</Typography>
        </div>
      </div>

      <TabsSwitcher
        tabs={ArrayOfActionMenu}
        style={{ marginBottom: '24px' }}
        value={tabValue}
        onValueChange={handleChangeTab}
      />
      {tabValue === '1' && <DataOfFollowing />}
      {tabValue === '2' && <DataOfFollowers />}
    </div>
  )
}
