import { useEffect } from 'react'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'

import { useErrorHandler, useFetchLoader, useGoogleLogin } from '@/shared/lib'
import { useAuth } from '@/shared/lib/hooks/useAuth'
import { useClient } from '@/shared/lib/hooks/useClient'

export function OauthCallbackGoogle() {
  const searchParams = useSearchParams()

  const code = searchParams?.get('code') as string | undefined

  const router = useRouter()
  const { isLoading, error, data } = useGoogleLogin(code)

  const { isClient } = useClient()
  const { isAuth } = useAuth()

  useEffect(() => {
    const success = data && !error && !isLoading

    const timeout = setTimeout(() => {
      if (success && isAuth) {
        router.push('/my-profile')
      } else if (error) {
        router.push('/signin')
      } else {
        router.push('/public-page')
      }
    }, 3000)

    return () => {
      clearTimeout(timeout)
    }
  }, [isLoading, error, data, isAuth, router])

  useErrorHandler(error as CustomerError)
  useFetchLoader(isLoading)

  return (
    <>
      <div>Google authorization...</div>
      {error && isClient && (
        <>
          <div className="text-red-600">Authorization error!</div>
          <Link href={'/signin'}>Signin</Link>
        </>
      )}
    </>
  )
}
