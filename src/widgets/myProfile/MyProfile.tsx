import { FC, FormEvent, useEffect, useState } from 'react'

import s from './MyProfile.module.scss'

import { useGetProfileQuery } from '@/entities/profile'
import { usePutProfileMutation } from '@/entities/profile/api/profileApi'
import { Input } from '@/shared/components'
import { useAuth } from '@/shared/lib/hooks/useAuth'
type Props = {}
export const MyProfile: FC<Props> = () => {
  const { userId, accessToken } = useAuth()
  const {
    data: profile,
    isLoading,
    error,
    refetch,
  } = useGetProfileQuery({ profileId: userId, accessToken } as UserAuthData)
  const [putProfile, { isSuccess }] = usePutProfileMutation()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  useEffect(() => {
    isSuccess && refetch()
  }, [isSuccess, refetch])

  useEffect(() => {
    if (profile?.firstName && profile?.lastName) {
      setFirstName(profile.firstName)
      setLastName(profile.lastName)
    }
  }, [profile?.firstName, profile?.lastName, profile])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    putProfile({
      body: { firstName, lastName },
      accessToken,
    })
  }

  return (
    <div className={s.container}>
      <h1>Profile</h1>
      <div>{profile?.userName}</div>
      <form onSubmit={e => handleSubmit(e)}>
        <label htmlFor="">First name</label>
        <Input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} />
        <br />
        <label htmlFor="">Last name</label>
        <Input type="text" value={lastName} onChange={e => setLastName(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
