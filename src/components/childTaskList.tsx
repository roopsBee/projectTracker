import React from "react"
import { ChildTaskType } from "../redux/projectSlice/projectSlice"
import ChildTask from "./childTask"
import { AnimatePresence, motion } from "framer-motion"

interface Props {
  childTasks: ChildTaskType[]
  groupId: string
}

const ChildTaskList: React.FC<Props> = ({ childTasks, groupId }) => {
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
            style={{ overflow: "hidden" }}
          >
            <ChildTask
              groupId={groupId}
              key={childTask.childTaskId}
              childTask={childTask}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </>
  )
}

export default ChildTaskList
