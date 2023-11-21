import s from './ModalOfFollowing.module.scss'

import { InputField } from '@/shared'
import { IconUser } from '@/shared/assets'
import { Button, Input } from '@/shared/components'
import { Modal } from '@/shared/components/modals'
import { useTranslation } from '@/shared/lib'

export const followingArray = [
  { avatar: '', value: '1', title: 'URLProfiele' },
  { avatar: '', value: '2', title: 'URLProfiele' },
  { avatar: '', value: '3', title: 'URLProfiele' },
  { avatar: '', value: '4', title: 'URLProfiele' },
  { avatar: '', value: '5', title: 'URLProfiele' },
  { avatar: '', value: '6', title: 'URLProfiele' },
  { avatar: '', value: '7', title: 'URLProfiele' },
  { avatar: '', value: '8', title: 'URLProfiele' },
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
