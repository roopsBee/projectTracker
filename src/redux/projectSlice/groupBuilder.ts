import { ActionReducerMapBuilder } from "@reduxjs/toolkit"
import { ProjectState } from "./projectSlice"
import createGroup from "./thunks/createGroupThunk"
import groupChangeName from "./thunks/taskGroupChangeNameThunk"

const groupBuilder = (builder: ActionReducerMapBuilder<ProjectState>) =>
  // create group
  builder
    .addCase(createGroup.pending, state => {
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

export default groupBuilder
