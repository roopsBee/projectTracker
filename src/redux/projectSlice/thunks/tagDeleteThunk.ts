import { createAsyncThunk } from "@reduxjs/toolkit"
import { RootState } from "../../store"
import faunaClient from "../../../utils/faunaClient"

// type DeleteTagReturnType = {
//   projectId:string
// }

const tagDeleteThunk = createAsyncThunk<
  { projectId: string; tagId: string },
  { projectId: string; tagId: string },
  { state: RootState }
>(
  "project/tagDeleteThunk",
  async ({ tagId, projectId }, { getState, rejectWithValue }) => {
    const { secret } = getState().user
    if (secret) {
      const { client, q } = faunaClient(secret)

      await client.query(q.Call("tagDelete", [tagId, projectId]))

      return { projectId, tagId }
    } else {
      return rejectWithValue(secret)
    }
  }
)

export default tagDeleteThunk
