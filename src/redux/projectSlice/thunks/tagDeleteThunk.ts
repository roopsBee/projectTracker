import { createAsyncThunk } from "@reduxjs/toolkit"
import { RootState } from "../../store"
import faunaClient from "../../../utils/faunaClient"

// type DeleteTagReturnType = {
//   projectId:string
// }

const tagDeleteThunk = createAsyncThunk<
  { projectId: string; index: number },
  { projectId: string; index: number },
  { state: RootState }
>(
  "project/tagDeleteThunk",
  async ({ index, projectId }, { getState, rejectWithValue }) => {
    const { secret } = getState().user
    if (secret) {
      const { client, q } = faunaClient(secret)

      await client.query(q.Call("tagDelete", [index, projectId]))

      return { projectId, index }
    } else {
      return rejectWithValue(secret)
    }
  }
)

export default tagDeleteThunk
