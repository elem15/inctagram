/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react'

import { useRouter } from 'next/router'

import s from '../../imageList/ui/ImageList.module.scss'

import { ImageListUI } from './ImageListUI'

import { CloseIcon } from '@/shared/assets'
import { useMediaQuery } from '@/shared/lib/hooks'
import { ModalContentUI, PostViewModalSSR } from '@/widgets/postViewModal'

type Props = {
  posts: PostDataToComponent[]
  modalData: PostDataType
}

export const ImageListWidgetSSRModal = ({ posts, modalData }: Props) => {
  const ref = useRef(null)
  const router = useRouter()
  const postId = router.query.postId
  const ownerId = router.query.ownerId
  const isDesktop = useMediaQuery('(min-width: 576px)')

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

  return (
    <>
      {isDesktop ? (
        <>
          <div className={s.container}>
            <ImageListUI posts={posts} />
          </div>
          <div ref={ref} style={{ visibility: 'hidden' }}>
            __________________
          </div>
          <div className={s.withModal}>
            <PostViewModalSSR isOpen closeModal={handleCloseModal} data={modalData} />
          </div>
        </>
      ) : (
        <>
          {modalData && (
            <>
              <div onClick={handleCloseModal} className={s.closeWrapper}>
                <div className={s.closeButton}>
                  <CloseIcon />
                </div>
              </div>
              <ModalContentUI data={modalData} />
              <br />
            </>
          )}
        </>
      )}
    </>
  )
}
