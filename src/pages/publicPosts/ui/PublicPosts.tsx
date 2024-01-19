import { GetServerSideProps } from 'next'

import { BACKEND_URL } from '@/shared/constants/ext-urls'
import { getLargeImage } from '@/shared/lib'
import { useModal } from '@/shared/lib/hooks/open-or-close-hook'
import { ImageListWidgetSSR } from '@/widgets/imageListSSR'
import { getHeaderLayout } from '@/widgets/layouts/header-layout/HeaderLayout'
import { PostViewModalSSR } from '@/widgets/postViewModal'
import { ProfileHeaderWeb } from '@/widgets/profileHeader'

type Props = {
  data: PublicProfile
  postsDataItems: PostDataType[]
  posts: PostDataToComponent[]
  post: PostDataItem
}

export const PublicPosts = ({ data, posts, post }: Props) => {
  return (
    <div className="w-full mx-12 mt-6 mb-12">
      <ProfileHeaderWeb data={data} />
      <ImageListWidgetSSR posts={posts} post={post} />
    </div>
  )
}

PublicPosts.getLayout = getHeaderLayout

export const getServerSideProps: GetServerSideProps = async ctx => {
  const profileId = ctx.params?.ownerId
  const modalId = ctx.query?.modalId
  const postId = null
  const resProfile = await fetch(`${BACKEND_URL}/public-user/profile/${profileId}`)
  const data: PublicProfile = await resProfile.json()
  const resPosts = await fetch(
    `${BACKEND_URL}/public-posts/user/${profileId}/${postId ? postId : ''}?pageSize=16`
  )
  const postsData: PostsData = await resPosts.json()
  const posts: PostDataToComponent[] = postsData.items.map(getLargeImage)
  const post = modalId
    ? typeof +modalId === 'number' && postsData.items.find(p => p.id == +modalId)
    : null

  return { props: { data, posts, ownerId: profileId, post } }
}
