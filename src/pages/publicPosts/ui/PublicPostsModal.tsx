import { useAuth } from '@/shared/lib/hooks/useAuth'
import { ImageListWidgetSSRModal } from '@/widgets/imageList'
import { getHeaderLayout } from '@/widgets/layouts/header-layout/HeaderLayout'
import { ProfileHeaderWeb } from '@/widgets/profileHeader'

type Props = {
  data: PublicProfile
  postsDataItems: PostDataType[]
  posts: PostDataToComponent[]
  totalCount: number
}

export const PublicPostsModal = ({ data, posts, postsDataItems, totalCount }: Props) => {
  const { userId, isAuth } = useAuth()

  return (
    <div className="w-full mx-12 mt-6 mb-12">
      <ProfileHeaderWeb data={data} isAuth={isAuth} userId={userId} totalCount={totalCount} />
      <ImageListWidgetSSRModal posts={posts} postsDataItems={postsDataItems} />
    </div>
  )
}

PublicPostsModal.getLayout = getHeaderLayout
