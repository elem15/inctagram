import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { BACKEND_URL } from '@/shared/constants/ext-urls'

export const profileApi = createApi({
  reducerPath: 'userProfile',
  baseQuery: fetchBaseQuery({ baseUrl: BACKEND_URL }),
  tagTypes: ['Profile'],
  endpoints: builder => ({
    getProfile: builder.query<Profile, UserAuthData>({
      query: ({ profileId, accessToken }) => ({
        method: 'GET',
        url: `/users/profile/${profileId}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + accessToken,
        },
      }),
    }),
  }),
})

export const { useGetProfileQuery } = profileApi
