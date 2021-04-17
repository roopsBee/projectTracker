import { createSlice } from "@reduxjs/toolkit"
import createProject from "./createProjectThunk"
import getProjectList from "./getProjectListThunk"
import getProject from "./getProjectThunk"
import createGroup from "./createGroupThunk"
import createTask from "./createTaskThunk"
import groupBuilder from "./groupBuilder"
import taskBuilder from "./taskBuilder"
import createChildTask from "./createChildTaskThunk"

export type ProjectType = {
  projectName?: string
  projectId?: string
  taskGroups?: TaskGroupType[]
}

export type TaskGroupType = {
  groupId: string
  taskGroupName: string
  tasks?: TaskType[]
}

export type TaskType = {
  taskId: string
  taskName: string
  completed: boolean
  comments: string[] | []
  childTasks: ChildTaskType[]
}

export type ChildTaskType = {
  childTaskId: string
  childTaskName: string
  completed: boolean
  comments: string[] | []
}

export interface ProjectState {
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
      // create project
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
      // get project list
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
      // get project
      .addCase(getProject.pending, (state, action) => {
        state.isLoading = true
        console.log("fetching project...")
      })
      .addCase(getProject.fulfilled, (state, { payload }) => {
        const project = state.projects?.find(
          project => project.projectId === payload.projectId
        )
        Object.assign(project, payload)
        state.isLoading = false
        console.log("fulfilled")
      })
      .addCase(getProject.rejected, (state, action) => {
        state.isLoading = false
        console.log("rejected", action)
      })
      .addCase(createChildTask.pending, (state, action) => {
        state.isLoading = true
        console.log("Creating child task...")
      })
      .addCase(createChildTask.fulfilled, (state, { payload }) => {
        const {
          projectId,
          childTaskId,
          comments,
          completed,
          taskId,
          childTaskName,
          groupId,
        } = payload

        const task = state.projects
          ?.find(project => project.projectId === projectId)
          ?.taskGroups?.find(group => group.groupId === groupId)
          ?.tasks?.find(task => task.taskId === taskId)

        task?.childTasks.push({
          childTaskName,
          childTaskId,
          completed,
          comments,
        })

        state.isLoading = false
        console.log("fulfilled")
      })
      .addCase(createChildTask.rejected, (state, action) => {
        state.isLoading = false
        console.log("rejected", action)
      })
    taskBuilder(builder)
    groupBuilder(builder)
  },
})

export const { logOut } = projectSlice.actions

export default projectSlice.reducer
