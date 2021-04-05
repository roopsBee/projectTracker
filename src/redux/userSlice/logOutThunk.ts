import { createAsyncThunk } from "@reduxjs/toolkit"
import firebase from "gatsby-plugin-firebase"
import { navigate } from "gatsby"
import { RootState } from "../store"
import faunaClient from "../../utils/faunaClient"

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
    const { client, q } = faunaClient(secret)
    await client.query(q.Logout(true))
  }
  localStorage.removeItem("user")
  navigate("/")
})

export default logOut
