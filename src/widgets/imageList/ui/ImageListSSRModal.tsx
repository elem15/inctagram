/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react'

import { useRouter } from 'next/router'

import s from '../../imageList/ui/ImageList.module.scss'

import { ImageListUI } from './ImageListUI'

import { useMediaQuery } from '@/shared/lib/hooks'
import { ModalContentUI, PostViewModalSSR } from '@/widgets/postViewModal'

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
  const isDesktop = useMediaQuery('(min-width: 576px)')

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
      {isDesktop ? (
        <>
          <div className={s.container}>
            <ImageListUI posts={posts} openModal={openModal} />
          </div>
          <div ref={ref} style={{ visibility: 'hidden' }}>
            __________________
          </div>
          <div className={s.withModal}>
            <PostViewModalSSR isOpen closeModal={handleCloseModal} data={postModal} />
          </div>
        </>
      ) : (
        <>{postModal && <ModalContentUI data={postModal} />}</>
      )}
    </>
  )
}
