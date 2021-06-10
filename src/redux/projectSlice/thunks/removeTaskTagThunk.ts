import { createAsyncThunk } from "@reduxjs/toolkit"
import { RootState } from "../../store"
import faunaClient from "../../../utils/faunaClient"
import { ProjectTag } from "../projectSlice"

// type AddTaskTagReturnType = {
//   taskId:string
//  tag:ProjectTag
// }

const removeTaskTagThunk = createAsyncThunk<
  { projectId: string; tagIndex: number; taskId: string },
  {
    projectId: string
    tag: ProjectTag
    taskId: string
    tagIndex: number
  },
  { state: RootState }
>(
  "project/removeTaskTagThunk",
  async (
    { projectId, tagIndex, taskId, tag },
    { getState, rejectWithValue }
  ) => {
    const { secret } = getState().user
    if (secret) {
      const { client, q } = faunaClient(secret)

      await client.query(q.Call("removeTaskTag", [taskId, tag]))

      return { projectId, taskId, tagIndex }
    } else {
      return rejectWithValue(secret)
    }
  }
)

export default removeTaskTagThunk
