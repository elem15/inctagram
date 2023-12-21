import { useGetPublicPostsQuery } from '@/entities/publicPosts'
import { PublicPostCard } from '@/shared/components/public-post-card'
import { Spinner } from '@/widgets/spinner'

export const PublicPostsCardsList = () => {
  const {
    data,
    isError: isErrorPublicPostsData,
    isLoading: isLoadingPublicPostsData,
  } = useGetPublicPostsQuery()

  return (
    <div className="flex items-center justify-center ">
      <div className=" max-md:flex  max-md:flex-col   sm:flex sm:flex-wrap  gap-x-3 ">
        <PublicPostCard />
      </div>
    </div>
  )
}
