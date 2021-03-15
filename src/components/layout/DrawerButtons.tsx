import React from "react"
import { List } from "@material-ui/core"
import DrawerLink from "./drawerLink"

const DrawerButtons: React.FC<{
  handleDrawerClose: () => void
}> = ({ handleDrawerClose }) => {
  return (
    <List dense onClick={handleDrawerClose}>
      <DrawerLink to="/page-2" text="Page 2" />
    </List>
  )
}

export default DrawerButtons
