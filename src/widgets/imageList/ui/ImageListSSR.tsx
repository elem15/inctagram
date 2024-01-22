/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react'

import { useRouter } from 'next/router'

import s from '../../imageList/ui/ImageList.module.scss'

import { ImageListUI } from './ImageListUI'

type Props = {
  posts: PostDataToComponent[]
  postsDataItems: PostDataType[]
}

export const ImageListWidgetSSR = ({ posts }: Props) => {
  const ref = useRef(null)
  const router = useRouter()
  const postId = router.query.postId
  const ownerId = router.query.ownerId

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const lastPostId = posts.at(-1)?.id

        if (entry.isIntersecting && lastPostId != postId) {
          router.push(
            {
              pathname: router.asPath.split('?')[0],
              query: { postId: lastPostId },
            },
            undefined,
            { shallow: false, scroll: false }
          )
        }
      },
      { rootMargin: '200px', threshold: 0.5 }
    )

    ref?.current && observer.observe(ref.current)

    return () => {
      observer && observer.disconnect()
    }
  }, [postId])

  return (
    <>
      <div className={s.container}>
        <ImageListUI posts={posts} openModal={openModal} />
      </div>
      <div ref={ref} style={{ visibility: 'hidden' }}>
        __________________
      </div>
    </>
  )
}
