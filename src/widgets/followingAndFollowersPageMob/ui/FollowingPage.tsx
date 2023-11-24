import { useRouter } from 'next/router'

import s from './FollowingPage.module.scss'

import { IconBack } from '@/shared/assets'
import { TabsSwitcher, Typography } from '@/shared/components'
import { DataOfFollowing } from '@/shared/components/following-modal/dataOfFollowing/DataOfFollowing'
import { useTranslation } from '@/shared/lib'
import { useModal } from '@/shared/lib/hooks/open-or-close-hook'
export const FollowingAndFollowersPage = () => {
  const { t } = useTranslation()
  const { isOpen, openModal, closeModal } = useModal()
  const { push } = useRouter()
  const ArrayOfActionMenu = [
    { label: t.following_modal.title, value: '1' },
    { label: t.followers_modal.title, value: '2' },
  ]
  const handleBack = () => {
    push('/my-profile')
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

      <TabsSwitcher tabs={ArrayOfActionMenu} style={{ marginBottom: '24px' }} />
      <DataOfFollowing />
    </div>
  )
}
