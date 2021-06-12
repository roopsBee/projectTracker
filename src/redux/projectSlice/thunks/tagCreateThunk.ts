import { createAsyncThunk } from "@reduxjs/toolkit"
import { RootState } from "../../store"
import faunaClient from "../../../utils/faunaClient"
import { ProjectTag } from "../projectSlice"

// type CreateTagReturnType = {
//   projectId:string
// }

const tagCreateThunk = createAsyncThunk<
  { projectId: string; tag: ProjectTag },
  { projectId: string; tag: ProjectTag },
  { state: RootState }
>(
  "project/tagCreateThunk",
  async ({ tag, projectId }, { getState, rejectWithValue }) => {
    const { secret } = getState().user
    if (secret) {
      const { client, q } = faunaClient(secret)

      await client.query(
        q.Call("tagCreate", [tag.tagName, tag.tagColor, tag.tagId, projectId])
      )

      return { projectId, tag }
    } else {
      return rejectWithValue(secret)
    }
  }
)

export default tagCreateThunk
