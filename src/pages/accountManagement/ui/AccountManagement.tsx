import { getHeaderWithSidebarLayout } from '@/widgets/layouts'
import { AccountManagement } from '@/widgets/profileSettings'

const AccountManagementPage = () => {
  return (
    <div className="bg-dark-700 pt-10 pl-6 pr-6 md:pr-16 pb-16 lg:pb-0">
      <AccountManagement />
    </div>
  )
}

AccountManagementPage.getLayout = getHeaderWithSidebarLayout

export { AccountManagementPage }
