import { useEffect } from 'react'

import { useAppDispatch } from './index'

import { useGoogleLoginMutation } from '@/entities/auth'

export const useGoogleLogin = (code: string | undefined) => {
  const dispatch = useAppDispatch()

  const [googleLogin, { isLoading, error, data }] = useGoogleLoginMutation()

  useEffect(() => {
    if (code) {
      googleLogin(code)
    }
  }, [googleLogin, code, dispatch])

  return { isLoading, error, data }
}
