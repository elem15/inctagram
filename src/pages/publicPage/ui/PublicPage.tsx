import { getHeaderLayout } from '@/widgets/layouts/header-layout/HeaderLayout'
import { PublicPostsCardsList } from '@/widgets/publicPostsCardsList'
import { RegisteredUsers } from '@/widgets/registeredUsersCounter'

const PublicPage = () => {
  return (
    <div className=" w-full mx-12 mt-6 mb-12">
      <RegisteredUsers />
      <PublicPostsCardsList />
    </div>
  )
}

PublicPage.getLayout = getHeaderLayout

export { PublicPage }
