/** @jsx jsx */
import { jsx } from "@emotion/react"
import {
  Container,
  Paper,
  Grid,
  Typography,
  Divider,
  List,
} from "@material-ui/core"
import React from "react"
import { useAppSelector } from "../../redux/reduxHooks"
import DeleteProjectListItem from "../settingsItems/deleteProjectListItem"
import ChangeProjectNameListItem from "../settingsItems/changeProjectNameListItem"

interface Props {
  projectId: string
}

const ProjectSettingsPage: React.FC<Props> = ({ projectId }) => {
  const project = useAppSelector(state =>
    state.projectState.projects?.find(
      project => projectId === project.projectId
    )
  )

  return (
    <>
      <Container maxWidth="xs" disableGutters css={{ marginTop: 8 }}>
        <Paper css={{ padding: "8px 0px" }}>
          <Grid container item xs={12} justify="center">
            <Typography variant="h4">
              Settings: {project?.projectName}
            </Typography>
          </Grid>
          <List>
            <Divider />
            <ChangeProjectNameListItem />
            <DeleteProjectListItem projectId={projectId} />
          </List>
        </Paper>
      </Container>
    </>
  )
}

export default ProjectSettingsPage
