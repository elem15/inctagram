import { createApi } from '@reduxjs/toolkit/query/react'

import { baseQueryWithReauth } from '@/entities/posts'

export const profileApi = createApi({
  reducerPath: 'userProfile',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Profile', 'PublicProfile'],
  endpoints: builder => ({
    getPublicProfile: builder.query<PublicProfile, PublicProfileQuery>({
      query: ({ profileId }) => ({
        method: 'GET',
        url: `/public-user/profile/${profileId}`,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      providesTags: ['PublicProfile'],
    }),
    getProfile: builder.query<Profile, UserAuthData>({
      query: ({ accessToken }) => ({
        method: 'GET',
        url: `/users/profile`,
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
      invalidatesTags: ['Profile'],
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
      invalidatesTags: ['Profile'],
    }),
  }),
})

export const {
  useGetProfileQuery,
  useGetPublicProfileQuery,
  useDeletePhotoMutation,
  usePutProfileMutation,
  useSavePhotoMutation,
} = profileApi
