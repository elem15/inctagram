import { getHeaderWithSidebarLayout } from '@/widgets/layouts/header-with-sidebar-layout/HeaderWithSidebarLayout'
import { ProfileSettings } from '@/widgets/profileSettings'

const MyProfilePage = () => {
  return (
    <div className="bg-dark-700 pt-10 pl-6 pr-16">
      <ProfileSettings />
    </div>
  )
}

MyProfilePage.getLayout = getHeaderWithSidebarLayout

export { MyProfilePage }
