import { createAsyncThunk } from "@reduxjs/toolkit"
import { RootState } from "../store"
import faunaClient from "../../utils/faunaClient"

type ToggleTaskDoneReturnType = {
  taskId: string
  completed: boolean
}

const toggleTaskDone = createAsyncThunk<
  ToggleTaskDoneReturnType & { projectId: string },
  { taskId: string; isDone: boolean; projectId: string },
  { state: RootState }
>(
  "project/toggleTaskDone",
  async ({ projectId, taskId, isDone }, { getState, rejectWithValue }) => {
    const { userId, secret } = getState().user
    if (secret) {
      const { client, q } = faunaClient(secret)
      const data: ToggleTaskDoneReturnType = await client.query(
        q.Call("taskToggleDone", [taskId, isDone, userId])
      )

      return { ...data, projectId }
    } else {
      return rejectWithValue(secret)
    }
  }
)

export default toggleTaskDone
