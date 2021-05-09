import React, { useState } from "react"
import { TaskType } from "../redux/projectSlice/projectSlice"
import TaskNameChangeForm from "./forms/taskNameChangeForm"
import MenuItemPopover from "./menuItemPopover"

interface Props {
  task: TaskType
  handleClose: () => void
}

const EditTaskNameMenuItem: React.FC<Props> = ({ task, handleClose }) => {
  const [isPopoverOpen, setPopoverOpen] = useState(false)

  const closePopover = () => {
    setPopoverOpen(false)
  }

  const handleClick = () => {
    setPopoverOpen(true)
    handleClose()
  }
  return (
    <MenuItemPopover
      title="Edit Task Name"
      popoverId="Edit-Task-Name-popover"
      open={isPopoverOpen}
      onClick={handleClick}
    >
      <TaskNameChangeForm task={task} closePopover={closePopover} />
    </MenuItemPopover>
  )
}

export default EditTaskNameMenuItem
