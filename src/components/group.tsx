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
import { ProjectType, TaskGroupType } from "../redux/projectSlice/projectSlice"
import MenuItemButton from "./menuItems/menuItemButton"
import AddTaskMenuItem from "./menuItems/addTaskMenuItem"
import ExpandIconButton from "./expandIconButton"
import EditGroupNameMenuItem from "./menuItems/editGroupNameMenuItem"
import GroupDeleteMenuItem from "./menuItems/groupDeleteMenuItem"
import { jsx } from "@emotion/react"

interface Props {
  group: TaskGroupType
  project: ProjectType
  groupIndex: number
}

const Group: React.FC<Props> = ({ group, project, groupIndex }) => {
  const [openTasks, setOpenTasks] = useState(false)
  const handleExpandClick = () => {
    setOpenTasks(!openTasks)
  }

  const isTasks = group?.tasks && group?.tasks?.length > 0

  return (
    <>
      <Paper css={{ marginTop: 8 }}>
        <List disablePadding>
          <Box margin={0} clone>
            <ListItem
              dense
              style={{ padding: 0 }}
              key={group.groupId}
              disableGutters
            >
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
              <TaskList
                project={project}
                groupIndex={groupIndex}
                groupId={group.groupId}
                tasks={group?.tasks}
              />
            )}
          </Collapse>
        </List>
      </Paper>
    </>
  )
}

export default Group
