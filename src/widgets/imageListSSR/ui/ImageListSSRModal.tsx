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

export const ImageListWidgetSSRModal = ({ posts, postsDataItems }: Props) => {
  const ref = useRef(null)
  const [postModal, setPostModal] = useState<PostDataType>()
  const router = useRouter()
  const modalId = router.query.modalId
  const postId = router.query.postId
  const ownerId = router.query.ownerId

  useEffect(() => {
    const post = modalId
      ? typeof +modalId === 'number' && postsDataItems.find(p => p.id === +modalId!)
      : null

    post && setPostModal(post)
  }, [modalId])

  const handleCloseModal = () => {
    let pathname: string

    if (router.pathname.includes('modalId')) {
      pathname = `${router.pathname.replace('[modalId]', '').replace('[ownerId]', ownerId + '')}`
    } else {
      pathname = `${router.asPath.split('?')[0]}`
    }
    router.push(
      {
        pathname,
        query: postId ? { postId } : null,
      },
      undefined,
      { shallow: true, scroll: false }
    )
  }

  const openModal = (id: number) => {
    let pathname: string

    if (router.pathname.includes('modalId')) {
      pathname = `${router.pathname.replace('[modalId]', id + '').replace('[ownerId]', ownerId + '')}`
    } else {
      pathname = `${router.asPath.split('?')[0]}/${id}`
    }
    router.push({ pathname, query: postId ? { postId } : null }, undefined, {
      shallow: true,
      scroll: false,
    })
  }

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
      <PostViewModalSSR isOpen closeModal={handleCloseModal} data={postModal} />
    </>
  )
}
