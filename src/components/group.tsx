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
import { TaskGroupType } from "../redux/projectSlice/projectSlice"

interface Props {
  group: TaskGroupType
}

const Group: React.FC<Props> = ({ group }) => {
  const [openTasks, setOpenTasks] = useState(false)
  const handleExpandClick = () => {
    setOpenTasks(!openTasks)
  }
  return (
    <>
      <List>
        <ListItem key={group.groupId}>
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
