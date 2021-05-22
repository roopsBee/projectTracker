/** @jsx jsx */
import React, { useState } from "react"
import {
  List,
  ListItem,
  ListItemText,
  Collapse,
  Box,
  Paper,
} from "@material-ui/core"
import TaskList from "./taskList"
import { TaskGroupType } from "../redux/projectSlice/projectSlice"
import MenuItemButton from "./menuItems/menuItemButton"
import AddTaskMenuItem from "./menuItems/addTaskMenuItem"
import ExpandIconButton from "./expandIconButton"
import EditGroupNameMenuItem from "./menuItems/editGroupNameMenuItem"
import GroupDeleteMenuItem from "./menuItems/groupDeleteMenuItem"
import { jsx } from "@emotion/react"

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
      <Paper css={{ marginTop: 8 }}>
        <List disablePadding>
          <Box margin={0} height={59} clone>
            <ListItem dense key={group.groupId} disableGutters>
              <MenuItemButton>
                {handleClose => (
                  <div>
                    <AddTaskMenuItem
                      handleClose={handleClose}
                      type="task"
                      groupId={group.groupId}
                    />
                    <GroupDeleteMenuItem
                      groupId={group.groupId}
                      handleClose={handleClose}
                    />
                    <EditGroupNameMenuItem
                      handleClose={handleClose}
                      group={group}
                    />
                  </div>
                )}
              </MenuItemButton>
              <ListItemText>{group.taskGroupName}</ListItemText>
              {isTasks && (
                <ExpandIconButton
                  handleClick={handleExpandClick}
                  open={openTasks}
                  badgeContent={group.tasks?.length}
                />
              )}
            </ListItem>
          </Box>
          <Collapse in={openTasks}>
            {group?.tasks && (
              <TaskList groupId={group.groupId} tasks={group?.tasks} />
            )}
          </Collapse>
        </List>
      </Paper>
    </>
  )
}

export default Group
