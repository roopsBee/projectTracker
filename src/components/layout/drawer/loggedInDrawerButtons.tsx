import React from "react"
import DrawerLink from "./drawerLink"
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore"
import DrawerCreateGroup from "./drawerCreateGroup"
import SettingsIcon from "@material-ui/icons/Settings"
import { useAppSelector } from "../../../redux/reduxHooks"
import getProjectIdFromUrl from "../../../utils/getProjectIdFromUrl"

const LoggedInDrawerButtons = () => {
  const url = typeof window !== "undefined" ? window.location.pathname : ""
  const projects = useAppSelector(state => state.projectState.projects)
  const projectId = getProjectIdFromUrl()
  const project = projects?.find(project => projectId === project.projectId)

  if (url.indexOf("settings") > -1) {
    return (
      <>
        <DrawerLink
          to={`/app/project/${projectId}`}
          text={project?.projectName}
          Icon={NavigateBeforeIcon}
        />
      </>
    )
  }
  return (
    <>
      <DrawerLink to="/app" text="Projects" Icon={NavigateBeforeIcon} />
      <DrawerCreateGroup />
      <DrawerLink to="settings" text="Settings" Icon={SettingsIcon} />
    </>
  )
}

export default LoggedInDrawerButtons
