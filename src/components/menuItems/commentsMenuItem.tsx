/** @jsx jsx */
import { jsx } from "@emotion/react"
import React, { useState } from "react"
import { TaskType, ChildTaskType } from "../../redux/projectSlice/projectSlice"
import CommentsPopover from "../comments/commentsPopover"
import MenuItemPopover from "./menuItemPopover"

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

  const closePopover = () => {
    setPopoverOpen(false)
  }

  const handleClick = () => {
    setPopoverOpen(true)
    props.handleClose()
  }

  return (
    <MenuItemPopover
      title="Comments"
      popoverId="comments-popover"
      open={isPopoverOpen}
      onClick={handleClick}
    >
      <CommentsPopover
        closePopover={closePopover}
        comments={props.task.comments}
        taskId={
          props.type === "task" ? props.task.taskId : props.task.childTaskId
        }
        taskName={
          props.type === "task" ? props.task.taskName : props.task.childTaskName
        }
      />
    </MenuItemPopover>
  )
}

export default CommentsMenuItem
