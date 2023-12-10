import Image from 'next/image'
import Link from 'next/link'

import s from './ProfileHeaderWeb.module.scss'

import { useGetProfileQuery } from '@/entities/profile'
import { Typography, Button } from '@/shared/components'
import { ModalOfFollowers } from '@/shared/components/followers-modal'
import { ModalOfFollowing } from '@/shared/components/following-modal'
import { useFetchLoader, useTranslation } from '@/shared/lib'
import { useAuth } from '@/shared/lib/hooks/useAuth'

export const ProfileHeaderWeb = () => {
  const { t } = useTranslation()
  const { userId, accessToken } = useAuth()
  const { data, isLoading, isError } = useGetProfileQuery({
    profileId: userId,
    accessToken,
  } as UserAuthData)

  useFetchLoader(isLoading)

  return (
    <>
      <div className={s.container}>
        {data && (
          <Image
            src={data.avatars[0].url as string}
            className={s.image}
            alt={''}
            width={204}
            height={204}
          />
        )}
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
            <Typography as="span" variant="regular_text_14">
              {data?.aboutMe}
            </Typography>
          </p>
        </div>
      </div>
    </>
  )
}
