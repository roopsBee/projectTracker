import React, { useEffect, useState } from "react"
import { Checkbox } from "@material-ui/core"
import { TaskType, ChildTaskType } from "../redux/projectSlice/projectSlice"
import { useAppDispatch } from "../redux/reduxHooks"
import toggleTaskDoneThunk from "../redux/projectSlice/toggleTaskDoneThunk"

type Props = task | childTask

interface task {
  type: "task"
  task: TaskType
}
interface childTask {
  type: "childTask"
  task: ChildTaskType
}

const TaskDoneCheckBox: React.FC<Props> = props => {
  const [done, setDone] = useState(false)
  const dispatch = useAppDispatch()
  const url = typeof window !== "undefined" ? window.location.pathname : ""
  const urlArr = url.split("/")
  const projectId = urlArr[3]

  const taskId =
    props.type === "task" ? props.task.taskId : props.task.childTaskId

  const isDone = props.task.completed

  useEffect(() => {
    setDone(props.task.completed)
  }, [props.task.completed])

  const handleChange = async () => {
    setDone(!done)
    await dispatch(toggleTaskDoneThunk({ taskId, isDone: !isDone, projectId }))
  }
  return (
    <>
      <Checkbox
        checked={done}
        onChange={handleChange}
        inputProps={{ "aria-label": "is task completed check box" }}
      />
    </>
  )
}

export default TaskDoneCheckBox
