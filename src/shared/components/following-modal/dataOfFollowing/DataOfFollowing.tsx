import { useEffect, useState } from 'react'

import { clsx } from 'clsx'
import { useRouter } from 'next/router'

import s from './DataOfFollowing.module.scss'

import { IconUser } from '@/shared/assets'
import { Input } from '@/shared/components'
import { followingArray } from '@/shared/components/following-modal'
import { DeleteFollowing } from '@/shared/components/following-modal/deleteFollowing'
import { useTranslation } from '@/shared/lib'

export const DataOfFollowing = () => {
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
        {followingArray.map(following => {
          const truncatedTitle =
            shouldTruncate && following.title.length >= 5
              ? `${following.title.substring(0, 2)}...`
              : following.title

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
                {truncatedTitle}
              </span>
              <div className={s.deleteButtonBox}>
                <DeleteFollowing
                  isMob={shouldTruncate}
                  avatar={following.avatar}
                  name={following.title}
                />
              </div>
            </li>
          )
        })}
      </ul>
    </>
  )
}
