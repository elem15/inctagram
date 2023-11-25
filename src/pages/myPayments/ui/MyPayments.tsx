import { getHeaderWithSidebarLayout } from '@/widgets/layouts'
import { MyPayments } from '@/widgets/profileSettings'

const MyPaymentsPage = () => {
  return (
    <div className="bg-dark-700 pt-10 pl-6 pr-6 md:pr-16 pb-16 md:pb-0">
      <MyPayments />
    </div>
  )
}

MyPaymentsPage.getLayout = getHeaderWithSidebarLayout

export { MyPaymentsPage }
