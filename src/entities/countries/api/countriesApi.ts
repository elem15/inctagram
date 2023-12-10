import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const countriesApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://countriesnow.space/api/v0.1/countries' }),
  tagTypes: ['Countries'],
  endpoints: builder => ({
    getUsers: builder.query<any, void>({
      query: () => ({
        url: '/',
        method: 'Get',
      }),
      providesTags: ['Countries'],
      transformResponse: (response: CountriesResponseData) => ({
        countriesData: response.data
          ?.map((el: CountriesDataElement) => {
            return {
              key: el.iso3,
              label: el.country,
              value: el.country,
              cities: el.cities,
            }
          }, {})
          // With Jordan and Myanmar api has bugs
          .filter((el: any) => {
            if (el.label !== 'Jordan' && el.label !== 'Myanmar')
              return { key: el.key, label: el.label, value: el.value, cities: el.cities }
          }),
        responseError: response.error,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
        } catch (error) {
          const e = error as RTKError

          console.error(e)
        }
      },
    }),
  }),
})

export const { useGetUsersQuery } = countriesApi
