import React, { useState } from "react"
import TaskGroupChangeNameForm from "../forms/taskGroupChangeNameForm"
import { TaskGroupType } from "../../redux/projectSlice/projectSlice"
import MenuItemPopover from "./menuItemPopover"

interface Props {
  group: TaskGroupType
  handleClose: () => void
}

const EditGroupNameMenuItem: React.FC<Props> = ({ group, handleClose }) => {
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
      title="Edit Group Name"
      popoverId="Edit-Group-Name-popover"
      open={isPopoverOpen}
      onClick={handleClick}
    >
      <TaskGroupChangeNameForm group={group} closePopover={closePopover} />
    </MenuItemPopover>
  )
}

export default EditGroupNameMenuItem
