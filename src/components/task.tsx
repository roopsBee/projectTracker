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

  return (
    <>
      <Box paddingLeft={2}>
        <ListItem dense key={task?.taskId}>
          <ListItemText>{task?.taskName}</ListItemText>
          {task?.childTasks && task?.childTasks?.length > 0 && (
            <ListItemIcon>
              <IconButton onClick={handleExpandClick}>
                {!openChildTasks ? <ExpandMore /> : <ExpandLess />}
              </IconButton>
            </ListItemIcon>
          )}
        </ListItem>

        <Collapse in={openChildTasks}>
          {task?.childTasks && <ChildTaskList childTasks={task?.childTasks} />}
        </Collapse>
      </Box>
    </>
  )
}

export default Task
