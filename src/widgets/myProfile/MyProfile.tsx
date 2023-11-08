import { FC, FormEvent, useEffect, useState } from 'react'

import { useTransform } from 'framer-motion'
import { SubmitHandler, useForm } from 'react-hook-form'

import s from './MyProfile.module.scss'

import { useGetProfileQuery } from '@/entities/profile'
import { usePutProfileMutation } from '@/entities/profile/api/profileApi'
import { Input } from '@/shared/components'
import { useTranslation } from '@/shared/lib'
import { useAuth } from '@/shared/lib/hooks/useAuth'
import { firstNameValidation } from '@/shared/regex'

export const MyProfile = () => {
  const { t } = useTranslation()
  const { register, handleSubmit, formState, getValues, setError } = useForm<ProfilePut>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  })
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
    if (profile?.firstName && profile?.lastName) {
      setFirstName(profile.firstName)
      setLastName(profile.lastName)
    }
  }, [profile?.firstName, profile?.lastName, profile])

  const onSubmit: SubmitHandler<ProfilePut> = data => {
    putProfile({
      body: { firstName: data.firstName, lastName: data.lastName },
      accessToken,
    })
  }
  const submit = (e: FormEvent<HTMLFormElement>) => {
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
      <form onSubmit={submit}>
        <Input
          label="First name"
          type="text"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
        />
        <br />
        <label htmlFor="">Last name</label>
        <Input type="text" value={lastName} onChange={e => setLastName(e.target.value)} />
        <input
          // label="First name"
          type="text"
          {...register('firstName', {
            required: t.profile.first_name_required,
            maxLength: {
              value: 50,
              message: t.profile.names_max_length,
            },
            pattern: {
              value: firstNameValidation,
              message: t.profile.first_name_message,
            },
          })}
          // error={errors.firstName?.message?.toString()}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
