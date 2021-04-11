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
} from "@material-ui/core"
import ExpandLess from "@material-ui/icons/ExpandLess"
import ExpandMore from "@material-ui/icons/ExpandMore"
import TaskList from "./taskList"

interface Props {
  group: {
    groupId: string
    taskGroupName: string
    tasks?: {
      taskId: string
      taskName: string
      completed: boolean
      comments: string[] | []
      childTasks?: {
        taskId: string
        childTaskName: string
        completed: boolean
        comments: string[] | []
      }[]
    }[]
  }
}

const Group: React.FC<Props> = ({ group }) => {
  const [openTasks, setOpenTasks] = useState(false)
  const handleExpandClick = () => {
    setOpenTasks(!openTasks)
    console.log(openTasks)
  }
  return (
    <>
      <List>
        <ListItem>
          <ListItemText>{group.taskGroupName}</ListItemText>
          <ListItemIcon>
            <IconButton onClick={handleExpandClick}>
              <ExpandMore />
            </IconButton>
          </ListItemIcon>
        </ListItem>
        <Collapse in={openTasks}>
          {group?.tasks && <TaskList tasks={group?.tasks} />}
        </Collapse>
      </List>
    </>
  )
}

export default Group
