import { createAsyncThunk } from "@reduxjs/toolkit"
import { RootState } from "../../store"
import faunaClient from "../../../utils/faunaClient"
import { ProjectTag } from "../projectSlice"

// type EditTagReturnType = {
//   projectId:string
// }

const tagEditThunk = createAsyncThunk<
  { projectId: string; index: number; tag: ProjectTag },
  { projectId: string; tagName: string; index: number; tagColor: string },
  { state: RootState }
>(
  "project/tagEditThunk",
  async (
    { tagName, tagColor, index, projectId },
    { getState, rejectWithValue }
  ) => {
    const { secret } = getState().user
    if (secret) {
      const { client, q } = faunaClient(secret)

      await client.query(
        q.Call("tagEdit", [tagName, tagColor, index, projectId])
      )

      return { projectId, index, tag: { tagColor, tagName } }
    } else {
      return rejectWithValue(secret)
    }
  }
)

export default tagEditThunk
