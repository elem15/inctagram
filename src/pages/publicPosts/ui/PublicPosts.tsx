import { GetServerSideProps } from 'next'

import { BACKEND_URL } from '@/shared/constants/ext-urls'
import { getLargeImage } from '@/shared/lib'
import { useAuth } from '@/shared/lib/hooks/useAuth'
import { ImageListWidgetSSR } from '@/widgets/imageListSSR'
import { getHeaderLayout } from '@/widgets/layouts/header-layout/HeaderLayout'
import { ProfileHeaderWeb } from '@/widgets/profileHeader'

type Props = {
  data: PublicProfile
  postsDataItems: PostDataType[]
  posts: PostDataToComponent[]
  totalCount: number
}

export const PublicPosts = ({ data, posts, postsDataItems, totalCount }: Props) => {
  const { userId, isAuth } = useAuth()

  return (
    <div className="w-full mx-12 mt-6 mb-12">
      <ProfileHeaderWeb data={data} isAuth={isAuth} userId={userId} totalCount={totalCount} />
      <ImageListWidgetSSR posts={posts} postsDataItems={postsDataItems} />
    </div>
  )
}

PublicPosts.getLayout = getHeaderLayout

let profileIdRef: string | string[] | undefined
let postIdRef: string | string[] | undefined
let postsDataItems: PostDataItem[] = []
let data: PublicProfile
let posts: PostDataToComponent[]
let totalCount: number

export const getServerSideProps: GetServerSideProps = async ctx => {
  const profileId = ctx.params?.ownerId
  const postId = ctx.query?.postId

  if (profileIdRef !== profileId) {
    postsDataItems = []
    const resProfile: Response = await fetch(`${BACKEND_URL}/public-user/profile/${profileId}`)

    data = await resProfile.json()
  }
  if (profileIdRef !== profileId || postIdRef !== postId) {
    const resPosts: Response = await fetch(
      `${BACKEND_URL}/public-posts/user/${profileId}/${postId ? postId : ''}?pageSize=8`
    )
    const data = await resPosts.json()
    const resPostsDataItems: PostDataItem[] = data.items

    totalCount = data.totalCount
    const index = postsDataItems.findIndex(post => post.id === resPostsDataItems[0]?.id)

    postsDataItems = index === -1 ? [...postsDataItems, ...resPostsDataItems] : postsDataItems
    posts = postsDataItems.map(getLargeImage)
  }
  profileIdRef = profileId
  postIdRef = postId

  return { props: { data, posts, postsDataItems, totalCount } }
}
