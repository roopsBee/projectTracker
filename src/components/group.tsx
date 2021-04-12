/** @jsx jsx */
import React, { useState } from "react"
import {
  Container,
  Typography,
  List,
  ListSubheader,
  ListItem,
  ListItemText,
  Collapse,
  ListItemIcon,
  IconButton,
  useTheme,
  Box,
} from "@material-ui/core"
import ExpandLess from "@material-ui/icons/ExpandLess"
import ExpandMore from "@material-ui/icons/ExpandMore"
import { css, jsx } from "@emotion/react"

import TaskList from "./taskList"
import { TaskGroupType } from "../redux/projectSlice/projectSlice"

interface Props {
  group: TaskGroupType
}

const Group: React.FC<Props> = ({ group }) => {
  const [openTasks, setOpenTasks] = useState(false)
  const handleExpandClick = () => {
    setOpenTasks(!openTasks)
  }
  const theme = useTheme()

  return (
    <>
      <Box marginY={1}>
        <List
          disablePadding
          css={{ backgroundColor: theme.palette.background.paper }}
        >
          <ListItem dense key={group.groupId}>
            <ListItemText>{group.taskGroupName}</ListItemText>
            <ListItemIcon>
              <IconButton onClick={handleExpandClick}>
                {!openTasks ? <ExpandMore /> : <ExpandLess />}
              </IconButton>
            </ListItemIcon>
          </ListItem>
          <Collapse in={openTasks}>
            {group?.tasks && <TaskList tasks={group?.tasks} />}
          </Collapse>
        </List>
      </Box>
    </>
  )
}

export default Group
