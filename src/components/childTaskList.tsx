import { ListItem } from "@material-ui/core"
import React from "react"
import ChildTask from "./childTask"

interface Props {
  childTasks: {
    childTaskId: string
    childTaskName: string
    completed: boolean
    comments: string[] | []
  }[]
}

const ChildTaskList: React.FC<Props> = ({ childTasks }) => {
  return (
    <>
      {childTasks?.map(childTask => (
        <ChildTask key={childTask.childTaskId} childTask={childTask} />
      ))}
    </>
  )
}

export default ChildTaskList
