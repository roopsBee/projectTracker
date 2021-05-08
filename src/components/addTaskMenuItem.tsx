import { Popover, MenuItem } from "@material-ui/core"
import React, { useState } from "react"
import useWindowResize from "../utils/useWindowResize"
import CreateTaskForm from "./forms/createTaskForm"
import CreateChildTaskForm from "./forms/createChildTaskForm"

type Props = (task | childTask) & { handleClose: () => void }

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
    props.handleClose()
  }
  return (
    <>
      <MenuItem dense onClick={handleClick}>
        {props.type === "task" ? "Add Task" : "Add Sub-Task"}
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
