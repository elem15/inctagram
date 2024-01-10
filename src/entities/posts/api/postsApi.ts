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
        return response?.items.map(item => {
          let img

          if (item.images.length) {
            img = item.images.find(i => i.width === 1440)
          }

          if (!img) {
            img = item.images[0]
          }

          return {
            id: item.id,
            description: item.description,
            url: img ? img.url : '',
            width: img ? img.width : 640,
            height: img ? img.height : 360,
          }
        })
      },
    }),
  }),
})

export const { useGetPostsQuery } = postsApi
