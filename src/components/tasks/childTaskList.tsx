import React from "react"
import {
  ChildTaskType,
  ProjectType,
} from "../../redux/projectSlice/projectSlice"
import ChildTask from "./childTask"
import { AnimatePresence, motion } from "framer-motion"

interface Props {
  childTasks: ChildTaskType[]
  groupId: string
  project: ProjectType
}

const ChildTaskList: React.FC<Props> = ({ childTasks, groupId, project }) => {
  return (
    <>
      {" "}
      <AnimatePresence>
        {childTasks?.map(childTask => (
          <motion.div
            key={childTask.childTaskId}
            initial={{ height: 0 }}
            transition={{ type: "spring", bounce: 0, duration: 0.3 }}
            exit={{ height: 0 }}
            animate={{ height: "initial" }}
          >
            <ChildTask
              project={project}
              groupId={groupId}
              childTask={childTask}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </>
  )
}

export default ChildTaskList
