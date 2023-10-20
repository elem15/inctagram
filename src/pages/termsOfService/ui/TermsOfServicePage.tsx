import { getHeaderLayout } from '@/widgets/layouts/header-layout/HeaderLayout'
import { TermsOfService } from '@/widgets/termsOfService/TermsOfService'

const TermsOfServicePage = () => {
  return (
    <div className="flex justify-center items-center bg-dark-700">
      <TermsOfService onBackToSignUpClick={() => {}} />
    </div>
  )
}

TermsOfServicePage.getLayout = getHeaderLayout

export { TermsOfServicePage }
