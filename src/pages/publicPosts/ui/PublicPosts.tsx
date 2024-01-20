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
}

export const PublicPosts = ({ data, posts, postsDataItems }: Props) => {
  const { userId, isAuth } = useAuth()

  return (
    <div className="w-full mx-12 mt-6 mb-12">
      <ProfileHeaderWeb data={data} isAuth={isAuth} userId={userId} />
      <ImageListWidgetSSR posts={posts} postsDataItems={postsDataItems} />
    </div>
  )
}

PublicPosts.getLayout = getHeaderLayout

let profileIdRef: string | string[] | undefined
let resProfile: Response
let data: PublicProfile
let resPosts: Response
let postsData: PostsData
let posts: PostDataToComponent[]

export const getServerSideProps: GetServerSideProps = async ctx => {
  const profileId = ctx.params?.ownerId
  const modalId = ctx.query?.modalId

  const postId = null

  if (profileId !== profileIdRef) {
    resProfile = await fetch(`${BACKEND_URL}/public-user/profile/${profileId}`)
    data = await resProfile.json()
    resPosts = await fetch(
      `${BACKEND_URL}/public-posts/user/${profileId}/${postId ? postId : ''}?pageSize=16`
    )
    postsData = await resPosts.json()
    posts = postsData.items.map(getLargeImage)
  }

  profileIdRef = profileId

  return { props: { data, posts, postsDataItems: postsData.items } }
}
