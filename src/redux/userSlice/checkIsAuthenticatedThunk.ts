import { createAsyncThunk } from "@reduxjs/toolkit"
import { RootState } from "../store"
import faunaClient from "../../utils/faunaClient"
import axios from "axios"

const checkIsAuthenticated = createAsyncThunk<
  void,
  undefined,
  {
    state: RootState
  }
>("users/checkIsAuthenticated", async (arg, { getState, rejectWithValue }) => {
  const { isLoggedIn, userIdToken, secret } = getState().user
  if (!isLoggedIn || !userIdToken) {
    return rejectWithValue(false)
  }

  if (secret) {
    const { client, q } = faunaClient(secret)
    await Promise.all([
      client.query(q.CurrentIdentity()),
      axios.post("/.netlify/functions/verify-user-id-token", {
        userIdToken,
      }),
    ])
  } else {
    return rejectWithValue(false)
  }
})

export default checkIsAuthenticated
