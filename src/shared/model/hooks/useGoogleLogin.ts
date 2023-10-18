import { useEffect } from 'react'

import { consoleErrors } from '..'

import { useAppDispatch } from '.'

import { useGoogleLoginMutation } from '@/entities/auth/authApi'

export const useGoogleLogin = (code: string | undefined) => {
  const dispatch = useAppDispatch()

  const [googleLogin, { isLoading, error }] = useGoogleLoginMutation()

  useEffect(() => {
    if (code) {
      googleLogin(code)
    }
  }, [googleLogin, code, dispatch])

  return { isLoading, error }
}
