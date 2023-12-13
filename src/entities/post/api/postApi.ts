import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { BACKEND_URL } from '@/shared/constants/ext-urls'

export const postApi = createApi({
  reducerPath: 'userPost',
  baseQuery: fetchBaseQuery({ baseUrl: BACKEND_URL }),
  tagTypes: ['Post'],
  endpoints: builder => ({
    //   getProfile: builder.query<Profile, UserAuthData>({
    //     query: ({ profileId, accessToken }) => ({
    //       method: 'GET',
    //       url: `/users/profile/${profileId}`,
    //       headers: {
    //         'Content-Type': 'application/json',
    //         Authorization: 'Bearer ' + accessToken,
    //       },
    //     }),
    //     providesTags: ['Profile'],
    //   }),
    // putProfile: builder.mutation<any, UserAuthData>({
    //   query: ({ body, accessToken }) => ({
    //     url: '/users/profile',
    //     method: 'PUT',
    //     credentials: 'include',
    //     body,
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Authorization: 'Bearer ' + accessToken,
    //     },
    //   }),
    //   invalidatesTags: ['Profile'],
    // }),
    savePhoto: builder.mutation<
      SaveAvatarsResponse,
      { profilePhoto: File; accessToken: string | undefined }
    >({
      query: ({ profilePhoto, accessToken }) => {
        const formData = new FormData()

        formData.append('file', profilePhoto)

        return {
          url: '/users/profile/avatar',
          body: formData,
          method: 'POST',
          credentials: 'include',
          headers: {
            Authorization: 'Bearer ' + accessToken,
          },
        }
      },
      invalidatesTags: ['Post'],
    }),

    deletePhoto: builder.mutation<void, { body: null; accessToken: string | undefined }>({
      query: ({ accessToken }) => {
        return {
          url: '/users/profile/avatar',
          method: 'DELETE',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + accessToken,
          },
        }
      },
      invalidatesTags: ['Post'],
    }),
  }),
})

export const {} = postApi
