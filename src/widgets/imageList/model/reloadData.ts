import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  QueryActionCreatorResult,
  QueryDefinition,
} from '@reduxjs/toolkit/query'

export const reloadData = (
  setPostId: React.Dispatch<React.SetStateAction<number | undefined>>,
  refetch: () => QueryActionCreatorResult<
    QueryDefinition<
      PostsQuery,
      BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>,
      'Posts',
      any,
      'posts'
    >
  >
) => {
  setPostId(undefined)
  setTimeout(() => {
    refetch()
  }, 1000)
}
