import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { BACKEND_URL } from '@/shared/constants/ext-urls'

const getLargeImage = (item: PostDataItem) => {
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
}

export const postsApi = createApi({
  reducerPath: 'posts',
  baseQuery: fetchBaseQuery({ baseUrl: BACKEND_URL }),
  tagTypes: ['Posts', 'PublicPosts'],
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
        return response?.items.map(getLargeImage)
      },
    }),
    publishPostsImage: builder.mutation<any, { postsPhoto: any; accessToken: string | undefined }>({
      query: ({ postsPhoto, accessToken }) => {
        const formData = new FormData()

        const b64toBlob = (dataURI: string) => {
          const byteString = atob(dataURI.split(',')[1])
          const ab = new ArrayBuffer(byteString.length)
          const ia = new Uint8Array(ab)

          for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i)
          }

          return new Blob([ab], { type: 'image/jpeg' })
        }

        postsPhoto.forEach((file: any) => {
          const blob = b64toBlob(file.image)

          formData.append('file', blob)
        })

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
        return {
          url: '/posts',
          body: { description, childrenMetadata },
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + accessToken,
          },
        }
      },
      invalidatesTags: [],
    }),
    updatePost: builder.mutation<
      any,
      {
        description: string
        postId: number
        accessToken: string | undefined
      }
    >({
      query: ({ description, postId, accessToken }) => {
        return {
          url: `/posts/${postId}`,
          body: { description },
          method: 'PUT',
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

export const {
  useGetPostsQuery,
  usePublishPostsImageMutation,
  usePublishPostsMutation,
  useUpdatePostMutation,
} = postsApi
