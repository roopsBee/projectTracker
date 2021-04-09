import { createSlice } from "@reduxjs/toolkit"
import createProject from "./createProjectThunk"
import getProjectList from "./getProjectListThunk"

export type ProjectType = {
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

interface ProjectState {
  isLoading: boolean
  projects?: ProjectType[]
}

const initialState: ProjectState = { isLoading: false, projects: [] }

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    logOut(state) {
      Object.assign(state, initialState)
    },
  },
  extraReducers: builder => {
    builder
      .addCase(createProject.pending, (state, action) => {
        state.isLoading = true
        console.log("creating project...")
      })
      .addCase(createProject.fulfilled, (state, { payload }) => {
        state.projects?.push(payload)
        state.isLoading = false
        console.log("fulfilled")
      })
      .addCase(createProject.rejected, (state, action) => {
        state.isLoading = false
        console.log("rejected", action)
      })
      .addCase(getProjectList.pending, (state, action) => {
        state.isLoading = true
        console.log("fetching project list...")
      })
      .addCase(getProjectList.fulfilled, (state, { payload }) => {
        state.projects = payload
        state.isLoading = false
        console.log("fulfilled")
      })
      .addCase(getProjectList.rejected, (state, action) => {
        state.isLoading = false
        console.log("rejected", action)
      })
  },
})

export const { logOut } = projectSlice.actions

export default projectSlice.reducer
