import { useEffect, useLayoutEffect, useState } from 'react'

import { differenceInYears } from 'date-fns'
import { DateRange } from 'react-day-picker'
import { SubmitHandler, useForm } from 'react-hook-form'

import s from './GeneralInformation.module.scss'

import { setAlert } from '@/app/services'
import { useGetProfileQuery } from '@/entities/profile'
import { usePutProfileMutation, useSavePhotoMutation } from '@/entities/profile/api/profileApi'
import { Button, Input, Textarea, SelectCustom } from '@/shared/components'
import { DatePicker } from '@/shared/components/datePicker'
import { useAppDispatch, useTranslation } from '@/shared/lib'
import { useAuth } from '@/shared/lib/hooks/useAuth'
import { firstNameValidation, nameValidation } from '@/shared/regex'
import { ProfilePhotoForGeneralInfo } from '@/widgets/addProfilePhoto'
import { TabsLayout } from '@/widgets/layouts'
import { Spinner } from '@/widgets/spinner'

const Information = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError,
    clearErrors,
    setValue,
    trigger,
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

  const [putProfile, { isLoading: isPutLoading, error: putError, isSuccess }] =
    usePutProfileMutation()

  const [date, setResultDate] = useState<Date | DateRange>()

  useEffect(() => {
    if (putError) {
      const e = putError as CustomerError

      if (e.status === 400) {
        setError('userName', { type: 'server', message: t.profile.user_name_error })
      } else {
        dispatch(setAlert({ message: t.profile.auth_error, variant: 'error' }))
      }
    } else if (error) {
      dispatch(setAlert({ message: t.profile.auth_error, variant: 'error' }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, putError])

  useEffect(() => {
    profile?.firstName && setValue('firstName', profile.firstName)
    profile?.lastName && setValue('lastName', profile.lastName)
    profile?.userName && setValue('userName', profile.userName)
    profile?.aboutMe && setValue('aboutMe', profile.aboutMe)
    if (date && date instanceof Date) {
      const offset = new Date().getTimezoneOffset()

      date.setMinutes(date.getMinutes() + offset)
      setValue('dateOfBirth', date.toISOString())
      const age = differenceInYears(new Date(), date)

      if (age < 13) {
        setError('dateOfBirth', {
          type: 'client',
          message: t.profile.age_error,
        })
      } else {
        clearErrors('dateOfBirth')
      }
      profile && trigger()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps, prettier/prettier
  }, [
    profile?.firstName,
    profile?.lastName,
    profile?.userName,
    profile?.aboutMe,
    date,
    t.profile.age_error,
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

  useEffect(() => {
    isSuccess && dispatch(setAlert({ message: t.profile.success, variant: 'info' }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess])

  const [countries, setCountries] = useState<SelectOptions[]>([])
  const [countriesOptions, setCountriesOptions] = useState<Omit<SelectOptions, 'cities'>[]>([])
  const [country, setCountry] = useState('')
  const [cities, setCity] = useState<City[]>([])

  useEffect(() => {
    const getCities = async () => {
      const response = await fetch('https://countriesnow.space/api/v0.1/countries')
      const data = await response.json()
      const receivedCountries: SelectOptions[] = data.data.map((el: Countries): SelectOptions => {
        return {
          key: el.iso3,
          label: el.country,
          value: el.country,
          cities: el.cities,
        }
      })

      setCountries(receivedCountries)
      setCountriesOptions(
        receivedCountries.filter(el => {
          if (el.label !== 'Jordan' && el.label !== 'Myanmar')
            return { key: el.key, label: el.label, value: el.value }
        })
      )
    }

    getCities()
  }, [])

  const onChangeCountryHandler = (value: string) => {
    setCountry(value)

    const citiesOfCountry = countries
      .filter(el => value === el.label)[0]
      .cities.map(el => {
        return {
          label: el,
          value: el,
        }
      })

    setCity(citiesOfCountry)
  }
  const onChangeCityHandler = (value: any) => {
    setValue('city', value)
  }
  const [_, { isLoading: isPhotoLoading }] = useSavePhotoMutation()

  return (
    <div className={s.container}>
      {(isLoading || isPutLoading || isPhotoLoading) && <Spinner />}
      <main className={s.mainContainer}>
        <div className={s.imagePicker}>
          <ProfilePhotoForGeneralInfo />
        </div>
        <div className={s.textFormContainer}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              label={t.profile.user_name}
              labelClass="asterisk"
              type="text"
              {...register('userName', {
                required: t.signup.username_required,
                maxLength: {
                  value: 30,
                  message: t.messages.user_max_length,
                },
                minLength: {
                  value: 6,
                  message: t.messages.user_min_length,
                },
                pattern: {
                  value: nameValidation,
                  message: t.messages.name_format_message,
                },
              })}
              error={errors.userName?.message?.toString()}
            />
            <Input
              label={t.profile.first_name}
              labelClass="asterisk"
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
              labelClass="asterisk"
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
              errorLinkHref="/auth/privacy"
              errorLinkMessage={t.privacy_policy.title}
              lang={t.lg}
              setResultDate={setResultDate}
              defaultMonth={profile?.dateOfBirth ? new Date(profile?.dateOfBirth) : undefined}
              label={t.profile.birth_date}
            />
            <div className={s.selects}>
              <SelectCustom
                options={countriesOptions}
                label={t.profile.country}
                placeHolder={t.profile.country_blank}
                value={country}
                onValueChange={onChangeCountryHandler}
              />
              <SelectCustom
                {...register('city')}
                disabled={!country}
                label={t.profile.cities}
                options={cities}
                placeHolder={profile?.city || t.profile.city_blank}
                onValueChange={onChangeCityHandler}
              />
            </div>
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

            <div className={s.footerContainer}>
              <Button type="submit" disabled={!isValid}>
                {t.profile.button}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}

export const GeneralInformation = () => {
  return (
    <TabsLayout>
      <Information />
    </TabsLayout>
  )
}
