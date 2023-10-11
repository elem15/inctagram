import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
  reducerPath: 'userAuth',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://incta.online/api/v1' }),
  //   tagTypes: ['User'],
  endpoints: builder => ({
    Registration: builder.mutation({
      query: body => ({
        body: body,
        url: '/auth/registration',
        method: 'POST',
      }),
    }),
    RegistrationConfirmation: builder.mutation({
      query: confirmationCode => ({
        body: confirmationCode,
        url: '/auth/registration-confirmation',
        method: 'POST',
      }),
    }),
  }),
})

export const { useRegistrationMutation, useRegistrationConfirmationMutation } = authApi
