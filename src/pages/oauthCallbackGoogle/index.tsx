import { useEffect } from 'react'

import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'

import { useGoogleLogin } from '@/shared/lib'
import { useClient } from '@/shared/lib/hooks/useClient'

export function OauthCallbackGoogle() {
  const searchParams = useSearchParams()

  const code = searchParams?.get('code') as string | undefined

  const router = useRouter()
  const { isLoading, error, data } = useGoogleLogin(code)

  const { isClient } = useClient()

  useEffect(() => {
    const success = data && !error && !isLoading

    if (success) {
      router.push('/')
    }
  }, [isLoading, error, router, data])

  return (
    <>
      <div>Google authorization...</div>
      {error && isClient && <div className="text-red-600">Authorization error!</div>}
    </>
  )
}
