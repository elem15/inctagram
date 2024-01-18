import { useRouter } from 'next/router'

import { useGetPublicProfileQuery } from '@/entities/profile/api/profileApi'
import { useErrorHandler, useFetchLoader } from '@/shared/lib'
import { ImageListWidget } from '@/widgets/imageList'
import { getHeaderLayout } from '@/widgets/layouts/header-layout/HeaderLayout'
import { ProfileHeaderWeb } from '@/widgets/profileHeader'

const PublicPosts = () => {
  let {
    query: { ownerId },
  } = useRouter()

  if (ownerId && !Array.isArray(ownerId)) {
    ownerId = ownerId as string
  } else {
    ownerId = ''
  }

  const { data, isLoading, error } = useGetPublicProfileQuery({
    profileId: ownerId,
  })

  useFetchLoader(isLoading)
  useErrorHandler(error as CustomerError)

  return (
    <div className=" w-full mx-12 mt-6 mb-12">
      {data ? <ProfileHeaderWeb data={data} /> : null}
      {ownerId ? <ImageListWidget userId={+ownerId} /> : null}
    </div>
  )
}

PublicPosts.getLayout = getHeaderLayout

export { PublicPosts }
