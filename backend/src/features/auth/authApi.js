import { apiSlice } from '../api/apiSlice'
import { userLoggedIn } from './authSlice'

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: '/auth',
        method: 'POST',
        body,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled

          localStorage.setItem(
            'auth',
            JSON.stringify({
              accessToken: result.data.token,
              user: result.data.user,
            })
          )
          dispatch(
            userLoggedIn({
              accessToken: result.data.token,
              user: result.data.user,
            })
          )
        } catch (error) {}
      },
    }),

    register: builder.mutation({
      query: (body) => ({
        url: '/auth/register',
        method: 'POST',
        body,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled

          localStorage.setItem(
            'auth',
            JSON.stringify({
              accessToken: result.data.token,
              user: result.data.user,
            })
          )
          dispatch(
            userLoggedIn({
              accessToken: result.data.token,
              user: result.data.user,
            })
          )
        } catch (error) {}
      },
    }),
  }),
})

export const { useLoginMutation, useRegisterMutation } = authApi
