import React from "react"
import Task from "./task"

interface Props {
  tasks: {
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
}

const TaskList: React.FC<Props> = ({ tasks }) => {
  return (
    <>
      {tasks?.map(task => (
        <Task task={task} />
      ))}
    </>
  )
}

export default TaskList
