import { useMemo } from 'react'

import { differenceInHours, differenceInDays, differenceInYears } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'

import s from './PostCommentsView.module.scss'

import { DeletePostIcon, EditPostIcon } from '@/shared/assets'
import ThreeDots from '@/shared/assets/icons/three-dots.png'
import { Button, CustomDropdown, CustomDropdownItem, Typography } from '@/shared/components'
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
  const timeAgo = useMemo(() => {
    const hoursAgo = differenceInHours(Date.now(), new Date(updatedAt))

    if (hoursAgo <= 1) return `1 hour ago`
    if (hoursAgo < 24) return `${hoursAgo} hours ago`

    const daysAgo = differenceInDays(Date.now(), new Date(updatedAt))

    if (daysAgo <= 1) return `${daysAgo} day ago`
    if (daysAgo < 365) return `${daysAgo} days ago`

    const yearsAgo = differenceInYears(Date.now(), new Date(updatedAt))

    if (yearsAgo <= 1) return `${yearsAgo} year ago`

    return `${yearsAgo} years ago`
  }, [updatedAt])

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
              {timeAgo}
            </Typography>
          </div>
        </div>
      </main>
    </div>
  )
}
