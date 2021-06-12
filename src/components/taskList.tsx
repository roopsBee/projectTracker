import React from "react"
import Task from "./task"
import { ProjectType, TaskType } from "../redux/projectSlice/projectSlice"
import { AnimatePresence, motion } from "framer-motion"

interface Props {
  tasks: TaskType[]
  groupId: string
  project: ProjectType
  groupIndex: number
}

const TaskList: React.FC<Props> = ({ tasks, groupId, project }) => {
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
          >
            <Task project={project} task={task} groupId={groupId} />
          </motion.div>
        ))}
      </AnimatePresence>
    </>
  )
}

export default TaskList
