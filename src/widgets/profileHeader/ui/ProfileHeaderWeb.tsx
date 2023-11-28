import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import s from './ProfileHeaderWeb.module.scss'

import PersonImg from '@/shared/assets/PersonImg1.png'
import { Typography, Button } from '@/shared/components'
import { ModalOfFollowers } from '@/shared/components/followers-modal'
import { ModalOfFollowing } from '@/shared/components/following-modal'
import { useTranslation } from '@/shared/lib'

export const ProfileHeaderWeb = () => {
  const { t } = useTranslation()

  return (
    <>
      <div className={s.container}>
        <Image src={PersonImg} className={s.image} alt={''} />

        <div className={s.dataProfile}>
          <div className={s.header}>
            <Typography variant="h1">URLProfiele</Typography>
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
