import { Popover, ListItemIcon, IconButton } from "@material-ui/core"
import React, { useState } from "react"
import AddCircleSharpIcon from "@material-ui/icons/AddCircleSharp"
import useWindowResize from "../utils/useWindowResize"
import CreateTaskForm from "./forms/createTaskForm"

const AddTaskButton = ({ groupId }: { groupId: string }) => {
  const [isPopoverOpen, setPopoverOpen] = useState(false)
  const [width, height] = useWindowResize()
  const id = isPopoverOpen ? "add-task-popover" : undefined

  const closePopover = () => {
    setPopoverOpen(false)
  }

  const handleClick = () => {
    setPopoverOpen(true)
  }

  return (
    <>
      <ListItemIcon>
        <IconButton aria-label="add a task" onClick={handleClick}>
          <AddCircleSharpIcon />
        </IconButton>
      </ListItemIcon>
      <Popover
        anchorReference="anchorPosition"
        anchorPosition={{
          top: (typeof window !== "undefined" && height! / 2) || 0,
          left: (typeof window !== "undefined" && width! / 2) || 0,
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        id={id}
        open={isPopoverOpen}
      >
        <CreateTaskForm groupId={groupId} closePopover={closePopover} />
      </Popover>
    </>
  )
}

export default AddTaskButton
