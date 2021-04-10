import React from "react"
import DrawerLink from "./drawerLink"
import DrawerNewProject from "./drawerNewProject"
import { useAppSelector } from "../../../redux/reduxHooks"
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore"
import DrawerProjectList from "./drawerProjectList"

const LoggedInDrawerButtons = () => {
  const projectsList = useAppSelector(state => state.projectState.projects)
  const url = typeof window !== "undefined" ? window.location.pathname : ""

  return (
    <>
      {url.indexOf("project") > -1 && (
        <DrawerLink to="/" text="Projects" Icon={NavigateBeforeIcon} />
      )}
      {url === "/" && <DrawerNewProject />}
      {url === "/" && <DrawerProjectList />}
    </>
  )
}

export default LoggedInDrawerButtons
