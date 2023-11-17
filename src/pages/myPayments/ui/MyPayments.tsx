import { getHeaderWithSidebarLayout } from '@/widgets/layouts'
import { MyPayments } from '@/widgets/profileSettings'

const MyPaymentsPage = () => {
  return (
    <div className="bg-dark-700 pt-10 pl-6 pr-16">
      <MyPayments />
    </div>
  )
}

MyPaymentsPage.getLayout = getHeaderWithSidebarLayout

export { MyPaymentsPage }
