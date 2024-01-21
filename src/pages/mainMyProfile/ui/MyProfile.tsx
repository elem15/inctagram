import s from './MyProfile.module.scss'

import { useGetPostsQuery } from '@/entities/posts'
import { useGetProfileQuery } from '@/entities/profile'
import { useGetPublicPostsQuery } from '@/entities/publicPosts'
import { useErrorHandler, useFetchLoader } from '@/shared/lib'
import { useAuth } from '@/shared/lib/hooks/useAuth'
import { ImageListWidget } from '@/widgets/imageList'
import { getHeaderWithSidebarLayout } from '@/widgets/layouts'
import { ProfileHeaderWeb } from '@/widgets/profileHeader'

function MyProfile() {
  const { userId, accessToken, isAuth } = useAuth()
  const { data, isLoading, error } = useGetProfileQuery({
    accessToken,
  })
  const { data: postsData } = useGetPostsQuery({ userId })

  useFetchLoader(isLoading)
  useErrorHandler(error as CustomerError)

  return (
    <div className={s.container}>
      {data ? (
        <ProfileHeaderWeb data={data} isAuth={isAuth} totalCount={postsData?.totalCount} />
      ) : null}
      {userId ? <ImageListWidget userId={userId} /> : null}
    </div>
  )
}

MyProfile.getLayout = getHeaderWithSidebarLayout

export { MyProfile }
