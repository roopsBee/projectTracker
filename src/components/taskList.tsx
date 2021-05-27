import React from "react"
import Task from "./task"
import { TaskType } from "../redux/projectSlice/projectSlice"
import { AnimatePresence, motion } from "framer-motion"

interface Props {
  tasks: TaskType[]
  groupId: string
}

const TaskList: React.FC<Props> = ({ tasks, groupId }) => {
  return (
    <>
      <AnimatePresence>
        {tasks?.map(task => (
          <motion.div
            key={task.taskId}
            initial={{ height: 0 }}
            transition={{ type: "spring", bounce: 0, duration: 0.3 }}
            exit={{ height: 0 }}
            animate={{ height: "initial" }}
            style={{ overflow: "hidden" }}
          >
            <Task key={task.taskId} task={task} groupId={groupId} />
          </motion.div>
        ))}
      </AnimatePresence>
    </>
  )
}

export default TaskList
