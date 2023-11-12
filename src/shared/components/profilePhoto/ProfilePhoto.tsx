import s from './ProfilePhoto.module.scss'

import { CloseIcon, DefaultProfileImg } from '@/shared/assets'
import { Button } from '@/shared/components'
import { useTranslation } from '@/shared/lib'
import { useModal } from '@/shared/lib/hooks/open-or-close-hook'
import { AddProfilePhotoModal } from '@/widgets/addProfilePhoto/AddProfilePhotosModal'
import { DeleteProfilePhoto } from '@/widgets/addProfilePhoto/deleteProfilePhoto/DeleteProfilePhoto'

type Props = {
  photo: string
}

export const ProfilePhoto = ({ photo }: Props) => {
  const { isOpen, openModal, closeModal } = useModal()
  const { t } = useTranslation()

  return (
    <div className={s.profileBox}>
      <div className={s.ruBox}>
        <DeleteProfilePhoto />
        <div className={s.userPhotoBlock}>
          {photo ? (
            <img
              alt={'ava'}
              src={photo}
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

      <AddProfilePhotoModal isOpen={isOpen} closeModal={closeModal} />
    </div>
  )
}
