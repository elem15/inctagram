import Image from 'next/image'
import Link from 'next/link'

import s from './ProfileHeaderWeb.module.scss'

import { useGetProfileQuery } from '@/entities/profile'
import { Typography, Button } from '@/shared/components'
import { ModalOfFollowers } from '@/shared/components/followers-modal'
import { ModalOfFollowing } from '@/shared/components/following-modal'
import { useTranslation } from '@/shared/lib'
import { useAuth } from '@/shared/lib/hooks/useAuth'

export const ProfileHeaderWeb = () => {
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
        />

        <div className={s.dataProfile}>
          <div className={s.header}>
            <Typography variant="h1">URLProfile</Typography>
            <Button variant="secondary">
              <Link href="/my-profile/general-information">Profile Settings</Link>
            </Button>
          </div>
          <div className={s.progressProfile}>
            <div className={s.info}>
              <Typography className={s.progressInfoValue} variant="bold_text_14">
                1231
              </Typography>
              <ModalOfFollowing />
            </div>
            <div className={s.info}>
              <Typography className={s.progressInfoValue} variant="bold_text_14">
                1231
              </Typography>
              <ModalOfFollowers />
            </div>
            <div className={s.info}>
              <Typography className={s.progressInfoValue} variant="bold_text_14">
                1231
              </Typography>
              <Typography className={s.progressInfoText} variant="regular_text_14">
                {t.followers_modal.post}
              </Typography>
            </div>
          </div>
          <p className={s.description}>
            <Typography className={s.descriptionText} as="span" variant="regular_text_16">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco{' '}
            </Typography>
            <Link as="span" className={s.text} href="">
              laboris nisi ut aliquip ex ea commodo consequat.
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}
