import { createAsyncThunk } from "@reduxjs/toolkit"
import { RootState } from "../../store"
import faunaClient from "../../../utils/faunaClient"

// type AddTaskTagReturnType = {
//   taskId:string
//  tagId:string
// }

const removeTaskTagThunk = createAsyncThunk<
  { projectId: string; taskId: string; tagId: string },
  { projectId: string; tagId: string; taskId: string },
  { state: RootState }
>(
  "project/removeTaskTagThunk",
  async ({ projectId, taskId, tagId }, { getState, rejectWithValue }) => {
    const { secret } = getState().user
    if (secret) {
      const { client, q } = faunaClient(secret)

      await client.query(q.Call("removeTaskTag", [taskId, tagId]))

      return { projectId, taskId, tagId }
    } else {
      return rejectWithValue(secret)
    }
  }
)

export default removeTaskTagThunk
