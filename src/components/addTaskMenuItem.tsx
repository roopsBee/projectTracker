import React, { useState } from "react"
import CreateTaskForm from "./forms/createTaskForm"
import CreateChildTaskForm from "./forms/createChildTaskForm"
import MenuItemPopover from "./menuItemPopover"

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

  const closePopover = () => {
    setPopoverOpen(false)
  }

  const handleClick = () => {
    setPopoverOpen(true)
    props.handleClose()
  }

  return (
    <>
      <MenuItemPopover
        title={props.type === "task" ? "Create Task" : "Create Sub-Task"}
        popoverId="create-task-popover"
        open={isPopoverOpen}
        onClick={handleClick}
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
      </MenuItemPopover>
    </>
  )
}

export default AddTaskButton
