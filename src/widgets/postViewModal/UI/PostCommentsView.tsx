import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import s from './PostCommentsView.module.scss'

import { DeletePostIcon, EditPostIcon } from '@/shared/assets'
import { Button, CustomDropdown, CustomDropdownItem, Typography } from '@/shared/components'
import { CalendarButton } from '@/shared/components/ui'
import { useTranslation } from '@/shared/lib'
import { useAuth } from '@/shared/lib/hooks/useAuth'

type Props = {
  ownerId: number
  avatarOwner: string
  firstName: string
  lastName: string
  setModalType: (modalType: 'edit' | 'view') => void
}
export const PostCommentsView = ({
  ownerId,
  avatarOwner,
  firstName,
  lastName,
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
              trigger={
                <div>
                  <Typography variant="h1" className={s.dots}>
                    ...
                  </Typography>
                </div>
              }
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
    </div>
  )
}
