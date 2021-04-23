import React from "react"
import { ChildTaskType } from "../redux/projectSlice/projectSlice"
import ChildTask from "./childTask"

interface Props {
  childTasks: ChildTaskType[]
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
