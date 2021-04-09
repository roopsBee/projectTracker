import { createAsyncThunk } from "@reduxjs/toolkit"
import faunaClient from "../../utils/faunaClient"
import { RootState } from "../store"
import { ProjectType } from "./projectSlice"

const getProject = createAsyncThunk<
  ProjectType,
  { projectId: string },
  { state: RootState }
>(
  "project/getProject",
  async ({ projectId }, { getState, rejectWithValue }) => {
    const secret = getState().user.secret
    if (secret) {
      const { client, q } = faunaClient(secret)
      const data = await client.query(q.Call("projectGet", projectId))
      return data
    } else {
      return rejectWithValue({ secret })
    }
  }
)

export default getProject
