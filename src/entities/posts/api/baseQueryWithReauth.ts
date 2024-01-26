import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react'

import { clearLocalUserData, setLoginUser } from '@/entities/auth'
import { BACKEND_URL, BASE_WORK_URL } from '@/shared/constants/ext-urls'
import { IEmailToken } from '@/shared/types'

export const baseQuery = fetchBaseQuery({ baseUrl: BASE_WORK_URL })

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)

  if (result.error && result.error.status === 401) {
    // try to get a new token
    const refreshResult: QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta> =
      await baseQuery(
        { url: '/auth/update-tokens', method: 'POST', credentials: 'include' },
        api,
        extraOptions
      )

    if (refreshResult.data) {
      const data = refreshResult.data as IEmailToken

      api.dispatch(setLoginUser({ accessToken: data.accessToken }))
      result = await baseQuery(args, api, extraOptions)
    } else {
      api.dispatch(clearLocalUserData())
    }
  }

  return result
}
