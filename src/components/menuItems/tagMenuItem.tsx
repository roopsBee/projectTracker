import { MenuItem } from "@material-ui/core"
import React from "react"
import { ProjectTag, TaskType } from "../../redux/projectSlice/projectSlice"
import addTaskTagThunk from "../../redux/projectSlice/thunks/addTaskTagThunk"
import removeTaskTagThunk from "../../redux/projectSlice/thunks/removeTaskTagThunk"
import { useAppDispatch, useAppSelector } from "../../redux/reduxHooks"
import getProjectIdFromUrl from "../../utils/getProjectIdFromUrl"
import isTagInArray from "../../utils/isTagInArray"

interface Props {
  tag: ProjectTag
  taskId: string
  task: TaskType
  closeMenu: () => void
  tagIndex: number
}

const TagMenuItem: React.FC<Props> = ({ tag, taskId, task, tagIndex }) => {
  const isLoading = useAppSelector(state => state.projectState.isLoading)
  const projectId = getProjectIdFromUrl()
  const dispatch = useAppDispatch()
  const handleClick = async () => {
    if (!isTagInArray(tag, task.tags)) {
      await dispatch(addTaskTagThunk({ tag, taskId, projectId }))
    } else {
      await dispatch(removeTaskTagThunk({ tag, tagIndex, projectId, taskId }))
    }
  }

  return (
    <>
      <MenuItem disabled={isLoading} key={Math.random()} onClick={handleClick}>
        {tag.tagName}
      </MenuItem>
    </>
  )
}

export default TagMenuItem
