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
import { motion, Variants } from "framer-motion"

interface Props {
  projectId: string
}

const ProjectSettingsPage: React.FC<Props> = ({ projectId }) => {
  const project = useAppSelector(state =>
    state.projectState.projects?.find(
      project => projectId === project.projectId
    )
  )

  const variants: Variants = {
    visible: { height: "initial" },
    hidden: { height: 0 },
  }

  return (
    <>
      <Container maxWidth="xs" disableGutters css={{ marginTop: 8 }}>
        <motion.div variants={variants} initial="hidden" animate="visible">
          <Paper css={{ padding: "8px 0px" }}>
            <Grid container item xs={12} justify="center">
              <motion.div variants={variants} css={{ overflow: "hidden" }}>
                <Typography variant="h4">
                  Settings: {project?.projectName}
                </Typography>
              </motion.div>
            </Grid>
            <List>
              <Divider />
              <motion.div variants={variants} css={{ overflow: "hidden" }}>
                <ChangeProjectNameListItem />
              </motion.div>
              <motion.div variants={variants} css={{ overflow: "hidden" }}>
                <DeleteProjectListItem projectId={projectId} />
              </motion.div>
            </List>
          </Paper>
        </motion.div>
      </Container>
    </>
  )
}

export default ProjectSettingsPage
