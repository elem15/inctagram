import { useEffect } from 'react'

import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'

import { AppDispatch } from '@/app/appStore'
import { setLoginUser } from '@/entities/auth/AuthSlice'

export function Github() {
  const searchParams = useSearchParams()

  const email = searchParams?.get('email') as string
  const accessToken = searchParams?.get('accessToken') as string

  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if (email && accessToken) {
      dispatch(setLoginUser({ email, accessToken }))
    }
    router.push('/')
  }, [email, accessToken])

  return null
}
