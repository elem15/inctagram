import { getHeaderWithSidebarLayout } from '@/widgets/layouts/'
import { Devices } from '@/widgets/profileSettings'

const DevicesPage = () => {
  return (
    <div className="bg-dark-700 pt-10 pl-6 pr-6 md:pr-16 pb-16 lg:pb-0">
      <Devices />
    </div>
  )
}

DevicesPage.getLayout = getHeaderWithSidebarLayout

export { DevicesPage }
