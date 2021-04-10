import React from "react"
import DrawerLink from "./drawerLink"
import DrawerNewProject from "./drawerNewProject"
import { useAppSelector } from "../../../redux/reduxHooks"
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore"

const LoggedInDrawerButtons = () => {
  const projectsList = useAppSelector(state => state.projectState.projects)
  const url = typeof window !== "undefined" ? window.location.pathname : ""

  return (
    <>
      {url.indexOf("project") > -1 && (
        <DrawerLink to="/" text="Projects" Icon={NavigateBeforeIcon} />
      )}
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
