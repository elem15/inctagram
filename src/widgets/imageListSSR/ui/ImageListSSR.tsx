/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'

import s from '../../imageList/ui/ImageList.module.scss'

import { ImageCard } from '@/shared/components/imageCard'
import { useModal } from '@/shared/lib/hooks/open-or-close-hook'
import { PostViewModalSSR } from '@/widgets/postViewModal'

type Props = {
  posts: PostDataToComponent[]
  postsDataItems: PostDataType[]
}

export const ImageListWidgetSSR = ({ posts, postsDataItems }: Props) => {
  const { openModal } = useModal()
  const [postModal, setPostModal] = useState<PostDataType>()
  const router = useRouter()
  const searchParams = useSearchParams()
  const modalId = searchParams?.get('modalId') as string | undefined

  useEffect(() => {
    const post = modalId
      ? typeof +modalId === 'number' && postsDataItems.find(p => p.id === +modalId!)
      : null

    post && setPostModal(post)
    modalId && openModal()
  }, [modalId])

  const handleCloseModal = () => {
    router.replace({
      pathname: router.asPath.split('?')[0],
      query: { modalId: '' },
    })
  }

  return (
    <>
      <div className={s.container}>
        {!!posts &&
          posts.length > 0 &&
          posts.map(({ id, url, description, width, height }) => (
            <Link
              href={{
                pathname: router.asPath.split('?')[0],
                query: { modalId: id },
              }}
              passHref
              replace
              key={id}
            >
              <ImageCard
                postId={id}
                src={url}
                alt={description}
                width={width}
                height={height}
                openModal={() => null}
              />
            </Link>
          ))}
      </div>

      <PostViewModalSSR
        isOpen={postModal?.id == +modalId!}
        closeModal={handleCloseModal}
        data={postModal}
      />
    </>
  )
}
