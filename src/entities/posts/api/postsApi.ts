import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { BACKEND_URL } from '@/shared/constants/ext-urls'

export const postsApi = createApi({
  reducerPath: 'posts',
  baseQuery: fetchBaseQuery({ baseUrl: BACKEND_URL }),
  tagTypes: ['Posts'],
  endpoints: builder => ({
    getPosts: builder.query<any, PostsQuery>({
      query: ({ postId }) => {
        const accessToken = localStorage.getItem('token') as string

        return {
          method: 'GET',
          url: `/posts/user/${postId ? postId : ''}?pageSize=8`,
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + accessToken,
          },
        }
      },
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
    publishPostsImage: builder.mutation<any, { postsPhoto: File; accessToken: string | undefined }>(
      {
        query: ({ postsPhoto, accessToken }) => {
          const formData = new FormData()

          formData.append('file', postsPhoto)

          return {
            url: '/posts/image',
            body: formData,
            method: 'POST',
            credentials: 'include',
            headers: {
              Authorization: 'Bearer ' + accessToken,
            },
          }
        },
        invalidatesTags: ['Posts'],
      }
    ),
    publishPosts: builder.mutation<any, { description: string; accessToken: string | undefined }>({
      query: ({ description, accessToken }) => {
        return {
          url: '/posts',
          body: description,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + accessToken,
          },
        }
      },
      invalidatesTags: ['Posts'],
    }),
  }),
})

export const { useGetPostsQuery, usePublishPostsImageMutation, usePublishPostsMutation } = postsApi
