import {
  createAsyncThunk,
  createSlice,
  AsyncThunkPayloadCreator,
} from "@reduxjs/toolkit"
import firebase from "gatsby-plugin-firebase"
import axios from "axios"
import { navigate } from "gatsby"
import faunadb from "faunadb"
import { RootState } from "./store"

interface UserState {
  secret?: string | null
  userId?: {} | null
  email?: string | null
  userName?: string | null
  isLoggingIn?: boolean
  isLoggedIn?: boolean
  isLoggingOut?: boolean
}

const initialState: UserState = {
  secret: null,
  userId: null,
  email: null,
  userName: null,
  isLoggingIn: false,
  isLoggedIn: false,
  isLoggingOut: false,
}

export const logOut = createAsyncThunk<
  void,
  undefined,
  {
    state: RootState
  }
>("users/logOut", async (arg, { getState }) => {
  await firebase.auth().signOut()
  const { secret } = getState().user

  if (secret) {
    const client = new faunadb.Client({ secret })
    const q = faunadb.query
    await client.query(q.Logout(true))
  }
  navigate("/")
})

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
  },
})

export const {} = userSlice.actions

export default userSlice.reducer
