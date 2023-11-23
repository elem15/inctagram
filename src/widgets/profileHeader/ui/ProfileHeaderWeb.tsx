import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import s from './ProfileHeaderWeb.module.scss'

import PersonImg from '@/shared/assets/PersonImg1.png'
import { Typography, Button } from '@/shared/components'

export const ProfileHeaderWeb = () => {
  const { push } = useRouter()

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
              <Typography className={s.progressInfoText} variant="regular_text_14">
                Following
              </Typography>
            </div>
            <div className={s.info}>
              <Typography className={s.progressInfoValue} variant="bold_text_14">
                1231
              </Typography>
              <Typography className={s.progressInfoText} variant="regular_text_14">
                Followers
              </Typography>
            </div>
            <div className={s.info}>
              <Typography className={s.progressInfoValue} variant="bold_text_14">
                1231
              </Typography>
              <Typography className={s.progressInfoText} variant="regular_text_14">
                Publications
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
