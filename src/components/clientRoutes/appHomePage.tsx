/** @jsx jsx */
import React from "react"
import { jsx } from "@emotion/react"
import { useAppSelector } from "../../redux/reduxHooks"
import {
  Container,
  List,
  ListItem,
  ListItemText,
  Paper,
} from "@material-ui/core"
import { Link } from "gatsby"
import DrawerNewProject from "../layout/drawer/drawerNewProject"

const AppHomePage: React.FC = () => {
  const projects = useAppSelector(state => state.projectState?.projects)

  return (
    <Container maxWidth="xs" disableGutters css={{ marginTop: 8 }}>
      <Paper css={{ border: "1px solid #00639F" }}>
        <List disablePadding>
          <DrawerNewProject />
          {projects?.map(project => (
            <ListItem
              alignItems="center"
              key={project.projectId}
              to={`/app/project/${project.projectId}`}
              button
              dense
              component={Link}
            >
              <ListItemText primaryTypographyProps={{ align: "center" }}>
                {project.projectName}
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  )
}

export default AppHomePage
