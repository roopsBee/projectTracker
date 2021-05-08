import { Popover, MenuItem } from "@material-ui/core"
import React, { useState } from "react"
import useWindowResize from "../utils/useWindowResize"
import TaskGroupChangeNameForm from "./forms/taskGroupChangeNameForm"
import { TaskGroupType } from "../redux/projectSlice/projectSlice"

interface Props {
  group: TaskGroupType
  handleClose: () => void
}

const EditGroupNameMenuItem: React.FC<Props> = ({ group, handleClose }) => {
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
        Edit Group Name
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
        <TaskGroupChangeNameForm group={group} closePopover={closePopover} />
      </Popover>
    </>
  )
}

export default EditGroupNameMenuItem
