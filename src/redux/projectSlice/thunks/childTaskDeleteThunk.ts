import { createAsyncThunk } from "@reduxjs/toolkit"
import { RootState } from "../../store"
import faunaClient from "../../../utils/faunaClient"

type ChildtaskNameDeleteReturnType = {
  taskId: string
  childTaskId: string
}

const childTaskDelete = createAsyncThunk<
  ChildtaskNameDeleteReturnType & { projectId: string; groupId: string },
  { childTaskId: string; projectId: string; groupId: string },
  { state: RootState }
>(
  "project/childTaskDelete",
  async (
    { projectId, childTaskId, groupId },
    { getState, rejectWithValue }
  ) => {
    const { secret } = getState().user
    if (secret) {
      const { client, q } = faunaClient(secret)
      const data: ChildtaskNameDeleteReturnType = await client.query(
        q.Call("childTaskDelete", [childTaskId])
      )
      return { ...data, projectId, groupId }
    } else {
      return rejectWithValue(secret)
    }
  }
)

export default childTaskDelete
