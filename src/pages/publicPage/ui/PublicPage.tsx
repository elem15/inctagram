import { getHeaderLayout } from '@/widgets/layouts/header-layout/HeaderLayout'
import { PublicProfileCardsList } from '@/widgets/publicProfileCardsList'
import { RegisteredUsers } from '@/widgets/registeredUsersCounter'

const PublicPage = () => {
  return (
    <div className=" w-full mx-12 mt-6 mb-12">
      <RegisteredUsers />
      <PublicProfileCardsList />
    </div>
  )
}

PublicPage.getLayout = getHeaderLayout

export { PublicPage }
