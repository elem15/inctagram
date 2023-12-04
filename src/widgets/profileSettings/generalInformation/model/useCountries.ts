import { useCallback, useState } from 'react'

import { useGetCountriesQuery } from '@/entities/countries/api/countriesApi'

export const useCountries = () => {
  const {
    data,
    isError: isErrorCountriesData,
    isLoading: isLoadingCountries,
  } = useGetCountriesQuery()

  const countriesData = data as CountriesRTKOutput

  const [country, setCountry] = useState('')
  const [cities, setCity] = useState<City[]>([])

  const onChangeCountryHandler = useCallback(
    (value: string) => {
      setCountry(value)
      const citiesOfCountry = countriesData.countriesDataDict[value].map(c => ({
        label: c,
        value: c,
      }))

      setCity(citiesOfCountry)
    },
    [countriesData]
  )

  return {
    isErrorCountriesData,
    isLoadingCountries,
    country,
    cities,
    countriesData,
    onChangeCountryHandler,
  }
}
