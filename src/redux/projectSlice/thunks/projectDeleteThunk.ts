import { createAsyncThunk } from "@reduxjs/toolkit"
import { navigate } from "gatsby"

import { RootState } from "../../store"
import faunaClient from "../../../utils/faunaClient"

const projectDelete = createAsyncThunk<
  { projectId: string },
  { projectId: string },
  { state: RootState }
>(
  "project/projectDelete",
  async ({ projectId }, { getState, rejectWithValue }) => {
    const { userId, secret } = getState().user
    if (secret) {
      const { client, q } = faunaClient(secret)

      await client.query(q.Call("projectDelete", [projectId, userId]))
      navigate("/")

      return { projectId }
    } else {
      return rejectWithValue(secret)
    }
  }
)

export default projectDelete
