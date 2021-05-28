import { createAsyncThunk } from "@reduxjs/toolkit"
import { RootState } from "../../store"
import faunaClient from "../../../utils/faunaClient"
import { ProjectType } from "../projectSlice"

const createProject = createAsyncThunk<
  ProjectType,
  string,
  { state: RootState }
>(
  "project/createProject",
  async (projectName, { getState, rejectWithValue }) => {
    const { userId, secret } = getState().user
    if (secret) {
      const { client, q } = faunaClient(secret)

      const data: ProjectType = await client.query(
        q.Call("projectCreate", [projectName, userId])
      )

      return { ...data }
    } else {
      return rejectWithValue(secret)
    }
  }
)

export default createProject
