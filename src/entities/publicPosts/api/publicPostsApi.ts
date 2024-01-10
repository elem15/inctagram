import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { BACKEND_URL } from '@/shared/constants/ext-urls'

const transformPostData = (el: PostDataType): PostDataType => {
  return {
    id: el.id,
    ownerId: el.ownerId,
    description: el.description,
    images: el.images,
    owner: el.owner,
    avatarOwner: el.avatarOwner,
    updatedAt: el.updatedAt,
  }
}

export const publicPostsApi = createApi({
  reducerPath: 'publicPosts',
  baseQuery: fetchBaseQuery({ baseUrl: BACKEND_URL }),
  tagTypes: ['PublicPosts', 'SinglePost'],
  endpoints: builder => ({
    getPublicPosts: builder.query<any, void>({
      query: () => ({
        url: '/public-posts/all/?pageSize=4&sortDirection=desc',
        method: 'GET',
      }),
      providesTags: ['PublicPosts'],
      transformResponse: (response: PublicPostsResponseData) => {
        const publicPostsData = response?.items.map(transformPostData)

        const usersCounter = response?.totalUsers

        return { publicPostsData, usersCounter }
      },
    }),
    getSinglePost: builder.query<PostDataType, number>({
      query: postId => ({
        url: `/public-posts/${postId}`,
        method: 'GET',
      }),
      providesTags: ['SinglePost'],
      transformResponse: (response: PostDataType) => {
        return transformPostData(response)
      },
    }),
  }),
})

export const { useGetPublicPostsQuery, useGetSinglePostQuery } = publicPostsApi
