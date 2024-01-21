import { useEffect, useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import s from './PostEdit.module.scss'

import { useUpdatePostMutation } from '@/entities/posts'
import { publicPostsApi } from '@/entities/publicPosts'
import { Button, Textarea, Typography } from '@/shared/components'
import { useAppDispatch, useErrorHandler, useFetchLoader, useTranslation } from '@/shared/lib'
import { useAuth } from '@/shared/lib/hooks/useAuth'

type Props = {
  postId: number
  ownerId: number
  avatarOwner: string
  firstName: string
  lastName: string
  description: string
  setModalType: (modalType: 'edit' | 'view') => void
  closeModal: () => void
  isPostEdit: boolean
  setIsPostEdit: (isPostEdit: boolean) => void
}

export const PostEdit = ({
  ownerId,
  avatarOwner,
  firstName,
  lastName,
  description,
  postId,
  isPostEdit,
  setIsPostEdit,
  setModalType,
}: Props) => {
  const { t } = useTranslation()
  const [postDescription, addDescription] = useState(description)
  const { accessToken } = useAuth()
  const [updatedPost, { isLoading, error }] = useUpdatePostMutation()
  const dispatch = useAppDispatch()

  useEffect(() => {
    setIsPostEdit(postDescription === description)
  }, [description, postDescription, setIsPostEdit])

  const handleUpdate = () => {
    updatedPost({ description: postDescription, accessToken, postId })
      .unwrap()
      .then(() => {
        dispatch(publicPostsApi.util.resetApiState())
        setModalType('view')
      })
  }

  useFetchLoader(isLoading)
  useErrorHandler(error as CustomerError)

  return (
    <div className={s.container}>
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
      </header>
      <main className={s.main}>
        <Textarea
          label={t.post_view.description}
          className={s.description}
          value={postDescription}
          onChange={e => {
            addDescription(e.target.value)
          }}
          isError={postDescription.length > 500}
          errorMessage={postDescription.length > 500 ? t.post_view.post_error : ''}
        />
        <Typography variant="small_text" className={s.counter}>
          {postDescription.length}/500
        </Typography>
      </main>
      <footer>
        <div className={s.submit}>
          <Button
            variant="primary"
            onClick={handleUpdate}
            disabled={isPostEdit || postDescription.length > 500}
          >
            {t.post_view.save}
          </Button>
        </div>
      </footer>
    </div>
  )
}
