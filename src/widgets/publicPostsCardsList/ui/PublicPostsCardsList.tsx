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
      <div className="flex justify-center flex-wrap gap-x-3 ">
        {isLoadingPublicPostsData && <Spinner />}
        {data?.publicPostsData.map((el: PostDataType) => {
          return (
            <PublicPostCard
              key={el.id}
              ownerId={el.ownerId}
              profileImage={el.avatarOwner}
              imagesUrl={el.images}
              firstName={el.owner.firstName}
              lastName={el.owner.lastName}
              description={el.description}
              updatedAt={el.updatedAt}
            />
          )
        })}
      </div>
    </div>
  )
}
