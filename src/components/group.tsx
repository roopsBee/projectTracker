/** @jsx jsx */
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
  Button,
} from "@material-ui/core"
import ExpandLess from "@material-ui/icons/ExpandLess"
import ExpandMore from "@material-ui/icons/ExpandMore"
import ListIcon from "@material-ui/icons/FormatListBulleted"
import { css, jsx } from "@emotion/react"
import TaskList from "./taskList"
import { TaskGroupType } from "../redux/projectSlice/projectSlice"
import AddTaskButton from "./addTaskButton"

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
              <ListItemIcon>
                <Badge badgeContent={group.tasks?.length} color="primary">
                  <ListIcon />
                </Badge>
              </ListItemIcon>
              <ListItemText>{group.taskGroupName}</ListItemText>
              <AddTaskButton groupId={group.groupId} />
              {isTasks && (
                <>
                  <ListItemIcon>
                    <IconButton onClick={handleExpandClick}>
                      {!openTasks ? <ExpandMore /> : <ExpandLess />}
                    </IconButton>
                  </ListItemIcon>
                </>
              )}
            </ListItem>
          </Box>
          <Collapse in={openTasks}>
            {group?.tasks && <TaskList tasks={group?.tasks} />}
          </Collapse>
        </List>
      </Box>
    </>
  )
}

export default Group
