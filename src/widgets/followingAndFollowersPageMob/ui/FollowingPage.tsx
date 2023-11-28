import { useState } from 'react'

import { useRouter } from 'next/router'

import s from './FollowingPage.module.scss'

import { IconBack } from '@/shared/assets'
import { TabsSwitcher, Typography } from '@/shared/components'
import { DataOfFollowers } from '@/shared/components/followers-modal/dataOfFollowers/DataOfFollowers'
import { DataOfFollowing } from '@/shared/components/following-modal/dataOfFollowing/DataOfFollowing'
import { useTranslation } from '@/shared/lib'

export const FollowingAndFollowersPageMob = () => {
  const router = useRouter()
  const { t } = useTranslation()
  const [tabValue, setTabValue] = useState(router.query.subscription as string)

  const ArrayOfActionMenu = [
    { label: t.following_modal.title, value: 'following' },
    { label: t.followers_modal.title, value: 'followers' },
  ]

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
