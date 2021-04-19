import React from "react"
import DrawerLink from "./drawerLink"
import DrawerNewProject from "./drawerNewProject"
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore"
import DrawerProjectList from "./drawerProjectList"
import DrawerCreateGroup from "./drawerCreateGroup"

const LoggedInDrawerButtons = () => {
  const url = typeof window !== "undefined" ? window.location.pathname : ""

  return (
    <>
      {url.indexOf("project") > -1 && (
        <>
          <DrawerLink to="/" text="Projects" Icon={NavigateBeforeIcon} />
          <DrawerCreateGroup />
        </>
      )}
      {url === "/" && (
        <>
          <DrawerNewProject />
          <DrawerProjectList />
        </>
      )}
    </>
  )
}

export default LoggedInDrawerButtons
