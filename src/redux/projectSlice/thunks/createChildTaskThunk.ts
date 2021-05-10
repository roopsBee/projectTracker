import { createAsyncThunk } from "@reduxjs/toolkit"
import { RootState } from "../../store"
import faunaClient from "../../../utils/faunaClient"
import { ChildTaskType } from "../projectSlice"

type ChildTaskCreateReturnType = {
  childTaskId: string
  childTaskName: string
  completed: boolean
  comments: []
}

const createChildTask = createAsyncThunk<
  ChildTaskType & { projectId: string; taskId: string; groupId: string },
  { childTaskName: string; taskId: string; projectId: string; groupId: string },
  { state: RootState }
>(
  "project/createChildTask",
  async (
    { childTaskName, taskId, projectId, groupId },
    { getState, rejectWithValue }
  ) => {
    const { userId, secret } = getState().user
    if (secret) {
      const { client, q } = faunaClient(secret)

      const data: ChildTaskCreateReturnType = await client.query(
        q.Call("childTaskCreate", [childTaskName, taskId, userId])
      )

      return { ...data, projectId, taskId, groupId }
    } else {
      return rejectWithValue(secret)
    }
  }
)

export default createChildTask
