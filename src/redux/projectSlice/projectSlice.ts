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
import handlePending from "../handlePending"
import handleRejected from "../handleRejected"
import projectDelete from "./thunks/projectDeleteThunk"
import projectChangeName from "./thunks/projectChangeNameThunk"

export interface ProjectState {
  isLoading: boolean
  projects?: ProjectType[]
}

export type ProjectType = {
  projectName?: string
  projectId?: string
  taskGroups?: TaskGroupType[]
  projectTags?: ProjectTag[]
}

export type ProjectTag = {
  name: string
  color: string
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
  tags: ProjectTag[] | []
  comments: CommentType[]
  childTasks: ChildTaskType[]
}

export type ChildTaskType = {
  childTaskId: string
  childTaskName: string
  completed: boolean
  tags: ProjectTag[] | []
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
        handlePending(state, "creating project...")
      })
      .addCase(createProject.fulfilled, (state, { payload }) => {
        state.projects?.push(payload)
        state.isLoading = false
        console.log("fulfilled")
      })
      .addCase(createProject.rejected, (state, action) => {
        handleRejected(state, action)
      })
      // get project list
      .addCase(getProjectList.pending, state => {
        handlePending(state, "fetching project list...")
      })
      .addCase(getProjectList.fulfilled, (state, { payload }) => {
        state.projects = payload
        state.isLoading = false
        console.log("fulfilled")
      })
      .addCase(getProjectList.rejected, (state, action) => {
        handleRejected(state, action)
      })
      // get project
      .addCase(getProject.pending, state => {
        handlePending(state, "fetching project...")
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
        handleRejected(state, action)
      })
      // create child task
      .addCase(createChildTask.pending, state => {
        handlePending(state, "Creating child task...")
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
          tags: [],
        })

        state.isLoading = false
        console.log("fulfilled")
      })
      .addCase(createChildTask.rejected, (state, action) => {
        handleRejected(state, action)
      })
      // delete child task
      .addCase(childTaskDelete.pending, state => {
        handlePending(state, "Deleting child task...")
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
        handleRejected(state, action)
      })
      // create comment
      .addCase(createComment.pending, state => {
        handlePending(state, "Adding comment...")
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
        handleRejected(state, action)
      })
      // edit child task name
      .addCase(childTaskNameChange.pending, state => {
        handlePending(state, "Changing child task name...")
      })
      .addCase(childTaskNameChange.fulfilled, (state, { payload }) => {
        const { taskId, groupId, childTaskName, projectId, childTaskId } =
          payload
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
        handleRejected(state, action)
      })
      // delete project
      .addCase(projectDelete.pending, state => {
        handlePending(state, "Deleting Project...")
      })
      .addCase(projectDelete.fulfilled, (state, { payload }) => {
        const { projectId } = payload

        const projectIndex = state.projects?.findIndex(
          project => project.projectId === projectId
        )

        projectIndex !== undefined && state.projects?.splice(projectIndex, 1)

        state.isLoading = false
        console.log("fulfilled")
      })
      .addCase(projectDelete.rejected, (state, action) => {
        handleRejected(state, action)
      })
      // change project name
      .addCase(projectChangeName.pending, state => {
        handlePending(state, "Changing Project name...")
      })
      .addCase(projectChangeName.fulfilled, (state, { payload }) => {
        const { projectId, newProjectName } = payload

        const project = state.projects?.find(
          project => project.projectId === projectId
        )
        project && (project.projectName = newProjectName)
        state.isLoading = false
        console.log("fulfilled")
      })
      .addCase(projectChangeName.rejected, (state, action) => {
        handleRejected(state, action)
      })
    taskBuilder(builder)
    groupBuilder(builder)
  },
})

export const { logOut } = projectSlice.actions

export default projectSlice.reducer
