import { createAsyncThunk } from "@reduxjs/toolkit"
import { RootState } from "../../store"
import faunaClient from "../../../utils/faunaClient"
import { TaskGroupType } from "../projectSlice"

type GroupCreateReturnType = {
  groupId: string
  taskGroupName: string
  tasks: []
}

const createGroup = createAsyncThunk<
  TaskGroupType & { projectId: string },
  { taskGroupName: string; projectId: string },
  { state: RootState }
>(
  "project/createGroup",
  async ({ taskGroupName, projectId }, { getState, rejectWithValue }) => {
    const { userId, secret } = getState().user
    if (secret) {
      const { client, q } = faunaClient(secret)

      const data: GroupCreateReturnType = await client.query(
        q.Call("taskGroupCreate", [taskGroupName, projectId, userId])
      )

      const { groupId, tasks } = data
      return { groupId, tasks, taskGroupName, projectId }
    } else {
      return rejectWithValue(secret)
    }
  }
)

export default createGroup
