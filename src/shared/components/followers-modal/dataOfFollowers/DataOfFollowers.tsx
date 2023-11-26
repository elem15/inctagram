import { clsx } from 'clsx'
import { useRouter } from 'next/router'

import s from './DataOfFollowers.module.scss'

import { IconUser } from '@/shared/assets'
import { Button, Input } from '@/shared/components'
import { Unfollow } from '@/shared/components/followers-modal/deleteFollowers'
import { useTranslation } from '@/shared/lib'
export const followersArray = [
  { avatar: '', value: '1', title: 'URLProfile', isUnfollow: false },
  { avatar: '', value: '2', title: 'URLProfile', isUnfollow: false },
  { avatar: '', value: '3', title: 'URLProfile', isUnfollow: true },
  { avatar: '', value: '4', title: 'URLProfile', isUnfollow: false },
  { avatar: '', value: '5', title: 'URLProfile', isUnfollow: false },
  { avatar: '', value: '6', title: 'URLProfile', isUnfollow: false },
  { avatar: '', value: '7', title: 'URLProfile', isUnfollow: true },
]
export const DataOfFollowers = () => {
  const { t } = useTranslation()
  const router = useRouter()

  return (
    <>
      <Input type={'search'} placeholder={t.following_modal.input_placeholder} />

      <ul>
        {followersArray.map(follower => {
          return (
            <li key={follower.value} className={s.dataBox}>
              <p
                className={s.avatar}
                style={{
                  backgroundImage: follower.avatar ? `${follower.avatar}` : 'none',
                }}
              >
                {follower.avatar ? null : <IconUser />}
              </p>
              <span className={clsx(router.locale === 'ru' ? s.ruText : s.text)}>
                {follower.title}
              </span>
              {!follower.isUnfollow && <Button variant={'primary'}>Follow</Button>}
              <div className={s.deleteButtonBox}>
                <Unfollow avatar={follower.avatar} name={follower.title} />
              </div>
            </li>
          )
        })}
      </ul>
    </>
  )
}
