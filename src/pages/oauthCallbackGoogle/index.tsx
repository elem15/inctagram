// import { useEffect } from 'react'

// import Link from 'next/link'
// import { useSearchParams } from 'next/navigation'
// import { useRouter } from 'next/router'

// import { useGoogleLogin } from '@/shared/lib'
// import { useAuth } from '@/shared/lib/hooks/useAuth'
// import { useClient } from '@/shared/lib/hooks/useClient'

// export function OauthCallbackGoogle() {
//   const searchParams = useSearchParams()

//   const code = searchParams?.get('code') as string | undefined

//   const router = useRouter()
//   const { isLoading, error, data } = useGoogleLogin(code)

//   const { isClient } = useClient()
//   const { isAuth } = useAuth()

//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       if (!isAuth && !code) {
//         router.push('/public-page')
//       }
//     }, 1000)

//     return () => {
//       clearTimeout(timeout)
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [isAuth, code])

//   useEffect(() => {
//     const success = data && !error && !isLoading

//     const timeout = setTimeout(() => {
//       if (success || isAuth) {
//         router.push('/my-profile')
//       }
//     }, 2000)

//     return () => {
//       clearTimeout(timeout)
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [isLoading, error, data, isAuth])

//   return (
//     <>
//       <div>Google authorization...</div>
//       {error && isClient && (
//         <>
//           <div className="text-red-600">Authorization error!</div>
//           <Link href={'/signin'}>Signin</Link>
//         </>
//       )}
//     </>
//   )
// }

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
    if (!code) {
      router.push('/public-page')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code])

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isAuth) {
        router.push('/public-page')
      }
    }, 1000)

    return () => {
      clearTimeout(timeout)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth])

  useEffect(() => {
    const success = data && !error && !isLoading

    const timeout = setTimeout(() => {
      if (success || isAuth) {
        router.push('/my-profile')
      }
    }, 2000)

    return () => {
      clearTimeout(timeout)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, error, data, isAuth])

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
