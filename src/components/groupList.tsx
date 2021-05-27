import React from "react"
import Group from "./group"
import { TaskGroupType } from "../redux/projectSlice/projectSlice"
import { AnimatePresence, motion } from "framer-motion"

interface Props {
  taskGroups: TaskGroupType[]
}

const GroupList: React.FC<Props> = ({ taskGroups }) => {
  return (
    <>
      <AnimatePresence>
        {taskGroups?.map(group => (
          <motion.div
            key={group.groupId}
            initial={{ height: 0 }}
            transition={{ type: "spring", bounce: 0, duration: 0.3 }}
            exit={{ height: 0 }}
            animate={{ height: "initial" }}
            style={{ overflow: "hidden" }}
          >
            <Group key={group.groupId} group={group} />
          </motion.div>
        ))}
      </AnimatePresence>
    </>
  )
}

export default GroupList
