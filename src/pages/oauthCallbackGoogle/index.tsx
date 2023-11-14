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

  useEffect(() => {
    if (!code && !data && !isLoading) {
      setTimeout(() => {
        router.push('/home')
      }, 2000)
    }
  }, [code, data, isLoading, router])

  const { isClient } = useClient()

  useEffect(() => {
    const success = data && !error && !isLoading

    if (success) {
      setTimeout(() => {
        router.push('/home')
      }, 3000)
    }
  }, [isLoading, error, router, data])

  return (
    <>
      <div>Google authorization...</div>
      {error && isClient && <div className="text-red-600">Authorization error!</div>}
    </>
  )
}
