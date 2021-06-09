import { MenuItem } from "@material-ui/core"
import React from "react"
import { ProjectTag } from "../../redux/projectSlice/projectSlice"
import addTaskTagThunk from "../../redux/projectSlice/thunks/addTaskTagThunk"
import { useAppDispatch } from "../../redux/reduxHooks"
import getProjectIdFromUrl from "../../utils/getProjectIdFromUrl"

interface Props {
  tag: ProjectTag
  taskId: string
  closeMenu: () => void
}

const TagMenuItem: React.FC<Props> = ({ tag, taskId, closeMenu }) => {
  const projectId = getProjectIdFromUrl()
  const dispatch = useAppDispatch()
  const handleClick = () => {
    dispatch(addTaskTagThunk({ tag, taskId, projectId }))
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
