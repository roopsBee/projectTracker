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
import React, { useState } from "react"
import CommentIcon from "@material-ui/icons/Comment"
import { TaskType, ChildTaskType } from "../redux/projectSlice/projectSlice"
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
  const [isPopoverOpen, setPopoverOpen] = useState(false)
  const [width, height] = useWindowResize()
  const id = isPopoverOpen ? "add-task-popover" : undefined

  const isComment = props.task.comments[props.task.comments.length - 1]

  const closePopover = () => {
    setPopoverOpen(false)
  }

  const handleClick = () => {
    setPopoverOpen(true)
  }

  return (
    <>
      <ListItem css={{ marginBottom: 0, paddingTop: 0 }}>
        <ListItemIcon>
          <IconButton onClick={handleClick}>
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
        css={{ "& .MuiPopover-paper": { minWidth: "70%" } }}
        anchorReference="anchorPosition"
        anchorPosition={{
          top: (typeof window !== "undefined" && height && height / 2) || 0,
          left: (typeof window !== "undefined" && width && width / 2) || 0,
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        id={id}
        open={isPopoverOpen}
      >
        <CommentsPopover
          closePopover={closePopover}
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
