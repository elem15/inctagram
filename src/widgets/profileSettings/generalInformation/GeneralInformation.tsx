import { useEffect, useState } from 'react'

import { differenceInYears } from 'date-fns'
import { DateRange } from 'react-day-picker'
import { SubmitHandler, useForm } from 'react-hook-form'

import s from './GeneralInformation.module.scss'

import { useGetProfileQuery } from '@/entities/profile'
import { usePutProfileMutation } from '@/entities/profile/api/profileApi'
import { Button, Input, Textarea, SelectCustom, Typography } from '@/shared/components'
import { DatePicker } from '@/shared/components/datePicker'
import { useTranslation } from '@/shared/lib'
import { useAuth } from '@/shared/lib/hooks/useAuth'
import { firstNameValidation } from '@/shared/regex'

type Countries = {
  country: string
  cities: string[]
}
type SelectOptions = {
  key?: string
  label: string
  value: string
  cities: string[]
}

export const GeneralInformation = () => {
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
      setValue('dateOfBirth', date.toLocaleDateString())
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
  const [countries, setCountries] = useState<SelectOptions[]>([])
  const [country, setCountry] = useState('')
  const [city, setCity] = useState([])

  useEffect(() => {
    const getCities = async () => {
      const response = await fetch('https://countriesnow.space/api/v0.1/countries')
      const countries = await response.json()

      setCountries(
        countries.data.map((el: Countries): SelectOptions => {
          return {
            label: el.country,
            value: el.country,
            cities: el.cities,
          }
        })
      )
    }

    getCities()
  }, [])

  const onChangeCountryHandler = (value: string) => {
    setCountry(value)

    const citiesOfCountry = countries
      .filter(el => value === el.label)
      .map(el =>
        el.cities.map(el => {
          return {
            label: el,
            value: el,
          }
        })
      )

    // @ts-ignore
    setCity(citiesOfCountry)
  }
  const onChangeCityHandler = (value: any) => {
    const obj = { Country: country, City: value }

    console.log(obj)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={s.container}>
        <main className={s.mainContainer}>
          <div className={s.imagePicker}>
            <div>img</div>
            <Button variant={'outline'}>
              <Typography variant={'bold_text_14'}> Add a Profile Photo</Typography>
            </Button>
          </div>
          <div className={s.textFormContainer}>
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
            <div className={s.selects}>
              <SelectCustom
                options={countries}
                label={t.profile.country}
                placeHolder={t.profile.country_blank}
                value={country}
                onValueChange={onChangeCountryHandler}
              />
              <SelectCustom
                options={city?.[0]}
                label={t.profile.city}
                placeHolder={t.profile.city_blank}
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
          </div>
        </main>
        <div className={s.footerContainer}>
          <Button type="submit" disabled={!isValid}>
            {t.profile.button}
          </Button>
        </div>
      </div>
    </form>
  )
}
