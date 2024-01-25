import { PublicPostsCardsListUI } from './PublicPostsCardsListUI'

import { useGetPublicPostsQuery } from '@/entities/publicPosts'
import { useErrorHandler, useFetchLoader } from '@/shared/lib'

export const PublicPostsCardsList = () => {
  const { data, error, isLoading } = useGetPublicPostsQuery()

  useFetchLoader(isLoading)

  useErrorHandler(error as CustomerError)

  return <>{data && <PublicPostsCardsListUI items={data.items} />}</>
}
