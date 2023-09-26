import { FC } from 'react'

import { SignUpWidget } from '@/widgets/signUp'

export const SignUpPage: FC = () => {
  return (
    <div className="flex justify-center min-h-screen items-center bg-dark-700">
      <SignUpWidget />
    </div>
  )
}
