import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { BACKEND_URL } from '@/shared/constants/ext-urls'

export const postsApi = createApi({
  reducerPath: 'posts',
  baseQuery: fetchBaseQuery({ baseUrl: BACKEND_URL }),
  tagTypes: ['Posts'],
  endpoints: builder => ({
    getPosts: builder.query<any, PostsQuery>({
      query: ({ userId, postId }) => {
        return {
          method: 'GET',
          url: `/public-posts/user/${userId}/${postId ? postId : ''}?pageSize=8`,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      },
      providesTags: ['Posts'],
      transformResponse: (response: PostsData): PostDataToComponent[] => {
        return response?.items.map(item => ({
          id: item.id,
          description: item.description,
          url: item.images.length ? item.images[1].url : '',
          width: item.images.length ? item.images[1].width : 640,
          height: item.images.length ? item.images[1].height : 360,
        }))
      },
    }),
  }),
})

export const { useGetPostsQuery } = postsApi
