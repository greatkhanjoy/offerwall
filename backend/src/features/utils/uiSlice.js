import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  sideMenuOpen: false,
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSideMenu: (state) => {
      state.sideMenuOpen = !state.sideMenuOpen
    },
  },
})

export const { toggleSideMenu } = uiSlice.actions
export default uiSlice.reducer
