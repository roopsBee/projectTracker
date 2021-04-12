import React from "react"
import Task from "./task"
import { TaskType } from "../redux/projectSlice/projectSlice"

interface Props {
  tasks: TaskType[]
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
