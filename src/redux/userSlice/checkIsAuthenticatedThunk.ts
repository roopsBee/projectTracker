import { createAsyncThunk } from "@reduxjs/toolkit"
import { RootState } from "../store"
import faunaClient from "../../utils/faunaClient"

const checkIsAuthenticated = createAsyncThunk<
  void,
  undefined,
  {
    state: RootState
  }
>("users/checkIsAuthenticated", async (arg, { getState, rejectWithValue }) => {
  if (!getState().user.isLoggedIn) {
    return rejectWithValue(false)
  }

  const { secret } = getState().user
  if (secret) {
    const { client, q } = faunaClient(secret)
    const identity = await client.query(q.CurrentIdentity())
    if (!identity) return rejectWithValue(false)
  } else {
    return rejectWithValue(false)
  }
})

export default checkIsAuthenticated
