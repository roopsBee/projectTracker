import { Popover, ListItem, ListItemText } from "@material-ui/core"
import React, { useState } from "react"
import useWindowResize from "../../../utils/useWindowResize"
import CreateProjectForm from "../../createProjectForm"

const AppBarSignUpButton: React.FC = () => {
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
        <CreateProjectForm closePopover={closePopover} />
      </Popover>
    </>
  )
}

export default AppBarSignUpButton
