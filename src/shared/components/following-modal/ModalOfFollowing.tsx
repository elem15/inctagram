import s from './ModalOfFollowing.module.scss'

import { Typography } from '@/shared/components'
import { DataOfFollowing } from '@/shared/components/following-modal/dataOfFollowing/DataOfFollowing'
import { Modal } from '@/shared/components/modals'
import { useTranslation } from '@/shared/lib'
import { useModal } from '@/shared/lib/hooks/open-or-close-hook'

export const followingArray = [
  { avatar: '', value: '1', title: 'URLP', isFollow: true },
  { avatar: '', value: '2', title: 'URLProfile', isFollow: false },
  { avatar: '', value: '3', title: 'URLProfile', isFollow: true },
  { avatar: '', value: '4', title: 'URLProfile', isFollow: false },
  { avatar: '', value: '5', title: 'URLProfile', isFollow: true },
  { avatar: '', value: '6', title: 'URLProfile', isFollow: false },
  { avatar: '', value: '7', title: 'URLProfile', isFollow: true },
]

export const ModalOfFollowing = () => {
  const { t } = useTranslation()
  const { isOpen, openModal, closeModal } = useModal()

  return (
    <>
      <Typography
        variant={'regular_text_14'}
        className={s.infoText}
        onClick={openModal}
        style={{ cursor: 'pointer' }}
      >

        {t.following_modal.followings_title}
      </Typography>

      <Modal
        open={isOpen}
        size={'l'}
        showCloseButton={true}
        title={`500 ${t.following_modal.followings_title}`}
        onClose={closeModal}
      >
        <DataOfFollowing />
      </Modal>
    </>
  )
}
