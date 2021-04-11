import { ListItem } from "@material-ui/core"
import React from "react"
interface Props {
  task?: {
    taskId: string
    taskName: string
    completed: boolean
    comments: string[] | []
    childTasks?: {
      taskId: string
      childTaskName: string
      completed: boolean
      comments: string[] | []
    }[]
  }
}

const Task: React.FC<Props> = ({ task }) => {
  return <ListItem>{task?.taskName}</ListItem>
}

export default Task
