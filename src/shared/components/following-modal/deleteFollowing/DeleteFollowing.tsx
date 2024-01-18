import { useState } from 'react'

import s from './DeleteFollowing.module.scss'

import { IconUser } from '@/shared/assets'
import { Button, Typography } from '@/shared/components'
import { Modal } from '@/shared/components/modals'
import { useTranslation } from '@/shared/lib'
import { useModal } from '@/shared/lib/hooks/open-or-close-hook'
type Props = {
  avatar: string
  name: string
  isMob: boolean
}
export const DeleteFollowing = ({ avatar, name, isMob }: Props) => {
  const [confirmedUnfollow, setConfirmedUnfollow] = useState(false)

  const { isOpen, openModal, closeModal } = useModal()
  const { t } = useTranslation()

  const handleChangeUnfollow = () => {
    setConfirmedUnfollow(true)
    closeModal()
  }

  return (
    <>
      {confirmedUnfollow ? (
        <Button
          variant={'primary'}
          style={
            isMob ? { fontSize: '14px', padding: '5px 10px', color: '#fff' } : { fontSize: '16px' }
          }
        >
          {t.following_modal.follow_button}
        </Button>
      ) : (
        <Button
          variant={'outline'}
          onClick={() => openModal()}
          style={
            isMob ? { fontSize: '14px', padding: '5px 10px', color: '#fff' } : { color: '#fff' }
          }
        >
          {t.delete_following.delete_button}
        </Button>
      )}
      <Modal
        open={isOpen}
        size={'sm'}
        title={t.delete_following.title_of_delete_modal}
        onClose={closeModal}
      >
        <div className={s.avaAndText}>
          <div className={s.avatar} style={{ backgroundImage: avatar ? `${avatar}` : 'none' }}>
            {!avatar && <IconUser />}
          </div>
          <Typography>
            {t.delete_following.text} {name}?
          </Typography>
        </div>
        <div className={s.buttonBox}>
          <Button variant={'outline'} onClick={handleChangeUnfollow}>
            {t.delete_photo_of_profile.button_yes}
          </Button>
          <Button variant={'primary'} onClick={closeModal}>
            {t.delete_photo_of_profile.button_no}
          </Button>
        </div>
      </Modal>
    </>
  )
}
