import { FC, useEffect, useState } from 'react'

import { DateRange } from 'react-day-picker'

import s from './GeneralInformation.module.scss'

import { Input, SelectCustom, Textarea } from '@/shared/components'
import { DatePicker } from '@/shared/components/datePicker'
import { useTranslation } from '@/shared/lib'

type Props = {}
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

export const GeneralInformation: FC<Props> = () => {
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

  const { t } = useTranslation()

  const getDate = (date: Date | DateRange) => {
    return date
  }

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
    <div className={s.container}>
      <Input label={'Username'} type={'text'} />
      <Input label={'First name'} type={'text'} />
      <Input label={'Last name'} type={'text'} />
      <DatePicker mode={'single'} getDate={getDate} />
      <div className={s.selects}>
        <SelectCustom
          options={countries}
          label={'Select your country'}
          placeHolder={'Country'}
          value={country}
          onValueChange={onChangeCountryHandler}
        />
        <SelectCustom
          options={city?.[0]}
          label={'Select your city'}
          placeHolder={'City'}
          onValueChange={onChangeCityHandler}
        />
      </div>
      <Textarea label={'About Me'} placeholder={'Text-area'} />
    </div>
  )
}
