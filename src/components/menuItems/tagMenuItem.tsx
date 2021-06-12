import { ListItemIcon, MenuItem, MenuItemProps } from "@material-ui/core"
import React, { forwardRef } from "react"
import {
  ChildTaskType,
  ProjectTag,
  TaskType,
} from "../../redux/projectSlice/projectSlice"
import addTaskTagThunk from "../../redux/projectSlice/thunks/addTaskTagThunk"
import removeTaskTagThunk from "../../redux/projectSlice/thunks/removeTaskTagThunk"
import { useAppDispatch, useAppSelector } from "../../redux/reduxHooks"
import getProjectIdFromUrl from "../../utils/getProjectIdFromUrl"
import AddIcon from "@material-ui/icons/Add"
import RemoveIcon from "@material-ui/icons/Remove"

type Props = MenuItemProps & {
  tag: ProjectTag
  taskId: string
  task: TaskType | ChildTaskType
  closeMenu: () => void
}

const TagMenuItem: React.FC<Props> = forwardRef(
  ({ tag, taskId, task }, ref) => {
    const isLoading = useAppSelector(state => state.projectState.isLoading)
    const projectId = getProjectIdFromUrl()
    const dispatch = useAppDispatch()

    const isTag = task.tags.includes(tag.tagId)

    const handleClick = async () => {
      if (!isTag) {
        await dispatch(addTaskTagThunk({ tagId: tag.tagId, taskId, projectId }))
      } else {
        await dispatch(
          removeTaskTagThunk({ tagId: tag.tagId, projectId, taskId })
        )
      }
    }

    return (
      <>
        <MenuItem
          innerRef={ref}
          dense
          disabled={isLoading}
          onClick={handleClick}
        >
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
)

TagMenuItem.displayName = "TagMenuItem"

export default TagMenuItem
