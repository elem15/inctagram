import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { OptionsType } from '@/shared/components'

export const countriesApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://countriesnow.space/api/v0.1/countries' }),
  tagTypes: ['Countries'],
  endpoints: builder => ({
    getCountries: builder.query<any, void>({
      query: () => ({
        url: '/',
        method: 'Get',
      }),
      providesTags: ['Countries'],
      transformResponse: (response: CountriesResponseData) => {
        const countriesData = response.data?.map((el: Country) => {
          return {
            country: el.country,
            cities: el.cities,
          }
        }) as Country[]

        const countriesDataDict = countriesData.reduce((acc, el) => {
          acc[el.country] = el.cities

          return acc
        }, {} as CountriesDataDict)

        // With Jordan and Myanmar api has dubble bug
        const countriesWithoutCities = Object.keys(countriesDataDict).map(c => ({
          label: c,
          value: c,
        })) as OptionsType[]

        const responseError = response.error

        return { countriesDataDict, countriesWithoutCities, responseError }
      },
    }),
  }),
})

export const { useGetCountriesQuery } = countriesApi
