import { createAsyncThunk } from "@reduxjs/toolkit"
import { RootState } from "../../store"
import faunaClient from "../../../utils/faunaClient"
import { TaskType } from "../projectSlice"

type TaskCreateReturnType = {
  taskId: string
  taskName: string
  completed: boolean
  comments: []
  childTasks: []
}

const createTask = createAsyncThunk<
  TaskType & { projectId: string; groupId: string },
  { taskName: string; groupId: string; projectId: string },
  { state: RootState }
>(
  "project/createTask",
  async ({ taskName, groupId, projectId }, { getState, rejectWithValue }) => {
    const { userId, secret } = getState().user
    if (secret) {
      const { client, q } = faunaClient(secret)

      const data: TaskCreateReturnType = await client.query(
        q.Call("taskCreate", [taskName, groupId, userId])
      )

      return { ...data, projectId, groupId }
    } else {
      return rejectWithValue(secret)
    }
  }
)

export default createTask
