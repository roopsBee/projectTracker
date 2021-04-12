import { ListItem } from "@material-ui/core"
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
    <ListItem key={childTask.childTaskId}>{childTask?.childTaskName}</ListItem>
  )
}

export default ChildTask
