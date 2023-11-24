import { clsx } from 'clsx'
import { useRouter } from 'next/router'

import s from './ModalOfFollowing.module.scss'

import { IconBack, IconUser } from '@/shared/assets'
import { Button, Input, TabsSwitcher, Typography } from '@/shared/components'
import { DataOfFollowing } from '@/shared/components/following-modal/dataOfFollowing/DataOfFollowing'
import { DeleteFollowing } from '@/shared/components/following-modal/deleteFollowing/DeleteFollowing'
import { Modal } from '@/shared/components/modals'
import { useTranslation } from '@/shared/lib'
import { useModal } from '@/shared/lib/hooks/open-or-close-hook'

export const followingArray = [
  { avatar: '', value: '1', title: 'URLProfile', isFollow: true },
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
      <Typography variant={'regular_text_14'} onClick={openModal} style={{ cursor: 'pointer' }}>
        Following
      </Typography>

      <Modal
        open={isOpen}
        size={'l'}
        showCloseButton={true}
        title={`500 ${t.following_modal.title}`}
        onClose={closeModal}
      >
        <DataOfFollowing />
      </Modal>
    </>
  )
}
