import { RegisteredUsersUI } from './RegisteredUsersUI'

import { useGetPublicPostsQuery } from '@/entities/publicPosts'
import { useErrorHandler, useFetchLoader } from '@/shared/lib'

export const RegisteredUsers = () => {
  const { data, error, isLoading, isSuccess } = useGetPublicPostsQuery()

  useFetchLoader(isLoading)
  useErrorHandler(error as CustomerError)

  return <>{isSuccess && <RegisteredUsersUI totalUsers={data.totalUsers} />}</>
}
