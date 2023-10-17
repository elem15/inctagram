import { useEffect } from 'react'

import { consoleErrors } from '..'

import { useAppDispatch } from '.'

import { useGoogleLoginMutation } from '@/entities/auth/authApi'
import { setLoginUser } from '@/entities/auth/authSlice'

export const useGoogleLogin = (code: string | undefined) => {
  const dispatch = useAppDispatch()

  const [GoogleLogin, { isLoading, error }] = useGoogleLoginMutation()

  useEffect(() => {
    if (code) {
      GoogleLogin(code)
        .unwrap()
        .then(payload => {
          dispatch(setLoginUser({ email: payload.email, accessToken: payload.accessToken }))
        })
        .catch(consoleErrors)
    }
  }, [GoogleLogin, code, dispatch])

  return { isLoading, error }
}
