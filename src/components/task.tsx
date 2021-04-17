/** @jsx jsx */
import { css, jsx } from "@emotion/react"
import {
  ListItem,
  ListItemText,
  Collapse,
  ListItemIcon,
  IconButton,
  Box,
  Divider,
  Badge,
} from "@material-ui/core"
import ListIcon from "@material-ui/icons/FormatListBulleted"
import React, { useState } from "react"
import ChildTaskList from "./childTaskList"
import ExpandLess from "@material-ui/icons/ExpandLess"
import ExpandMore from "@material-ui/icons/ExpandMore"
import { TaskType } from "../redux/projectSlice/projectSlice"
import AddTaskButton from "./addTaskButton"

interface Props {
  task: TaskType
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
            <AddTaskButton type="childTask" taskId={task.taskId} />
            {isChildTasks && (
              <>
                <ListItemIcon>
                  <IconButton onClick={handleExpandClick}>
                    <Badge
                      badgeContent={task?.childTasks.length}
                      color="primary"
                    >
                      {!openChildTasks ? <ExpandMore /> : <ExpandLess />}
                    </Badge>
                  </IconButton>
                </ListItemIcon>
              </>
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
