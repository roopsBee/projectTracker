import { createAsyncThunk } from "@reduxjs/toolkit"
import { RootState } from "../../store"
import faunaClient from "../../../utils/faunaClient"

type ProjectCreateReturnType = {
  projectId: string
  projectName: string
  taskgroups?: []
}

const createProject = createAsyncThunk<
  ProjectCreateReturnType,
  string,
  { state: RootState }
>(
  "project/createProject",
  async (projectName, { getState, rejectWithValue }) => {
    const { userId, secret } = getState().user
    if (secret) {
      const { client, q } = faunaClient(secret)

      const data: ProjectCreateReturnType = await client.query(
        q.Call("projectCreate", [projectName, userId])
      )

      const { projectId } = data
      return { projectId, projectName }
    } else {
      return rejectWithValue(secret)
    }
  }
)

export default createProject
