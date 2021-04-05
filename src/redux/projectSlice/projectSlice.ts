import { createSlice } from "@reduxjs/toolkit"
import createProject from "./createProjectThunk"

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
