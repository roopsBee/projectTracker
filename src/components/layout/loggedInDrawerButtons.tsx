import React from "react"
import DrawerLink from "./drawerLink"
import { ListItem, ListItemText } from "@material-ui/core"
import DrawerNewProject from "./drawerNewProject"
import { useAppSelector } from "../../redux/reduxHooks"

const LoggedInDrawerButtons = () => {
  const projectsList = useAppSelector(state => state.projectState.projects)
  const url = typeof window !== "undefined" ? window.location.pathname : ""

  return (
    <>
      <DrawerNewProject />
      {url === "/" &&
        projectsList?.map(project => {
          return (
            <DrawerLink
              key={project.projectId}
              to={`/app/project/${project.projectId}`}
              text={project.projectName}
            />
          )
        })}
    </>
  )
}

export default LoggedInDrawerButtons
