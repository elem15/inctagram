import { useEffect, useState } from 'react'

import { clsx } from 'clsx'
import { useRouter } from 'next/router'

import s from './DataOfFollowers.module.scss'

import { IconUser } from '@/shared/assets'
import { Button, Input } from '@/shared/components'
import { RemoveFollower } from '@/shared/components/followers-modal/deleteFollowers'
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
  const [shouldTruncate, setShouldTruncate] = useState(false)

  useEffect(() => {
    if (router.pathname === '/my-profile/following-page/[subscription]') {
      setShouldTruncate(true)
    } else {
      setShouldTruncate(false)
    }
  }, [router.pathname])

  return (
    <>
      <Input type={'search'} placeholder={t.following_modal.input_placeholder} />

      <ul>
        {followersArray.map(follower => {
          const truncatedTitle =
            shouldTruncate && follower.title.length >= 5
              ? `${follower.title.substring(0, 2)}...`
              : follower.title

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
                {truncatedTitle}
              </span>
              {!follower.isUnfollow && (
                <Button
                  variant={'primary'}
                  style={
                    shouldTruncate
                      ? { fontSize: '14px', padding: '5px 10px', color: '#fff' }
                      : { fontSize: '16px' }
                  }
                >
                  {t.following_modal.follow_button}
                </Button>
              )}
              <div className={s.deleteButtonBox}>
                <RemoveFollower
                  avatar={follower.avatar}
                  isMob={shouldTruncate}
                  name={follower.title}
                />
              </div>
            </li>
          )
        })}
      </ul>
    </>
  )
}
