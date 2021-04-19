import { Popover, ListItem, ListItemText } from "@material-ui/core"
import React, { useState } from "react"
import useWindowResize from "../../../utils/useWindowResize"
import CreateProjectForm from "../../forms/createProjectForm"

const DrawerNewProject: React.FC = () => {
  const [isPopoverOpen, setPopoverOpen] = useState(false)
  const [width, height] = useWindowResize()
  const id = isPopoverOpen ? "create-project-popover" : undefined

  const closePopover = () => {
    setPopoverOpen(false)
  }

  const handleClick = () => {
    setPopoverOpen(true)
  }

  return (
    <>
      <ListItem dense button onClick={handleClick}>
        <ListItemText>New Project</ListItemText>
      </ListItem>
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
        <CreateProjectForm closePopover={closePopover} />
      </Popover>
    </>
  )
}

export default DrawerNewProject
