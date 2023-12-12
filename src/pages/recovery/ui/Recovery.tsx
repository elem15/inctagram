import { useEffect } from 'react'

import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'

import { useValidCodeMutation } from '@/entities/auth'
import { useFetchLoader } from '@/shared/lib'
import { getHeaderLayout } from '@/widgets/layouts/header-layout/HeaderLayout'

const Recovery = () => {
  const [validCode, { isLoading }] = useValidCodeMutation()

  const router = useRouter()
  const searchParams = useSearchParams()

  const recoveryCode = searchParams?.get('code') as string

  useEffect(() => {
    recoveryCode &&
      validCode({ recoveryCode })
        .unwrap()
        .then(() => {
          router.push(`/auth/create-new-password?code=${recoveryCode}`)
        })
        .catch(() => {
          router.push('/resend')
        })
  }, [validCode, recoveryCode, router])

  useFetchLoader(isLoading)

  return <div></div>
}

Recovery.getLayout = getHeaderLayout

export { Recovery }
