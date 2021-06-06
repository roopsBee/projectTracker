import { createAsyncThunk } from "@reduxjs/toolkit"
import { RootState } from "../../store"
import faunaClient from "../../../utils/faunaClient"
import { ProjectTag } from "../projectSlice"

// type CreateTagReturnType = {
//   projectId:string
// }

const tagCreateThunk = createAsyncThunk<
  { projectId: string; tag: ProjectTag },
  { projectId: string; tagName: string; tagColor: string },
  { state: RootState }
>(
  "project/tagCreateThunk",
  async ({ tagName, tagColor, projectId }, { getState, rejectWithValue }) => {
    const { secret } = getState().user
    if (secret) {
      const { client, q } = faunaClient(secret)

      await client.query(q.Call("tagCreate", [tagName, tagColor, projectId]))

      return { projectId, tag: { tagColor, tagName } }
    } else {
      return rejectWithValue(secret)
    }
  }
)

export default tagCreateThunk
