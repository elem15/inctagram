import { BACKEND_URL, BASE_URL } from '@/shared/constants/ext-urls'
import { getHeaderLayout } from '@/widgets/layouts/header-layout/HeaderLayout'
import { PublicPostsCardsList } from '@/widgets/publicPostsCardsList'
import { RegisteredUsers } from '@/widgets/registeredUsersCounter'
import { RegisteredUsersUI } from '@/widgets/registeredUsersCounter/ui/RegisteredUsersUI'

const PublicPage = ({ data }: { data: PublicPostsResponseData }) => {
  return (
    <div className=" w-full mx-12 mt-6 mb-12">
      <RegisteredUsersUI totalUsers={data.totalUsers} />
      {/* <PublicPostsCardsList /> */}
    </div>
  )
}

export async function getStaticProps() {
  const res = await fetch(`${BACKEND_URL}/public-posts/all/?pageSize=4&sortDirection=desc`)
  const data: PublicPostsResponseData = await res.json()

  return { props: { data }, revalidate: 60 }
}

PublicPage.getLayout = getHeaderLayout

export { PublicPage }
