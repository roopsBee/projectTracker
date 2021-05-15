import { createAsyncThunk } from "@reduxjs/toolkit"
import { RootState } from "../../store"
import faunaClient from "../../../utils/faunaClient"

type TaskDeleteReturnType = {
  taskId: string
  groupId: string
}

const taskDelete = createAsyncThunk<
  TaskDeleteReturnType & { projectId: string },
  { taskId: string; projectId: string },
  { state: RootState }
>(
  "project/taskDelete",
  async ({ projectId, taskId }, { getState, rejectWithValue }) => {
    const { secret } = getState().user
    if (secret) {
      const { client, q } = faunaClient(secret)
      const data: TaskDeleteReturnType = await client.query(
        q.Call("taskDelete", [taskId])
      )
      return { ...data, projectId }
    } else {
      return rejectWithValue(secret)
    }
  }
)

export default taskDelete
