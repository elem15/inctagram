import { FC } from 'react'

import s from './MyProfile.module.scss'

import { useTranslation } from '@/shared/lib'
import { ProfilePhotoForGeneralInfo } from '@/widgets/addProfilePhoto/ProfilePhotoForGeneralInfo'
type Props = {}
export const MyProfile: FC<Props> = () => {
  return (
    <div className={s.container}>
      <ProfilePhotoForGeneralInfo />
    </div>
  )
}
