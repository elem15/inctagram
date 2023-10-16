import { useEffect } from 'react'

import { useAppDispatch } from '.'

import { useGoogleLoginMutation } from '@/entities/auth/AuthApi'
import { setLoginUser } from '@/entities/auth/AuthSlice'
import {consoleErrors} from '..';

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
