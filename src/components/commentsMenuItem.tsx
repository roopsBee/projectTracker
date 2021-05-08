/** @jsx jsx */
import { jsx } from "@emotion/react"
import { Popover, MenuItem } from "@material-ui/core"
import React, { useState } from "react"
import { TaskType, ChildTaskType } from "../redux/projectSlice/projectSlice"
import useWindowResize from "../utils/useWindowResize"
import CommentsPopover from "./commentsPopover"

type Props = (task | childTask) & { handleClose: () => void }

interface task {
  type: "task"
  task: TaskType
}
interface childTask {
  type: "childTask"
  task: ChildTaskType
}

const CommentsMenuItem: React.FC<Props> = props => {
  const [isPopoverOpen, setPopoverOpen] = useState(false)
  const [width, height] = useWindowResize()
  const id = isPopoverOpen ? "add-task-popover" : undefined

  const closePopover = () => {
    setPopoverOpen(false)
  }

  const handleClick = () => {
    setPopoverOpen(true)
    props.handleClose()
  }

  return (
    <>
      <MenuItem dense onClick={handleClick}>
        Comments
      </MenuItem>
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

export default CommentsMenuItem
