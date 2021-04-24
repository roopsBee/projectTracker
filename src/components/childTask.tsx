import { ListItem, Box, Divider, ListItemText } from "@material-ui/core"
import React from "react"
import { ChildTaskType } from "../redux/projectSlice/projectSlice"
import CommentsItem from "./commentsItem"

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
            <ListItemText primaryTypographyProps={{ variant: "inherit" }}>
              {childTask?.childTaskName}
            </ListItemText>
          </ListItem>
        </Box>
        <CommentsItem type="childTask" task={childTask} />
      </Box>
    </>
  )
}

export default ChildTask
