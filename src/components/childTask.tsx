import { ListItem, Box, Divider, ListItemText } from "@material-ui/core"
import React from "react"
import { ChildTaskType, ProjectType } from "../redux/projectSlice/projectSlice"
import CommentsItem from "./commentsItem"
import MenuItemButton from "./menuItems/menuItemButton"
import CommentsMenuItem from "./menuItems/commentsMenuItem"
import EditChildTaskNameMenuItem from "./menuItems/editChildTaskNameMenuItem"
import ChildTaskDeleteMenuItem from "./menuItems/childTaskDeleteMenuItem"
import TagBar from "./tagBar"

interface Props {
  childTask: ChildTaskType
  groupId: string
  project: ProjectType
}

const ChildTask: React.FC<Props> = ({ childTask, groupId, project }) => {
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
                  <ChildTaskDeleteMenuItem
                    handleClose={handleClose}
                    groupId={groupId}
                    childTaskId={childTask.childTaskId}
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
        <TagBar
          type="childTask"
          tags={project.projectTags || []}
          task={childTask}
        />
      </Box>
    </>
  )
}

export default ChildTask
