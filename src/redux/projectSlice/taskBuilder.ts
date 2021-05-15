import { ActionReducerMapBuilder } from "@reduxjs/toolkit"
import handlePending from "../handlePending"
import { ProjectState } from "./projectSlice"
import createTask from "./thunks/createTaskThunk"
import taskNameChange from "./thunks/taskNameChangeThunk"
import toggleTaskDone from "./thunks/toggleTaskDoneThunk"
import handleRejected from "../handleRejected"

const taskBuilder = (builder: ActionReducerMapBuilder<ProjectState>) =>
  // create task
  builder
    .addCase(createTask.pending, state => {
      handlePending(state, "Creating group...")
    })
    .addCase(createTask.fulfilled, (state, { payload }) => {
      const {
        projectId,
        childTasks,
        comments,
        completed,
        taskId,
        taskName,
        groupId,
      } = payload

      const group = state.projects
        ?.find(project => project.projectId === projectId)
        ?.taskGroups?.find(group => group.groupId === groupId)

      group?.tasks.push({
        taskId,
        childTasks,
        comments,
        taskName,
        completed,
      })

      state.isLoading = false
      console.log("fulfilled")
    })
    .addCase(createTask.rejected, (state, action) => {
      handleRejected(state, action)
    })
    // edit task name
    .addCase(taskNameChange.pending, state => {
      handlePending(state, "Changing task name...")
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
      handleRejected(state, action)
    })
    //toggle task
    .addCase(toggleTaskDone.pending, state => {
      handlePending(state, "Toggling task completion...")
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
      handleRejected(state, action)
    })

export default taskBuilder
