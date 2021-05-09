import { createSlice } from "@reduxjs/toolkit"
import createProject from "./createProjectThunk"
import getProjectList from "./getProjectListThunk"
import getProject from "./getProjectThunk"
import groupBuilder from "./groupBuilder"
import taskBuilder from "./taskBuilder"
import createChildTask from "./createChildTaskThunk"
import createComment from "./createCommentThunk"
import toggleTaskDone from "./toggleTaskDoneThunk"
import groupChangeName from "./taskGroupChangeNameThunk"
import taskNameChange from "./taskNameChangeThunk"

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
      //toggle task
      .addCase(toggleTaskDone.pending, state => {
        state.isLoading = true
        console.log("Toggling task completion...")
      })
      .addCase(toggleTaskDone.fulfilled, (state, { payload }) => {
        const { completed, taskId, projectId } = payload

        state.projects
          ?.find(project => project.projectId === projectId)
          ?.taskGroups?.find(group =>
            group.tasks.find(task => {
              if (task.taskId === taskId) {
                task.completed = completed
                return true
              }
              task.childTasks.find(childTask => {
                if (childTask.childTaskId === taskId) {
                  childTask.completed = completed
                  return true
                }
              })
            })
          )

        state.isLoading = false
        console.log("fulfilled")
      })
      .addCase(toggleTaskDone.rejected, (state, action) => {
        state.isLoading = false
        console.log("rejected", action)
      })
      // change group name
      .addCase(groupChangeName.pending, state => {
        state.isLoading = true
        console.log("Changing group name...")
      })
      .addCase(groupChangeName.fulfilled, (state, { payload }) => {
        const { projectId, groupId, taskGroupName } = payload

        state.projects
          ?.find(project => project.projectId === projectId)
          ?.taskGroups?.find(group => {
            if (group.groupId === groupId) {
              group.taskGroupName = taskGroupName
              return true
            }
          })
        state.isLoading = false
        console.log("fulfilled")
      })
      .addCase(groupChangeName.rejected, (state, action) => {
        state.isLoading = false
        console.log("rejected", action)
      })
      // edit task name
      .addCase(taskNameChange.pending, state => {
        state.isLoading = true
        console.log("Changing task name...")
      })
      .addCase(taskNameChange.fulfilled, (state, { payload }) => {
        const { taskId, groupId, taskName, projectId } = payload
        state.projects
          ?.find(project => project.projectId === projectId)
          ?.taskGroups?.find(group => group.groupId === groupId)
          ?.tasks.find(task => {
            if (task.taskId === taskId) {
              task.taskName = taskName
              return true
            }
          })
        state.isLoading = false
        console.log("fulfilled")
      })
      .addCase(taskNameChange.rejected, (state, action) => {
        state.isLoading = false
        console.log("rejected", action)
      })
    taskBuilder(builder)
    groupBuilder(builder)
  },
})

export const { logOut } = projectSlice.actions

export default projectSlice.reducer
