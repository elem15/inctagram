/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'

import s from '../../imageList/ui/ImageList.module.scss'

import { ImageCard } from '@/shared/components/imageCard'
import { useModal } from '@/shared/lib/hooks/open-or-close-hook'
import { PostViewModalSSR } from '@/widgets/postViewModal'

type Props = {
  posts: PostDataToComponent[]
  post: PostDataItem
}

export const ImageListWidgetSSR = ({ posts, post }: Props) => {
  const { openModal } = useModal()
  const router = useRouter()
  const searchParams = useSearchParams()
  const postNumber = searchParams?.get('modalId') as string | undefined

  useEffect(() => {
    postNumber && openModal()
  }, [postNumber])

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
                openModal={openModal}
              />
            </Link>
          ))}
      </div>

      <PostViewModalSSR
        isOpen={post?.id == +postNumber!}
        closeModal={handleCloseModal}
        data={post}
      />
    </>
  )
}
