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

const initialState: ProjectState[] = [{}]

export const getProjectsList = createAsyncThunk("project/getList", async () => {
  return {}
})

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {},
  extraReducers: builder => {},
})

export const {} = projectSlice.actions

export default projectSlice.reducer
