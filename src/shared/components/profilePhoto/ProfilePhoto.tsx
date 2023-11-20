import Image from 'next/image'

import s from './ProfilePhoto.module.scss'

import { useGetProfileQuery } from '@/entities/profile/api/profileApi'
import { DefaultProfileImg } from '@/shared/assets'
import { Button } from '@/shared/components'
import { useTranslation } from '@/shared/lib'
import { useModal } from '@/shared/lib/hooks/open-or-close-hook'
import { useAuth } from '@/shared/lib/hooks/useAuth'
import { AddAvatarModal } from '@/widgets/addProfilePhoto/AddAvatarModal'
import { DeleteProfilePhoto } from '@/widgets/addProfilePhoto/deleteProfilePhoto/DeleteProfilePhoto'

export const ProfilePhoto = () => {
  const { userId, accessToken } = useAuth()
  const { isOpen, openModal, closeModal } = useModal()
  const { data } = useGetProfileQuery({ profileId: userId, accessToken } as UserAuthData)
  const { t } = useTranslation()

  return (
    <div className={s.profileBox}>
      <div className={s.ruBox}>
        <div className={s.userPhotoBlock}>
          {data?.avatars[0]?.url ? (
            <div className={s.avaButtonBox}>
              <Image
                alt={'ava'}
                src={data?.avatars[0]?.url}
                style={{ borderRadius: '50%' }}
                height="192"
                width="192"
              />
              <div className={s.deleteButtonBox}>
                <DeleteProfilePhoto />
              </div>
            </div>
          ) : (
            <DefaultProfileImg style={{ width: '3rem', height: '3rem' }} />
          )}
        </div>
      </div>
      <Button variant={'outline'} onClick={openModal} style={{ width: '148px' }}>
        {t.add_profile_photo.add_profile_photo_text}
      </Button>
      <AddAvatarModal isOpen={isOpen} closeModal={closeModal} />
    </div>
  )
}
