import { createAsyncThunk } from "@reduxjs/toolkit"
import { RootState } from "../../store"
import faunaClient from "../../../utils/faunaClient"

type ChildtaskNameChangeReturnType = {
  taskId: string
  childTaskId: string
  childTaskName: string
}

const childTaskChangeName = createAsyncThunk<
  ChildtaskNameChangeReturnType & { projectId: string; groupId: string },
  { newName: string; childTaskId: string; projectId: string; groupId: string },
  { state: RootState }
>(
  "project/childTaskChangeName",
  async (
    { newName, projectId, childTaskId, groupId },
    { getState, rejectWithValue }
  ) => {
    const { userId, secret } = getState().user
    if (secret) {
      const { client, q } = faunaClient(secret)
      const data: ChildtaskNameChangeReturnType = await client.query(
        q.Call("childTaskNameChange", [childTaskId, newName, userId])
      )
      return { ...data, projectId, groupId }
    } else {
      return rejectWithValue(secret)
    }
  }
)

export default childTaskChangeName
