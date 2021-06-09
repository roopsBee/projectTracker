import { createAsyncThunk } from "@reduxjs/toolkit"
import { RootState } from "../../store"
import faunaClient from "../../../utils/faunaClient"
import { ProjectTag } from "../projectSlice"

// type AddTaskTagReturnType = {
//   taskId:string
//  tag:ProjectTag
// }

const addTaskTagThunk = createAsyncThunk<
  { projectId: string; tag: ProjectTag; taskId: string },
  {
    projectId: string
    tag: ProjectTag
    taskId: string
  },
  { state: RootState }
>(
  "project/addTaskTagThunk",
  async ({ projectId, tag, taskId }, { getState, rejectWithValue }) => {
    const { secret } = getState().user
    if (secret) {
      const { client, q } = faunaClient(secret)

      await client.query(
        q.Call("addTaskTag", [taskId, tag.tagName, tag.tagColor])
      )

      return { projectId, taskId, tag }
    } else {
      return rejectWithValue(secret)
    }
  }
)

export default addTaskTagThunk
