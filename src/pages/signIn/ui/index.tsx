import { FC } from 'react'

import { SignInWidget } from '@/widgets/signIn'

export const SignInPage: FC = () => {
  return (
    <div className="flex justify-center min-h-screen items-center bg-dark-700">
      <SignInWidget />
    </div>
  )
}
