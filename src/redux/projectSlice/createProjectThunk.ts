import { createAsyncThunk } from "@reduxjs/toolkit"

import faunadb from "faunadb"
import { RootState } from "../store"

type ProjectCreateReturnType = {
  projectId: string
  projectName: string
  taskgroups: []
}

const createProject = createAsyncThunk<
  {},
  string,
  {
    state: RootState
  }
>("project/createProject", async (projectName, { getState }) => {
  const { userId, secret } = getState().user

  const client = new faunadb.Client({ secret: secret! })
  const q = faunadb.query

  const data: ProjectCreateReturnType = await client.query(
    q.Call("projectCreate", [projectName, userId])
  )

  const { projectId } = data
  return { projectId, projectName }
})

export default createProject
