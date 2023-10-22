import { useRouter } from 'next/router'

import { getHeaderLayout } from '@/widgets/layouts/header-layout/HeaderLayout'
import { PrivacyPolicy } from '@/widgets/privacyPolicy/PrivacyPolicy'

const PrivacyPolicyPage = () => {
  const router = useRouter()
  const handleBackToSignUpClick = () => {
    router.push('/signup')
  }

  return (
    <div className="flex justify-center items-center bg-dark-700">
      <PrivacyPolicy onBackToSignUpClick={handleBackToSignUpClick} />
    </div>
  )
}

PrivacyPolicyPage.getLayout = getHeaderLayout

export { PrivacyPolicyPage }
