import React from "react"
import DrawerLink from "./drawerLink"
import DrawerNewProject from "./drawerNewProject"
import { useAppSelector } from "../../../redux/reduxHooks"

const DrawerProjectList = () => {
  const projectsList = useAppSelector(state => state.projectState.projects)

  return (
    <>
      {projectsList?.map(project => {
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

export default DrawerProjectList
