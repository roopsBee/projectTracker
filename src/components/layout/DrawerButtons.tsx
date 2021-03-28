import React from "react"
import { List } from "@material-ui/core"
import DrawerLink from "./drawerLink"
import { useAppSelector } from "../../redux/reduxHooks"
import LoggedInDrawerButtons from "./loggedInDrawerButtons"

const DrawerButtons: React.FC<{
  handleDrawerClose: () => void
}> = ({ handleDrawerClose }) => {
  const isLoggedIn = useAppSelector(state => state.user.isLoggedIn)

  return (
    <>
      <List dense onClick={handleDrawerClose}>
        {isLoggedIn && <LoggedInDrawerButtons />}
        <DrawerLink to="/page-2" text="Page 2" />
      </List>
    </>
  )
}

export default DrawerButtons
