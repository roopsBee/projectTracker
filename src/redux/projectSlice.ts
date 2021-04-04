import {
  createAsyncThunk,
  createSlice,
  AsyncThunkPayloadCreator,
} from "@reduxjs/toolkit"
import firebase from "gatsby-plugin-firebase"
import axios from "axios"
import { navigate } from "gatsby"
import faunadb from "faunadb"
import { RootState } from "./store"

interface ProjectState {
  projectName?: string
  projectId?: string
  taskGroups?: {
    groupId: string
    taskGroupName: string
    tasks?: {
      taskId: string
      taskName: string
      completed: boolean
      comments: string[] | []
      childTasks?: {
        taskId: string
        childTaskName: string
        completed: boolean
        comments: string[] | []
      }[]
    }[]
  }[]
}

const initialState: ProjectState[] = []

type createProjectReturnType = {
  projectId: string
  projectName: string
  taskgroups: []
}

export const createProject = createAsyncThunk<
  {},
  string,
  {
    state: RootState
  }
>("project/createProject", async (projectName, { getState }) => {
  const { userId, secret } = getState().user

  const client = new faunadb.Client({ secret: secret! })
  const q = faunadb.query
  const data: createProjectReturnType = await client.query(
    q.Call("projectCreate", [projectName, userId])
  )

  const { projectId } = data
  return { projectId, projectName }
})

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(createProject.pending, (state, action) => {
        console.log("creating project...")
      })
      .addCase(createProject.fulfilled, (state, { payload }) => {
        state.push(payload)
        console.log("fulfilled")
      })
      .addCase(createProject.rejected, (state, action) => {
        console.log("rejected", action.error)
      })
  },
})

export const {} = projectSlice.actions

export default projectSlice.reducer
