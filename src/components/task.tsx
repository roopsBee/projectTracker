/** @jsx jsx */
import { jsx } from "@emotion/react"
import {
  ListItem,
  ListItemText,
  Collapse,
  Box,
  Divider,
  Typography,
} from "@material-ui/core"
import React, { useState } from "react"
import ChildTaskList from "./childTaskList"

import { TaskType } from "../redux/projectSlice/projectSlice"
import AddTaskButton from "./addTaskButton"
import CommentsItem from "./commentsItem"
import TaskDoneCheckBox from "./taskDoneCheckBox"
import ExpandIconButton from "./expandIconButton"

interface Props {
  task: TaskType
  groupId: string
}

const Task: React.FC<Props> = ({ task, groupId }) => {
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
            <ListItemText>
              <Typography variant="subtitle1">{task?.taskName}</Typography>
            </ListItemText>
            <AddTaskButton
              type="childTask"
              taskId={task.taskId}
              groupId={groupId}
            />
            {isChildTasks && (
              <ExpandIconButton
                handleClick={handleExpandClick}
                open={openChildTasks}
                badgeContent={task.childTasks.length}
              />
            )}
          </ListItem>
        </Box>
        <CommentsItem type="task" task={task} />
        <TaskDoneCheckBox task={task} type="task" />
      </Box>
      <Collapse in={openChildTasks}>
        {task?.childTasks && <ChildTaskList childTasks={task?.childTasks} />}
      </Collapse>
    </>
  )
}

export default Task
