import { ListItem, Box, Divider } from "@material-ui/core"
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
    <>
      <Divider />
      <Box paddingLeft={4}>
        <Box marginBottom={0} height={59} clone>
          <ListItem key={childTask.childTaskId}>
            {childTask?.childTaskName}
          </ListItem>
        </Box>
      </Box>
    </>
  )
}

export default ChildTask
