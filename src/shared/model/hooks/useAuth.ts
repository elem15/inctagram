import { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '.'

import { addToken, addUser } from '@/entities/auth/AuthSlice'

export const useAuth = () => {
  const dispatch = useAppDispatch()
  const { email, accessToken } = useAppSelector(state => state.user)

  useEffect(() => {
    if (!email || !accessToken) {
      dispatch(addUser(localStorage.getItem('email')))
      dispatch(addToken(localStorage.getItem('token')))
    }
  }, [email, accessToken])

  return {
    isAuth: !!accessToken,
    email,
    accessToken,
  }
}
