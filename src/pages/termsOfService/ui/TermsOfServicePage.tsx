import { useRouter } from 'next/router'

import { getHeaderLayout } from '@/widgets/layouts/header-layout/HeaderLayout'
import { TermsOfService } from '@/widgets/termsOfService/TermsOfService'

const TermsOfServicePage = () => {
  const router = useRouter()
  const handleBackToSignUpClick = () => {
    router.push('/signup')
  }

  return (
    <div className="flex justify-center items-center bg-dark-700">
      <TermsOfService onBackToSignUpClick={handleBackToSignUpClick} />
    </div>
  )
}

TermsOfServicePage.getLayout = getHeaderLayout

export { TermsOfServicePage }
