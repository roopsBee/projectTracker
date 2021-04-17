import { Popover, ListItemIcon, IconButton } from "@material-ui/core"
import React, { useState } from "react"
import AddCircleSharpIcon from "@material-ui/icons/AddCircleSharp"
import useWindowResize from "../utils/useWindowResize"
import CreateTaskForm from "./forms/createTaskForm"
import CreateChildTaskForm from "./forms/createChildTaskForm"

type Props = task | childTask

interface task {
  type: "task"
  groupId: string
}
interface childTask {
  type: "childTask"
  taskId: string
  groupId: string
}

const AddTaskButton: React.FC<Props> = props => {
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
        {props.type === "task" && (
          <CreateTaskForm groupId={props.groupId} closePopover={closePopover} />
        )}
        {props.type === "childTask" && (
          <CreateChildTaskForm
            groupId={props.groupId}
            taskId={props.taskId}
            closePopover={closePopover}
          />
        )}
      </Popover>
    </>
  )
}

export default AddTaskButton
