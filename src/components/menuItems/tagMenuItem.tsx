import { MenuItem } from "@material-ui/core"
import React from "react"
import { ProjectTag, TaskType } from "../../redux/projectSlice/projectSlice"
import addTaskTagThunk from "../../redux/projectSlice/thunks/addTaskTagThunk"
import { useAppDispatch } from "../../redux/reduxHooks"
import getProjectIdFromUrl from "../../utils/getProjectIdFromUrl"
import isTagInArray from "../../utils/isTagInArray"

interface Props {
  tag: ProjectTag
  taskId: string
  task: TaskType
  closeMenu: () => void
}

const TagMenuItem: React.FC<Props> = ({ tag, taskId, closeMenu, task }) => {
  const projectId = getProjectIdFromUrl()
  const dispatch = useAppDispatch()
  const handleClick = () => {
    if (!isTagInArray({ tag, array: task.tags })) {
      dispatch(addTaskTagThunk({ tag, taskId, projectId }))
    } else {
      console.log("tag exits")
    }
    closeMenu()
  }

  return (
    <>
      <MenuItem key={Math.random()} onClick={handleClick}>
        {tag.tagName}
      </MenuItem>
    </>
  )
}

export default TagMenuItem
