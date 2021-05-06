import React, { useState } from "react"
import {
  List,
  ListItem,
  ListItemText,
  Collapse,
  ListItemIcon,
  IconButton,
  Box,
  Badge,
} from "@material-ui/core"
import ExpandLess from "@material-ui/icons/ExpandLess"
import ExpandMore from "@material-ui/icons/ExpandMore"
import TaskList from "./taskList"
import { TaskGroupType } from "../redux/projectSlice/projectSlice"
import MenuItemButton from "./menuItemButton"
import AddTaskMenuItem from "./addTaskMenuItem"

interface Props {
  group: TaskGroupType
}

const Group: React.FC<Props> = ({ group }) => {
  const [openTasks, setOpenTasks] = useState(false)
  const handleExpandClick = () => {
    setOpenTasks(!openTasks)
  }

  const isTasks = group?.tasks && group?.tasks?.length > 0

  return (
    <>
      <Box marginY={1} bgcolor="background.paper">
        <List disablePadding>
          <Box margin={0} height={59} clone>
            <ListItem dense key={group.groupId}>
              <MenuItemButton>
                {handleClose => (
                  <AddTaskMenuItem
                    handleClose={handleClose}
                    type="task"
                    groupId={group.groupId}
                  />
                )}
              </MenuItemButton>
              <ListItemText>{group.taskGroupName}</ListItemText>
              {/* <AddTaskButton type="task" groupId={group.groupId} /> */}
              {isTasks && (
                <>
                  <ListItemIcon>
                    <IconButton onClick={handleExpandClick}>
                      <Badge badgeContent={group.tasks?.length} color="primary">
                        {!openTasks ? <ExpandMore /> : <ExpandLess />}
                      </Badge>
                    </IconButton>
                  </ListItemIcon>
                </>
              )}
            </ListItem>
          </Box>
          <Collapse in={openTasks}>
            {group?.tasks && (
              <TaskList groupId={group.groupId} tasks={group?.tasks} />
            )}
          </Collapse>
        </List>
      </Box>
    </>
  )
}

export default Group
