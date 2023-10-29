import { getHeaderWithSidebarLayout } from '@/widgets/layouts/header-with-sidebar-layout/HeaderWithSidebarLayout'
import { MyProfile } from '@/widgets/myProfile/MyProfile'

const MyProfilePage = () => {
  return (
    <div className="flex justify-center items-center bg-dark-700">
      <MyProfile />
    </div>
  )
}

MyProfilePage.getLayout = getHeaderWithSidebarLayout

export { MyProfilePage }
