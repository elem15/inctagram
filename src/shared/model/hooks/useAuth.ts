import { useAppSelector } from '.'

export const useAuth = () => {
  const { email, accessToken } = useAppSelector(state => state.user)

  return {
    isAuth: !!accessToken,
    email,
    accessToken,
  }
}
