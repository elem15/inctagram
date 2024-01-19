import { useEffect } from 'react'

import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'

import { BACKEND_URL } from '@/shared/constants/ext-urls'
import { getLargeImage } from '@/shared/lib'
import { useAuth } from '@/shared/lib/hooks/useAuth'
import { ImageListWidgetSSR } from '@/widgets/imageListSSR'
import { getHeaderLayout } from '@/widgets/layouts/header-layout/HeaderLayout'
import { ProfileHeaderWeb } from '@/widgets/profileHeader'

type Props = { data: PublicProfile; posts: PostDataToComponent[]; ownerId: number }

export const PublicPosts = ({ data, posts, ownerId }: Props) => {
  const { isAuth, userId } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isAuth && userId === ownerId) {
      router.push('/my-profile')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth])

  return (
    <>
      {userId !== ownerId && (
        <div className="w-full mx-12 mt-6 mb-12">
          <ProfileHeaderWeb data={data} />
          <ImageListWidgetSSR posts={posts} />
        </div>
      )}
    </>
  )
}

PublicPosts.getLayout = getHeaderLayout

export const getServerSideProps: GetServerSideProps = async ctx => {
  const profileId = ctx.params?.ownerId
  const postId = ctx.query.from
  const resProfile = await fetch(`${BACKEND_URL}/public-user/profile/${profileId}`)
  const data: PublicProfile = await resProfile.json()
  const resPosts = await fetch(
    `${BACKEND_URL}/public-posts/user/${profileId}/${postId ? postId : ''}?pageSize=16`
  )
  const postsData: PostsData = await resPosts.json()
  const posts: PostDataToComponent[] = postsData.items.map(getLargeImage)

  return { props: { data, posts, ownerId: profileId } }
}
