import s from './ModalOfFollowing.module.scss'

import { InputField } from '@/shared'
import { IconUser } from '@/shared/assets'
import { Button, Input } from '@/shared/components'
import { Modal } from '@/shared/components/modals'
import { useTranslation } from '@/shared/lib'

export const followingArray = [
  { avatar: 'url', value: '1', title: 'URLProfiele' },
  { avatar: 'url', value: '2', title: 'URLProfiele' },
  { avatar: 'url', value: '3', title: 'URLProfiele' },
  { avatar: 'url', value: '4', title: 'URLProfiele' },
  { avatar: 'url', value: '5', title: 'URLProfiele' },
  { avatar: 'url', value: '6', title: 'URLProfiele' },
  { avatar: 'url', value: '7', title: 'URLProfiele' },
  { avatar: 'url', value: '8', title: 'URLProfiele' },
  { avatar: 'url', value: '9', title: 'URLProfiele' },
]
export const ModalOfFollowing = () => {
  const { t } = useTranslation()

  return (
    <Modal open={true} size={'l'} showCloseButton={true} title={'Following'}>
      <>
        <div className={s.searchTextFieldBox}>
          <Input type={'search'} placeholder={t.followingsModal.input_placeholder} />
        </div>
        <ul>
          {followingArray.map(following => {
            return (
              <li key={following.value}>
                <img src={following.avatar ? following.avatar : <IconUser />} alt={'ava'} />
                {following.title}
                <Button variant={'primary'}>Follow</Button>
                <Button variant={'link'}>Delete</Button>
              </li>
            )
          })}
        </ul>
      </>
    </Modal>
  )
}
