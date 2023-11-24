import { clsx } from 'clsx'
import { useRouter } from 'next/router'

import s from './DataOfFollowing.module.scss'

import { IconUser } from '@/shared/assets'
import { Button, Input } from '@/shared/components'
import { followingArray } from '@/shared/components/following-modal'
import { DeleteFollowing } from '@/shared/components/following-modal/deleteFollowing'
import { useTranslation } from '@/shared/lib'

export const DataOfFollowing = () => {
  const { t } = useTranslation()
  const router = useRouter()

  return (
    <>
      <Input type={'search'} placeholder={t.following_modal.input_placeholder} />

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
                <Button variant={'primary'}>{t.following_modal.follow_button}</Button>
              )}
              <div className={s.deleteButtonBox}>
                <DeleteFollowing avatar={following.avatar} name={following.title} />
              </div>
            </li>
          )
        })}
      </ul>
    </>
  )
}
