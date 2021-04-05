import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import firebase from "gatsby-plugin-firebase"
import axios from "axios"
import siteLoadAuth from "./siteLoadAuthThunk"
import logOut from "./logOutThunk"
import login from "./loginThunk"

interface UserState {
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

export const signUp = createAsyncThunk(
  "users/signUp",
  async ({
    email,
    password,
    userName,
  }: {
    email: string
    password: string
    userName: string
  }) => {
    await firebase.auth().createUserWithEmailAndPassword(email, password)
    const userIdToken = await firebase.auth().currentUser?.getIdToken(true)
    const { data } = await axios.post("/.netlify/functions/user-create-login", {
      userIdToken,
      userName,
    })

    const { secret, userId } = data
    const user = { userName, secret, userId, email }
    localStorage.setItem("user", JSON.stringify(user))

    return user
  }
)

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
      .addCase(login.pending, (state, action) => {
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
      .addCase(signUp.pending, (state, action) => {
        state.isLoggingIn = true
        console.log("logging in")
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isLoggingIn = false
        console.log("rejected", action.error)
      })
      .addCase(logOut.fulfilled, (state, action) => {
        Object.assign(state, initialState)
        console.log("log out fulfilled")
      })
      .addCase(logOut.pending, (state, action) => {
        state.isLoggingOut = true
        console.log("logging out")
      })
      .addCase(logOut.rejected, (state, action) => {
        state.isLoggingOut = false
        console.log("log out rejected", action.error)
      })
      .addCase(siteLoadAuth.fulfilled, (state, { payload }) => {
        Object.assign(state, payload)
        state.isLoggingIn = false
        console.log("auth fulfilled")
      })
      .addCase(siteLoadAuth.pending, (state, action) => {
        state.isLoggingIn = true
        console.log("checking auth")
      })
      .addCase(siteLoadAuth.rejected, (state, action) => {
        state.isLoggingIn = false
        console.log("auth rejected", action.error)
      })
  },
})

export const {} = userSlice.actions

export default userSlice.reducer
