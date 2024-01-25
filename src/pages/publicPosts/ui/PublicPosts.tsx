import { GetServerSideProps } from 'next'

import { BACKEND_URL } from '@/shared/constants/ext-urls'
import { getLargeImage } from '@/shared/lib'
import { useAuth } from '@/shared/lib/hooks/useAuth'
import { ImageListWidgetSSR } from '@/widgets/imageList'
import { getHeaderLayout } from '@/widgets/layouts/header-layout/HeaderLayout'
import { ProfileHeaderWeb } from '@/widgets/profileHeader'

type Props = {
  data: PublicProfile
  posts: PostDataToComponent[]
  totalCount: number
}

export const PublicPosts = ({ data, posts, totalCount }: Props) => {
  const { userId, isAuth } = useAuth()

  return (
    <div className="w-full mx-12 mt-6 mb-12">
      <ProfileHeaderWeb data={data} isAuth={isAuth} userId={userId} totalCount={totalCount} />
      <ImageListWidgetSSR posts={posts} />
    </div>
  )
}

PublicPosts.getLayout = getHeaderLayout

let profileIdRef: string | string[] | undefined
let postIdRef: string | string[] | undefined
let modalIdRef: string | string[] | undefined
let modalData: PostDataType | null = null
let postsDataItems: PostDataItem[] = []
let data: PublicProfile
let posts: PostDataToComponent[]
let totalCount: number

export const getServerSideProps: GetServerSideProps = async ctx => {
  const profileId = ctx.params?.ownerId
  const modalId = ctx.params?.modalId
  const postId = ctx.query?.postId

  if (profileIdRef !== profileId) {
    postsDataItems = []
    const resProfile: Response = await fetch(`${BACKEND_URL}/public-user/profile/${profileId}`)

    data = await resProfile.json()
    if (!data?.id) {
      return {
        notFound: true,
      }
    }
  }

  if (modalId && modalId !== modalIdRef) {
    const res: Response = await fetch(`${BACKEND_URL}/public-posts/${modalId}`)

    modalData = await res.json()
    if (!modalData?.id) {
      return {
        notFound: true,
      }
    }
  }

  if (profileIdRef !== profileId || postIdRef !== postId) {
    const resPosts: Response = await fetch(
      `${BACKEND_URL}/public-posts/user/${profileId}/${postId ? postId : ''}?pageSize=8`
    )
    const data = await resPosts.json()

    if (!data?.items) {
      return {
        notFound: true,
      }
    }
    const resPostsDataItems: PostDataItem[] = data.items

    totalCount = data.totalCount
    const index = postsDataItems.findIndex(post => post.id === resPostsDataItems[0]?.id)

    postsDataItems = index === -1 ? [...postsDataItems, ...resPostsDataItems] : postsDataItems
    posts = postsDataItems.map(getLargeImage)
  }
  profileIdRef = profileId
  modalIdRef = modalId
  postIdRef = postId

  return { props: { data, posts, totalCount, modalData } }
}
