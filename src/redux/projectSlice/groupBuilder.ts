import { ActionReducerMapBuilder } from "@reduxjs/toolkit"
import { ProjectState } from "./projectSlice"
import createGroup from "./createGroupThunk"

const groupBuilder = (builder: ActionReducerMapBuilder<ProjectState>) =>
  // create group
  builder
    .addCase(createGroup.pending, (state, action) => {
      state.isLoading = true
      console.log("Creating group...")
    })
    .addCase(createGroup.fulfilled, (state, { payload }) => {
      const { groupId, projectId, taskGroupName, tasks } = payload
      const project = state.projects?.find(
        project => project.projectId === projectId
      )
      project?.taskGroups?.push({ groupId, tasks, taskGroupName })
      state.isLoading = false
      console.log("fulfilled")
    })
    .addCase(createGroup.rejected, (state, action) => {
      state.isLoading = false
      console.log("rejected", action)
    })

export default groupBuilder
