import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { BACKEND_URL } from '@/shared/constants/ext-urls'

export const postsApi = createApi({
  reducerPath: 'posts',
  baseQuery: fetchBaseQuery({ baseUrl: BACKEND_URL }),
  tagTypes: ['Posts'],
  endpoints: builder => ({
    getPosts: builder.query<any, PostsQuery>({
      query: ({ accessToken, postId }) => ({
        method: 'GET',
        url: `/posts/user/${postId}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + accessToken,
        },
      }),
      providesTags: ['Posts'],
      transformResponse: (response: PostsData): PostDataToComponent[] => {
        const images = response?.items.map(item => ({
          id: item.id,
          url: item.images[0].url,
          description: item.description,
          width: item.images[0].width,
          height: item.images[0].height,
        }))

        return images
      },
    }),
  }),
})

export const { useGetPostsQuery } = postsApi
