import React from "react"
import DrawerLink from "./drawerLink"
import { ListItem, ListItemText } from "@material-ui/core"

const LoggedInDrawerButtons = () => {
  const handleCreateProject = () => {
    console.log("create project")
  }
  return (
    <>
      <ListItem dense button onClick={handleCreateProject}>
        <ListItemText>New Project</ListItemText>
      </ListItem>
    </>
  )
}

export default LoggedInDrawerButtons
