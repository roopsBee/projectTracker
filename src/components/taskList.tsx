import React from "react"
import Task from "./task"
import { TaskType } from "../redux/projectSlice/projectSlice"

interface Props {
  tasks: TaskType[]
  groupId: string
}

const TaskList: React.FC<Props> = ({ tasks, groupId }) => {
  return (
    <>
      {tasks?.map(task => (
        <Task key={task.taskId} task={task} groupId={groupId} />
      ))}
    </>
  )
}

export default TaskList
