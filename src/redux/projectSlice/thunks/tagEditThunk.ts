import { createAsyncThunk } from "@reduxjs/toolkit"
import { RootState } from "../../store"
import faunaClient from "../../../utils/faunaClient"
import { ProjectTag } from "../projectSlice"

// type EditTagReturnType = {
//   projectId:string
// }

const tagEditThunk = createAsyncThunk<
  { projectId: string; tag: ProjectTag },
  { projectId: string; tag: ProjectTag },
  { state: RootState }
>(
  "project/tagEditThunk",
  async ({ tag, projectId }, { getState, rejectWithValue }) => {
    const { secret } = getState().user
    if (secret) {
      const { client, q } = faunaClient(secret)

      await client.query(
        q.Call("tagEdit", [tag.tagName, tag.tagColor, tag.tagId, projectId])
      )

      return { projectId, tag }
    } else {
      return rejectWithValue(secret)
    }
  }
)

export default tagEditThunk
