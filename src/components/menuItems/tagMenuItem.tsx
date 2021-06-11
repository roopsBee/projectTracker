import { ListItemIcon, MenuItem } from "@material-ui/core"
import React, { useMemo } from "react"
import {
  ChildTaskType,
  ProjectTag,
  TaskType,
} from "../../redux/projectSlice/projectSlice"
import addTaskTagThunk from "../../redux/projectSlice/thunks/addTaskTagThunk"
import removeTaskTagThunk from "../../redux/projectSlice/thunks/removeTaskTagThunk"
import { useAppDispatch, useAppSelector } from "../../redux/reduxHooks"
import getProjectIdFromUrl from "../../utils/getProjectIdFromUrl"
import isTagInArray from "../../utils/isTagInArray"
import AddIcon from "@material-ui/icons/Add"
import RemoveIcon from "@material-ui/icons/Remove"

interface Props {
  tag: ProjectTag
  taskId: string
  task: TaskType | ChildTaskType
  closeMenu: () => void
  tagIndex: number
}

const TagMenuItem: React.FC<Props> = ({ tag, taskId, task, tagIndex }) => {
  const isLoading = useAppSelector(state => state.projectState.isLoading)
  const projectId = getProjectIdFromUrl()
  const dispatch = useAppDispatch()

  const isTag = useMemo(() => isTagInArray(tag, task.tags), [tag, task])
  const handleClick = async () => {
    if (!isTag) {
      await dispatch(addTaskTagThunk({ tag, taskId, projectId }))
    } else {
      await dispatch(removeTaskTagThunk({ tag, tagIndex, projectId, taskId }))
    }
  }

  return (
    <>
      <MenuItem dense disabled={isLoading} onClick={handleClick}>
        <ListItemIcon>
          {!isTag ? (
            <AddIcon fontSize="small" />
          ) : (
            <RemoveIcon fontSize="small" />
          )}
        </ListItemIcon>
        {tag.tagName}
      </MenuItem>
    </>
  )
}

export default TagMenuItem
