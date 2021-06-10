import { MenuItem } from "@material-ui/core"
import React from "react"
import { ProjectTag, TaskType } from "../../redux/projectSlice/projectSlice"
import addTaskTagThunk from "../../redux/projectSlice/thunks/addTaskTagThunk"
import { useAppDispatch, useAppSelector } from "../../redux/reduxHooks"
import getProjectIdFromUrl from "../../utils/getProjectIdFromUrl"
import isTagInArray from "../../utils/isTagInArray"

interface Props {
  tag: ProjectTag
  taskId: string
  task: TaskType
  closeMenu: () => void
}

const TagMenuItem: React.FC<Props> = ({ tag, taskId, closeMenu, task }) => {
  const isLoading = useAppSelector(state => state.projectState.isLoading)
  const projectId = getProjectIdFromUrl()
  const dispatch = useAppDispatch()
  const handleClick = async () => {
    if (!isTagInArray(tag, task.tags)) {
      await dispatch(addTaskTagThunk({ tag, taskId, projectId }))
    } else {
      console.log("tag exits")
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
