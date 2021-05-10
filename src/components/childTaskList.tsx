import React from "react"
import { ChildTaskType } from "../redux/projectSlice/projectSlice"
import ChildTask from "./childTask"

interface Props {
  childTasks: ChildTaskType[]
  groupId: string
}

const ChildTaskList: React.FC<Props> = ({ childTasks, groupId }) => {
  return (
    <>
      {childTasks?.map(childTask => (
        <ChildTask
          groupId={groupId}
          key={childTask.childTaskId}
          childTask={childTask}
        />
      ))}
    </>
  )
}

export default ChildTaskList
