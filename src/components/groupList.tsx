import React from "react"
import Group from "./group"
import { TaskGroupType } from "../redux/projectSlice/projectSlice"

interface Props {
  taskGroups: TaskGroupType[]
}

const GroupList: React.FC<Props> = ({ taskGroups }) => {
  return (
    <>
      {taskGroups?.map(group => (
        <Group key={group.groupId} group={group} />
      ))}
    </>
  )
}

export default GroupList
