/** @jsx jsx */
import { css, jsx } from "@emotion/react"

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
  Box,
  Divider,
} from "@material-ui/core"
import React, { useState } from "react"
import ChildTask from "./childTask"
import ChildTaskList from "./childTaskList"
import ExpandLess from "@material-ui/icons/ExpandLess"
import ExpandMore from "@material-ui/icons/ExpandMore"
import { TaskType } from "../redux/projectSlice/projectSlice"

interface Props {
  task?: TaskType
}

const Task: React.FC<Props> = ({ task }) => {
  const [openChildTasks, setOpenChildTasks] = useState(false)
  const handleExpandClick = () => {
    setOpenChildTasks(!openChildTasks)
  }

  const isChildTasks = task?.childTasks && task?.childTasks?.length > 0

  return (
    <>
      <Divider />
      <Box paddingLeft={2}>
        <Box marginBottom={0} height={59} clone>
          <ListItem dense key={task?.taskId}>
            <ListItemText>{task?.taskName}</ListItemText>
            {isChildTasks && (
              <ListItemIcon>
                <IconButton onClick={handleExpandClick}>
                  {!openChildTasks ? <ExpandMore /> : <ExpandLess />}
                </IconButton>
              </ListItemIcon>
            )}
          </ListItem>
        </Box>
      </Box>
      <Collapse in={openChildTasks}>
        {task?.childTasks && <ChildTaskList childTasks={task?.childTasks} />}
      </Collapse>
    </>
  )
}

export default Task
