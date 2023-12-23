import { useEffect } from 'react'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'

import { useGoogleLogin } from '@/shared/lib'
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
    if (isAuth) {
      setTimeout(() => {
        router.push('/my-profile')
      }, 2000)
    } else {
      setTimeout(() => {
        router.push('/public-page')
      }, 2000)
    }
  }, [isAuth, router])

  useEffect(() => {
    const success = data && !error && !isLoading

    if (success) {
      setTimeout(() => {
        router.push('/my-profile')
      })
    }
  }, [isLoading, error, router, data])

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
