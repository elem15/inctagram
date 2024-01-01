import s from './MyProfile.module.scss'

import { useGetProfileQuery } from '@/entities/profile'
import { useErrorHandler, useFetchLoader } from '@/shared/lib'
import { useAuth } from '@/shared/lib/hooks/useAuth'
import { ImageListWidget } from '@/widgets/imageList'
import { getHeaderWithSidebarLayout } from '@/widgets/layouts'
import { ProfileHeaderWeb } from '@/widgets/profileHeader'

function MyProfile() {
  const { userId, accessToken, isAuth } = useAuth()
  const { data, isLoading, error } = useGetProfileQuery({
    accessToken,
  } as UserAuthData)

  useFetchLoader(isLoading)
  useErrorHandler(error as CustomerError)

  return (
    <div className={s.container}>
      {data && <ProfileHeaderWeb data={data} isAuth={isAuth} />}
      {userId && <ImageListWidget userId={userId} />}
    </div>
  )
}

MyProfile.getLayout = getHeaderWithSidebarLayout

export { MyProfile }
