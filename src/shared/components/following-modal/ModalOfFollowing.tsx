import { clsx } from 'clsx'
import { useRouter } from 'next/router'

import s from './ModalOfFollowing.module.scss'

import { IconUser } from '@/shared/assets'
import { Button, Input } from '@/shared/components'
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
  const router = useRouter()

  return (
    <>
      <Button variant={'link'} onClick={openModal}>
        Following
      </Button>
      <Modal
        open={isOpen}
        size={'l'}
        showCloseButton={true}
        title={`500 ${t.followingModal.title}`}
        onClose={closeModal}
      >
        <>
          <Input type={'search'} placeholder={t.followingModal.input_placeholder} />

          <ul>
            {followingArray.map(following => {
              return (
                <li key={following.value} className={s.dataBox}>
                  <p
                    className={s.avatar}
                    style={{
                      backgroundImage: following.avatar ? `${following.avatar}` : 'none',
                    }}
                  >
                    {following.avatar ? null : <IconUser />}
                  </p>
                  <span className={clsx(router.locale === 'ru' ? s.ruText : s.text)}>
                    {following.title}
                  </span>
                  {following.isFollow && (
                    <Button variant={'primary'}>{t.followingModal.follow_button}</Button>
                  )}
                  <div className={s.deleteButtonBox}>
                    <DeleteFollowing avatar={following.avatar} name={following.title} />
                  </div>
                </li>
              )
            })}
          </ul>
        </>
      </Modal>
    </>
  )
}
