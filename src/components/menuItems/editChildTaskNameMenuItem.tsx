import React, { useState } from "react"
import { ChildTaskType } from "../../redux/projectSlice/projectSlice"
import MenuItemPopover from "./menuItemPopover"
import ChildTaskNameChangeForm from "../forms/childTaskNameChangeForm"

interface Props {
  childTask: ChildTaskType
  handleClose: () => void
  groupId: string
}

const EditChildTaskNameMenuItem: React.FC<Props> = ({
  childTask,
  handleClose,
  groupId,
}) => {
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
      title="Edit Sub-Task Name"
      popoverId="Edit-Sub-Task-Name-popover"
      open={isPopoverOpen}
      onClick={handleClick}
    >
      <ChildTaskNameChangeForm
        childTask={childTask}
        groupId={groupId}
        closePopover={closePopover}
      />
    </MenuItemPopover>
  )
}

export default EditChildTaskNameMenuItem
