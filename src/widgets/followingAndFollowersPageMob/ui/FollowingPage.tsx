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
  const router = useRouter()
  const { t } = useTranslation()
  const [tabValue, setTabValue] = useState(router.query.type as string)
  const { isOpen, openModal, closeModal } = useModal()

  const ArrayOfActionMenu = [
    { label: t.following_modal.title, value: 'following' },
    { label: t.followers_modal.title, value: 'followers' },
  ]

  console.log(router)
  const handleBack = () => {
    router.push('/my-profile')
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
      {tabValue === 'following' && <DataOfFollowing />}
      {tabValue === 'followers' && <DataOfFollowers />}
    </div>
  )
}
