import Image from 'next/image'
import Link from 'next/link'

import s from './ProfileHeaderMob.module.scss'

import PersonImg from '@/shared/assets/PersonImg1.png'
import { Typography } from '@/shared/components'
import { useTranslation } from '@/shared/lib'

export const ProfileHeaderMob = () => {
  const { t } = useTranslation()

  return (
    <>
      <div className={s.container}>
        <Image src={PersonImg} className={s.image} alt={''} />
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
        URLProfiele
      </Typography>
      <p className={s.description}>
        <Typography as="span" variant="regular_text_14">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt{' '}
        </Typography>
        <Link as="span" className={s.text} href="">
          laboris nisi ut aliquip ex ea commodo consequat.
        </Link>
      </p>
    </>
  )
}
