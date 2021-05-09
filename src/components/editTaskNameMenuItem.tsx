import { Popover, MenuItem } from "@material-ui/core"
import React, { useState } from "react"
import useWindowResize from "../utils/useWindowResize"
import { TaskType } from "../redux/projectSlice/projectSlice"
import TaskNameChangeForm from "./forms/taskNameChangeForm"

interface Props {
  task: TaskType
  handleClose: () => void
}

const EditTaskNameMenuItem: React.FC<Props> = ({ task, handleClose }) => {
  const [isPopoverOpen, setPopoverOpen] = useState(false)
  const [width, height] = useWindowResize()
  const id = isPopoverOpen ? "edit-group-name-popover" : undefined

  const closePopover = () => {
    setPopoverOpen(false)
  }

  const handleClick = () => {
    setPopoverOpen(true)
    handleClose()
  }
  return (
    <>
      <MenuItem dense onClick={handleClick}>
        Edit Task Name
      </MenuItem>
      <Popover
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
        <TaskNameChangeForm task={task} closePopover={closePopover} />
      </Popover>
    </>
  )
}

export default EditTaskNameMenuItem
