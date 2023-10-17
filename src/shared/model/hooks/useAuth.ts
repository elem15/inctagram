import { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '.'

import { addToken, addUser, selectAuthUser } from '@/entities/auth/authSlice'

export const useAuth = () => {
  const dispatch = useAppDispatch()
  const { email, accessToken } = useAppSelector(selectAuthUser)

  useEffect(() => {
    if (!email || !accessToken) {
      dispatch(addUser(localStorage.getItem('email')))
      dispatch(addToken(localStorage.getItem('token')))
    }
  }, [email, accessToken, dispatch])

  return {
    isAuth: !!accessToken,
    email,
    accessToken,
  }
}
