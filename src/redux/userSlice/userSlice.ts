import { createSlice } from "@reduxjs/toolkit"
import logOut from "./logOutThunk"
import login from "./loginThunk"
import signUp from "./signUpThunk"
import checkIsAuthenticated from "./checkIsAuthenticatedThunk"

export interface UserState {
  secret?: string | null
  userId?: string | null
  email?: string | null
  userName?: string | null
  isLoggingIn?: boolean
  isLoggedIn?: boolean
  isLoggingOut?: boolean
  isLoading?: boolean
}

export const initialState: UserState = {
  secret: null,
  userId: null,
  email: null,
  userName: null,
  isLoggingIn: false,
  isLoggedIn: false,
  isLoggingOut: false,
  isLoading: true,
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        const { payload } = action
        Object.assign(state, payload)
        state.isLoggingIn = false
        state.isLoggedIn = true
        console.log("fulfilled")
      })
      .addCase(login.pending, state => {
        state.isLoggingIn = true
        console.log("logging in")
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoggingIn = false
        console.log("rejected", action.error)
      })
      .addCase(signUp.fulfilled, (state, action) => {
        const { payload } = action
        Object.assign(state, payload)
        state.isLoggingIn = false
        state.isLoggedIn = true
        console.log("fulfilled")
      })
      .addCase(signUp.pending, state => {
        state.isLoggingIn = true
        console.log("logging in")
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isLoggingIn = false
        console.log("rejected", action.error)
      })
      .addCase(logOut.fulfilled, () => {
        console.log("log out fulfilled")
        return { ...initialState, isLoading: false }
      })
      .addCase(logOut.pending, state => {
        state.isLoggingOut = true
        console.log("logging out")
      })
      .addCase(logOut.rejected, (state, action) => {
        Object.assign(state, { ...initialState, isLoading: false })
        state.isLoggingOut = false
        console.log("log out rejected", action.error)
      })
      // check if user is authenticated
      .addCase(checkIsAuthenticated.fulfilled, state => {
        state.isLoading = false
        console.log("authenticated")
      })
      .addCase(checkIsAuthenticated.pending, () => {
        console.log("authenticating")
      })
      .addCase(checkIsAuthenticated.rejected, (state, action) => {
        Object.assign(state, { ...initialState, isLoading: false })
        console.log("not authenticated", action.error)
      })
  },
})

export default userSlice.reducer
