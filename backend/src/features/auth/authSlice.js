import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  accessToken: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.user = action.payload.user
      state.accessToken = action.payload.accessToken
    },
    userLoggOut: (state) => {
      state.user = null
      state.accessToken = null
      localStorage.removeItem('auth')
    },
  },
})

export const { userLoggedIn, userLoggOut } = authSlice.actions
export default authSlice.reducer
