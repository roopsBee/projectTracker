import { createAsyncThunk } from "@reduxjs/toolkit"
import { RootState } from "../store"
import faunaClient from "../../utils/faunaClient"

type TaskGroupNameChangeReturnType = {
  projectId: string
  taskGroupName: string
  groupId: string
}

const taskGroupChangeName = createAsyncThunk<
  TaskGroupNameChangeReturnType,
  { newName: string; groupId: string },
  { state: RootState }
>(
  "project/taskGroupChangeName",
  async ({ newName, groupId }, { getState, rejectWithValue }) => {
    const { userId, secret } = getState().user
    if (secret) {
      const { client, q } = faunaClient(secret)

      const data: TaskGroupNameChangeReturnType = await client.query(
        q.Call("taskGroupNameChange", [groupId, newName, userId])
      )

      return { ...data }
    } else {
      return rejectWithValue(secret)
    }
  }
)

export default taskGroupChangeName
