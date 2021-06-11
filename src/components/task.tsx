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
import { ProjectType, TaskType } from "../redux/projectSlice/projectSlice"
import CommentsItem from "./commentsItem"
import ExpandIconButton from "./expandIconButton"
import MenuItemButton from "./menuItems/menuItemButton"
import AddTaskMenuItem from "./menuItems/addTaskMenuItem"
import CommentsMenuItem from "./menuItems/commentsMenuItem"
import EditTaskNameMenuItem from "./menuItems/editTaskNameMenuItem"
import TaskDeleteMenuItem from "./menuItems/taskDeleteMenuItem"
import TagBar from "./tagBar"

interface Props {
  task: TaskType
  groupId: string
  project: ProjectType
}

const Task: React.FC<Props> = ({ task, groupId, project }) => {
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
                  <TaskDeleteMenuItem
                    taskId={task.taskId}
                    handleClose={handleClose}
                  />
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
        <TagBar type="task" tags={project.projectTags || []} task={task} />
      </Box>
      <Collapse in={openChildTasks}>
        {task?.childTasks && (
          <ChildTaskList
            project={project}
            groupId={groupId}
            childTasks={task?.childTasks}
          />
        )}
      </Collapse>
    </>
  )
}

export default Task
