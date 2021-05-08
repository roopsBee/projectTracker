import React, { useState } from "react"
import { List, ListItem, ListItemText, Collapse, Box } from "@material-ui/core"
import TaskList from "./taskList"
import { TaskGroupType } from "../redux/projectSlice/projectSlice"
import MenuItemButton from "./menuItemButton"
import AddTaskMenuItem from "./addTaskMenuItem"
import ExpandIconButton from "./expandIconButton"
import EditGroupNameMenuItem from "./editGroupNameMenuItem"

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
                  <div>
                    <AddTaskMenuItem
                      handleClose={handleClose}
                      type="task"
                      groupId={group.groupId}
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
      </Box>
    </>
  )
}

export default Group
