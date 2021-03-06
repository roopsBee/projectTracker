import { createSlice } from "@reduxjs/toolkit"
import logOut from "./logOutThunk"
import login from "./loginThunk"
import signUp from "./signUpThunk"

export interface UserState {
  secret?: string | null
  userId?: string | null
  email?: string | null
  userName?: string | null
  isLoggingIn?: boolean
  isLoggedIn?: boolean
  isLoggingOut?: boolean
}

export const initialState: UserState = {
  secret: null,
  userId: null,
  email: null,
  userName: null,
  isLoggingIn: false,
  isLoggedIn: false,
  isLoggingOut: false,
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
      .addCase(logOut.fulfilled, state => {
        Object.assign(state, initialState)
        console.log("log out fulfilled")
      })
      .addCase(logOut.pending, state => {
        state.isLoggingOut = true
        console.log("logging out")
      })
      .addCase(logOut.rejected, (state, action) => {
        Object.assign(state, initialState)
        state.isLoggingOut = false
        console.log("log out rejected", action.error)
      })
  },
})

export default userSlice.reducer
