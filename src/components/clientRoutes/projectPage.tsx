import React, { useEffect } from "react"
import { useAppSelector, useAppDispatch } from "../../redux/reduxHooks"
import getProjectThunk from "../../redux/projectSlice/getProjectThunk"
import { Container, Typography } from "@material-ui/core"

import GroupList from "../groupList"

interface Props {
  projectId: string
}
const ProjectPage: React.FC<Props> = ({ projectId }) => {
  const project = useAppSelector(state =>
    state.projectState?.projects?.find(
      project => project.projectId === projectId
    )
  )
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getProjectThunk({ projectId }))
  }, [])

  return (
    <Container>
      <Typography>{project?.projectName}</Typography>
      {project?.taskGroups && <GroupList taskGroups={project?.taskGroups} />}
    </Container>
  )
}

export default ProjectPage
