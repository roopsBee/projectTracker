import { createAsyncThunk } from "@reduxjs/toolkit"
import { RootState } from "../../store"
import faunaClient from "../../../utils/faunaClient"

// type AddTaskTagReturnType = {
//   taskId:string
//  tagId:string
// }

const addTaskTagThunk = createAsyncThunk<
  { projectId: string; tagId: string; taskId: string },
  {
    projectId: string
    tagId: string
    taskId: string
  },
  { state: RootState }
>(
  "project/addTaskTagThunk",
  async ({ projectId, tagId, taskId }, { getState, rejectWithValue }) => {
    const { secret } = getState().user
    if (secret) {
      const { client, q } = faunaClient(secret)

      await client.query(q.Call("addTaskTag", [taskId, tagId]))

      return { projectId, taskId, tagId }
    } else {
      return rejectWithValue(secret)
    }
  }
)

export default addTaskTagThunk
