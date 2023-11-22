import { FC } from 'react'

import s from './ModalOfFollowing.module.scss'

import { IconUser } from '@/shared/assets'
import { Button, Input } from '@/shared/components'
import { DeleteFollowing } from '@/shared/components/following-modal/deleteFollowing/DeleteFollowing'
import { Modal } from '@/shared/components/modals'
import { useTranslation } from '@/shared/lib'
import { useModal } from '@/shared/lib/hooks/open-or-close-hook'

export const followingArray = [
  { avatar: '', value: '1', title: 'URLProfiele', isFollow: true },
  { avatar: '', value: '2', title: 'URLProfiele', isFollow: false },
  { avatar: '', value: '3', title: 'URLProfiele', isFollow: true },
  { avatar: '', value: '4', title: 'URLProfiele', isFollow: false },
  { avatar: '', value: '5', title: 'URLProfiele', isFollow: true },
  { avatar: '', value: '6', title: 'URLProfiele', isFollow: false },
  { avatar: '', value: '7', title: 'URLProfiele', isFollow: true },
]
type Props = {
  open: boolean
}
export const ModalOfFollowing: FC<Props> = () => {
  const { t } = useTranslation()
  const { isOpen, openModal, closeModal } = useModal()

  return (
    <>
      <Modal
        open={true}
        size={'l'}
        showCloseButton={true}
        title={'500 Following'}
        onClose={closeModal}
      >
        <>
          <Input type={'search'} placeholder={t.followingsModal.input_placeholder} />

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
                  <span className={s.text}>{following.title}</span>
                  {following.isFollow && <Button variant={'primary'}>Follow</Button>}
                  <div className={s.deleteButtonBox}>
                    {/*<Button variant={'link'} style={{ color: '#fff' }} onClick={openModal}>*/}
                    {/*  Delete*/}
                    {/*</Button>*/}
                    <DeleteFollowing avatar={following.avatar} />
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
