import { ListItem, Box, Divider, ListItemText } from "@material-ui/core"
import React from "react"
import { ChildTaskType } from "../redux/projectSlice/projectSlice"
import CommentsItem from "./commentsItem"
import MenuItemButton from "./menuItems/menuItemButton"
import CommentsMenuItem from "./menuItems/commentsMenuItem"
import TaskDoneCheckBox from "./taskDoneCheckBox"
import EditChildTaskNameMenuItem from "./menuItems/editChildTaskNameMenuItem"

interface Props {
  childTask: ChildTaskType
  groupId: string
}

const ChildTask: React.FC<Props> = ({ childTask, groupId }) => {
  return (
    <>
      <Divider />
      <Box paddingLeft={4}>
        <Box marginBottom={0} height={59} clone>
          <ListItem key={childTask.childTaskId} disableGutters>
            <MenuItemButton>
              {handleClose => (
                <div>
                  <CommentsMenuItem
                    type="childTask"
                    handleClose={handleClose}
                    task={childTask}
                  />
                  <EditChildTaskNameMenuItem
                    childTask={childTask}
                    handleClose={handleClose}
                    groupId={groupId}
                  />
                </div>
              )}
            </MenuItemButton>
            <ListItemText primaryTypographyProps={{ variant: "inherit" }}>
              {childTask?.childTaskName}
            </ListItemText>
          </ListItem>
        </Box>
        <CommentsItem comments={childTask.comments} />
        <TaskDoneCheckBox task={childTask} type="childTask" />
      </Box>
    </>
  )
}

export default ChildTask
