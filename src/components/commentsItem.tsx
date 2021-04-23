/** @jsx jsx */
import { jsx } from "@emotion/react"
import {
  ListItem,
  ListItemIcon,
  IconButton,
  Typography,
  Popover,
  Grid,
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

  const isComment = props.task.comments[props.task.comments.length - 1]

  return (
    <>
      <ListItem css={{ marginBottom: 0, paddingTop: 0 }}>
        <ListItemIcon>
          <IconButton {...bindTrigger(popupState)}>
            <CommentIcon />
          </IconButton>
        </ListItemIcon>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="caption" css={{ fontStyle: "italic" }}>
              {isComment && isComment.created}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2">
              {isComment && isComment.text}
            </Typography>
          </Grid>
        </Grid>
      </ListItem>
      <Popover
        {...bindPopover(popupState)}
        anchorReference="anchorPosition"
        anchorPosition={{
          top: (typeof window !== "undefined" && height && height / 2) || 0,
          left: (typeof window !== "undefined" && width && width / 2) || 0,
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
      >
        <CommentsPopover
          comments={props.task.comments}
          taskId={
            props.type === "task" ? props.task.taskId : props.task.childTaskId
          }
          taskName={
            props.type === "task"
              ? props.task.taskName
              : props.task.childTaskName
          }
        />
      </Popover>
    </>
  )
}

export default CommentsItem
