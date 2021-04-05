import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import firebase from "gatsby-plugin-firebase"
import { navigate } from "gatsby"
import faunadb from "faunadb"
import { RootState } from "../store"

const logOut = createAsyncThunk<
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
  localStorage.removeItem("user")
  navigate("/")
})

export default logOut
