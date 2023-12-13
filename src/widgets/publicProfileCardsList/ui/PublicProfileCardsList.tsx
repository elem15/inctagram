import { useGetPublicPostsQuery } from '@/entities/publicPosts'
import { PublicProfileCard } from '@/shared/components/public-profile-card'

export const PublicProfileCardsList = () => {
  const {
    data,
    isError: isErrorPublicPostsData,
    isLoading: isLoadingPublicPostsData,
  } = useGetPublicPostsQuery()

  return (
    <div className="flex items-center justify-center ">
      <div className=" max-md:flex  max-md:flex-col   sm:flex sm:flex-wrap  gap-x-3 ">
        {data?.publicPostsData.map((el: any, key: number) => {
          return (
            <PublicProfileCard
              key={key}
              profileImage={el.avatarImage}
              imagesUrl={el.images}
              firstName={el.owner.firstName}
              lastName={el.owner.lastName}
              description={el.description}
            />
          )
        })}
      </div>
    </div>
  )
}
