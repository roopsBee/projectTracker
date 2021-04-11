import React from "react"
import Group from "./group"

interface Props {
  taskGroups: {
    groupId: string
    taskGroupName: string
    tasks?: {
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
    }[]
  }[]
}

const GroupList: React.FC<Props> = ({ taskGroups }) => {
  return (
    <>
      {taskGroups?.map(group => (
        <Group group={group} />
      ))}
    </>
  )
}

export default GroupList
