import s from './DeleteFollowing.module.scss'

import { IconUser } from '@/shared/assets'
import { Button, Typography } from '@/shared/components'
import { Modal } from '@/shared/components/modals'
import { useTranslation } from '@/shared/lib'
import { useModal } from '@/shared/lib/hooks/open-or-close-hook'
type Props = {
  avatar: string
  name: string
}
export const Unfollow = ({ avatar, name }: Props) => {
  const { isOpen, openModal, closeModal } = useModal()
  const { t } = useTranslation()

  return (
    <>
      <Button variant={'outline'} onClick={openModal}>
        Unfollow
      </Button>

      <Modal open={isOpen} size={'sm'} title={'Unfollow'} onClose={closeModal}>
        <div className={s.avaAndText}>
          <div className={s.avatar} style={{ backgroundImage: avatar ? `${avatar}` : 'none' }}>
            {!avatar && <IconUser />}
          </div>
          <Typography>Do you really want to delete a Unfollow {name}?</Typography>
        </div>
        <div className={s.buttonBox}>
          <Button variant={'outline'} style={{ width: '27px' }}>
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
