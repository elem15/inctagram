import { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from './index'

import { addUser, selectAuthUser } from '@/entities/auth/model/authSlice'

export const useAuth = () => {
  const dispatch = useAppDispatch()
  const { email, accessToken, userId } = useAppSelector(selectAuthUser)

  useEffect(() => {
    if (!email || !accessToken) {
      dispatch(
        addUser({
          email: localStorage.getItem('email'),
          accessToken: localStorage.getItem('token'),
          userId: +localStorage.getItem('userId')!,
        })
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, accessToken, userId])

  return {
    isAuth: !!accessToken,
    userId,
    email,
    accessToken,
  }
}
