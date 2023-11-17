import { useState } from 'react'

import s from './ProfilePhoto.module.scss'

import { useGetProfileQuery, useSavePhotoMutation } from '@/entities/profile/api/profileApi'
import { CloseIcon, DefaultProfileImg } from '@/shared/assets'
import { Button } from '@/shared/components'
import { useTranslation } from '@/shared/lib'
import { useModal } from '@/shared/lib/hooks/open-or-close-hook'
import { useAuth } from '@/shared/lib/hooks/useAuth'
import { AddAvatarModal } from '@/widgets/addProfilePhoto/AddAvatarModal'
import { AddProfilePhotoModal } from '@/widgets/addProfilePhoto/AddProfilePhotosModal'
import { DeleteProfilePhoto } from '@/widgets/addProfilePhoto/deleteProfilePhoto/DeleteProfilePhoto'

type Props = {
  photo: string
}

export const ProfilePhoto = ({ photo }: Props) => {
  // const [avatar, setAvatar] = useState(photo?.medium.url)
  const { userId, accessToken } = useAuth()
  const { isOpen, openModal, closeModal } = useModal()
  const { data } = useGetProfileQuery({ profileId: userId, accessToken } as UserAuthData)
  const { t } = useTranslation()
  // const [savehoto, { data }] = useSavePhotoMutation()

  console.log(data)

  return (
    <div className={s.profileBox}>
      <div className={s.ruBox}>
        <DeleteProfilePhoto />
        <div className={s.userPhotoBlock}>
          {data ? (
            <img
              alt={'ava'}
              src={data.avatars[0].url || ''}
              style={{ borderRadius: '50%', height: '12rem', width: '12rem' }}
            />
          ) : (
            <DefaultProfileImg style={{ width: '3rem', height: '3rem' }} />
          )}
        </div>
      </div>
      <Button variant={'outline'} onClick={openModal}>
        {t.add_profile_photo.add_profile_photo_text}
      </Button>
      {/*<AddAvatarModal isOpen={isOpen} closeModal={closeModal} />*/}
      <AddProfilePhotoModal isOpen={isOpen} closeModal={closeModal} />
    </div>
  )
}
