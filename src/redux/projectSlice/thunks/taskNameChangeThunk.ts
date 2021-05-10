import { createAsyncThunk } from "@reduxjs/toolkit"
import { RootState } from "../../store"
import faunaClient from "../../../utils/faunaClient"

type TaskNameChangeReturnType = {
  taskId: string
  taskName: string
  groupId: string
}

const taskChangeName = createAsyncThunk<
  TaskNameChangeReturnType & { projectId: string },
  { newName: string; taskId: string; projectId: string },
  { state: RootState }
>(
  "project/taskChangeName",
  async ({ newName, taskId, projectId }, { getState, rejectWithValue }) => {
    const { userId, secret } = getState().user
    if (secret) {
      const { client, q } = faunaClient(secret)
      const data: TaskNameChangeReturnType = await client.query(
        q.Call("taskNameChange", [taskId, newName, userId])
      )
      return { ...data, projectId }
    } else {
      return rejectWithValue(secret)
    }
  }
)

export default taskChangeName
