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
      providesTags: ['Profile'],
    }),
    putProfile: builder.mutation<any, UserAuthData>({
      query: ({ body, accessToken }) => ({
        url: '/users/profile',
        method: 'PUT',
        credentials: 'include',
        body,
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + accessToken,
        },
      }),
      invalidatesTags: ['Profile'],
    }),
    savePhoto: builder.mutation<any, FormData>({
      query: ({ formData, accessToken }) => {
        console.log({ formData })

        return {
          url: '/users/profile/avatar',
          body: JSON.stringify(formData),
          method: 'POST',
          credentials: 'include',
          headers: {
            // 'Content-Type': 'application/json',
            Authorization: 'Bearer ' + accessToken,
          },
        }
      },
      invalidatesTags: ['Profile'],
    }),
  }),
})

export const { useGetProfileQuery, usePutProfileMutation, useSavePhotoMutation } = profileApi
