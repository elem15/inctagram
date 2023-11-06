import { FC } from 'react'

import s from './MyProfile.module.scss'

import { useGetProfileQuery } from '@/entities/profile'
import { useAuth } from '@/shared/lib/hooks/useAuth'
type Props = {}
export const MyProfile: FC<Props> = () => {
  const { userId, accessToken } = useAuth()
  const {
    data: profile,
    isLoading,
    error,
    refetch,
  } = useGetProfileQuery({ profileId: userId, accessToken })

  console.log(profile)

  return <div className={s.container}>Profile</div>
}
