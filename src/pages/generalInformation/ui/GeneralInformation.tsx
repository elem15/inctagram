import { getHeaderWithSidebarLayout } from '@/widgets/layouts'
import { GeneralInformation } from '@/widgets/profileSettings'

const GeneralInformationPage = () => {
  return (
    <div className="bg-dark-700 pt-10 pl-6 pr-16">
      <GeneralInformation />
    </div>
  )
}

GeneralInformationPage.getLayout = getHeaderWithSidebarLayout

export { GeneralInformationPage }
