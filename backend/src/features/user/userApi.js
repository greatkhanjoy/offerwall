import { apiSlice } from '../api/apiSlice'

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => '/user',
    }),
    getUser: builder.query({
      query: (id) => `/user/${id}`,
    }),
  }),
})

export const { useGetUsersQuery, useGetUserQuery } = userApi
