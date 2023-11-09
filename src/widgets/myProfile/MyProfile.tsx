import { useEffect, useState } from 'react'

import { differenceInYears } from 'date-fns'
import { DateRange } from 'react-day-picker'
import { SubmitHandler, useForm } from 'react-hook-form'

import s from './MyProfile.module.scss'

import { useGetProfileQuery } from '@/entities/profile'
import { usePutProfileMutation } from '@/entities/profile/api/profileApi'
import { Button, Input, Textarea } from '@/shared/components'
import { DatePicker } from '@/shared/components/datePicker'
import { useTranslation } from '@/shared/lib'
import { useAuth } from '@/shared/lib/hooks/useAuth'
import { firstNameValidation } from '@/shared/regex'

export const MyProfile = () => {
  const { t } = useTranslation()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError,
    clearErrors,
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
  } = useGetProfileQuery({ profileId: userId, accessToken } as UserAuthData)

  const [putProfile, { isSuccess, isLoading: isPutLoading, error: putError }] =
    usePutProfileMutation()

  const [date, setResultDate] = useState<Date | DateRange>()

  useEffect(() => {
    if (profile?.firstName && profile?.lastName) {
      setValue('firstName', profile.firstName)
      setValue('lastName', profile.lastName)
      setValue('aboutMe', profile.aboutMe)
    }
    if (date && date instanceof Date) {
      const age = differenceInYears(new Date(), date)

      if (age < 13) {
        setError('dateOfBirth', {
          type: 'client',
          message: t.profile.age_error,
        })
      } else clearErrors('dateOfBirth')
      setValue('dateOfBirth', date.toISOString())
    }
  }, [
    profile?.firstName,
    profile?.lastName,
    profile,
    setValue,
    date,
    t.profile.age_error,
    clearErrors,
    setError,
  ])

  const onSubmit: SubmitHandler<ProfilePut> = data => {
    let existData = {}

    for (const item in data) {
      if (data[item as keyof typeof data]) {
        existData = { ...existData, [item]: data[item as keyof typeof data] }
      }
    }
    putProfile({
      body: { ...existData },
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
        <DatePicker
          mode="single"
          errorMessage={errors.dateOfBirth?.message?.toString()}
          lang={t.lg}
          setResultDate={setResultDate}
          defaultMonth={profile && new Date(profile?.dateOfBirth)}
          label={t.profile.birth_date}
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
