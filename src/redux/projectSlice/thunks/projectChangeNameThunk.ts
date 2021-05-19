import { createAsyncThunk } from "@reduxjs/toolkit"

import { RootState } from "../../store"
import faunaClient from "../../../utils/faunaClient"

const projectChangeName = createAsyncThunk<
  { projectId: string; newProjectName: string },
  { projectId: string; newProjectName: string },
  { state: RootState }
>(
  "project/projectChangeName",
  async ({ projectId, newProjectName }, { getState, rejectWithValue }) => {
    const { secret } = getState().user
    if (secret) {
      const { client, q } = faunaClient(secret)
      await client.query(
        q.Call("projectChangeName", [projectId, newProjectName])
      )

      return { projectId, newProjectName }
    } else {
      return rejectWithValue(secret)
    }
  }
)

export default projectChangeName
