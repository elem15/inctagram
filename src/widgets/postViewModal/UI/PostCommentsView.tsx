import { memo } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import ReactTimeAgo from 'react-time-ago'

import s from './PostCommentsView.module.scss'

import { DeletePostIcon, EditPostIcon } from '@/shared/assets'
import ThreeDots from '@/shared/assets/icons/three-dots.png'
import { Button, CustomDropdown, CustomDropdownItem, TimeAgo, Typography } from '@/shared/components'
import { useTranslation } from '@/shared/lib'
import { useAuth } from '@/shared/lib/hooks/useAuth'

type Props = {
  ownerId: number
  avatarOwner: string
  firstName: string
  lastName: string
  description: string
  updatedAt: string
  setModalType: (modalType: 'edit' | 'view') => void
}

export const PostCommentsView = ({
  ownerId,
  avatarOwner,
  firstName,
  lastName,
  description,
  updatedAt,
  setModalType,
}: Props) => {
  const { isAuth, userId } = useAuth()
  const { t } = useTranslation()

  return (
    <div>
      <header className={s.header}>
        <div className={s.avatar}>
          <Image
            src={avatarOwner}
            width={36}
            height={36}
            alt="Owner's avatar"
            className={s.smallAvatar}
          />
          <Link href={`/public-posts/${ownerId}`}>
            <Typography variant="bold_text_14">
              {firstName} {lastName}
            </Typography>
          </Link>
        </div>
        {isAuth && userId == ownerId && (
          <div className={s.wrappedActionMenu}>
            <CustomDropdown
              trigger={<Image src={ThreeDots} alt="menu-trigger" className={s.dots} />}
              align={'end'}
            >
              <CustomDropdownItem>
                <Button variant={'link'} className={s.button} onClick={() => setModalType('edit')}>
                  <EditPostIcon /> {t.post_view.edit}
                </Button>
              </CustomDropdownItem>
              <CustomDropdownItem>
                <Button variant={'link'} className={s.button}>
                  <DeletePostIcon /> {t.post_view.delete}
                </Button>
              </CustomDropdownItem>
            </CustomDropdown>
          </div>
        )}
      </header>
      <main>
        <div className={s.post}>
          <Image
            src={avatarOwner}
            width={36}
            height={36}
            alt="Owner's avatar"
            className={s.smallAvatarPost}
          />
          <div className={s.postContent}>
            <Link href={`/public-posts/${ownerId}`}>
              <Typography as="span" variant="bold_text_14">
                {firstName} {lastName}
              </Typography>
            </Link>{' '}
            <Typography as="span" variant="medium_text_14">
              {description}
            </Typography>
            <Typography variant="medium_text_14" className={s.updatedAt}>
              <TimeAgo updatedAt={updatedAt} lg={t.lg} />
            </Typography>
          </div>
        </div>
      </main>
    </div>
  )
}
