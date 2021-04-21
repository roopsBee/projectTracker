/** @jsx jsx */
import { jsx } from "@emotion/react"
import {
  ListItem,
  ListItemIcon,
  IconButton,
  Typography,
  Popover,
} from "@material-ui/core"
import React from "react"
import CommentIcon from "@material-ui/icons/Comment"
import { TaskType, ChildTaskType } from "../redux/projectSlice/projectSlice"
import {
  usePopupState,
  bindTrigger,
  bindPopover,
} from "material-ui-popup-state/hooks"
import useWindowResize from "../utils/useWindowResize"
import CommentsPopover from "./commentsPopover"

type Props = task | childTask

interface task {
  type: "task"
  task: TaskType
}
interface childTask {
  type: "childTask"
  task: ChildTaskType
}

const CommentsItem: React.FC<Props> = props => {
  const [width, height] = useWindowResize()

  const popupState = usePopupState({
    variant: "popover",
    popupId: props.type === "task" ? props.task.taskId : props.task.childTaskId,
  })

  return (
    <>
      <ListItem css={{ marginBottom: 0, paddingTop: 0 }}>
        <ListItemIcon>
          <IconButton {...bindTrigger(popupState)}>
            <CommentIcon />
          </IconButton>
        </ListItemIcon>
        <Typography variant="body2">
          {props.task.comments[props.task.comments.length - 1]}
        </Typography>
      </ListItem>
      <Popover
        {...bindPopover(popupState)}
        anchorReference="anchorPosition"
        anchorPosition={{
          top: (typeof window !== "undefined" && height && height / 2) || 0,
          left: (typeof window !== "undefined" && width && width / 2) || 0,
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <CommentsPopover />
      </Popover>
    </>
  )
}

export default CommentsItem
