import React, { useEffect } from "react"
import { useAppSelector, useAppDispatch } from "../../redux/reduxHooks"
import getProjectThunk from "../../redux/projectSlice/thunks/getProjectThunk"
import { Container, Typography } from "@material-ui/core"
import { PageProps } from "gatsby"

import GroupList from "../groupList"

type Props = PageProps<null, null, { prevURL: string | null }> & {
  projectId: string
}

const ProjectPage: React.FC<Props> = ({ projectId, location }) => {
  const project = useAppSelector(state =>
    state.projectState?.projects?.find(
      project => project.projectId === projectId
    )
  )

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!location.state.prevURL?.includes("settings")) {
      dispatch(getProjectThunk({ projectId }))
    }
  }, [])

  return (
    <Container>
      <Typography>{project?.projectName}</Typography>
      {project?.taskGroups && <GroupList taskGroups={project?.taskGroups} />}
    </Container>
  )
}

export default ProjectPage
