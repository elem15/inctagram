import { useEffect } from 'react'

import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'

import { useValidCodeMutation } from '@/entities/auth'
import { getHeaderLayout } from '@/widgets/layouts/header-layout/HeaderLayout'
import { Spinner } from '@/widgets/spinner'

const Recovery = () => {
  const [validCode, { isLoading: isValidationLoading }] = useValidCodeMutation()

  const router = useRouter()
  const searchParams = useSearchParams()

  const recoveryCode = searchParams?.get('code') as string

  useEffect(() => {
    recoveryCode &&
      validCode({ recoveryCode })
        .unwrap()
        .then(() => {
          router.push(`/auth/createnewpassword?code=${recoveryCode}`)
        })
        .catch(() => {
          router.push('/resend')
        })
  }, [validCode, recoveryCode, router])

  return <div>{isValidationLoading && <Spinner />}</div>
}

Recovery.getLayout = getHeaderLayout

export { Recovery }
