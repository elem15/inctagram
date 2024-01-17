import { useGetPublicPostsQuery } from '@/entities/publicPosts'
import { PublicPostCard } from '@/shared/components/public-post-card'
import { useErrorHandler, useFetchLoader } from '@/shared/lib'

export const PublicPostsCardsList = () => {
  const { data, error, isLoading } = useGetPublicPostsQuery()

  useFetchLoader(isLoading)

  useErrorHandler(error as CustomerError)

  return (
    <div className="flex items-center justify-center ">
      <div className="flex justify-center flex-wrap gap-x-3 ">
        {data?.publicPostsData.map((el: PostDataType) => {
          return (
            <PublicPostCard
              key={el.id}
              ownerId={el.ownerId}
              profileImage={el.avatarOwner}
              imagesUrl={el.images}
              userName={el.userName}
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
