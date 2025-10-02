import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  token: string | null
  isAuthenticated: boolean
}

const tokenKey = 'dashboard_token'

const initialState: AuthState = {
  token: localStorage.getItem(tokenKey),
  isAuthenticated: !!localStorage.getItem(tokenKey),
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<string>) {
      localStorage.setItem(tokenKey, action.payload)
      state.token = action.payload
      state.isAuthenticated = true
    },
    logout(state) {
      localStorage.removeItem(tokenKey)
      state.token = null
      state.isAuthenticated = false
    },
  },
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer
