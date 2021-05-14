import { createSlice } from "@reduxjs/toolkit"
import createProject from "./thunks/createProjectThunk"
import getProjectList from "./thunks/getProjectListThunk"
import getProject from "./thunks/getProjectThunk"
import groupBuilder from "./groupBuilder"
import taskBuilder from "./taskBuilder"
import createChildTask from "./thunks/createChildTaskThunk"
import createComment from "./thunks/createCommentThunk"
import childTaskNameChange from "./thunks/childTaskNameChangeThunk"
import childTaskDelete from "./thunks/childTaskDeleteThunk"

export interface ProjectState {
  isLoading: boolean
  projects?: ProjectType[]
}

export type ProjectType = {
  projectName?: string
  projectId?: string
  taskGroups?: TaskGroupType[]
}

export type TaskGroupType = {
  groupId: string
  taskGroupName: string
  tasks: TaskType[]
}

export type TaskType = {
  taskId: string
  taskName: string
  completed: boolean
  comments: CommentType[]
  childTasks: ChildTaskType[]
}

export type ChildTaskType = {
  childTaskId: string
  childTaskName: string
  completed: boolean
  comments: CommentType[]
}

export type CommentType = {
  text: string
  created?: string
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
      .addCase(createProject.pending, state => {
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
      .addCase(getProjectList.pending, state => {
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
      .addCase(getProject.pending, state => {
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
      // create child task
      .addCase(createChildTask.pending, state => {
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
      // delete child task
      .addCase(childTaskDelete.pending, state => {
        state.isLoading = true
        console.log("Deleting child task...")
      })
      .addCase(childTaskDelete.fulfilled, (state, { payload }) => {
        const { projectId, childTaskId, taskId, groupId } = payload

        const childTasks = state.projects
          ?.find(project => project.projectId === projectId)
          ?.taskGroups?.find(group => group.groupId === groupId)
          ?.tasks?.find(task => task.taskId === taskId)?.childTasks

        const childTaskIndex = childTasks?.findIndex(
          childTask => childTask.childTaskId === childTaskId
        )

        childTaskIndex !== undefined && childTasks?.splice(childTaskIndex, 1)

        state.isLoading = false
        console.log("fulfilled")
      })
      .addCase(childTaskDelete.rejected, (state, action) => {
        state.isLoading = false
        console.log("rejected", action)
      })
      // create comment
      .addCase(createComment.pending, state => {
        state.isLoading = true
        console.log("Adding comment...")
      })
      .addCase(createComment.fulfilled, (state, { payload }) => {
        const { comment, taskId, projectId } = payload

        state.projects
          ?.find(project => project.projectId === projectId)
          ?.taskGroups?.find(group =>
            group.tasks.find(task => {
              if (task.taskId === taskId) {
                task.comments.push(comment)
                return true
              }
              task.childTasks.find(childTask => {
                if (childTask.childTaskId === taskId) {
                  childTask.comments.push(comment)
                  return true
                }
              })
            })
          )

        state.isLoading = false
        console.log("fulfilled")
      })
      .addCase(createComment.rejected, (state, action) => {
        state.isLoading = false
        console.log("rejected", action)
      })
      // edit child task name
      .addCase(childTaskNameChange.pending, state => {
        state.isLoading = true
        console.log("Changing child task name...")
      })
      .addCase(childTaskNameChange.fulfilled, (state, { payload }) => {
        const {
          taskId,
          groupId,
          childTaskName,
          projectId,
          childTaskId,
        } = payload
        state.projects
          ?.find(project => project.projectId === projectId)
          ?.taskGroups?.find(group => group.groupId === groupId)
          ?.tasks.find(task => task.taskId === taskId)
          ?.childTasks.find(childTask => {
            if (childTask.childTaskId === childTaskId) {
              childTask.childTaskName = childTaskName
              return true
            }
          })

        state.isLoading = false
        console.log("fulfilled")
      })
      .addCase(childTaskNameChange.rejected, (state, action) => {
        state.isLoading = false
        console.log("rejected", action)
      })
    taskBuilder(builder)
    groupBuilder(builder)
  },
})

export const { logOut } = projectSlice.actions

export default projectSlice.reducer
