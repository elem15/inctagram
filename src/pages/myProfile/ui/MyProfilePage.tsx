import { Sidebar } from '@/shared/components/sidebar'
import { getHeaderWithSidebarLayout } from '@/widgets/layouts/header-with-sidebar-layout/HeaderWithSidebarLayout'
import { ProfileSettings } from '@/widgets/profileSettings'

const MyProfilePage = () => {
  return (
    <div className="bg-dark-700 pt-10 pl-6 pr-16 flex gap-5 p-12">
      <div className="hidden lg:flex">
        <Sidebar />
      </div>
      <div className="flex-grow">
        <ProfileSettings />
      </div>
    </div>
  )
}

MyProfilePage.getLayout = getHeaderWithSidebarLayout

export { MyProfilePage }
