import Image from 'next/image'
import Link from 'next/link'

import s from './ProfileHeaderWeb.module.scss'

import { useGetProfileQuery } from '@/entities/profile'
import { DefaultProfileImg } from '@/shared/assets'
import { Typography, Button } from '@/shared/components'
import { ModalOfFollowers } from '@/shared/components/followers-modal'
import { ModalOfFollowing } from '@/shared/components/following-modal'
import { useErrorHandler, useFetchLoader, useTranslation } from '@/shared/lib'
import { useAuth } from '@/shared/lib/hooks/useAuth'

export const ProfileHeaderWeb = () => {
  const { t } = useTranslation()
  const { userId, accessToken } = useAuth()
  const { data, isLoading, error } = useGetProfileQuery({
    profileId: userId,
    accessToken,
  } as UserAuthData)

  useFetchLoader(isLoading)
  useErrorHandler(error as CustomerError)

  return (
    <>
      <div className={s.container}>
        <div className={s.imageContainer}>
          <div className={s.image}>
            {data?.avatars[0]?.url ? (
              <Image
                src={data?.avatars[0]?.url || ''}
                className={s.image}
                alt={''}
                width={204}
                height={204}
              />
            ) : (
              <DefaultProfileImg style={{ width: '3rem', height: '3rem' }} />
            )}
          </div>
          <Typography variant="bold_text_16" className={s.linkSmallProfile}>
            URLProfile
          </Typography>
        </div>
        <div className={s.dataProfile}>
          <div className={s.header}>
            <Typography variant="h1" className={s.linkLargeProfile}>
              URLProfile
            </Typography>
            <Button variant="secondary" className={s.buttonSettings}>
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
