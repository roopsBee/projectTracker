import React from "react"
import { List, ListItem, ListItemText } from "@material-ui/core"
import DrawerLink from "./drawerLink"

const DrawerButtons: React.FC<{
  handleDrawerClose: () => void
}> = ({ handleDrawerClose }) => {
  return (
    <List dense onClick={handleDrawerClose}>
      <DrawerLink to="/buttons" text="Buttons" />
    </List>
  )
}

export default DrawerButtons
