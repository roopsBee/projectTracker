import { ActionReducerMapBuilder } from "@reduxjs/toolkit"
import { ProjectState } from "./projectSlice"
import createTask from "./thunks/createTaskThunk"

const taskBuilder = (builder: ActionReducerMapBuilder<ProjectState>) =>
  // create task
  builder
    .addCase(createTask.pending, state => {
      state.isLoading = true
      console.log("Creating group...")
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
      state.isLoading = false
      console.log("rejected", action)
    })

export default taskBuilder
