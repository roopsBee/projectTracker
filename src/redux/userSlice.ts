import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import firebase from "gatsby-plugin-firebase"
import axios from "axios"

interface UserState {
  secret?: string | null
  userId?: {} | null
  email?: string | null
  userName?: string | null
  isLoggingIn?: boolean
  isLoggedIn?: boolean
}

const initialState: UserState = {
  secret: null,
  userId: null,
  email: null,
  userName: null,
  isLoggingIn: false,
  isLoggedIn: false,
}

export const login = createAsyncThunk(
  "users/login",
  async ({ email, password }: { email: string; password: string }) => {
    await firebase.auth().signInWithEmailAndPassword(email, password)
    const userIdToken = await firebase.auth().currentUser?.getIdToken(true)
    const { data } = await axios.post("/.netlify/functions/user-login", {
      userIdToken,
    })
    const { secret, userName } = data
    const userId = JSON.stringify(data.userId)

    return { userName, secret, userId, email }
  }
)

export const signUp = createAsyncThunk(
  "users/login",
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
    const { secret } = data
    const userId = JSON.stringify(data.userId)

    return { userName, secret, userId, email }
  }
)

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        const {
          payload: { email, secret, userId, userName },
        } = action
        state.secret = secret
        state.email = email
        state.userId = userId
        state.userName = userName
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
  },
})

export const {} = userSlice.actions

export default userSlice.reducer
