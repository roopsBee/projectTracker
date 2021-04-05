import { createAsyncThunk } from "@reduxjs/toolkit"

import faunadb from "faunadb"
import { RootState } from "../store"

type GetProjectListReturnType = {
  projectId: string
  projectName: string
}[]

const getProjectList = createAsyncThunk<
  {}[] | undefined,
  { userId: string; secret: string },
  { state: RootState }
>("project/getProjectList", async ({ userId, secret }, { rejectWithValue }) => {
  if (userId && secret) {
    const client = new faunadb.Client({ secret })
    const q = faunadb.query
    console.log({ userId, secret })

    const data: GetProjectListReturnType = await client.query(
      q.Call("projectsGetList", userId)
    )
    console.log(data)

    return data
  } else {
    return rejectWithValue({ userId, secret })
  }
})

export default getProjectList
