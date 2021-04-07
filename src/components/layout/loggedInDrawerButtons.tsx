import React from "react"
import DrawerLink from "./drawerLink"
import { ListItem, ListItemText } from "@material-ui/core"
import DrawerNewProject from "./drawerNewProject"
import { useAppSelector } from "../../redux/reduxHooks"

const LoggedInDrawerButtons = () => {
  const projectsList = useAppSelector(state => state.projectState.projects)
  const url = typeof window !== "undefined" ? window.location.pathname : ""
  console.log(url)

  return (
    <>
      <DrawerLink to="page-2" text="Page 2" />
      <DrawerNewProject />
      {url === "/" &&
        projectsList?.map(project => {
          return <DrawerLink to="#" text={project.projectName} />
        })}
    </>
  )
}

export default LoggedInDrawerButtons
