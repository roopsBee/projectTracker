import { createAsyncThunk } from "@reduxjs/toolkit"
import faunaClient from "../../utils/faunaClient"

type GetProjectListReturnType = {
  projectId: string
  projectName: string
}[]

const getProjectList = createAsyncThunk<
  GetProjectListReturnType | undefined,
  { userId: string; secret: string }
>("project/getProjectList", async ({ userId, secret }, { rejectWithValue }) => {
  if (userId && secret) {
    const { client, q } = faunaClient(secret)
    const data: GetProjectListReturnType = await client.query(
      q.Call("projectsGetList", userId)
    )
    return data
  } else {
    return rejectWithValue({ userId, secret })
  }
})

export default getProjectList
