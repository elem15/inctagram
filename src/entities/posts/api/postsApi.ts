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
    publishPostsImage: builder.mutation<any, { postsPhoto: any; accessToken: string | undefined }>({
      query: ({ postsPhoto, accessToken }) => {
        const formData = new FormData()

        debugger
        const b64toBlob = dataURI => {
          const byteString = atob(dataURI.split(',')[1])
          const ab = new ArrayBuffer(byteString.length)
          const ia = new Uint8Array(ab)

          for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i)
          }

          return new Blob([ab], { type: 'image/jpeg' })
        }

        postsPhoto.forEach(file => {
          const blob = b64toBlob(file.image)

          formData.append('file', blob)
        })
        console.log({ postsPhoto }, 'postsPhoto')

        console.log({ formData }, 'formData')
        const log = formData.getAll('formData')

        console.log({ log })

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
    }),
    publishPosts: builder.mutation<
      any,
      {
        description: string
        childrenMetadata: { uploadId: string | number }[]
        accessToken: string | undefined
      }
    >({
      query: ({ description, accessToken, childrenMetadata }) => {
        if (!Array.isArray(childrenMetadata) || childrenMetadata.length === 0) {
          return Promise.reject(new Error('childrenMetadata must contain at least 1 element'))
        }

        return {
          url: '/posts',
          body: JSON.stringify({ description, childrenMetadata }),
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
