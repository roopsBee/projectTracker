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
import CommentsItem from "./commentsItem"
import TaskDoneCheckBox from "./taskDoneCheckBox"
import ExpandIconButton from "./expandIconButton"
import MenuItemButton from "./menuItems/menuItemButton"
import AddTaskMenuItem from "./menuItems/addTaskMenuItem"
import CommentsMenuItem from "./menuItems/commentsMenuItem"
import EditTaskNameMenuItem from "./menuItems/editTaskNameMenuItem"

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
          <ListItem dense key={task?.taskId} disableGutters>
            <MenuItemButton>
              {handleClose => (
                <div>
                  <AddTaskMenuItem
                    handleClose={handleClose}
                    type="childTask"
                    groupId={groupId}
                    taskId={task.taskId}
                  />
                  <CommentsMenuItem
                    type="task"
                    handleClose={handleClose}
                    task={task}
                  />
                  <EditTaskNameMenuItem handleClose={handleClose} task={task} />
                </div>
              )}
            </MenuItemButton>
            <ListItemText>
              <Typography variant="subtitle1">{task?.taskName}</Typography>
            </ListItemText>
            {isChildTasks && (
              <ExpandIconButton
                handleClick={handleExpandClick}
                open={openChildTasks}
                badgeContent={task.childTasks.length}
              />
            )}
          </ListItem>
        </Box>
        <CommentsItem comments={task.comments} />
        <TaskDoneCheckBox task={task} type="task" />
      </Box>
      <Collapse in={openChildTasks}>
        {task?.childTasks && (
          <ChildTaskList groupId={groupId} childTasks={task?.childTasks} />
        )}
      </Collapse>
    </>
  )
}

export default Task
