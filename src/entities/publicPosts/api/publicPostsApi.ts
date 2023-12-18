import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { BACKEND_URL } from '@/shared/constants/ext-urls'

export const publicPostsApi = createApi({
  reducerPath: 'publicPosts',
  baseQuery: fetchBaseQuery({ baseUrl: BACKEND_URL }),
  tagTypes: ['PublicPosts'],
  endpoints: builder => ({
    getPublicPosts: builder.query<any, void>({
      query: () => ({
        url: '/public-posts/all/,?pageSize=4&sortDirection=desc',
        method: 'Get',
      }),
      providesTags: ['PublicPosts'],
      transformResponse: (response: PublicPostsResponseData) => {
        const publicPostsData = response?.items.map((el: PostDataType) => {
          return {
            id: el.id,
            description: el.description,
            images: el.images,
            owner: el.owner,
            avatarOwner: el.avatarOwner,
            updatedAt: el.updatedAt,
          }
        }) as PostDataType[]

        const usersCounter = response?.totalUsers

        return { publicPostsData, usersCounter }
      },
    }),
  }),
})

export const { useGetPublicPostsQuery } = publicPostsApi
