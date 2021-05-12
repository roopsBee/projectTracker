import { createAsyncThunk } from "@reduxjs/toolkit"
import { RootState } from "../../store"
import faunaClient from "../../../utils/faunaClient"

const deleteGroup = createAsyncThunk<
  { projectId: string; groupId: string },
  { groupId: string; projectId: string },
  { state: RootState }
>(
  "project/deleteGroup",
  async ({ groupId, projectId }, { getState, rejectWithValue }) => {
    const { userId, secret } = getState().user
    if (secret) {
      const { client, q } = faunaClient(secret)

      await client.query(q.Call("taskGroupDelete", [groupId, userId]))

      return { groupId, projectId }
    } else {
      return rejectWithValue(secret)
    }
  }
)

export default deleteGroup
