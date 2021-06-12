import { ActionReducerMapBuilder } from "@reduxjs/toolkit"
import handlePending from "../handlePending"
import { ProjectState } from "./projectSlice"
import createTask from "./thunks/createTaskThunk"
import taskNameChange from "./thunks/taskNameChangeThunk"
import toggleTaskDone from "./thunks/toggleTaskDoneThunk"
import handleRejected from "../handleRejected"
import taskDelete from "./thunks/taskdeleteThunk"
import addTaskTag from "./thunks/addTaskTagThunk"
import removeTaskTag from "./thunks/removeTaskTagThunk"

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
        tags: [],
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
    //delete task
    .addCase(taskDelete.pending, state => {
      handlePending(state, "Deleting task...")
    })
    .addCase(taskDelete.fulfilled, (state, { payload }) => {
      const { taskId, projectId, groupId } = payload

      const tasks = state.projects
        ?.find(project => project.projectId === projectId)
        ?.taskGroups?.find(group => groupId === group.groupId)?.tasks

      const taskIndex = tasks?.findIndex(task => task.taskId === taskId)

      taskIndex !== undefined && tasks?.splice(taskIndex, 1)

      state.isLoading = false
      console.log("fulfilled")
    })
    .addCase(taskDelete.rejected, (state, action) => {
      handleRejected(state, action)
    })
    // add tag to task
    .addCase(addTaskTag.pending, state => {
      handlePending(state, "Adding tag...")
    })
    .addCase(addTaskTag.fulfilled, (state, { payload }) => {
      const { projectId, taskId, tagId } = payload

      state.projects
        ?.find(project => project.projectId === projectId)
        ?.taskGroups?.find(group => {
          group.tasks.find(task => {
            if (task.taskId === taskId) {
              task.tags.push(tagId)
              return true
            }
            task.childTasks.find(childTask => {
              if (childTask.childTaskId === taskId) {
                childTask.tags.push(tagId)
                console.log("child tag push")
                return true
              }
            })
          })
        })
      console.log("fulfilled")
      state.isLoading = false
    })
    .addCase(addTaskTag.rejected, (state, action) => {
      handleRejected(state, action)
    })
    // remove tag from task
    .addCase(removeTaskTag.pending, state => {
      handlePending(state, "Removing tag...")
    })
    .addCase(removeTaskTag.fulfilled, (state, { payload }) => {
      const { projectId, taskId, tagId } = payload

      state.projects
        ?.find(project => project.projectId === projectId)
        ?.taskGroups?.find(group => {
          group.tasks.find(task => {
            if (task.taskId === taskId) {
              const tagIndex = task.tags.indexOf(tagId)
              task.tags.splice(tagIndex, 1)
              return true
            }
            task.childTasks.find(childTask => {
              if (childTask.childTaskId === taskId) {
                const tagIndex = childTask.tags.indexOf(tagId)
                childTask.tags.splice(tagIndex, 1)
                return true
              }
            })
          })
        })
      console.log("fulfilled")
      state.isLoading = false
    })
    .addCase(removeTaskTag.rejected, (state, action) => {
      handleRejected(state, action)
    })

export default taskBuilder
