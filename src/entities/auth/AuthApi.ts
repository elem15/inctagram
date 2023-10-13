import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { IEmailPassword, IEmailPasswordUser } from '@/shared/types'

export const authApi = createApi({
  reducerPath: 'userAuth',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://incta.online/api/v1' }),
  //   tagTypes: ['User'],
  endpoints: builder => ({
    Registration: builder.mutation<any, IEmailPasswordUser>({
      query: body => ({
        body: body,
        url: '/auth/registration',
        method: 'POST',
      }),
    }),
    RegistrationConfirmation: builder.mutation<any, string | string[]>({
      query: code => ({
        body: { confirmationCode: code },
        url: '/auth/registration-confirmation',
        method: 'POST',
      }),
    }),
    Login: builder.mutation<any, IEmailPassword>({
      query: ({ email, password }) => ({
        body: { email, password },
        url: '/auth/login',
        method: 'POST',
      }),
    }),
  }),
})

export const { useRegistrationMutation, useRegistrationConfirmationMutation, useLoginMutation } =
  authApi
