import { useEffect } from 'react'

import { useAppDispatch } from '.'

import { useGoogleLoginMutation } from '@/entities/auth/AuthApi'
import { setLoginUser } from '@/entities/auth/AuthSlice'

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
        .catch(error => {
          if ('data' in error) {
            const errMsg = error.data as ErrorDataType

            console.error(errMsg)
            if ('messages' in errMsg) {
              console.error(errMsg.messages)
            }
          }
        })
    }
  }, [code])

  return { isLoading, error }
}
