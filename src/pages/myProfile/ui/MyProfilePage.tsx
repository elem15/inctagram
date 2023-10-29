import { useRouter } from 'next/router'

import { getSidebarLayout } from '@/widgets/layouts'
import { getHeaderLayout } from '@/widgets/layouts/header-layout/HeaderLayout'
import { getHeaderWithSidebarLayout } from '@/widgets/layouts/header-with-sidebar-layout/HeaderWithSidebarLayout'
import { MyProfile } from '@/widgets/myProfile/MyProfile'
import { TermsOfService } from '@/widgets/termsOfService/TermsOfService'

const MyProfilePage = () => {
  return (
    <div className="flex justify-center items-center bg-dark-700">
      <MyProfile />
    </div>
  )
}

MyProfilePage.getLayout = getHeaderWithSidebarLayout

export { MyProfilePage }
