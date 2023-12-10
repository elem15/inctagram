import { profile } from 'console'

import Image from 'next/image'
import Link from 'next/link'

import s from './ProfileHeaderMob.module.scss'

import { useGetProfileQuery } from '@/entities/profile'
import { Typography } from '@/shared/components'
import { useTranslation } from '@/shared/lib'
import { useAuth } from '@/shared/lib/hooks/useAuth'

export const ProfileHeaderMob = () => {
  const { t } = useTranslation()
  const { userId, accessToken } = useAuth()
  const { data } = useGetProfileQuery({ profileId: userId, accessToken } as UserAuthData)

  return (
    <>
      <div className={s.container}>
        <Image
          src={data?.avatars[0].url as string}
          className={s.image}
          alt={''}
          width={204}
          height={204}
        />{' '}
        <div className={s.progressProfile}>
          <div className={s.info}>
            <Typography className={s.progressInfoValue} variant="semi-bold_small_text">
              1231
            </Typography>
            <Link href={'/my-profile/following-page/following'} className={s.progressInfoText}>
              {t.following_modal.followings_title}
            </Link>
          </div>
          <div className={s.info}>
            <Typography className={s.progressInfoValue} variant="semi-bold_small_text">
              1231
            </Typography>
            <Link href={'/my-profile/following-page/followers'} className={s.progressInfoText}>
              {t.followers_modal.modals_title}
            </Link>
          </div>
          <div className={s.info}>
            <Typography variant="semi-bold_small_text">1231</Typography>
            <Typography className={s.progressInfoText}>{t.followers_modal.post}</Typography>
          </div>
        </div>
      </div>
      <Typography className={s.profileName} variant="bold_text_16">
        URLProfile
      </Typography>
      <p className={s.description}>
        <Typography as="span" variant="regular_text_14">
          {data?.aboutMe}
        </Typography>
      </p>
    </>
  )
}
