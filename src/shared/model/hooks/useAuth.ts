import { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '.'

import { addToken, addUser, selectAuthUser } from '@/entities/auth/model/authSlice'

export const useAuth = () => {
  const dispatch = useAppDispatch()
  const { email, accessToken } = useAppSelector(selectAuthUser)

  useEffect(() => {
    if (!email || !accessToken) {
      dispatch(addUser(localStorage.getItem('email')))
      dispatch(addToken(localStorage.getItem('token')))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, accessToken])

  return {
    isAuth: !!accessToken,
    email,
    accessToken,
  }
}
