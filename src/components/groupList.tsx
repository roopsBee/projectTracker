import React from "react"
import Group from "./group"
import { ProjectType, TaskGroupType } from "../redux/projectSlice/projectSlice"
import { AnimatePresence, motion } from "framer-motion"

interface Props {
  taskGroups: TaskGroupType[]
  project: ProjectType
}

const GroupList: React.FC<Props> = ({ taskGroups, project }) => {
  return (
    <>
      <AnimatePresence>
        {taskGroups?.map((group, index) => (
          <motion.div
            key={group.groupId}
            initial={{ height: 0 }}
            transition={{ type: "spring", bounce: 0, duration: 0.3 }}
            exit={{ height: 0 }}
            animate={{ height: "initial" }}
            style={{ overflow: "hidden" }}
          >
            <Group groupIndex={index} project={project} group={group} />
          </motion.div>
        ))}
      </AnimatePresence>
    </>
  )
}

export default GroupList
