import { useEffect } from 'react'

import { SubmitHandler, useForm } from 'react-hook-form'

import s from './MyProfile.module.scss'

import { useGetProfileQuery } from '@/entities/profile'
import { usePutProfileMutation } from '@/entities/profile/api/profileApi'
import { Button, Input, Textarea } from '@/shared/components'
import { useTranslation } from '@/shared/lib'
import { useAuth } from '@/shared/lib/hooks/useAuth'
import { firstNameValidation } from '@/shared/regex'

export const MyProfile = () => {
  const { t } = useTranslation()
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    setError,
    setValue,
  } = useForm<ProfilePut>({
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

  useEffect(() => {
    if (profile?.firstName && profile?.lastName) {
      setValue('firstName', profile.firstName)
      setValue('lastName', profile.lastName)
    }
  }, [profile?.firstName, profile?.lastName, profile, setValue])

  const onSubmit: SubmitHandler<ProfilePut> = data => {
    putProfile({
      body: { ...data },
      accessToken,
    })
  }

  return (
    <div className={s.container}>
      <div>{profile?.userName}</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label={t.profile.first_name}
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
          error={errors.firstName?.message?.toString()}
        />
        <Input
          label={t.profile.last_name}
          type="text"
          {...register('lastName', {
            required: t.profile.last_name_required,
            maxLength: {
              value: 50,
              message: t.profile.names_max_length,
            },
            pattern: {
              value: firstNameValidation,
              message: t.profile.last_name_message,
            },
          })}
          error={errors.lastName?.message?.toString()}
        />
        <Textarea
          label={t.profile.about}
          {...register('aboutMe', {
            maxLength: {
              value: 200,
              message: t.profile.about_max_length,
            },
          })}
          errorMessage={errors.aboutMe?.message?.toString()}
        />
        <Button type="submit" disabled={!isValid}>
          {t.profile.button}
        </Button>
      </form>
    </div>
  )
}
