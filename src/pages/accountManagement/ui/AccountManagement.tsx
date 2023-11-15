import { getHeaderWithSidebarLayout } from '@/widgets/layouts'
import { AccountManagement } from '@/widgets/profileSettings'

const AccountManagementPage = () => {
  return (
    <div className="bg-dark-700 pt-10 pl-6 pr-16">
      <AccountManagement />
    </div>
  )
}

AccountManagementPage.getLayout = getHeaderWithSidebarLayout

export { AccountManagementPage }
