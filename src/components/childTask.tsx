import { ListItem, Box } from "@material-ui/core"
import React from "react"
interface Props {
  childTask: {
    childTaskId: string
    childTaskName: string
    completed: boolean
    comments: string[] | []
  }
}

const ChildTask: React.FC<Props> = ({ childTask }) => {
  return (
    <Box paddingLeft={2}>
      <ListItem key={childTask.childTaskId}>
        {childTask?.childTaskName}
      </ListItem>
    </Box>
  )
}

export default ChildTask
