import { ListItem, Box, Divider, ListItemText } from "@material-ui/core"
import React from "react"
import { ChildTaskType } from "../redux/projectSlice/projectSlice"
import CommentsItem from "./commentsItem"
import MenuItemButton from "./menuItemButton"
import CommentsMenuItem from "./commentsMenuItem"

interface Props {
  childTask: ChildTaskType
}

const ChildTask: React.FC<Props> = ({ childTask }) => {
  return (
    <>
      <Divider />
      <Box paddingLeft={4}>
        <Box marginBottom={0} height={59} clone>
          <ListItem key={childTask.childTaskId}>
            <MenuItemButton>
              {handleClose => (
                <div>
                  <CommentsMenuItem
                    type="childTask"
                    handleClose={handleClose}
                    task={childTask}
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
      </Box>
    </>
  )
}

export default ChildTask
