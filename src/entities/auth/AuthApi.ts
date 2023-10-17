import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { IEmailBaseUrl, IEmailPassword, IEmailPasswordUser } from '@/shared/types'

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
    resendRegistrationLink: builder.mutation<any, IEmailBaseUrl>({
      query: ({ email, baseUrl }) => ({
        body: {
          email,
          baseUrl,
        },
        url: '/auth/registration-email-resending',
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
    ForgotPassword: builder.mutation({
      query: ({ email, recaptcha }) => ({
        body: { email, recaptcha },
        url: '/auth/password-recovery',
        method: 'POST',
      }),
    }),
    CreateNewPassword: builder.mutation({
      query: ({ newPassword, recoveryCode }) => ({
        body: { newPassword, recoveryCode },
        url: '/auth/new-password',
        method: 'POST',
      }),
    }),
    ValidCode: builder.mutation({
      query: ({ recoveryCode }) => ({
        body: { recoveryCode },
        url: '/auth/check-recovery-code',
        method: 'POST',
      }),
    }),
    GoogleLogin: builder.mutation<any, string>({
      query: code => ({
        body: { code },
        url: '/auth/google/login',
        method: 'POST',
      }),
    }),
  }),
})

export const {
  useRegistrationMutation,
  useRegistrationConfirmationMutation,
  useLoginMutation,
  useForgotPasswordMutation,
  useCreateNewPasswordMutation,
  useValidCodeMutation,
  useGoogleLoginMutation,
  useResendRegistrationLinkMutation,
} = authApi
