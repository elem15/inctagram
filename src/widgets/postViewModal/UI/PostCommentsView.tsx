import Image from 'next/image'
import Link from 'next/link'

import s from './PostCommentsView.module.scss'

import { Typography } from '@/shared/components'

type Props = {
  ownerId: number
  avatarOwner: string
  firstName: string
  lastName: string
}
export const PostCommentsView = ({ ownerId, avatarOwner, firstName, lastName }: Props) => {
  return (
    <div>
      <header className={s.header}>
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
      </header>
    </div>
  )
}
