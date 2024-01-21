/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react'

import { useRouter } from 'next/router'

import s from '../../imageList/ui/ImageList.module.scss'

import { ImageCard } from '@/shared/components/imageCard'
import { PostViewModalSSR } from '@/widgets/postViewModal'

type Props = {
  posts: PostDataToComponent[]
  postsDataItems: PostDataType[]
}

export const ImageListWidgetSSR = ({ posts, postsDataItems }: Props) => {
  const ref = useRef(null)
  const [postModal, setPostModal] = useState<PostDataType>()
  const router = useRouter()
  const [modalId, setModalId] = useState(router.query.modalId)
  let postId = router.query.postId as string | undefined

  useEffect(() => {
    const post = modalId
      ? typeof +modalId === 'number' && postsDataItems.find(p => p.id === +modalId!)
      : null

    post && setPostModal(post)
  }, [modalId])

  const handleCloseModal = () => {
    router.replace(
      {
        pathname: router.asPath.split('?')[0],
        query: { postId, modalId: '' },
      },
      undefined,
      { shallow: true, scroll: false }
    )
    setModalId('')
  }

  const openModal = (id: number) => {
    router.replace(
      {
        pathname: router.asPath.split('?')[0],
        query: { postId, modalId: id },
      },
      undefined,
      { shallow: true, scroll: false }
    )
    setModalId(id + '')
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const lastPostId = posts.at(-1)?.id

        if (entry.isIntersecting && lastPostId != postId) {
          router.replace(
            {
              pathname: router.asPath.split('?')[0],
              query: { postId: lastPostId },
            },
            undefined,
            { shallow: false, scroll: false }
          )
        }
      },
      { rootMargin: '0px' }
    )

    ref?.current && observer.observe(ref.current)

    return () => {
      observer && observer.disconnect()
    }
  }, [postId])

  return (
    <>
      <div className={s.container}>
        {!!posts &&
          posts.length > 0 &&
          posts.map(({ id, url, description, width, height }) => (
            <ImageCard
              key={id}
              postId={id}
              src={url}
              alt={description}
              width={width}
              height={height}
              openModal={openModal}
            />
          ))}
      </div>
      <div ref={ref} style={{ visibility: 'hidden' }}>
        __________________
      </div>
      <PostViewModalSSR
        isOpen={postModal?.id === +modalId!}
        closeModal={handleCloseModal}
        data={postModal}
      />
    </>
  )
}
